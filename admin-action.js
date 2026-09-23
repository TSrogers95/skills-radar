/* =========================================================================
   ADMIN ACTIONS

   Password resets, data export and deletion. Kept separate from reads so
   the destructive things are easy to find and audit.

   Deletion is a legal obligation under UK GDPR, not a convenience, and it
   has to actually remove the data — which is why the schema cascades.
   ========================================================================= */

const { userFromRequest, admin, isAdmin, env, logEvent } = require('./_auth');

module.exports = async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  try {
    const caller = await userFromRequest(req);
    if(!caller) return res.status(401).json({ error: 'Sign in first.' });
    if(!await isAdmin(caller.id)) return res.status(403).json({ error: 'Not an administrator.' });

    const { action, userId, email } = req.body || {};

    /* Supabase sends the reset email itself. There is no reason to build
       password handling, and every reason not to. */
    if(action === 'reset'){
      if(!email) return res.status(400).json({ error: 'No email given.' });
      const url = env('SUPABASE_URL', true);
      const anon = env('SUPABASE_ANON_KEY', true);
      const site = env('SITE_URL', false) || '';

      const r = await fetch(url + '/auth/v1/recover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'apikey': anon },
        body: JSON.stringify({ email: email, redirect_to: site + '/account.html?reset=1' })
      });
      if(!r.ok) return res.status(500).json({ error: 'Supabase refused the reset request.' });

      await logEvent(userId || null, 'password_reset_sent_by_admin', { by: caller.id });
      return res.status(200).json({ ok: true, message: 'Reset email sent to ' + email });
    }

    /* Everything held about one person, for a subject access request. */
    if(action === 'export'){
      if(!userId) return res.status(400).json({ error: 'No user given.' });
      const [profile, standards, events, subs, audit] = await Promise.all([
        admin('profiles?id=eq.' + userId + '&select=*'),
        admin('member_standards?user_id=eq.' + userId + '&select=*'),
        admin('member_events?user_id=eq.' + userId + '&select=*'),
        admin('subscriptions?user_id=eq.' + userId + '&select=*'),
        admin('account_events?user_id=eq.' + userId + '&select=*')
      ]);
      await logEvent(userId, 'data_exported_by_admin', { by: caller.id });
      return res.status(200).json({
        exported: new Date().toISOString(),
        profile: profile && profile[0], standards, events,
        subscription: subs && subs[0], audit
      });
    }

    /* Removes the auth user; the schema cascades to every table. Stripe is
       deliberately left alone — cancel there first, or you delete the record
       and keep charging them. */
    if(action === 'delete'){
      if(!userId) return res.status(400).json({ error: 'No user given.' });
      const url = env('SUPABASE_URL', true);
      const key = env('SUPABASE_SERVICE_KEY', true);

      const r = await fetch(url + '/auth/v1/admin/users/' + userId, {
        method: 'DELETE',
        headers: { 'apikey': key, 'Authorization': 'Bearer ' + key }
      });
      if(!r.ok) return res.status(500).json({ error: 'Could not delete: ' + await r.text() });

      await logEvent(null, 'account_deleted_by_admin', { deleted: userId, by: caller.id });
      return res.status(200).json({ ok: true, message: 'Account deleted. Cancel the Stripe subscription separately if it is still active.' });
    }

    return res.status(400).json({ error: 'Unknown action.' });

  } catch(err){
    console.error('admin-action:', err.message);
    return res.status(500).json({ error: err.message });
  }
};
