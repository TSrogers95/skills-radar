/* =========================================================================
   START A SUBSCRIPTION

   Creates a Stripe Checkout session and returns its URL. The member is sent
   to Stripe's own payment page — card details never reach this site, which
   keeps you out of scope for most of PCI compliance.

   Access is not granted here. It is granted by the webhook, when Stripe
   confirms the payment actually succeeded. A member who abandons checkout
   or whose card is declined gets nothing, because nothing was written.
   ========================================================================= */

const { userFromRequest, admin, stripe, env, logEvent } = require('./_auth');

module.exports = async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  try {
    const user = await userFromRequest(req);
    if(!user) return res.status(401).json({ error: 'Sign in first.' });

    const priceId = env('STRIPE_PRICE_ID', true);
    const returnTo = (req.body && req.body.returnTo) || env('SITE_URL', false) || '';

    // Reuse the Stripe customer if they have one, so a returning member does
    // not end up with two records and two cards on file.
    const existing = await admin('subscriptions?user_id=eq.' + user.id + '&select=stripe_customer_id');
    let customerId = existing && existing[0] ? existing[0].stripe_customer_id : null;

    if(!customerId){
      const customer = await stripe('customers', {
        email: user.email,
        metadata: { supabase_user_id: user.id }
      });
      customerId = customer.id;

      await admin('subscriptions', {
        method: 'POST',
        prefer: 'resolution=merge-duplicates,return=minimal',
        body: JSON.stringify({
          user_id: user.id, stripe_customer_id: customerId, status: 'none'
        })
      });
    }

    const session = await stripe('checkout/sessions', {
      mode: 'subscription',
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: returnTo + '?welcome=1',
      cancel_url: returnTo + '?cancelled=1',
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      client_reference_id: user.id,
      subscription_data: { metadata: { supabase_user_id: user.id } },
      metadata: { supabase_user_id: user.id }
    });

    await logEvent(user.id, 'checkout_started', { session: session.id });

    return res.status(200).json({ url: session.url });

  } catch(err){
    console.error('create-checkout:', err.message);
    return res.status(500).json({ error: 'Could not start checkout. Try again shortly.' });
  }
};
