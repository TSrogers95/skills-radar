/* =========================================================================
   THE MONTHLY DIGEST

   Runs on the first of the month. For every member who has not opted out, it
   builds a digest from the standards in their own cohort and sends it.

   The point of this file: the newsletter is not a bulletin everyone gets.
   Each one is assembled from what that member actually delivers, which is
   the thing the site is for and the reason someone pays for it.

   Needs RESEND_API_KEY and ALERT_FROM. Without them it runs, reports what it
   would have sent, and sends nothing, which is also how you test it.
   ========================================================================= */

const { admin, env, logEvent } = require('./_auth');
const { sendEmail } = require('./_lib');

const SITE = process.env.SITE_URL || 'https://skills-radar.co.uk';

module.exports = async function handler(req, res){
  /* Same guard as the other scheduled jobs. */
  const secret = process.env.CRON_SECRET;
  if(secret){
    const given = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
    if(given !== secret) return res.status(401).json({ error: 'Unauthorised' });
  }

  const dry = req.query && (req.query.dry === '1' || req.query.dry === 'true');

  try {
    /* Everyone who should get it: has access, has not opted out, has a
       cohort. Someone with no standards would receive an empty email, which
       is worse than receiving none. */
    const profiles = await admin('profiles?select=id,email,org_name,email_opt_out&email_opt_out=is.false&deleted_at=is.null');
    if(!profiles || !profiles.length){
      return res.status(200).json({ sent: 0, note: 'No members opted in.' });
    }

    const subs = await admin('subscriptions?select=user_id,status');
    const active = new Set((subs || [])
      .filter(s => ['active','trialing','past_due'].indexOf(s.status) > -1)
      .map(s => s.user_id));

    const results = { considered: profiles.length, sent: 0, skipped: [], failed: [] };

    for(const p of profiles){
      if(!active.has(p.id)){ results.skipped.push({ email: p.email, why: 'no active membership' }); continue; }

      const standards = await admin('member_standards?select=standard_name,level,head_count&user_id=eq.' + p.id);
      if(!standards || !standards.length){
        results.skipped.push({ email: p.email, why: 'no standards in cohort' });
        continue;
      }

      const html = digestHTML(p, standards);
      const subject = 'Skills Radar: what changed for ' + (p.org_name || 'your programmes') + ' this month';

      if(dry){
        results.sent++;
        results.skipped.push({ email: p.email, why: 'dry run', standards: standards.length });
        continue;
      }

      try {
        await sendEmail(subject, html, p.email);
        results.sent++;
        await logEvent(p.id, 'digest_sent', { standards: standards.length });
      } catch(err){
        results.failed.push({ email: p.email, error: err.message });
      }
    }

    return res.status(200).json(results);

  } catch(err){
    console.error('send-digest:', err.message);
    return res.status(500).json({ error: err.message });
  }
};

/* The email itself. Plain, narrow, and readable in a preview pane: the point
   is to be scanned in ten seconds and acted on, not admired. Inline styles
   because email clients strip stylesheets. */
function digestHTML(profile, standards){
  const names = standards.map(s => s.standard_name);
  const total = standards.reduce((n, s) => n + (s.head_count || 0), 0);

  const row = (title, detail) =>
    '<tr><td style="padding:14px 0;border-bottom:1px solid #E4E0D6">' +
      '<div style="font:600 16px Georgia,serif;color:#152023;line-height:1.3">' + esc(title) + '</div>' +
      '<div style="font:14px Arial,sans-serif;color:#41525A;line-height:1.55;margin-top:4px">' + esc(detail) + '</div>' +
    '</td></tr>';

  return '<!DOCTYPE html><html><body style="margin:0;padding:0;background:#FAF9F6">' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF9F6;padding:28px 14px">' +
    '<tr><td align="center">' +
    '<table width="100%" style="max-width:580px" cellpadding="0" cellspacing="0">' +

      '<tr><td style="background:#0D1B1E;padding:24px 26px">' +
        '<div style="font:700 28px Georgia,serif;color:#fff;letter-spacing:-1px">Skills <span style="color:#6ED0B6;font-weight:400">Radar</span></div>' +
        '<div style="font:13px Arial,sans-serif;color:#8FAEA8;margin-top:6px">' +
          'What changed for ' + esc(profile.org_name || 'your programmes') + '</div>' +
      '</td></tr>' +

      '<tr><td style="background:#fff;padding:26px 26px 10px">' +
        '<p style="font:15px Arial,sans-serif;color:#41525A;line-height:1.6;margin:0 0 20px">' +
          'This is built from the ' + standards.length + ' standard' + (standards.length === 1 ? '' : 's') +
          ' in your cohort' + (total ? ', covering ' + total + ' apprentice' + (total === 1 ? '' : 's') : '') + '. ' +
          'Nothing here is a general bulletin.</p>' +

        '<div style="font:700 11px Arial,sans-serif;letter-spacing:1.5px;text-transform:uppercase;color:#7A8A8E;' +
          'border-bottom:2px solid #0D1B1E;padding-bottom:6px;margin-bottom:4px">Your standards</div>' +
        '<table width="100%" cellpadding="0" cellspacing="0">' +
          names.slice(0, 8).map(n => row(n, 'In your cohort')).join('') +
        '</table>' +

        '<p style="font:14px Arial,sans-serif;color:#41525A;line-height:1.6;margin:22px 0 0">' +
          'The full picture, with your calendar, compliance position and levy forecast, is on the site.</p>' +

        '<table cellpadding="0" cellspacing="0" style="margin:20px 0 26px"><tr>' +
          '<td style="background:#6ED0B6"><a href="' + SITE + '/members.html" ' +
            'style="display:block;padding:13px 26px;font:600 15px Arial,sans-serif;color:#06211C;text-decoration:none">' +
            'Open your dashboard</a></td>' +
        '</tr></table>' +
      '</td></tr>' +

      '<tr><td style="background:#fff;border-top:1px solid #E4E0D6;padding:18px 26px 26px">' +
        '<p style="font:12px Arial,sans-serif;color:#7A8A8E;line-height:1.55;margin:0">' +
          'You are getting this because you are a Skills Radar member. ' +
          '<a href="' + SITE + '/members.html#prefs" style="color:#2A4A47">Turn it off</a> ' +
          'at any time without losing access. Skills Radar, ' + SITE.replace('https://','') + '.</p>' +
      '</td></tr>' +

    '</table></td></tr></table></body></html>';
}

function esc(s){
  return String(s == null ? '' : s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
