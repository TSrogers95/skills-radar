/* =========================================================================
   PUBLIC CONFIGURATION

   These two values are meant to be public. The anon key identifies your
   Supabase project; it does not grant access to anything. Row Level Security
   in the database is what protects member data, see schema.sql.

   The service-role key is a different thing and must NEVER appear here. It
   belongs in Vercel environment variables, used only inside the serverless
   functions in /api.

   Replace the placeholders below with the values from your Supabase project
   (Settings → API). Until you do, the site runs exactly as it does now, with
   the demo gate on the members page.
   ========================================================================= */

const SUPABASE_URL      = "https://tjbsnbwrppmywxnwvsrv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqYnNuYndycHBteXd4bnd2c3J2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAxOTI3OTgsImV4cCI6MjEwNTc2ODc5OH0.eQpyKHs81xy43Zh4fsWYQeY2GzjSACdTCTwXWb56FsM";

/* What membership costs, shown on the sign-up page. The actual charge is
   whatever the Stripe price is set to, this is only the wording. */
const MEMBERSHIP = {
  price: "£5",
  period: "a month",
  blurb: "Cancel any time. No contract."
};


/* =========================================================================
   CONTACT DETAILS

   Used in the privacy notice, the terms and the footer. Change them here and
   they change everywhere, there is no second place to remember.

   You need a real address before you take a payment. Cloudflare Email
   Routing forwards mail on your own domain to an inbox you already have,
   for nothing. See GO-LIVE.md.
   ========================================================================= */

const CONTACT = {
  org:     "Skills Radar",
  site:    "https://skills-radar.co.uk",
  email:   "hello@skills-radar.co.uk",     // general enquiries and data requests
  privacy: "hello@skills-radar.co.uk",     // can be the same address
  address: ""                               // PECR requires a postal address on marketing email
};


/* =========================================================================
   THE DEMO VIDEO

   Used by demo.html, which is not linked from the site and is excluded from
   search engines, and also shown on the join page (account.html) and the
   members dashboard. Share the demo address with whoever you want to show it to.

   Set ONE of these.

   youtube  the id from a YouTube URL, the part after v=. Upload as
            Unlisted, not Private: unlisted plays for anyone with the link,
            private does not. This is the one to use. It streams, adapts
            quality on a phone, and costs you no bandwidth.

   vimeo    the numeric id, if you would rather use Vimeo.

   file     the filename of an mp4 committed to your repo. Works, but the
            whole file is sent to every viewer. members-tour.mp4 is under
            10MB, roughly 10,000 plays on Vercel's monthly free allowance.
            The join page and the dashboard only fetch it when someone
            presses play.
   ========================================================================= */

const DEMO = {
  youtube: "",          // the previous walkthrough was "FNC6twEtAr8"
  vimeo:   "",
  file:    "members-tour.mp4",
  poster:  "members-tour.jpg"   // optional still image shown before play
};


/* =========================================================================
   TRIAL AND THE FREE TIER

   The shape: everyone can read the public feed without an account. Signing
   up starts a trial of the full members area. When that ends the account
   drops to the free tier rather than being closed, keeping a small feed and
   the digest, with the paid tools locked but visible.

   These are the two numbers worth revising once real behaviour tells you
   something, which is why they are here rather than buried in the code.

   trialDays     Length of the trial. Fourteen gives two weekly sync cycles,
                 so something almost certainly moves on standards the member
                 actually delivers. Seven often passes with nothing
                 happening, which sells nothing.

   cardUpFront   true  the card is taken at sign-up and billing starts
                       automatically when the trial ends. Higher conversion
                       from those who finish, lower sign-up rate.
                 false no card until they choose to pay. More people get in,
                       fewer convert, and you learn more from the drop-off.

   freeStandards How many standards a lapsed account keeps. Their whole
                 cohort stays stored either way; this is how many stay live.
   ========================================================================= */

const TRIAL = {
  trialDays:     14,
  cardUpFront:   true,
  freeStandards: 1,
  nudgeFromDay:  10      // when the "trial ending" prompt starts appearing
};
