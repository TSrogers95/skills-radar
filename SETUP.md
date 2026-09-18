# Skills Radar — setting up the two scheduled jobs

Both jobs are optional. The site works without them; they just stop it going stale quietly.

Neither job can break the live site on its own. Job 1 only reads. Job 2 commits to your repo,
which means every change it makes appears in your commit history and can be undone with one click.

---

## What you need

| Account | Why | Cost |
|---|---|---|
| **GitHub** | You have this. Both jobs store their state in your repo | Free |
| **Resend** | Sends the alert emails | Free to 3,000 emails a month |
| **Skills England API key** | Only needed for job 2 | Free, request by form |

### Skills England API key

Go to <https://occupational-maps.skillsengland.education.gov.uk/public-api/> and complete the form.
The key is emailed to you.

**Read the licence.** Skills England require that any product built with their data carries the
Skills England logo and an attribution statement. Since Skills Radar is a paid product, this is a
condition you have to meet, not a suggestion. Plan a credit line in the footer with their logo
before you switch job 2 on.

The API is in **public beta**, so field names can change without warning. Job 2 is written to cope
with that — it checks several possible names for each field, refuses to commit if the response
looks wrong, and emails you instead.

---

## Setting it up

### 1. A GitHub token

GitHub → Settings → Developer settings → Personal access tokens → **Fine-grained tokens** →
Generate new token.

- Repository access: **Only select repositories** → your `skills-radar` repo
- Permissions → Repository permissions → **Contents: Read and write**
- Nothing else. This token can only touch this one repo.

Copy the token. You cannot see it again.

### 2. A Resend key

Sign up at <https://resend.com>, go to API Keys, create one. To send from your own domain rather
than Resend's test address, add and verify your domain in their dashboard first.

### 3. Environment variables in Vercel

Your project → Settings → Environment Variables. Add each of these:

| Name | Value |
|---|---|
| `GITHUB_OWNER` | Your GitHub username |
| `GITHUB_REPO` | `skills-radar` |
| `GITHUB_BRANCH` | `main` |
| `GITHUB_TOKEN` | The token from step 1 |
| `RESEND_API_KEY` | The key from step 2 |
| `ALERT_EMAIL` | Where alerts go |
| `ALERT_FROM` | `Skills Radar <alerts@yourdomain.co.uk>` — or leave unset to use Resend's test sender |
| `CRON_SECRET` | Any long random string. Stops anyone triggering the jobs from a browser |
| `SKILLS_ENGLAND_API_KEY` | Job 2 only. Leave unset and job 2 skips itself harmlessly |

### 4. Upload the files

Upload `vercel.json` and the `api` folder to your repo, keeping the folder structure:

```
skills-radar/
  index.html
  data.js
  ...
  vercel.json
  api/
    _lib.js
    check-sources.js
    sync-standards.js
```

Vercel picks up `api/` automatically. Commit, and the crons register on the next deploy.

---

## The schedule

| Job | Runs | Set in |
|---|---|---|
| Source check | Mondays, 7am | `vercel.json` |
| Register sync | Mondays, 6am | `vercel.json` |

The sync runs an hour before the check, so if it commits a change the check sees the new baseline
rather than reporting your own edit back to you.

**Vercel's Hobby plan allows one cron run per day**, which these fit inside. If you want daily
checks rather than weekly, change `0 7 * * 1` to `0 7 * * *`. More frequent than daily needs the
Pro plan.

---

## Testing before you trust it

Both jobs can be run by hand. With `CRON_SECRET` set you need to pass it:

```
curl -H "Authorization: Bearer YOUR_CRON_SECRET" \
  https://your-site.vercel.app/api/check-sources
```

**Run job 2 in dry-run mode first.** It reports what it would change without committing anything:

```
curl -H "Authorization: Bearer YOUR_CRON_SECRET" \
  "https://your-site.vercel.app/api/sync-standards?dry=1"
```

Read that output before you let it write. If it wants to change 200 standards, something is wrong
with the API response rather than with the register.

---

## What job 2 will and will not do

| | |
|---|---|
| **Overwrites** | Level, duration, funding band, version, status, assessment status |
| **Preserves** | The `common` flag, the `article` link, the route — anything a person decided |
| **Generates** | A plain-English `changed` line, e.g. "Funding band changed from £5,000 to £8,000" |
| **Reports but never does** | Deleting a standard. If the API stops returning one, you get told, and the site keeps it |
| **Refuses to do** | Commit if more than 60 standards changed at once, or if the API returns fewer than 200 records |

That last row matters. A beta API having a bad morning should not be able to gut your dataset while
you sleep.

---

## When something goes wrong

**Emails stop arriving.** Check the Vercel dashboard → your project → Logs, filtered to the cron
function. A failed cron is logged there.

**"Missing environment variable".** A variable name is wrong or wasn't applied to Production.
Re-check step 3 and redeploy.

**The source check reports a change every single week.** The page has something in it that changes
on every load which the normalising didn't strip. Either add a rule to `normalise()` in `_lib.js`,
or remove that source from the list.

**The sync committed something wrong.** Open your repo's commit history, find the sync commit, and
revert it. Vercel redeploys the previous version in about thirty seconds. This is the main reason
the job commits to Git rather than writing to a database.

---

## What these jobs do not do

They don't write articles, decide urgency, assign routes for new standards, or judge whether a
change matters to your readers. Job 1 tells you to look. Job 2 keeps the register numbers honest.

Everything that makes Skills Radar worth reading rather than just accurate is still yours to write.
