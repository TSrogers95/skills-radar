# Data sources worth adding to Skills Radar

What exists, what it would give you, and whether it is worth the work. Everything here is open
data from Skills England, DfE or DWP — no commercial licences, no scraping.

---

## Already in the site

| Source | What it gives | How it gets in |
|---|---|---|
| Skills England apprenticeship register | Every standard: level, duration, funding band, version, status | CSV download → importer |
| Annex C, off-the-job minimums | 713 published minimum hours per standard | Now in `otj-minimums.js` |
| Funding rules 2026/27 and summary of changes | Rule text, paragraph numbers, what changed | Read by hand into `data.js` |

---

## Worth adding, in order

### 1. Starts and achievement rates by standard — **built, ready to use**

**Explore Education Statistics**, published jointly by DfE and DWP.
<https://explore-education-statistics.service.gov.uk/find-statistics/apprenticeships>

Open CSV, no key, no sign-in. There is even a direct URL pattern for pulling a dataset
programmatically, which makes this automatable later:

```
https://explore-education-statistics.service.gov.uk/data-catalogue/data-set/{id}/csv
```

Two datasets matter:

- **Starts, achievements and participation by standard name.** Turns "commonly delivered" from
  my judgement into actual volume.
- **Achievement rates by individual standard.** The more valuable of the two. A provider looking
  at a standard wants to know whether people finish it, and nothing on the site currently says.
  Rates vary enormously between standards, and a low one is a delivery risk before it is
  anything else.

There is a fourth tab on the import page for this now. It handles the shape these files come in —
one row per age band, level and region, so the same standard appears many times — by summing
volumes and averaging published rates, and excluding the total rows.

**Also in the same release:** achievement rates by provider, which would let a member benchmark
themselves against the sector on the standards they deliver. That needs their UKPRN, which is a
small thing to ask for and a genuinely sticky feature.

### 2. APAR — the provider and assessment register

<https://download.apprenticeships.education.gov.uk/apar>

Direct CSV, updated regularly. Every organisation eligible to deliver apprenticeship training:
UKPRN, legal name, application route, status, and whether they can deliver apprenticeship units.

Worth having because the status field tells you when a provider is **not currently permitted to
recruit new apprentices**. For an employer choosing a provider, or a provider checking a
subcontractor, that is the single most useful fact in the file — and it connects directly to the
subcontracting rules, where a de-minimis subcontractor must have a UKPRN.

Note that EPAOs were separated out of APAR in December 2024 and now sit in the **Find an
end-point assessment organisation** service instead. That is the list that would let us say which
standards genuinely have nobody appointed, rather than inferring it.

### 3. Monthly apprenticeship starts

Also on Explore Education Statistics, updated monthly rather than termly. Useful as an early
signal: a standard's starts falling off a cliff usually precedes a review or a defunding, so it
would make the horizon section predictive rather than reactive.

### 4. Occupational maps API

<https://occupational-maps.skillsengland.education.gov.uk/public-api/>

Needs a key by application and is in public beta. The sync job is already written against it.
Worth doing once the CSV import has proved itself — it removes the manual download step, but the
CSV gets you the same data today.

**Licence condition:** anything built with Skills England data must carry their logo and an
attribution statement. That applies to the register data already in the site, not only the API.

---

## Looked at and left

| Source | Why not |
|---|---|
| Apprenticeships by industry characteristics | Employer size and sector breakdowns. Interesting, but two million rows for an insight most members could not act on |
| Deprivation and learner characteristics data | Valuable for policy analysis, not for someone deciding what to deliver next year |
| Geographical starts by constituency | Nice for a map. Does not change anyone's decision |
| National Achievement Rate Tables | Largely superseded by the achievement rate datasets above |

---

## One thing worth knowing about all of it

Statistics releases run a long way behind. The current release covers August 2025 to April 2026,
published July 2026, with the full year due in November. So achievement rates are a picture of
what finished two years ago, on versions of standards that may since have changed.

That does not make them useless — it makes them history rather than news. Label them as the
academic year they cover wherever they appear, and never let them sit next to a live figure
without a date on them.
