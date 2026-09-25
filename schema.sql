-- =========================================================================
-- SKILLS RADAR — DATABASE SCHEMA
--
-- Paste the whole file into the Supabase SQL editor and run it once.
--
-- The important part is Row Level Security. Every table has it on, and every
-- policy ties rows to the signed-in user. That means the database itself
-- refuses to return another member's payroll figures — not your code
-- remembering to filter. Without it, one badly written query exposes
-- everyone at once.
-- =========================================================================


-- ---------- Profiles: one row per member ----------

create table if not exists profiles (
  id             uuid primary key references auth.users on delete cascade,
  email          text not null,
  org_name       text,
  member_type    text check (member_type in ('provider','employer','both')) default 'provider',
  levy_payer     boolean default false,
  payroll        bigint,                      -- optional, only if they choose to save it
  monthly_in     bigint,                      -- average levy contribution
  opening        bigint,                      -- account balance when last entered
  young_count    integer,
  routes         text[] default '{}',
  frequency      text check (frequency in ('weekly','monthly')) default 'monthly',
  email_opt_out  boolean default false,       -- the tick box on sign-up
  is_admin       boolean default false,
  comp_access    boolean default false,       -- free access: demos, press, your own account
  deleted_at     timestamptz,                 -- soft delete, see below
  created_at     timestamptz default now(),
  updated_at     timestamptz default now()
);

alter table profiles enable row level security;

drop policy if exists "read own profile" on profiles;
create policy "read own profile"   on profiles for select using (auth.uid() = id);

drop policy if exists "update own profile" on profiles;
create policy "update own profile" on profiles for update using (auth.uid() = id);

drop policy if exists "insert own profile" on profiles;
create policy "insert own profile" on profiles for insert with check (auth.uid() = id);


-- A profile row is created automatically when someone signs up, so the
-- application never has to remember to do it.

create or replace function handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, org_name, email_opt_out)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'org_name', ''),
    coalesce((new.raw_user_meta_data->>'email_opt_out')::boolean, false)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();


-- ---------- Cohort: which standards, how many apprentices ----------

create table if not exists member_standards (
  id             bigserial primary key,
  user_id        uuid not null references auth.users on delete cascade,
  standard_name  text not null,
  standard_code  text,
  level          integer,
  funding        integer,
  months         integer,
  head_count     integer default 0,
  otj_published  integer,                     -- the figure they read from the register
  otj_rpl        integer,
  otj_planned    integer,
  created_at     timestamptz default now()
);

alter table member_standards enable row level security;

drop policy if exists "own standards" on member_standards;
create policy "own standards" on member_standards
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index if not exists member_standards_user on member_standards (user_id);


-- ---------- Their own calendar entries ----------

create table if not exists member_events (
  id          bigserial primary key,
  user_id     uuid not null references auth.users on delete cascade,
  title       text not null,
  event_date  date not null,
  note        text,
  done        boolean default false,
  created_at  timestamptz default now()
);

alter table member_events enable row level security;

drop policy if exists "own events" on member_events;
create policy "own events" on member_events
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index if not exists member_events_user on member_events (user_id, event_date);


-- ---------- Subscriptions: written ONLY by the Stripe webhook ----------

create table if not exists subscriptions (
  user_id             uuid primary key references auth.users on delete cascade,
  stripe_customer_id  text unique,
  stripe_sub_id       text unique,
  status              text not null default 'none',   -- active, trialing, past_due, canceled, none
  price_id            text,
  current_period_end  timestamptz,
  cancel_at_period_end boolean default false,
  updated_at          timestamptz default now()
);

alter table subscriptions enable row level security;

-- Members may READ their own status. There is deliberately no insert or
-- update policy: only the service-role key, used server-side by the webhook,
-- can write here. If the browser could write to this table a member could
-- grant themselves access by editing a request.

drop policy if exists "read own subscription" on subscriptions;
create policy "read own subscription" on subscriptions
  for select using (auth.uid() = user_id);


-- ---------- Audit trail ----------

create table if not exists account_events (
  id          bigserial primary key,
  user_id     uuid references auth.users on delete set null,
  event       text not null,
  detail      jsonb,
  created_at  timestamptz default now()
);

alter table account_events enable row level security;

drop policy if exists "read own events" on account_events;
create policy "read own events" on account_events
  for select using (auth.uid() = user_id);

create index if not exists account_events_created on account_events (created_at desc);


-- ---------- Admin view ----------
-- Admins read everyone. The policy checks the caller's own profile rather
-- than trusting anything sent from the browser.

create or replace function is_admin()
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false);
$$;

drop policy if exists "admins read all profiles" on profiles;
create policy "admins read all profiles" on profiles
  for select using (is_admin());

drop policy if exists "admins read all subscriptions" on subscriptions;
create policy "admins read all subscriptions" on subscriptions
  for select using (is_admin());

drop policy if exists "admins read all events" on account_events;
create policy "admins read all events" on account_events
  for select using (is_admin());


-- ---------- Page views, for the admin traffic panel ----------
-- Anonymous inserts are allowed because visitors are not signed in. No
-- personal data is recorded: a path, a day, and a coarse referrer.

create table if not exists page_views (
  id         bigserial primary key,
  path       text not null,
  referrer   text,
  day        date not null default current_date,
  created_at timestamptz default now()
);

alter table page_views enable row level security;

drop policy if exists "anyone can record a view" on page_views;
create policy "anyone can record a view" on page_views
  for insert with check (true);

drop policy if exists "admins read views" on page_views;
create policy "admins read views" on page_views
  for select using (is_admin());

create index if not exists page_views_day on page_views (day desc);


-- ---------- Deletion ----------
-- UK GDPR gives people the right to erasure. Deleting the auth user cascades
-- through every table above, which is what "erasure" has to mean — not a flag
-- saying ignore this row.
--
-- One exception, and it is a lawful one: records of a payment must be kept for
-- HMRC for six years. Those live in Stripe, not here, and Stripe handles the
-- retention. Nothing in this database needs keeping after a deletion request.
--
-- A member can delete their own account from the members page. An admin can
-- delete anyone's. Both call the same function and both cascade.

create or replace function delete_own_account()
returns void
language plpgsql
security definer set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'Not signed in';
  end if;
  delete from auth.users where id = auth.uid();
end;
$$;

revoke all on function delete_own_account() from public;
grant execute on function delete_own_account() to authenticated;


-- ---------- Make yourself an admin ----------
-- Sign up through the site first, then run this with your own email:
--
--   update profiles set is_admin = true where email = 'you@example.com';
--
-- And to give an account free access without going through Stripe — your own
-- demo account, a journalist, a trial for a prospect:
--
--   update profiles set comp_access = true where email = 'you@example.com';
