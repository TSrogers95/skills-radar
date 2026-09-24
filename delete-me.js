/* =========================================================================
   DELETE YOUR OWN ACCOUNT

   A member exercising their right to erasure. This needs the service-role
   key because removing an auth user is an administrative operation — but it
   only ever deletes the account belonging to the token that called it, so a
   member cannot delete anyone else.

   Stripe is deliberately not touched. Payment records must be kept for six
   years under UK tax law, and cancelling a live subscription here would hide
   a charge that is still running. The member is told to cancel first, and
   the page says so plainly.
   ========================================================================= */

const { userFromRequest, env, logEvent } = require('./_auth');

module.exports = async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  try {
    const user = await userFromRequest(req);
    if(!user) return res.status(401).json({ error: 'Not signed in.' });

    await logEvent(null, 'account_self_deleted', { email: user.email, id: user.id });

    const url = env('SUPABASE_URL', true);
    const key = env('SUPABASE_SERVICE_KEY', true);

    // Deletes only the caller. The id comes from the verified token, never
    // from the request body.
    const r = await fetch(url + '/auth/v1/admin/users/' + user.id, {
      method: 'DELETE',
      headers: { 'apikey': key, 'Authorization': 'Bearer ' + key }
    });

    if(!r.ok){
      const text = await r.text();
      console.error('delete-me:', text);
      return res.status(500).json({ error: 'Could not complete the deletion.' });
    }

    return res.status(200).json({ ok: true, deleted: user.id });

  } catch(err){
    console.error('delete-me:', err.message);
    return res.status(500).json({ error: 'Could not complete the deletion.' });
  }
};
