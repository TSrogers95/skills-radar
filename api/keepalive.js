/* =========================================================================
   KEEP THE DATABASE AWAKE

   Supabase pauses a free-tier project after seven days without database
   activity. A paused project takes the members area with it: nobody can
   sign in, nobody can see their cohort, and the Stripe webhook cannot
   record a payment, so someone could pay and get nothing.

   The site's own page tracking normally keeps it warm, but that only works
   while somebody visits, and seven quiet days is not a rare event on a new
   site. This makes it independent of traffic.

   One cheap read, once a day. It writes nothing.
   ========================================================================= */

const { admin } = require('./_auth');

module.exports = async function handler(req, res){
  try {
    /* Smallest query that still counts as database activity: one column,
       one row, no filter to plan around. */
    await admin('profiles?select=id&limit=1');
    return res.status(200).json({ ok: true, woke: new Date().toISOString() });

  } catch(err){
    console.error('keepalive:', err.message);

    /* Worth being loud about. If this is failing, the project is drifting
       towards a pause and the first anyone would know is a member unable
       to sign in. */
    if(err.missing){
      return res.status(500).json({
        ok: false,
        error: 'Not configured: ' + err.missing + ' is not set in Vercel.',
        missing: err.missing
      });
    }
    return res.status(500).json({ ok: false, error: err.message });
  }
};
