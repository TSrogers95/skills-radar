/* =========================================================================
   STRIPE WEBHOOK

   This is the only thing that grants or removes access. Everything else in
   the payment flow is presentation; this is where it becomes true.

   Two things matter more than anything else here:

   1. The signature is verified on every request. Without that check this URL
      is a public endpoint anyone could call to give themselves a free
      subscription. The raw body is needed to verify it, which is why the
      body parser is turned off below.

   2. It writes with the service-role key. The subscriptions table has no
      insert or update policy for members, so the browser cannot touch it.

   If this function fails silently, someone pays and stays locked out. Every
   run is written to account_events, and failures are emailed.
   ========================================================================= */

const crypto = require('crypto');
const { admin, env, logEvent } = require('./_auth');
const { sendEmail } = require('./_lib');

/* Vercel parses JSON by default, which destroys the raw body the signature
   is calculated over. */
module.exports.config = { api: { bodyParser: false } };

function rawBody(req){
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

/* Stripe's scheme: t=timestamp,v1=signature. Compared in constant time so
   the comparison itself cannot leak information. */
function verify(payload, header, secret){
  if(!header) return false;

  const parts = {};
  header.split(',').forEach(p => {
    const [k, v] = p.split('=');
    if(k === 'v1'){ (parts.v1 = parts.v1 || []).push(v); }
    else parts[k] = v;
  });

  if(!parts.t || !parts.v1) return false;

  // Reject anything older than five minutes, so a captured request cannot
  // be replayed later.
  const age = Math.abs(Math.floor(Date.now() / 1000) - parseInt(parts.t, 10));
  if(age > 300) return false;

  const expected = crypto.createHmac('sha256', secret)
    .update(parts.t + '.' + payload, 'utf8').digest('hex');

  return parts.v1.some(sig => {
    try {
      return crypto.timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex'));
    } catch(e){ return false; }
  });
}

module.exports = async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).send('POST only');

  let payload;
  try { payload = await rawBody(req); }
  catch(e){ return res.status(400).send('Could not read body'); }

  const secret = env('STRIPE_WEBHOOK_SECRET', true);
  if(!verify(payload, req.headers['stripe-signature'], secret)){
    console.error('webhook: signature rejected');
    return res.status(400).send('Bad signature');
  }

  let event;
  try { event = JSON.parse(payload); }
  catch(e){ return res.status(400).send('Bad JSON'); }

  try {
    await route(event);
    return res.status(200).json({ received: true });
  } catch(err){
    console.error('webhook ' + event.type + ':', err.message);

    // Tell someone. A failure here means a paying member without access.
    try {
      await sendEmail('Skills Radar — webhook failed: ' + event.type,
        '<p>A Stripe webhook could not be processed. Someone may have paid without getting access.</p>' +
        '<p><b>Event:</b> ' + event.type + '<br><b>Id:</b> ' + event.id + '</p>' +
        '<pre>' + String(err.message).replace(/</g, '&lt;') + '</pre>' +
        '<p>Stripe will retry. Check the webhook log in your Stripe dashboard.</p>');
    } catch(e){}

    // A non-200 makes Stripe retry, which is what we want.
    return res.status(500).send('Handler failed');
  }
};

async function route(event){
  const o = event.data.object;

  switch(event.type){

    case 'checkout.session.completed': {
      const userId = o.client_reference_id || (o.metadata && o.metadata.supabase_user_id);
      if(!userId) throw new Error('No supabase user id on the checkout session');
      if(o.subscription){
        const sub = await fetchSubscription(o.subscription);
        await writeSubscription(userId, sub, o.customer);
        await logEvent(userId, 'subscription_started', { sub: o.subscription });
      }
      break;
    }

    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const userId = await userFor(o);
      if(!userId) throw new Error('No user for subscription ' + o.id);
      await writeSubscription(userId, o, o.customer);
      await logEvent(userId, 'subscription_' + (event.type.endsWith('created') ? 'created' : 'updated'),
        { status: o.status, cancel_at_period_end: o.cancel_at_period_end });
      break;
    }

    case 'customer.subscription.deleted': {
      const userId = await userFor(o);
      if(!userId) break;
      await admin('subscriptions?user_id=eq.' + userId, {
        method: 'PATCH', prefer: 'return=minimal',
        body: JSON.stringify({ status: 'canceled', updated_at: new Date().toISOString() })
      });
      await logEvent(userId, 'subscription_cancelled', null);
      break;
    }

    case 'invoice.payment_failed': {
      const userId = await userFor({ id: o.subscription, customer: o.customer });
      if(userId) await logEvent(userId, 'payment_failed', { invoice: o.id });
      // Status is not changed here. Stripe moves the subscription to
      // past_due itself and sends customer.subscription.updated, and
      // past_due keeps access while Stripe retries.
      break;
    }

    default:
      break;
  }
}

async function fetchSubscription(id){
  const { stripe } = require('./_auth');
  return stripe('subscriptions/' + id);
}

/* Find the member behind a Stripe object: metadata first, then the customer
   record we already hold. */
async function userFor(sub){
  if(sub.metadata && sub.metadata.supabase_user_id) return sub.metadata.supabase_user_id;
  if(!sub.customer) return null;
  const rows = await admin('subscriptions?stripe_customer_id=eq.' + sub.customer + '&select=user_id');
  return rows && rows[0] ? rows[0].user_id : null;
}

async function writeSubscription(userId, sub, customerId){
  const row = {
    user_id: userId,
    stripe_customer_id: customerId || sub.customer,
    stripe_sub_id: sub.id,
    status: sub.status,
    price_id: sub.items && sub.items.data && sub.items.data[0] ? sub.items.data[0].price.id : null,
    current_period_end: sub.current_period_end
      ? new Date(sub.current_period_end * 1000).toISOString() : null,
    cancel_at_period_end: !!sub.cancel_at_period_end,
    updated_at: new Date().toISOString()
  };

  await admin('subscriptions', {
    method: 'POST',
    prefer: 'resolution=merge-duplicates,return=minimal',
    headers: { 'Prefer': 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify(row)
  });
}
