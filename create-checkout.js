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

    /* Reuse the Stripe customer if they have one, so a returning member does
       not end up with two records and two cards on file.

       But customers, like everything else in Stripe, exist in one mode only.
       Anyone who paid while the site was on test keys has a test customer id
       saved here, and looking it up with a live key fails with an error about
       modes that reads as though the price is wrong. So check it is really
       there, and quietly start again if it is not. */
    const existing = await admin('subscriptions?user_id=eq.' + user.id + '&select=stripe_customer_id');
    let customerId = existing && existing[0] ? existing[0].stripe_customer_id : null;

    if(customerId){
      try {
        const found = await stripe('customers/' + customerId);
        if(found && found.deleted) customerId = null;
      } catch(e){
        console.log('stored customer ' + customerId + ' not usable (' + e.message + ') — creating a new one');
        customerId = null;
      }
    }

    if(!customerId){
      const customer = await stripe('customers', {
        email: user.email,
        metadata: { supabase_user_id: user.id }
      });
      customerId = customer.id;

      await admin('subscriptions', {
        method: 'POST',
        prefer: 'resolution=merge-duplicates,return=minimal',
        headers: { 'Prefer': 'resolution=merge-duplicates,return=minimal' },
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

    /* Say what actually went wrong. "Try again shortly" is the right thing
       to show a member when the cause is transient, and useless when it is
       a mis-set key — which it almost always is the first time. */
    if(err.missing){
      return res.status(500).json({
        error: err.missing + ' is not set in Vercel.',
        fix: 'Add it under Settings, Environment Variables, ticked for Production, then redeploy.',
        missing: err.missing
      });
    }

    const m = String(err.message || '');

    if(/No such price/i.test(m)){
      return res.status(500).json({
        error: 'Stripe does not recognise that price.',
        fix: 'STRIPE_PRICE_ID belongs to the other mode. A price created in test mode does not exist in live mode, ' +
             'and the reverse. Create the £5 monthly price in the mode your secret key is for, and use that id.'
      });
    }
    if(/Invalid API Key|No API key|Expired API Key/i.test(m)){
      return res.status(500).json({
        error: 'Stripe rejected the API key.',
        fix: 'Check STRIPE_SECRET_KEY is copied whole. It starts sk_test_ for test mode and sk_live_ for live. ' +
             'Redeploy after changing it.'
      });
    }
    if(/No such customer/i.test(m)){
      return res.status(500).json({
        error: 'The saved Stripe customer belongs to the other mode.',
        fix: 'Clear it in Supabase: delete from subscriptions where status in (\'none\',\'canceled\'); ' +
             'then try again. A fresh customer will be created in the current mode.'
      });
    }
    if(/testmode|live mode|test mode/i.test(m)){
      return res.status(500).json({
        error: 'Something in this request belongs to the other Stripe mode.',
        fix: 'Usually the price id, or a customer saved while the site was on test keys. ' +
             'Check STRIPE_PRICE_ID was copied with the test-mode toggle off, and if it was, clear the old ' +
             'customer: delete from subscriptions where status in (\'none\',\'canceled\');',
        detail: m
      });
    }
    if(/url|success_url|cancel_url/i.test(m)){
      return res.status(500).json({
        error: 'Stripe would not accept the return address.',
        fix: 'Set SITE_URL in Vercel to https://skills-radar.co.uk, with no trailing slash, and redeploy.'
      });
    }

    return res.status(500).json({ error: 'Checkout could not start.', detail: m });
  }
};
