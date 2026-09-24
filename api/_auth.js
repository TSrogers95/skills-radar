/* =========================================================================
   SERVER-SIDE HELPERS FOR THE ACCOUNT FUNCTIONS

   These run on Vercel, not in the browser, which is the only place the
   secret keys are allowed to exist.
   ========================================================================= */

function env(name, required){
  const v = process.env[name];
  if(required && !v){
    const e = new Error('Missing environment variable: ' + name);
    e.missing = name;      // so the caller can tell the admin which one
    throw e;
  }
  return v;
}

/* Verify the caller's Supabase token and return the user. Every function
   that touches member data calls this first — a request is only trusted
   because Supabase confirms the token, never because of what it claims. */
async function userFromRequest(req){
  const header = req.headers['authorization'] || '';
  const token = header.replace(/^Bearer\s+/i, '');
  if(!token) return null;

  const url = env('SUPABASE_URL', true);
  const anon = env('SUPABASE_ANON_KEY', true);

  const res = await fetch(url + '/auth/v1/user', {
    headers: { 'Authorization': 'Bearer ' + token, 'apikey': anon }
  });
  if(!res.ok) return null;

  const user = await res.json();
  return user && user.id ? user : null;
}

/* Read or write with the service-role key, which bypasses row level
   security. Only used for things the browser must not be able to do —
   writing subscription status, reading every member for the admin page. */
async function admin(path, options){
  const url = env('SUPABASE_URL', true);
  const key = env('SUPABASE_SERVICE_KEY', true);

  const res = await fetch(url + '/rest/v1/' + path, {
    ...options,
    headers: {
      'apikey': key,
      'Authorization': 'Bearer ' + key,
      'Content-Type': 'application/json',
      'Prefer': (options && options.prefer) || 'return=representation',
      ...((options && options.headers) || {})
    }
  });

  const text = await res.text();
  if(!res.ok) throw new Error('Supabase ' + res.status + ': ' + text.slice(0, 300));
  return text ? JSON.parse(text) : null;
}

/* Is this user an administrator? Read from the database, never from the
   request — a caller claiming to be an admin proves nothing. */
async function isAdmin(userId){
  const rows = await admin('profiles?id=eq.' + userId + '&select=is_admin');
  return !!(rows && rows[0] && rows[0].is_admin);
}

/* Stripe's API, called with form encoding as it expects. */
async function stripe(path, params, method){
  const key = env('STRIPE_SECRET_KEY', true);

  const body = params ? new URLSearchParams(flatten(params)).toString() : undefined;
  const res = await fetch('https://api.stripe.com/v1/' + path, {
    method: method || (params ? 'POST' : 'GET'),
    headers: {
      'Authorization': 'Bearer ' + key,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body
  });

  const json = await res.json();
  if(!res.ok) throw new Error('Stripe: ' + (json.error ? json.error.message : res.status));
  return json;
}

/* Stripe wants nested values as a[b]=c */
function flatten(obj, prefix, out){
  out = out || {};
  for(const k in obj){
    const v = obj[k];
    const key = prefix ? prefix + '[' + k + ']' : k;
    if(v === undefined || v === null) continue;
    if(typeof v === 'object' && !Array.isArray(v)) flatten(v, key, out);
    else if(Array.isArray(v)) v.forEach((x, i) => {
      if(typeof x === 'object') flatten(x, key + '[' + i + ']', out);
      else out[key + '[' + i + ']'] = x;
    });
    else out[key] = String(v);
  }
  return out;
}

async function logEvent(userId, event, detail){
  try {
    await admin('account_events', {
      method: 'POST',
      prefer: 'return=minimal',
      body: JSON.stringify({ user_id: userId, event: event, detail: detail || null })
    });
  } catch(e){ console.log('audit log failed:', e.message); }
}

module.exports = { env, userFromRequest, admin, isAdmin, stripe, logEvent };
