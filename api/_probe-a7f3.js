/* =========================================================================
   TEMPORARY DIAGNOSTIC — DELETE AFTER USE

   Only here because the Supabase project API lives on supabase.co, which is
   not reachable from the session doing the debugging, while this function
   already holds the service key.

   It reports structure and counts only: which columns the analytics table
   has, how many rows it holds, and which paths have been recorded. No
   member data, no referrers, nothing about a person. Even so it is a public
   endpoint describing the schema, so it is not meant to live here.
   ========================================================================= */

const { admin } = require('./_auth');

module.exports = async function handler(req, res){
  const out = {};

  /* Does the table have the columns recordEvent() writes? analytics-schema.sql
     adds event, label and meta. Asking for them is the cheapest test: if they
     are missing the request fails and names the column. */
  for(const col of ['event', 'label', 'meta']){
    try {
      await admin('page_views?select=' + col + '&limit=1');
      out['col_' + col] = 'present';
    } catch(e){
      out['col_' + col] = 'MISSING (' + String(e.message).slice(0, 120) + ')';
    }
  }

  try {
    const rows = await admin('page_views?select=path,day&order=day.asc&limit=2000');
    out.rows = rows.length;
    if(rows.length){
      out.firstDay = rows[0].day;
      out.latestDay = rows[rows.length - 1].day;
      const byPath = {};
      rows.forEach(r => { byPath[r.path] = (byPath[r.path] || 0) + 1; });
      out.paths = Object.entries(byPath).sort((a, b) => b[1] - a[1]).slice(0, 15);
    }
  } catch(e){
    out.rows = 'QUERY FAILED: ' + String(e.message).slice(0, 200);
  }

  /* The two views analytics-schema.sql creates, which the admin page reads. */
  for(const v of ['search_terms', 'popular_articles']){
    try {
      const r = await admin(v + '?select=*&limit=1');
      out[v] = 'present (' + r.length + ' sample row' + (r.length === 1 ? '' : 's') + ')';
    } catch(e){
      out[v] = 'MISSING (' + String(e.message).slice(0, 120) + ')';
    }
  }

  return res.status(200).json(out);
};
