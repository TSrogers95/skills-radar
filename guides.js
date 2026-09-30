/* =========================================================================
   GUIDES

   The search-intent cluster. One pillar page and eleven supporting pages,
   each written for a phrase people actually type, and each answering it
   properly rather than circling it.

   Why these are separate from ARTICLES: an article is news, dated, and drops
   out of the feed. A guide is a standing answer that should still be right
   in a year, and should rank. They are built into /guides/ with their own
   schema, breadcrumbs and internal links.

   Structure of each:
     slug        the URL. Keep it keyword-led and stable, because changing it
                 throws away whatever ranking it has earned.
     title       what appears in a search result. Under 60 characters where
                 possible, with the year where the year matters.
     h1          the on-page headline. Can be longer and more human.
     description the search snippet. 140 to 158 characters, written as a
                 reason to click rather than a summary.
     intent      who is searching and what they want. Written down because it
                 is the thing that gets forgotten when a page is edited.
     updated     shown on the page and in the schema.
     body        sections, each a heading and paragraphs. Written to answer
                 the question in the first hundred words, because that is
                 what gets read and what gets pulled into a featured snippet.
     faq         real questions, answered in two or three sentences. These
                 generate FAQPage schema, which is what produces the expanded
                 results in Google.
     related     slugs of other guides. Internal linking is most of what makes
                 a cluster work.
   ========================================================================= */

const GUIDES_UPDATED = "2026-09-26";

const GUIDES = [

/* ---------- THE PILLAR ---------- */
{
  slug: "apprenticeship-funding-rules",
  pillar: true,
  title: "Apprenticeship Funding Rules 2026/27: A Complete Guide",
  h1: "Apprenticeship funding rules 2026 to 2027",
  description: "What changed in the 2026/27 apprenticeship funding rules, what it means for employers and training providers, and where each requirement sits in the guidance.",
  intent: "Someone looking for the current rules, usually because something has changed or they have been asked to confirm compliance. They want the substance, not a link to a PDF.",
  updated: "2026-09-26",
  reading: 9,
  body: [
    { h: "What the 2026/27 rules are",
      p: [
        "The apprenticeship funding rules set out what government will and will not pay for, who is eligible, what evidence has to exist, and what happens when it does not. They apply to every apprenticeship starting between 1 August 2026 and 31 July 2027, and they are the document an audit is conducted against.",
        "Three things make this year unusual. Responsibility for apprenticeships moved from the Department for Education to the Department for Work and Pensions in April 2026. The Apprenticeship Levy became the Growth and Skills Levy, which changed how long funds last. And sixteen standards lost funding from September 2026.",
        "An apprentice is funded under the rules in force on the day they start. A start on 31 July sits under last year's rules for its whole duration; a start on 1 August sits under this year's. That single fact causes more confusion than anything else in the document."
      ] },
    { h: "What changed this year",
      p: [
        "Levy funds now expire twelve months after they enter the account, rather than twenty-four. The ten per cent government top-up has gone. Together these mean an employer who used to have two years to plan now has one, and unspent money is lost rather than accumulated.",
        "Co-investment was removed for apprentices aged 16 to 24 at employers who do not pay the levy. Those apprenticeships are now fully funded. For everyone else the co-investment rate is five per cent.",
        "Level 7 apprenticeships are no longer funded for new starters aged 22 and over. Apprenticeship units, which are short modular blocks, and foundation apprenticeships of around eight months became fundable in April 2026."
      ] },
    { h: "Who the rules apply to",
      p: [
        "Employers are responsible for the apprenticeship agreement, the contract of employment, the wage, and giving the apprentice the time to train. Providers are responsible for eligibility checks, the training plan, delivery, evidence and the funding claim.",
        "In practice the provider carries most of the audit risk, because the provider makes the claim. But an employer whose records do not support that claim will find the money clawed back from the provider and the relationship ended, so the interest is shared."
      ] },
    { h: "The parts that most often go wrong",
      p: [
        "Eligibility evidence that was never collected, or collected after the start date. Off-the-job training recorded as a total rather than against the published minimum for that standard. Prior learning not assessed, or assessed but not reflected in the price. Training plans that do not match what was delivered. Subcontracting arrangements that were never declared.",
        "None of these are exotic. They are ordinary administrative gaps that become funding gaps at audit, and they are almost always cheaper to prevent than to argue about afterwards."
      ] }
  ],
  faq: [
    { q: "Which funding rules apply to my apprentice?",
      a: "The rules in force on the day they started. An apprentice who started in July 2026 stays on the 2025/26 rules for their whole programme, even though the 2026/27 rules are now current." },
    { q: "When were the 2026/27 apprenticeship funding rules published?",
      a: "The 2026/27 rules apply from 1 August 2026. They are revised in-year, so check the version number on the GOV.UK page rather than relying on a copy downloaded earlier." },
    { q: "Do the rules apply to existing apprentices?",
      a: "No. Existing apprentices continue under the rules they started on. New rules only affect new starts, which is why start dates matter so much." },
    { q: "What happens if we breach the funding rules?",
      a: "Funding is recovered for the affected apprentices, usually at audit. Repeated or systemic breaches can affect a provider's contract and Ofsted position." }
  ],
  related: ["apprenticeship-funding-compliance", "apprenticeship-funding-eligibility",
            "apprenticeship-funding-audit", "apprenticeship-levy-funding-rules"]
},

/* ---------- COMPLIANCE ---------- */
{
  slug: "apprenticeship-funding-compliance",
  title: "Apprenticeship Funding Compliance: 2026/27 Requirements",
  h1: "Apprenticeship funding compliance",
  description: "What funding compliance actually requires in 2026/27, where providers and employers most often fall short, and how to check your position before an auditor does.",
  intent: "Usually a provider, often after an audit has been announced or a colleague has raised a concern. They want to know what good looks like and where they are exposed.",
  updated: "2026-09-26",
  reading: 7,
  body: [
    { h: "What compliance means here",
      p: [
        "Funding compliance means that for every apprentice you claim for, the evidence exists, it was collected at the right time, and it says what you say it says. It is not a judgement about training quality. An excellent programme with missing paperwork is non-compliant, and an auditor will treat it as such.",
        "The test applied is straightforward: could someone who was not there reconstruct, from your records alone, that this apprentice was eligible, that the training happened, and that the price was right?"
      ] },
    { h: "The six areas that carry most of the risk",
      p: [
        "Eligibility, meaning residency, age, employment status and prior qualifications, evidenced before the start date rather than after it. Off-the-job training, recorded against the published minimum for the specific standard. Prior learning, assessed for every apprentice and reflected in a reduced price where it applies.",
        "Then the training plan, which must match what was actually delivered and be signed by all three parties. Subcontracting, which must be declared and managed. And the funding claim itself, which must reconcile to the individualised learner record."
      ] },
    { h: "Doing a check yourself",
      p: [
        "Take ten apprentices at random across different standards and start dates. For each, try to produce the eligibility evidence, the signed training plan, the off-the-job record against the published minimum, and the prior learning assessment. Time how long it takes.",
        "If you cannot find all four for eight of the ten within an hour, you have a compliance problem rather than a filing problem, and it is better to know now."
      ] }
  ],
  faq: [
    { q: "Who is responsible for funding compliance?",
      a: "The provider makes the claim and carries the liability, but the employer holds much of the underlying evidence, particularly around employment and the apprentice's time to train. Both need to be able to produce it." },
    { q: "How far back can funding be recovered?",
      a: "Auditors typically sample the current and preceding funding years, but a systemic issue can prompt a wider review going back further." },
    { q: "Does poor compliance affect Ofsted?",
      a: "Indirectly. Ofsted does not audit funding, but weak record keeping around off-the-job training and training plans tends to show up in the quality of education judgement as well." }
  ],
  related: ["apprenticeship-funding-compliance-checklist", "apprenticeship-funding-audit",
            "apprenticeship-funding-evidence-requirements", "apprenticeship-funding-rules"]
},

{
  slug: "apprenticeship-funding-compliance-checklist",
  title: "Apprenticeship Funding Compliance Checklist 2026/27",
  h1: "Apprenticeship funding compliance checklist",
  description: "A practical checklist covering eligibility, evidence, off-the-job training, prior learning and the funding claim, with what an auditor looks for at each point.",
  intent: "Someone who wants to work through their position methodically, often preparing for an audit or taking over a compliance role.",
  updated: "2026-09-26",
  reading: 8,
  body: [
    { h: "Before the apprentice starts",
      p: [
        "Right to work and residency evidence on file, dated before the start. Age confirmed, which now matters more because funding differs for 16 to 24 year olds at non-levy employers and Level 7 is closed to new starters aged 22 and over. Prior learning assessed and documented, with the price reduced where it applies.",
        "Initial assessment completed, including English and maths. A contract of employment covering at least the minimum duration. An apprenticeship agreement signed. The standard confirmed as still funded on the intended start date, which is not a formality in a year when sixteen have been withdrawn."
      ] },
    { h: "At the start",
      p: [
        "A training plan signed by apprentice, employer and provider, setting out what will be delivered, when, and how off-the-job hours will be met. The planned off-the-job hours must be at or above the published minimum for that specific standard, less any recognised prior learning, and never below 187 hours.",
        "The price agreed and recorded, within the funding band. The reservation made where the employer does not pay the levy."
      ] },
    { h: "During delivery",
      p: [
        "Off-the-job training recorded as it happens, with enough detail to show what was delivered and that it was within working hours. Progress reviews at least every twelve weeks with all three parties. Any break in learning recorded properly rather than left as a gap.",
        "Changes to the employer, the standard version or the price documented at the time, not reconstructed later."
      ] },
    { h: "At the end",
      p: [
        "Gateway evidence showing the apprentice met the requirements. English and maths where required. The end-point assessment organisation engaged and the assessment completed. The final claim reconciling to what was delivered."
      ] }
  ],
  faq: [
    { q: "How often should we run this check?",
      a: "Monthly on new starts, when the evidence is easiest to fix, and a full sample quarterly. Annually is too late to correct anything." },
    { q: "What is the single most common failure?",
      a: "Off-the-job training recorded as a running total rather than against the published minimum for that standard. It looks compliant until someone checks the figure for that particular standard." }
  ],
  related: ["apprenticeship-funding-audit-checklist", "apprenticeship-funding-evidence-requirements",
            "apprenticeship-funding-off-the-job-training", "apprenticeship-funding-compliance"]
},

/* ---------- AUDIT ---------- */
{
  slug: "apprenticeship-funding-audit",
  title: "Apprenticeship Funding Audit: What to Expect in 2026/27",
  h1: "Apprenticeship funding audit",
  description: "How a funding audit works, what auditors sample and ask for, what triggers a review, and what happens when evidence cannot be produced.",
  intent: "A provider who has been notified of an audit, or who wants to understand the exposure before one happens.",
  updated: "2026-09-26",
  reading: 7,
  body: [
    { h: "What an audit is testing",
      p: [
        "An audit tests whether the money claimed was properly claimed. It works from your funding claim backwards: a sample of apprentices is selected, and for each one the auditor asks to see the evidence that supports every element of the claim.",
        "It is a documentary exercise. What you remember, what you intended and what actually happened are not the point. What is on file on the day is the point."
      ] },
    { h: "What gets sampled",
      p: [
        "Typically a cross-section: different standards, different start dates, different employers, and anything that looks unusual in the data. High-value apprenticeships, apprentices with recorded breaks, prior learning reductions and subcontracted delivery all attract attention because that is where errors concentrate.",
        "A failure in the sample tends to widen the sample rather than end the exercise."
      ] },
    { h: "What triggers a closer look",
      p: [
        "Rapid growth in starts. A high proportion of apprentices on a single standard. Off-the-job hours that cluster suspiciously near the minimum. Prices consistently at the top of the band. Subcontracting above the reportable threshold. Data that does not reconcile between your records and the individualised learner record."
      ] },
    { h: "What happens when evidence is missing",
      p: [
        "Funding is recovered for the affected apprentices. If the failure looks systemic rather than isolated, recovery can be extrapolated across the population, which is how a handful of missing files becomes a six-figure clawback.",
        "The practical defence is not argument at the time. It is having collected the evidence at the point it existed."
      ] }
  ],
  faq: [
    { q: "How much notice do you get of a funding audit?",
      a: "Usually several weeks, with a request for a data return first. That period is for producing evidence you already have, not for creating it." },
    { q: "Can findings be appealed?",
      a: "Findings can be challenged where you can produce evidence that was overlooked, or show the interpretation was wrong. Challenging on the basis that the training genuinely happened, without records, rarely succeeds." },
    { q: "What is extrapolation?",
      a: "Applying an error rate found in a sample across the whole population. It is why a small sample failure can produce a large recovery figure." }
  ],
  related: ["apprenticeship-funding-audit-checklist", "apprenticeship-funding-clawback",
            "apprenticeship-funding-evidence-requirements", "apprenticeship-funding-compliance"]
},

{
  slug: "apprenticeship-funding-audit-checklist",
  title: "Apprenticeship Funding Audit Checklist and Preparation",
  h1: "Preparing for an apprenticeship funding audit",
  description: "What to gather before a funding audit, how to sample your own files first, and the gaps worth closing while there is still time to close them.",
  intent: "A provider with an audit scheduled. Practical, sequenced, and honest about what can and cannot be fixed at this stage.",
  updated: "2026-09-26",
  reading: 6,
  body: [
    { h: "Audit your own sample first",
      p: [
        "Before the auditor picks a sample, pick one yourself, and pick it the way they will: spread across standards, start dates and employers, weighted towards anything unusual. Twenty files is enough to know where you stand.",
        "For each, assemble the eligibility evidence, the signed training plan, the off-the-job record, the prior learning assessment, the progress reviews and the price agreement. Note what is missing and how long each took to find."
      ] },
    { h: "What can still be fixed",
      p: [
        "Evidence that exists but is disorganised can be assembled. Records held by the employer rather than you can be requested. Data that does not reconcile can be corrected and explained.",
        "What cannot be fixed is evidence that was never created. Backdating a training plan is worse than not having one, and auditors are practised at spotting it. If something is missing, the better position is to identify it yourself and say so."
      ] },
    { h: "On the day",
      p: [
        "Have one person responsible for producing files and one point of contact. Answer what is asked rather than volunteering context. Where a document does not exist, say so plainly rather than promising to find it later.",
        "Keep a record of everything provided and every question asked, because you will need it when the draft findings arrive."
      ] }
  ],
  faq: [
    { q: "How long does a funding audit take?",
      a: "A few days on site or remotely, then several weeks to draft findings. The period between the notification and the visit is where the work is." },
    { q: "Should we bring in external support?",
      a: "It depends on whether your own sample turns up isolated gaps or a pattern. A pattern is worth external eyes before the auditor arrives rather than after." }
  ],
  related: ["apprenticeship-funding-audit", "apprenticeship-funding-compliance-checklist",
            "apprenticeship-funding-evidence-requirements"]
},

/* ---------- EVIDENCE ---------- */
{
  slug: "apprenticeship-funding-evidence-requirements",
  title: "Apprenticeship Funding Evidence Requirements 2026/27",
  h1: "Apprenticeship funding evidence requirements",
  description: "The evidence that must exist for every apprentice, when it has to be collected, what auditors accept, and the records that get rejected at audit.",
  intent: "Someone building or checking a compliance file. Wants the list, and wants to know what is and is not acceptable.",
  updated: "2026-09-26",
  reading: 7,
  body: [
    { h: "The principle",
      p: [
        "Evidence must exist, be dated, and have been created at the point the thing it evidences happened. Evidence assembled afterwards to support a claim already made is the single fastest route to a finding.",
        "It must also be capable of being understood by someone outside your organisation. An internal code that means something to your team and nothing to an auditor is not evidence."
      ] },
    { h: "Eligibility",
      p: [
        "Right to work and residency, evidenced before the start date. Date of birth. Employment status and contracted hours. Prior qualifications, checked against the personal learning record where available, with the assessment of prior learning documented and its effect on the price recorded.",
        "Where the employer does not pay the levy, the reservation. Where the apprentice is a care leaver or has an education, health and care plan, the evidence supporting any additional payment."
      ] },
    { h: "Training and delivery",
      p: [
        "A signed training plan. Off-the-job training records showing what was delivered, when, and that it fell within paid working hours. Progress reviews with all three parties at least every twelve weeks. Any break in learning, recorded at the time with its start and end.",
        "Records of any change: employer, standard version, price, planned end date."
      ] },
    { h: "What gets rejected",
      p: [
        "Timesheets with no description of what the training was. Off-the-job logged in round numbers that do not vary. Training plans signed by the provider only. Prior learning assessments that conclude no reduction for every apprentice without explaining why. Progress reviews recorded on the same day for an entire cohort."
      ] }
  ],
  faq: [
    { q: "Is an electronic signature acceptable on a training plan?",
      a: "Yes, provided it identifies the signatory and the date. What matters is that all three parties signed and that the date is before delivery started." },
    { q: "How long must evidence be kept?",
      a: "At least until the end of the funding year in which the apprenticeship ends, plus the retention period in your funding agreement. In practice, six years is the safe assumption." },
    { q: "Does the employer need to hold copies?",
      a: "The employer should hold the apprenticeship agreement, the contract of employment and evidence that the apprentice had time to train. The provider needs access to all of it." }
  ],
  related: ["apprenticeship-funding-compliance-checklist", "apprenticeship-funding-audit",
            "apprenticeship-funding-eligibility", "apprenticeship-funding-off-the-job-training"]
},

/* ---------- ELIGIBILITY ---------- */
{
  slug: "apprenticeship-funding-eligibility",
  title: "Apprenticeship Funding Eligibility Rules 2026/27",
  h1: "Apprenticeship funding eligibility",
  description: "Who can be funded for an apprenticeship in 2026/27: residency, age, employment, prior qualifications, and the changes that closed routes this year.",
  intent: "Checking whether a specific person can be funded, usually before committing to a start.",
  updated: "2026-09-26",
  reading: 7,
  body: [
    { h: "The four tests",
      p: [
        "An apprentice must have the right to work in England and meet the residency requirement. They must be employed, with a contract covering at least the minimum duration of the apprenticeship. They must have the time to train within paid working hours. And the apprenticeship must teach substantive new skills rather than accredit what they already do.",
        "All four have to hold. The fourth is the one most often assumed rather than assessed, and it is where prior learning assessment does its work."
      ] },
    { h: "Age",
      p: [
        "There is no upper age limit for apprenticeships in general, but age now changes the funding in two specific ways. Apprentices aged 16 to 24 at employers who do not pay the levy are fully funded, with no co-investment. And Level 7 apprenticeships are closed to new starters aged 22 and over.",
        "Age is taken at the start date, so an apprentice who turns 22 between signing and starting can move out of eligibility."
      ] },
    { h: "Prior qualifications",
      p: [
        "A person can be funded for an apprenticeship at the same or a lower level than a qualification they already hold, provided the apprenticeship teaches substantively different skills. What is not permitted is funding someone to be taught what they can already demonstrably do.",
        "This must be assessed individually and documented. A blanket statement that no prior learning applies across a whole cohort is a finding waiting to happen."
      ] },
    { h: "What closed this year",
      p: [
        "Sixteen standards lost funding from September 2026, including Team Leader Level 3, Operations Manager Level 5 and Coaching Professional Level 5. Apprentices already started are unaffected; no new starts are permitted.",
        "Level 7 closed to new starters aged 22 and over from January 2026."
      ] }
  ],
  faq: [
    { q: "Can someone with a degree do a Level 3 apprenticeship?",
      a: "Yes, provided the apprenticeship teaches substantively new skills in a different occupation. The assessment must be documented for that individual." },
    { q: "Does an apprentice have to be a new employee?",
      a: "No. Existing staff can be apprentices, which is common. The same eligibility tests apply, and the prior learning assessment matters more." },
    { q: "What are the residency requirements?",
      a: "The apprentice must have been ordinarily resident in the UK, EEA or certain other territories for at least three years before the start, subject to exceptions for some visa categories and for refugees." }
  ],
  related: ["apprenticeship-funding-evidence-requirements", "apprenticeship-funding-rules",
            "apprenticeship-funding-rules-for-employers", "apprenticeship-funding-compliance-checklist"]
},

/* ---------- AUDIENCE PAGES ---------- */
{
  slug: "apprenticeship-funding-rules-for-employers",
  title: "Apprenticeship Funding Rules for Employers 2026/27",
  h1: "Apprenticeship funding rules for employers",
  description: "What the 2026/27 rules require of employers: the agreement, time to train, wages, evidence you must hold, and what changed with the Growth and Skills Levy.",
  intent: "An employer, often in HR or early careers, who has been told about a rule change or is starting a programme.",
  updated: "2026-09-26",
  reading: 6,
  body: [
    { h: "Your responsibilities",
      p: [
        "Employ the apprentice on a contract covering at least the minimum duration. Pay at least the apprentice minimum wage, and the appropriate national minimum wage once they pass the relevant thresholds. Sign an apprenticeship agreement and a training plan. Give the apprentice the time to train within paid working hours and protect it.",
        "That last one is where employers most often fall short, and it is not a technicality. Off-the-job training that did not happen cannot be evidenced, and funding follows the evidence."
      ] },
    { h: "What changed for you this year",
      p: [
        "If you pay the levy, funds now expire after twelve months rather than twenty-four, and the ten per cent top-up has gone. Money not spent is lost. If you do not pay the levy, apprentices aged 16 to 24 are now fully funded with no co-investment.",
        "A hiring payment of £2,000 is available for smaller employers taking on apprentices aged 16 to 24 from October 2026."
      ] },
    { h: "What you need to hold",
      p: [
        "The apprenticeship agreement, the contract of employment, and evidence that the apprentice had and used their training time. Your provider will need access to all of it, and an auditor may ask you directly."
      ] }
  ],
  faq: [
    { q: "How many hours a week must an apprentice spend training?",
      a: "There is no weekly figure any more. Each standard has a published minimum number of off-the-job hours for the whole apprenticeship, and the planned delivery must meet it." },
    { q: "Can we use the levy to pay apprentice wages?",
      a: "No. Levy funds pay for training and assessment only. Wages, travel and equipment are the employer's cost." },
    { q: "What happens to unspent levy funds?",
      a: "They expire twelve months after entering the account and cannot be recovered. Unspent is lost rather than banked." }
  ],
  related: ["apprenticeship-levy-funding-rules", "apprenticeship-funding-eligibility",
            "apprenticeship-funding-off-the-job-training", "apprenticeship-funding-rules"]
},

{
  slug: "apprenticeship-funding-rules-for-training-providers",
  title: "Apprenticeship Funding Rules for Training Providers 2026/27",
  h1: "Apprenticeship funding rules for training providers",
  description: "What providers must do under the 2026/27 rules: eligibility checks, training plans, off-the-job records, subcontracting, and the claim itself.",
  intent: "A provider, often in a quality or compliance role, checking their obligations or briefing a team.",
  updated: "2026-09-26",
  reading: 7,
  body: [
    { h: "Where your liability sits",
      p: [
        "You make the funding claim, so you carry the liability for it. That includes evidence the employer holds: if they cannot produce it, the recovery still comes from you. Build your processes on that assumption rather than on trust.",
        "Every apprentice needs eligibility established and evidenced before the start, a signed training plan, off-the-job delivery recorded against the published minimum for their standard, prior learning assessed individually, and progress reviews at least every twelve weeks."
      ] },
    { h: "Pricing",
      p: [
        "The price must reflect what is actually delivered, within the funding band, reduced for recognised prior learning. Pricing every apprentice at the band maximum regardless of prior learning is a pattern auditors look for specifically."
      ] },
    { h: "Subcontracting",
      p: [
        "Subcontracted delivery must be declared, managed and evidenced. The rules limit what can be subcontracted and require you to demonstrate oversight of quality and of the funding flowing through. Undeclared subcontracting is treated seriously."
      ] },
    { h: "Data",
      p: [
        "Your records and the individualised learner record have to reconcile. Where they do not, the difference is the first thing an auditor pulls at, and it is usually a symptom rather than a clerical slip."
      ] }
  ],
  faq: [
    { q: "What proportion of delivery can be subcontracted?",
      a: "There are limits and reporting thresholds set out in the rules, and exceeding them requires justification and oversight evidence. Check the current version, since this has tightened in recent years." },
    { q: "Can we claim for an apprentice who leaves early?",
      a: "You can claim for the training actually delivered up to the withdrawal, provided the withdrawal is recorded correctly and on time." }
  ],
  related: ["apprenticeship-funding-rules-subcontracting", "apprenticeship-funding-audit",
            "apprenticeship-funding-evidence-requirements", "apprenticeship-funding-compliance"]
},

/* ---------- SPECIFIC REQUIREMENTS ---------- */
{
  slug: "apprenticeship-funding-off-the-job-training",
  title: "Off-the-Job Training Rules and Minimum Hours 2026/27",
  h1: "Off-the-job training: the funding rules",
  description: "How off-the-job training works since the 2025 change to published minimum hours per standard, what counts, what does not, and the 187-hour floor.",
  intent: "Someone calculating or checking off-the-job hours, often having realised the six-hours-a-week rule no longer applies.",
  updated: "2026-09-26",
  reading: 7,
  body: [
    { h: "The rule changed and many have missed it",
      p: [
        "For apprentices starting on or after 1 August 2025, off-the-job training is no longer six hours a week. Each standard has its own published minimum number of hours for the whole apprenticeship, and you cannot calculate it from the duration.",
        "The range is wide. Business Administrator is 348 hours. Engineering Technician is 974. A provider still applying six hours a week is not slightly out on some standards; they are hundreds of hours short, on every apprentice in the cohort."
      ] },
    { h: "The floor",
      p: [
        "Recognised prior learning reduces the requirement, but never below 187 hours. A programme planned below that figure is non-compliant regardless of how much prior learning the apprentice brings."
      ] },
    { h: "What counts",
      p: [
        "Training that teaches new knowledge, skills or behaviours related to the apprenticeship, delivered within paid working hours. Teaching, practical training, shadowing structured for learning, mentoring, industry visits, and time spent writing assignments all count.",
        "What does not count: English and maths up to Level 2, training outside paid hours, progress reviews, on-programme assessment, and ordinary work that happens to be useful."
      ] },
    { h: "Recording it",
      p: [
        "Record it as it happens, against the published minimum for that specific standard, with enough description that someone else can see what was taught. Running totals with no detail are the most common finding in this area."
      ] }
  ],
  faq: [
    { q: "Is off-the-job training still 20 per cent?",
      a: "No. The 20 per cent rule was replaced by six hours a week, which was itself replaced by published minimum hours per standard for starts from August 2025." },
    { q: "Can off-the-job training happen outside working hours?",
      a: "It only counts towards the minimum if it is within paid working hours. Training in the apprentice's own time can happen but cannot be claimed." },
    { q: "What is the minimum number of off-the-job hours?",
      a: "It depends on the standard, and each has a published figure. No apprenticeship can go below 187 hours whatever prior learning applies." }
  ],
  related: ["apprenticeship-funding-evidence-requirements", "apprenticeship-funding-compliance-checklist",
            "apprenticeship-funding-rules-for-employers", "apprenticeship-funding-rules"]
},

{
  slug: "apprenticeship-funding-rules-subcontracting",
  title: "Apprenticeship Funding Rules: Subcontracting 2026/27",
  h1: "Subcontracting under the apprenticeship funding rules",
  description: "What the rules require when delivery is subcontracted: declaration, oversight, funding flow, and why undeclared arrangements are treated so seriously.",
  intent: "A provider with subcontracted delivery, checking whether their arrangements stand up.",
  updated: "2026-09-26",
  reading: 5,
  body: [
    { h: "The principle",
      p: [
        "You can subcontract delivery, but you cannot subcontract responsibility. The funding is yours, the claim is yours, and the liability for both remains yours whatever the arrangement says.",
        "That means you must be able to evidence oversight: that you know what is being delivered, that it meets the standard, and that the funding reaching the subcontractor is proportionate to what they do."
      ] },
    { h: "What must be declared",
      p: [
        "Subcontracting arrangements must be declared, and above the reporting threshold they must be published. The rules also restrict what can be subcontracted and to whom, and expect a rationale that is about quality or reach rather than convenience."
      ] },
    { h: "Where it goes wrong",
      p: [
        "Arrangements that were never declared. Management fees that cannot be justified against the oversight actually provided. Subcontractors holding the only copies of evidence. Delivery that the lead provider cannot describe in any detail.",
        "Undeclared subcontracting is one of the few compliance failures that reliably escalates beyond funding recovery."
      ] },
    { h: "Evidencing oversight",
      p: [
        "Oversight has to be visible in records, not just described in a contract. That means observations of subcontracted delivery, samples of learner files held by the subcontractor, records of the quality conversations you have had, and evidence that issues raised were followed through.",
        "Auditors also look at whether the fee you retain is proportionate to that work. A management fee at the top of the range with no record of any management is a finding in itself, and it is one that tends to prompt a wider review rather than a single adjustment.",
        "Where a subcontractor holds evidence you need, get your own copy at the point it is created. Recovering files from a subcontractor who has lost the contract, or gone out of business, is not a position you want to be in when an auditor is waiting."
      ] }
  ],
  faq: [
    { q: "Do we have to publish our subcontracting arrangements?",
      a: "Above the reporting threshold, yes, along with the fees retained. Check the current threshold in the rules, as it has changed." },
    { q: "Can a subcontractor hold the evidence?",
      a: "They can hold copies, but you need access to it and you carry the liability if it cannot be produced. Assume you need your own copy." }
  ],
  related: ["apprenticeship-funding-rules-for-training-providers", "apprenticeship-funding-audit",
            "apprenticeship-funding-compliance"]
},

/* ---------- LEVY ---------- */
{
  slug: "apprenticeship-levy-funding-rules",
  title: "Apprenticeship Levy Rules 2026/27: Growth and Skills Levy",
  h1: "Apprenticeship levy funding rules",
  description: "How the Growth and Skills Levy works in 2026/27: the twelve-month expiry, the removal of the top-up, co-investment, transfers, and what it means for planning.",
  intent: "An employer or finance team working out what they can spend, by when, and what happens to what they do not.",
  updated: "2026-09-26",
  reading: 6,
  body: [
    { h: "What the levy is now",
      p: [
        "The Apprenticeship Levy became the Growth and Skills Levy. Employers with an annual pay bill above £3 million pay 0.5 per cent, less a £15,000 allowance, and the money appears in a digital account to spend on training and assessment.",
        "Two changes matter more than the name. Funds now expire twelve months after entering the account rather than twenty-four. And the ten per cent government top-up has been removed."
      ] },
    { h: "What that means in practice",
      p: [
        "An employer who previously had two years to commit funds now has one. Money that would once have accumulated while a programme was designed is now lost. Planning that used to be annual has to become continuous.",
        "The practical consequence is that under-spending is now expensive in a way it was not before, and the month in which funds start expiring is worth knowing in advance rather than discovering."
      ] },
    { h: "Co-investment and transfers",
      p: [
        "Where levy funds run out, employers co-invest five per cent, with government paying the rest. Apprentices aged 16 to 24 at non-levy employers are fully funded with no co-investment.",
        "Levy-paying employers can transfer up to 25 per cent of their annual funds to other employers, which is a route worth considering where a surplus would otherwise expire."
      ] }
  ],
  faq: [
    { q: "How long do apprenticeship levy funds last?",
      a: "Twelve months from entering the account, reduced from twenty-four. Unspent funds expire and cannot be recovered." },
    { q: "Is there still a 10 per cent top-up?",
      a: "No. The government top-up was removed when the Growth and Skills Levy replaced the Apprenticeship Levy." },
    { q: "What can levy funds be spent on?",
      a: "Apprenticeship training and end-point assessment. Not wages, travel, equipment or work placement costs." }
  ],
  related: ["apprenticeship-funding-rules-for-employers", "apprenticeship-funding-rules",
            "apprenticeship-funding-eligibility"]
},

/* ---------- PROBLEMS ---------- */
{
  slug: "apprenticeship-funding-clawback",
  title: "Apprenticeship Funding Clawback and Common Errors",
  h1: "Funding clawback and the errors that cause it",
  description: "Why apprenticeship funding gets recovered, the errors that cause it most often, how extrapolation multiplies the cost, and what reduces the risk.",
  intent: "Someone facing recovery, or trying to understand the financial exposure of a compliance weakness.",
  updated: "2026-09-26",
  reading: 6,
  body: [
    { h: "What clawback is",
      p: [
        "Where funding was claimed and the evidence does not support it, the money is recovered. It is not a penalty in addition to the funding; it is the funding itself, returned.",
        "The cost lands after the training has been delivered and paid for, which is what makes it painful. You have already borne the cost of the delivery."
      ] },
    { h: "The errors that cause most of it",
      p: [
        "Eligibility evidence missing or dated after the start. Off-the-job training below the published minimum, or recorded without enough detail to show what was delivered. Prior learning not assessed, so the price was not reduced when it should have been.",
        "Training plans unsigned or inconsistent with delivery. Breaks in learning not recorded. Undeclared subcontracting. Data that does not reconcile to the individualised learner record."
      ] },
    { h: "Why the figure is often larger than expected",
      p: [
        "Where an error looks systemic rather than isolated, the rate found in a sample can be applied across the whole population. Ten failures in a sample of thirty does not cost you ten apprentices; it can cost you a third of the cohort.",
        "This is the strongest argument for sampling your own files regularly. An error found early affects one apprentice. The same error found at audit affects everyone it touched."
      ] }
  ],
  faq: [
    { q: "Can clawback be paid in instalments?",
      a: "Recovery arrangements can sometimes be agreed, particularly for larger sums. It does not reduce the amount." },
    { q: "Does clawback affect our contract?",
      a: "A single finding usually does not. A pattern, or anything suggesting weak control, can affect contract value and growth requests." }
  ],
  related: ["apprenticeship-funding-audit", "apprenticeship-funding-compliance",
            "apprenticeship-funding-evidence-requirements"]
}

];
