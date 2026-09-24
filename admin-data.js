/* =========================================================================
   ADMIN DATA

   Returns members, subscriptions and traffic for the admin page. Uses the
   service-role key, so the check that the caller is actually an admin is
   the only thing standing between this and everyone's data. That check
   reads the database rather than trusting the request.
   ========================================================================= */

const { userFromRequest, admin, isAdmin } = require('./_auth');

module.exports = async function handler(req, res){
  try {
    const user = await userFromRequest(req);
    if(!user) return res.status(401).json({ error: 'Sign in first.' });
    if(!await isAdmin(user.id)) return res.status(403).json({ error: 'Not an administrator.' });

    const what = (req.query && req.query.what) || 'members';

    if(what === 'members'){
      const profiles = await admin('profiles?select=id,email,org_name,member_type,levy_payer,routes,frequency,email_opt_out,is_admin,created_at&order=created_at.desc');
      const subs = await admin('subscriptions?select=user_id,status,current_period_end,cancel_at_period_end');
      const byUser = {};
      (subs || []).forEach(s => { byUser[s.user_id] = s; });

      return res.status(200).json({
        members: (profiles || []).map(p => ({
          ...p,
          subscription: byUser[p.id] || { status: 'none' }
        }))
      });
    }

    if(what === 'traffic'){
      const since = new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10);
      const views = await admin('page_views?select=path,day,referrer&day=gte.' + since + '&order=day.desc&limit=5000');

      const byDay = {}, byPath = {}, byRef = {};
      (views || []).forEach(v => {
        byDay[v.day] = (byDay[v.day] || 0) + 1;
        byPath[v.path] = (byPath[v.path] || 0) + 1;
        if(v.referrer) byRef[v.referrer] = (byRef[v.referrer] || 0) + 1;
      });

      return res.status(200).json({
        total: (views || []).length,
        days: Object.entries(byDay).sort((a,b) => a[0].localeCompare(b[0])),
        paths: Object.entries(byPath).sort((a,b) => b[1] - a[1]).slice(0, 20),
        referrers: Object.entries(byRef).sort((a,b) => b[1] - a[1]).slice(0, 12)
      });
    }

    if(what === 'events'){
      const events = await admin('account_events?select=user_id,event,detail,created_at&order=created_at.desc&limit=100');
      return res.status(200).json({ events: events || [] });
    }

    return res.status(400).json({ error: 'Unknown request.' });

  } catch(err){
    console.error('admin-data:', err.message);
    return res.status(500).json({ error: 'Could not load.' });
  }
};
