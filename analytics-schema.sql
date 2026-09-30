-- =========================================================================
-- EVENT TRACKING
--
-- Run this in the Supabase SQL editor. It extends the page_views table you
-- already have so it can record what people do, not only which pages they
-- open.
--
-- No cookies, no identifiers, nothing that needs a consent banner: a path, a
-- day, an action, and a label. It cannot be tied back to a person.
-- =========================================================================

alter table page_views add column if not exists event text;
alter table page_views add column if not exists label text;
alter table page_views add column if not exists meta jsonb;

create index if not exists page_views_event on page_views (event, day desc);

-- Searches are the most useful thing you can collect: they tell you what
-- people expected to find. This view puts the common ones together.
create or replace view search_terms as
  select lower(trim(label)) as term,
         count(*) as searches,
         max(day) as last_searched
  from page_views
  where event = 'search' and label is not null and length(trim(label)) > 1
  group by lower(trim(label))
  order by count(*) desc;

-- What people actually read, rather than what they land on.
create or replace view popular_articles as
  select label as article,
         count(*) as opens,
         max(day) as last_opened
  from page_views
  where event = 'article' and label is not null
  group by label
  order by count(*) desc;

-- Where members spend their time once inside.
create or replace view member_tabs as
  select label as tab, count(*) as opens
  from page_views
  where event = 'member_tab' and label is not null
  group by label
  order by count(*) desc;

grant select on search_terms, popular_articles, member_tabs to authenticated;
