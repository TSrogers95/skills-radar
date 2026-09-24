# Go live — the short version

You have Supabase and Stripe. This is everything still missing, in order.
Roughly 40 minutes. Nothing breaks while you do it.

---

## 1. Supabase — run the schema

Supabase → your project → **SQL Editor** → New query.

Paste the entire contents of `schema.sql`, press **Run**.

You should see "Success". This creates six tables and switches on the
security rules that stop members reading each other's data.

---

## 2. Supabase — get two values

Supabase → **Project Settings** → **API**.

Copy these two:

| On that page | Looks like |
|---|---|
| **Project URL** | `https://abcdefgh.supabase.co` |
| **anon** / `public` key | a long string starting `eyJ...` |

Open `config.js` in your repo and replace the placeholders:

```js
const SUPABASE_URL      = "https://abcdefgh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOi...";
```

**These two are meant to be public.** They identify your project, they don't
grant access. The security rules you just ran are what protect the data.

Commit. Do not skip this — nothing else works until `config.js` is real.

---

## 3. Supabase — tell it your web address

Supabase → **Authentication** → **URL Configuration**.

| Field | What to put |
|---|---|
| **Site URL** | `https://your-domain.com` (no slash at the end) |
| **Redirect URLs** | Add `https://your-domain.com/account.html?verified=1` <br> and `https://your-domain.com/account.html?reset=1` |

**If you skip this, confirmation and password reset emails will not work.**
That is the single most common thing to get wrong.

While you're there: **Authentication → Providers → Email** should be on, with
**Confirm email** enabled.

---

## 4. Stripe — create the £5 product

Stripe, **test mode** on (toggle, top right).

1. **Product catalogue** → **Add product**
   - Name: `Skills Radar Membership`
   - Price: `5.00` GBP, **Recurring**, **Monthly**
   - Save
2. On the product page, find the **price ID**. It starts `price_`.
   **Not** the product id, which starts `prod_`. You need the price one.

---

## 5. Stripe — the webhook

Stripe → **Developers** → **Webhooks** → **Add endpoint**.

| Field | Value |
|---|---|
| Endpoint URL | `https://your-domain.com/api/stripe-webhook` |
| Events | Select these five: |

- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_failed`

Save, then copy the **Signing secret**. It starts `whsec_`.

**This is the piece that grants access.** If it isn't set up, people pay and
get nothing.

---

## 6. Stripe — turn on the billing portal

Stripe → **Settings** → **Billing** → **Customer portal** → activate it, and
allow customers to cancel.

That's what the "Manage billing" button uses. Without it that button errors.

---

## 7. Vercel — seven variables

Vercel → your project → **Settings** → **Environment Variables**.

Add each one, tick **Production**.

| Name | Where you get it |
|---|---|
| `SUPABASE_URL` | Same as step 2 |
| `SUPABASE_ANON_KEY` | Same as step 2 |
| `SUPABASE_SERVICE_KEY` | Supabase → Settings → API → **service_role** key |
| `STRIPE_SECRET_KEY` | Stripe → Developers → API keys → **Secret key** (`sk_test_...`) |
| `STRIPE_PRICE_ID` | Step 4 (`price_...`) |
| `STRIPE_WEBHOOK_SECRET` | Step 5 (`whsec_...`) |
| `SITE_URL` | `https://your-domain.com` — no slash at the end |

**The service_role key is secret.** It bypasses every security rule. It goes
here and nowhere else — never in `config.js`.

Then **redeploy**. Variables only take effect on a new deployment.

---

## 8. Make yourself an admin

Go to `https://your-domain.com/account.html?join=1` and sign up properly.
Check your email, click the link.

Then Supabase → SQL Editor:

```sql
update profiles set is_admin = true where email = 'your@email.com';
```

Now `https://your-domain.com/admin.html` will let you in with that email and
password. The old `tom.rogers` / `3333` stops working the moment step 2 is done.

---

## 9. Give yourself free access

Admin page → **Members** tab → find yourself → **Grant free**.

That's your demonstration account. No card, no Stripe, full access.

---

## 10. Test a real payment path

Sign up a second account with a different email. Sign in — you should land on
the payment step.

Press **Continue to payment** and use Stripe's test card:

```
4242 4242 4242 4242    any future expiry    any 3 digits
```

You should come back with full access. Then check:

- **Stripe → Developers → Webhooks** — the event shows **200**
- **Supabase → Table editor → subscriptions** — a row with status `active`

If the webhook shows an error, that's the thing to fix. Everything else can
wait.

### Also test these two

- Card `4000 0000 0000 0341` — payment fails. They keep access while Stripe
  retries, which is deliberate.
- Cancel from the billing portal, reload the members page — you should be sent
  back to the payment step.

---

## 11. Going live for real

1. Stripe: switch **out of test mode**.
2. Create the product and price again — live mode has its own.
3. Create the webhook again — live mode has its own.
4. Swap `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID` and `STRIPE_WEBHOOK_SECRET` in
   Vercel for the live versions.
5. Redeploy.
6. Pay £5 on your own card, then refund it. It's the only way to know the live
   keys work.

---

## Getting an email address — free

You need one before you take a payment. The terms and privacy notice have to
carry a contact address, and marketing email legally needs a reply route.

**The cheapest and easiest is Cloudflare Email Routing. It costs nothing.**

It does not give you a mailbox — it forwards mail sent to your domain into an
inbox you already have. `hello@skillsradar.co.uk` lands in your normal Gmail.

1. Create a free Cloudflare account and add your domain. It will ask you to
   point your domain's nameservers at Cloudflare — your registrar has a field
   for that. This is the only fiddly part, and it takes a few minutes to
   propagate.
2. In Cloudflare, open your domain → **Email** → **Email Routing** → enable.
3. Add a route: `hello@yourdomain.com` → your personal inbox. Verify the
   destination by clicking the link it emails you.
4. Done. Mail to that address arrives in your inbox.

**To reply as that address from Gmail**, use Gmail → Settings → Accounts →
*Send mail as* → add `hello@yourdomain.com`, and when it asks for SMTP use
your own Gmail SMTP with an app password. Replies then come *from* your
domain, not your personal address.

### The alternatives

| Option | Cost | Worth it when |
|---|---|---|
| **Cloudflare Email Routing** | Free | Almost always. Start here. |
| **ImprovMX** | Free tier | Your domain is not on Cloudflare DNS |
| **Zoho Mail** | Free tier, one domain | You want a real mailbox rather than forwarding |
| **Google Workspace** | ~£6/user/month | You want it to behave exactly like Gmail, with calendar and storage |

Forwarding is enough for now. Move to a real mailbox when the volume justifies
it, not before.

### Then set it in one place

Open `config.js` and edit the `CONTACT` block near the bottom:

```js
const CONTACT = {
  org:     "Skills Radar",
  email:   "hello@yourdomain.com",
  privacy: "hello@yourdomain.com",
  address: "Your postal address"
};
```

The privacy notice, the terms and the footer all read from it. There is no
second place to remember.

A postal address is required on marketing email under PECR. A registered
company address or a virtual office is fine; your home address is not
something you have to publish, but you do need something.

---

## Before the first real payment

- Put your organisation name and a contact email into `privacy.html` and
  `terms.html` — they currently have placeholders.
- Register with the ICO and pay the annual data protection fee.
- That's it. The rest is already written.

---

## If something doesn't work

| What you see | What it is |
|---|---|
| Members page says "accounts not connected" | `config.js` still has placeholders, or you didn't commit |
| Confirmation email never arrives | Step 3 redirect URLs, or it's in spam. Supabase's own email is rate limited — add SMTP under Authentication → Email for real use |
| "Missing environment variable" | A name is mistyped, not ticked for Production, or you didn't redeploy |
| Paid but no access | The webhook. Check its log in Stripe first — it shows the exact response |
| Admin says "not an administrator" | Step 8 SQL hasn't been run, or you ran it with a different email |
