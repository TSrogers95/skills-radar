/* =========================================================================
   PUBLIC CONFIGURATION

   These two values are meant to be public. The anon key identifies your
   Supabase project; it does not grant access to anything. Row Level Security
   in the database is what protects member data — see schema.sql.

   The service-role key is a different thing and must NEVER appear here. It
   belongs in Vercel environment variables, used only inside the serverless
   functions in /api.

   Replace the placeholders below with the values from your Supabase project
   (Settings → API). Until you do, the site runs exactly as it does now, with
   the demo gate on the members page.
   ========================================================================= */

const SUPABASE_URL      = "YOUR-PROJECT-URL";      // https://xxxx.supabase.co
const SUPABASE_ANON_KEY = "YOUR-ANON-KEY";

/* What membership costs, shown on the sign-up page. The actual charge is
   whatever the Stripe price is set to — this is only the wording. */
const MEMBERSHIP = {
  price: "£5",
  period: "a month",
  blurb: "Cancel any time. No contract."
};
