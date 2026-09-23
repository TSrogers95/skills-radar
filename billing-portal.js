/* =========================================================================
   BILLING PORTAL

   Sends the member to Stripe's hosted portal to change their card, download
   invoices or cancel. Building any of that yourself is a lot of work for a
   worse result, and cancellation in particular has to be easy — a difficult
   cancellation is both bad practice and, for a consumer subscription, a
   regulatory problem.
   ========================================================================= */

const { userFromRequest, admin, stripe, logEvent } = require('./_auth');

module.exports = async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  try {
    const user = await userFromRequest(req);
    if(!user) return res.status(401).json({ error: 'Sign in first.' });

    const rows = await admin('subscriptions?user_id=eq.' + user.id + '&select=stripe_customer_id');
    const customerId = rows && rows[0] ? rows[0].stripe_customer_id : null;
    if(!customerId) return res.status(400).json({ error: 'No billing record yet.' });

    const session = await stripe('billing_portal/sessions', {
      customer: customerId,
      return_url: (req.body && req.body.returnTo) || process.env.SITE_URL || ''
    });

    await logEvent(user.id, 'billing_portal_opened', null);
    return res.status(200).json({ url: session.url });

  } catch(err){
    console.error('billing-portal:', err.message);
    return res.status(500).json({ error: 'Could not open billing.' });
  }
};
