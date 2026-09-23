/* =========================================================================
   AUTHENTICATION AND ACCOUNT DATA

   Everything that talks to Supabase lives here, so the pages stay readable
   and there is one place to look when something goes wrong.

   About the keys in config.js: the Supabase URL and the anon key are meant
   to be public. They identify your project, they do not grant access. What
   protects the data is Row Level Security in the database, which is why
   every table in schema.sql has it switched on. The service-role key is a
   different thing entirely and must never appear in a file the browser
   downloads — it lives only in Vercel environment variables.
   ========================================================================= */

let sb = null;

function supabase(){
  if(sb) return sb;
  if(typeof SUPABASE_URL === 'undefined' || !SUPABASE_URL || SUPABASE_URL.indexOf('YOUR-') === 0){
    return null;                      // not configured yet
  }
  if(typeof window.supabase === 'undefined'){
    console.error('The Supabase library did not load. Check the script tag.');
    return null;
  }
  sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  });
  return sb;
}

function accountsLive(){ return supabase() !== null; }

/* ---------- Session ---------- */

async function currentUser(){
  const c = supabase();
  if(!c) return null;
  const { data } = await c.auth.getUser();
  return data ? data.user : null;
}

async function signUp(email, password, orgName, optOut){
  const c = supabase();
  if(!c) throw new Error('Accounts are not connected yet.');

  const { data, error } = await c.auth.signUp({
    email: email,
    password: password,
    options: {
      data: { org_name: orgName || '', email_opt_out: !!optOut },
      emailRedirectTo: window.location.origin + '/account.html?verified=1'
    }
  });
  if(error) throw error;
  return data;
}

async function signIn(email, password){
  const c = supabase();
  if(!c) throw new Error('Accounts are not connected yet.');
  const { data, error } = await c.auth.signInWithPassword({ email: email, password: password });
  if(error) throw error;
  return data;
}

async function signOut(){
  const c = supabase();
  if(c) await c.auth.signOut();
}

async function requestReset(email){
  const c = supabase();
  if(!c) throw new Error('Accounts are not connected yet.');
  const { error } = await c.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + '/account.html?reset=1'
  });
  if(error) throw error;
}

async function setPassword(password){
  const c = supabase();
  if(!c) throw new Error('Accounts are not connected yet.');
  const { error } = await c.auth.updateUser({ password: password });
  if(error) throw error;
}

/* ---------- Profile ---------- */

async function getProfile(){
  const c = supabase();
  const user = await currentUser();
  if(!c || !user) return null;
  const { data, error } = await c.from('profiles').select('*').eq('id', user.id).single();
  if(error){ console.warn('profile read failed', error.message); return null; }
  return data;
}

async function saveProfile(patch){
  const c = supabase();
  const user = await currentUser();
  if(!c || !user) return null;
  patch.updated_at = new Date().toISOString();
  const { error } = await c.from('profiles').update(patch).eq('id', user.id);
  if(error) throw error;
}

/* ---------- Subscription ---------- */

async function getSubscription(){
  const c = supabase();
  const user = await currentUser();
  if(!c || !user) return null;
  const { data } = await c.from('subscriptions').select('*').eq('user_id', user.id).maybeSingle();
  return data;
}

/* Paid access means an active or trialing subscription. past_due keeps
   access for now, because Stripe retries failed payments for a while and
   locking someone out on the first failure is a good way to lose them. */
function hasAccess(sub){
  if(!sub) return false;
  return ['active', 'trialing', 'past_due'].indexOf(sub.status) > -1;
}

/* ---------- Cohort ---------- */

async function loadStandards(){
  const c = supabase();
  const user = await currentUser();
  if(!c || !user) return [];
  const { data } = await c.from('member_standards').select('*').eq('user_id', user.id).order('id');
  return (data || []).map(r => ({
    dbId: r.id,
    name: r.standard_name, code: r.standard_code,
    level: r.level, funding: r.funding, months: r.months,
    count: r.head_count,
    otj: { published: r.otj_published, rpl: r.otj_rpl, planned: r.otj_planned }
  }));
}

async function saveStandard(s){
  const c = supabase();
  const user = await currentUser();
  if(!c || !user) return null;

  const row = {
    user_id: user.id,
    standard_name: s.name, standard_code: s.code || null,
    level: s.level, funding: s.funding, months: s.months,
    head_count: s.count || 0,
    otj_published: (s.otj && s.otj.published) || null,
    otj_rpl: (s.otj && s.otj.rpl) || null,
    otj_planned: (s.otj && s.otj.planned) || null
  };

  if(s.dbId){
    const { error } = await c.from('member_standards').update(row).eq('id', s.dbId);
    if(error) throw error;
    return s.dbId;
  }
  const { data, error } = await c.from('member_standards').insert(row).select('id').single();
  if(error) throw error;
  return data.id;
}

async function deleteStandard(dbId){
  const c = supabase();
  if(!c || !dbId) return;
  await c.from('member_standards').delete().eq('id', dbId);
}

/* ---------- Events ---------- */

async function loadEvents(){
  const c = supabase();
  const user = await currentUser();
  if(!c || !user) return [];
  const { data } = await c.from('member_events').select('*').eq('user_id', user.id).order('event_date');
  return (data || []).map(r => ({ id: r.id, title: r.title, date: r.event_date, note: r.note || '', done: r.done }));
}

async function saveEvent(e){
  const c = supabase();
  const user = await currentUser();
  if(!c || !user) return null;
  if(e.id){
    await c.from('member_events').update({ title: e.title, event_date: e.date, note: e.note, done: e.done }).eq('id', e.id);
    return e.id;
  }
  const { data } = await c.from('member_events')
    .insert({ user_id: user.id, title: e.title, event_date: e.date, note: e.note, done: !!e.done })
    .select('id').single();
  return data ? data.id : null;
}

async function deleteEvent(id){
  const c = supabase();
  if(c && id) await c.from('member_events').delete().eq('id', id);
}

/* ---------- Payment ---------- */

/* Sends the member to Stripe Checkout. Card details never touch this site —
   Stripe hosts the payment page, handles 3-D Secure, and sends them back. */
async function startCheckout(){
  const c = supabase();
  const { data } = await c.auth.getSession();
  if(!data || !data.session) throw new Error('Sign in first.');

  const res = await fetch('/api/create-checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + data.session.access_token
    },
    body: JSON.stringify({ returnTo: window.location.origin + '/members.html' })
  });

  const out = await res.json();
  if(!res.ok || !out.url) throw new Error(out.error || 'Could not start checkout.');
  window.location.href = out.url;
}

/* Stripe's own portal: change card, download invoices, cancel. Building any
   of that yourself would be work for a worse result. */
async function openBilling(){
  const c = supabase();
  const { data } = await c.auth.getSession();
  if(!data || !data.session) throw new Error('Sign in first.');

  const res = await fetch('/api/billing-portal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + data.session.access_token
    },
    body: JSON.stringify({ returnTo: window.location.origin + '/members.html' })
  });

  const out = await res.json();
  if(!res.ok || !out.url) throw new Error(out.error || 'Could not open billing.');
  window.location.href = out.url;
}

/* ---------- Page views ---------- */

/* Path and day only. No identifiers, no cookies, nothing that needs a
   consent banner. */
async function recordView(){
  const c = supabase();
  if(!c) return;
  try {
    const ref = document.referrer && document.referrer.indexOf(location.host) === -1
      ? new URL(document.referrer).hostname : null;
    await c.from('page_views').insert({ path: location.pathname, referrer: ref });
  } catch(e){}
}
