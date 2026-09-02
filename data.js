/* =========================================================================
   SKILLS RADAR — SHARED DATA

   Every page on the site reads from this one file. Edit here and all
   pages update at once. Keep the commas between entries.
   ========================================================================= */

/* ---------- 1. OCCUPATIONAL ROUTES -------------------------------------
   The 15 Skills England routes. "terms" are the words people actually
   type when they mean that route — add to them freely to improve search.
   ----------------------------------------------------------------------- */

const ROUTES = {
  "agriculture": {
    label: "Agriculture, environmental and animal care",
    terms: ["agriculture","farming","farm","horticulture","landscaping","forestry","arboriculture","trees","animal","animal care","veterinary","vet","equine","land","environmental","conservation","countryside","gamekeeping","floristry","fishing"],
    tlevels: ["Agriculture, Land Management and Production (in development)"]
  },
  "business-administration": {
    label: "Business and administration",
    terms: ["business","business admin","business administration","admin","administration","administrator","office","pa","personal assistant","executive assistant","hr","human resources","people","payroll","governance","team leader","operations","operations manager","business improvement","improvement practitioner","project management","management","manager","coaching","secretarial","clerical","reception"],
    tlevels: ["Management and Administration"]
  },
  "care-services": {
    label: "Care services",
    terms: ["care","adult care","social care","care worker","support worker","children","young people","youth","residential","domiciliary","housing","community","safeguarding","family","lead practitioner"],
    tlevels: ["Social Care (from September 2028)","Care Services (announced)"]
  },
  "catering-hospitality": {
    label: "Catering and hospitality",
    terms: ["catering","hospitality","chef","cook","kitchen","food","beverage","bakery","baker","pastry","hotel","restaurant","bar","barista","events","food and beverage","cleaning","hygiene"],
    tlevels: []
  },
  "construction": {
    label: "Construction and the built environment",
    terms: ["construction","building","built environment","bricklaying","bricklayer","carpentry","carpenter","joiner","plastering","plasterer","plumbing","plumber","electrician","electrical install","heating","heat pump","low carbon heating","retrofit","insulation","roofing","scaffolding","surveying","surveyor","quantity surveyor","civil engineering","groundwork","painter","decorator","flooring","steeplejack","stonemason","thatcher","site","architecture","building services","facilities management","facilities"],
    tlevels: ["Design, Surveying and Planning for Construction","Building Services Engineering for Construction","Onsite Construction"]
  },
  "creative-design": {
    label: "Creative and design",
    terms: ["creative","design","designer","media","broadcast","production","film","tv","television","games","vfx","visual effects","animation","fashion","textiles","furniture","craft","jewellery","interior","interior design","journalism","journalist","publishing","photography","photographer","advertising","scenic","costume","theatre","music","print"],
    tlevels: ["Craft and Design","Media, Broadcast and Production"]
  },
  "digital": {
    label: "Digital",
    terms: ["digital","it","tech","technology","software","developer","development","coding","programmer","data","data analyst","data engineer","database","cyber","cyber security","security","network","networking","infrastructure","support technician","service desk","ai","artificial intelligence","machine learning","automation","cloud","devops","product manager","ux","accessibility","forensics","digital marketer"],
    tlevels: ["Digital Data Analytics","Digital Software Development","Digital Support and Security"]
  },
  "education-early-years": {
    label: "Education and early years",
    terms: ["education","teaching","teacher","teaching assistant","classroom","school","early years","childcare","nursery","learning","learning support","skills mentor","learning and skills","assessor","tutor","trainer","further education","sen","send","learning designer","playworker","outdoor learning"],
    tlevels: ["Education and Early Years"]
  },
  "engineering-manufacturing": {
    label: "Engineering and manufacturing",
    terms: ["engineering","engineer","manufacturing","mechanical","electrical engineering","maintenance","maintenance technician","fitter","welding","welder","fabrication","machining","machinist","cnc","aerospace","aircraft","automotive","marine","maritime","rail engineering","nuclear","battery","polymer","robotics","mechatronics","toolmaking","metrology","process","production","quality","assembly","technician","space"],
    tlevels: ["Design and Development for Engineering and Manufacturing","Maintenance, Installation and Repair for Engineering and Manufacturing","Engineering, Manufacturing, Processing and Control"]
  },
  "hair-beauty": {
    label: "Hair and beauty",
    terms: ["hair","hairdressing","hairdresser","barbering","barber","beauty","beautician","salon","nails","aesthetics","spa","holistic","wellbeing therapy","make-up","makeup"],
    tlevels: []
  },
  "health-science": {
    label: "Health and science",
    terms: ["health","healthcare","nhs","nursing","nurse","nursing associate","midwife","midwifery","doctor","dental","dentist","dental nurse","hygienist","pharmacy","pharmacist","paramedic","ambulance","therapy","physiotherapy","occupational therapy","optical","optician","orthoptist","science","laboratory","lab","biomedical","clinical","mortuary","psychology","psychotherapy","allied health","public health"],
    tlevels: ["Health","Science","Healthcare Science (enrolments ceased)"]
  },
  "legal-finance-accounting": {
    label: "Legal, finance and accounting",
    terms: ["legal","law","solicitor","barrister","paralegal","conveyancing","probate","costs lawyer","finance","financial","accounting","accountant","accountancy","tax","taxation","audit","auditor","insurance","banking","actuarial","compliance","credit","investment","financial planner"],
    tlevels: ["Accounting","Finance (last enrolments September 2026)","Legal Services"]
  },
  "protective-services": {
    label: "Protective services",
    terms: ["police","policing","fire","firefighter","security","protective security","security operative","armed forces","military","prison","custody","detention","probation","emergency","resilience","anti-social behaviour","community safety","intelligence","border","investigator"],
    tlevels: []
  },
  "sales-marketing-procurement": {
    label: "Sales, marketing and procurement",
    terms: ["sales","selling","marketing","marketer","multi-channel marketer","digital marketing","procurement","buying","buyer","supply chain","purchasing","retail","customer service","advertising","communications","market research","merchandising","estate agent"],
    tlevels: ["Marketing"]
  },
  "transport-logistics": {
    label: "Transport and logistics",
    terms: ["transport","logistics","driving","driver","hgv","lgv","bus","coach","van","urban driver","warehouse","warehousing","distribution","rail","railway","train","aviation","airport","flight","maritime","port","shipping","traffic","removals","delivery","fleet"],
    tlevels: []
  }
};

/* ---------- 2. THE FEED ------------------------------------------------
   category : "funding-rules" | "levy" | "t-levels" | "standard"
   status   : "updated" | "upcoming" | "in-review"
   urgency  : "high" (red) | "medium" (amber) | "low" (green)
   pinned   : true keeps it in the Priority group
   route    : a key from ROUTES, or "" if it applies to every route
   article  : an id from ARTICLES below, or "" if there's no article yet
   ----------------------------------------------------------------------- */

const UPDATES = [
  {
    date: "2026-09-01",
    title: "Sixteen apprenticeship standards lose funding",
    category: "funding-rules", route: "", standard: "", article: "defunding-16",
    status: "upcoming", urgency: "high", pinned: true,
    summary: "Funding is withdrawn from 16 standards including Team Leader Level 3, Operations Manager Level 5 and Coaching Professional Level 5. Existing learners continue and stay funded; no new starts after the cut-off.",
    url: "https://help.apprenticeships.education.gov.uk/hc/en-gb/articles/34005717182226-Streamlining-apprenticeships"
  },
  {
    date: "2026-08-01",
    title: "Growth and Skills Levy replaces the Apprenticeship Levy",
    category: "levy", route: "", standard: "", article: "growth-skills-levy",
    status: "updated", urgency: "high", pinned: true,
    summary: "Levy funds now expire after 12 months instead of 24, the 10% government top-up is removed on new funds, and co-investment rises from 5% to 25% for levy payers who exhaust their balance.",
    url: "https://help.apprenticeships.education.gov.uk/hc/en-gb/articles/31398346955154-Budget-2025-Growth-and-Skills-Levy"
  },
  {
    date: "2026-01-01",
    title: "Level 7 funding withdrawn for new starters aged 22 and over",
    category: "funding-rules", route: "", standard: "", article: "level-7",
    status: "updated", urgency: "high", pinned: true,
    summary: "Master's-level apprenticeships are now funded only for those aged 16 to 21, or 22 to 24 with an EHC plan or care experience. The transitional wording has been removed from the 2026/27 rules, making this the baseline.",
    url: "https://www.gov.uk/guidance/apprenticeship-funding-rules"
  },
  {
    date: "2025-02-11",
    title: "English and maths exit requirement made optional for apprentices aged 19+",
    category: "funding-rules", route: "", standard: "", article: "english-maths",
    status: "updated", urgency: "high", pinned: false,
    summary: "Apprentices aged 19 or over at the start of training no longer have to pass English and maths to complete, except where it is an essential part of a mandatory qualification within the standard.",
    url: "https://skillsengland.education.gov.uk/apprenticeships/"
  },
  {
    date: "2025-08-28",
    title: "Minimum apprenticeship duration cut from 12 months to 8 months",
    category: "funding-rules", route: "", standard: "", article: "min-duration",
    status: "updated", urgency: "high", pinned: false,
    summary: "For new starts from 1 August 2025 the minimum programme duration fell to 8 months. This supersedes 12-month references in existing end-point assessment plans. Earlier starters stay on 12 months.",
    url: "https://skillsengland.education.gov.uk/apprenticeships/"
  },
  {
    date: "2026-08-01",
    title: "Full funding for under-25s at non-levy employers",
    category: "levy", route: "", standard: "", article: "sme-funding",
    status: "updated", urgency: "medium", pinned: false,
    summary: "Small and medium employers who do not pay the levy now get 100% government funding for apprentices under 25, removing the 5% co-investment. This substantially reduces the need for levy transfers.",
    url: "https://help.apprenticeships.education.gov.uk/hc/en-gb/articles/31398346955154-Budget-2025-Growth-and-Skills-Levy"
  },
  {
    date: "2026-04-01",
    title: "Apprenticeship units and foundation apprenticeships go live",
    category: "levy", route: "", standard: "", article: "units-foundation",
    status: "updated", urgency: "medium", pinned: false,
    summary: "Short modular units and 8-month foundation apprenticeships are now fundable through the levy. The first units target digital, AI and engineering priorities, with funding from £750 to £3,200 per unit.",
    url: "https://skillsengland.education.gov.uk/apprenticeships/"
  },
  {
    date: "2027-04-01",
    title: "Transition to reformed assessment plans completes",
    category: "funding-rules", route: "", standard: "", article: "epa-reform",
    status: "upcoming", urgency: "medium", pinned: false,
    summary: "Revised assessment plans are rolling out in phases from October 2025 across a 12 to 18 month transition. Over 100 reformed plans are complete and 328 standards are in development.",
    url: "https://www.gov.uk/government/publications/apprenticeship-funding-rules-2025-to-2026/changes-to-apprenticeship-assessment-2025-to-2026"
  },
  {
    date: "2026-06-15",
    title: "New delivery framework for T-Level industry placements",
    category: "t-levels", route: "", standard: "", article: "tlevel-placements",
    status: "updated", urgency: "high", pinned: false,
    summary: "Updated provider guidance gives more scope to structure placements around local context and student needs. Core principles have been added and the previous annex on delivery approaches removed.",
    url: "https://www.gov.uk/government/publications/t-level-industry-placements-guidance-for-providers"
  },
  {
    date: "2026-08-01",
    title: "Administration Assistant restricted to ages 16 to 24",
    category: "standard", route: "business-administration",
    standard: "Administration Assistant, Level 2 (ST1472)", article: "admin-assistant",
    status: "updated", urgency: "medium", pinned: false,
    summary: "Version 2.0 is approved for delivery, but the 2026/27 rules add an age restriction: apprentices are only eligible if aged 16 to 24 at the start. 12 months, £4,000 funding band.",
    url: "https://skillsengland.education.gov.uk/apprenticeships/"
  },
  {
    date: "2026-09-01",
    title: "Low Carbon Heating Engineering specialism added to Building Services T-Level",
    category: "t-levels", route: "construction", standard: "", article: "low-carbon-heating",
    status: "updated", urgency: "medium", pinned: false,
    summary: "A new occupational specialism joins the T-Level in Building Services Engineering for Construction, ready for delivery this September, aligning with the Low Carbon Heating Technician apprenticeship on the same pathway.",
    url: "https://support.tlevels.gov.uk/hc/en-gb/articles/33892267278994-T-Levels-update-10-March-2026"
  },
  {
    date: "2026-04-22",
    title: "2026 to 2027 apprenticeship funding rules published",
    category: "funding-rules", route: "", standard: "", article: "rules-2627",
    status: "updated", urgency: "high", pinned: false,
    summary: "The next funding year's rules are published separately. Which set applies depends on each apprentice's start date, so the 2024/25, 2025/26 and 2026/27 rules are all live at once.",
    url: "https://www.gov.uk/guidance/apprenticeship-funding-rules"
  },
  {
    date: "2027-09-01",
    title: "T-Level Foundation Year to be renamed 'Foundation Year'",
    category: "t-levels", route: "", standard: "", article: "foundation-year",
    status: "upcoming", urgency: "medium", pinned: false,
    summary: "From 2027 the Foundation Year is renamed to reflect a broader role feeding into Level 3 generally, not only T-Levels. New Further Study and Occupational pathways will gradually replace it.",
    url: "https://support.tlevels.gov.uk/hc/en-gb/articles/33892267278994-T-Levels-update-10-March-2026"
  },
  {
    date: "2026-08-05",
    title: "Bus, coach and HGV maintenance standard updated to version 2.0",
    category: "standard", route: "transport-logistics",
    standard: "Bus, Coach and HGV Service and Maintenance Technician, Level 2 (ST1422)", article: "",
    status: "updated", urgency: "medium", pinned: false,
    summary: "A revised version approved for delivery from August 2026, covering servicing and maintenance of buses, coaches and heavy goods vehicles. 24 months, £14,000 funding band.",
    url: "https://skillsengland.education.gov.uk/apprenticeships/"
  },
  {
    date: "2026-08-15",
    title: "Data Engineer standard revision underway",
    category: "standard", route: "digital",
    standard: "Data Engineer, Level 5 (ST1386)", article: "",
    status: "in-review", urgency: "low", pinned: false,
    summary: "An approved version sits alongside a new version in development. Learners progressing from the Digital Data Analytics T-Level commonly feed into this standard.",
    url: "https://skillsengland.education.gov.uk/apprenticeships/"
  },
  {
    date: "2026-08-15",
    title: "Applications Support Lead standard in development",
    category: "standard", route: "digital",
    standard: "Applications Support Lead, Level 4 (ST0949)", article: "",
    status: "in-review", urgency: "low", pinned: false,
    summary: "Moving through proposal, standard, assessment plan and funding stages rather than being approved for delivery. 24 months, £17,000 funding band.",
    url: "https://skillsengland.education.gov.uk/apprenticeships/"
  },
  {
    date: "2026-04-21",
    title: "Three AI leadership apprenticeship units approved",
    category: "standard", route: "digital",
    standard: "AI Leadership units, Level 5 (AU0009, AU0010, AU0011)", article: "",
    status: "updated", urgency: "low", pinned: false,
    summary: "Level 5 units covering AI strategy and opportunity, AI adoption, procurement and governance, and AI delivery and organisational transformation. £750 per unit.",
    url: "https://skillsengland.education.gov.uk/apprenticeships/"
  },
  {
    date: "2026-04-14",
    title: "Journalist and Junior Journalist standards restructured",
    category: "standard", route: "creative-design",
    standard: "Journalist, Level 6 (ST1490) and Junior Journalist, Level 5 (ST1516)", article: "",
    status: "updated", urgency: "low", pinned: false,
    summary: "The Level 5 Journalist standard has retired, replaced by a Level 6 Journalist and a new Level 5 Junior Journalist, changing the progression ladder on this pathway.",
    url: "https://skillsengland.education.gov.uk/apprenticeships/"
  },
  {
    date: "2026-04-01",
    title: "Two new foundation apprenticeships approved for delivery",
    category: "standard", route: "catering-hospitality",
    standard: "Catering and Hospitality (FA0008) and Retail Service, Supply and Administration (FA0009), Level 2", article: "",
    status: "updated", urgency: "medium", pinned: false,
    summary: "Both are 8-month Level 2 foundation apprenticeships funded at £3,500, giving an entry route for learners not yet ready for a full standard.",
    url: "https://skillsengland.education.gov.uk/apprenticeships/"
  },
  {
    date: "2026-01-01",
    title: "2025 to 2026 funding rules updated to version 3",
    category: "funding-rules", route: "", standard: "", article: "",
    status: "updated", urgency: "medium", pinned: false,
    summary: "References to the former Education and Skills Funding Agency removed following the move of its functions into the Department for Education. A new annex sets out minimum off-the-job training by standard.",
    url: "https://assets.publishing.service.gov.uk/media/6936acd76a167b6884b7360e/Funding_Rules_2025_to_2026.pdf"
  },
  {
    date: "2026-03-10",
    title: "Employer Support Fund continues into 2026/27",
    category: "levy", route: "", standard: "", article: "",
    status: "updated", urgency: "low", pinned: false,
    summary: "The fund continues for 2026/27, helping employers delivering the Health T-Level, and small and medium employers delivering all T-Levels, meet the essential costs of industry placements.",
    url: "https://support.tlevels.gov.uk/hc/en-gb/articles/33892267278994-T-Levels-update-10-March-2026"
  },
  {
    date: "2026-05-21",
    title: "Interior Designer standard updated to version 2.0",
    category: "standard", route: "creative-design",
    standard: "Interior Designer, Level 6 (ST1361)", article: "",
    status: "updated", urgency: "low", pinned: false,
    summary: "A revised version approved for delivery from May 2026. 36 months, £26,000 funding band.",
    url: "https://skillsengland.education.gov.uk/apprenticeships/"
  }
];

/* ---------- 3. ARTICLES ------------------------------------------------
   Each article explains one change in 200 to 300 words: what it changed
   from, what it changed to, and what follows from it.
   ----------------------------------------------------------------------- */

const ARTICLES = [
  {
    id: "defunding-16",
    title: "Sixteen standards lose funding from September 2026",
    date: "2026-09-01",
    route: "",
    tag: "Funding rules",
    urgency: "high",
    standfirst: "The largest single removal of funded standards since the levy began, aimed at redirecting spend towards younger apprentices.",
    body: [
      "Funding is being withdrawn from 16 apprenticeship standards from no earlier than 1 September 2026. The list includes several of the most heavily delivered management programmes in the country: Team Leader Level 3, Operations Manager Level 5, Coaching Professional Level 5, Improvement Practitioner Level 4 and Improvement Leader Level 6. It also covers Chartered Manager Degree Level 6, Cleaning Hygiene Operative Level 2, Custody and Detention Professional Level 3, Facilities Management Supervisor Level 3, Lead Practitioner in Adult Care Level 4, Learning and Skills Assessor Level 3, Learning and Skills Mentor Level 4, Outdoor Learning Specialist Level 5, Professional Security Operative Level 2, Public Sector Compliance Investigator and Officer Level 3, and Security First Line Manager Level 3.",
      "What it changed from: all 16 were fully funded standards available to any eligible employer, with several among the highest-volume programmes in the system. Team Leader and Operations Manager in particular functioned as the default progression route into management across almost every sector.",
      "The stated reason is budget pressure combined with a policy shift. Skills England notes the offer has grown beyond 700 standards while starts among 16 to 24 year olds have fallen roughly 40% over a decade, with growth concentrated in older, higher-level and more expensive provision.",
      "What follows: existing learners are unaffected and remain funded to completion. But no new starts can be funded after the cut-off, and the practical deadline is earlier than the formal one, because eligibility checks, contracting and onboarding typically take six to eight weeks. Providers with these standards in their portfolio face a real revenue question. Employers using them as a management pipeline need an alternative, and for most of the 16 no replacement standard has been announced."
    ],
    sources: [
      { label: "Skills England — Streamlining apprenticeships", url: "https://help.apprenticeships.education.gov.uk/hc/en-gb/articles/34005717182226-Streamlining-apprenticeships" }
    ]
  },
  {
    id: "growth-skills-levy",
    title: "The Growth and Skills Levy: three financial changes that matter",
    date: "2026-08-01",
    route: "",
    tag: "Levy",
    urgency: "high",
    standfirst: "The rebrand is cosmetic. The changes underneath it are not.",
    body: [
      "The Apprenticeship Levy has been reworked as the Growth and Skills Levy, and three mechanical changes arrive with it that directly affect what employers can spend.",
      "First, expiry. Levy funds used to sit in an account for 24 months before expiring. New funds now expire after 12 months. Funds already in an account before the change run on the old 24-month clock, so most employers are temporarily managing two expiry timetables at once.",
      "Second, the top-up. Government previously added 10% to monthly levy contributions. That top-up has been removed on new funds, so employers now access only the value of what they actually paid in.",
      "Third, co-investment. When a levy payer exhausted their balance, they previously contributed 5% of further training costs with government paying 95%. That employer share rises to 25%, with government at 75%.",
      "What it changed from: a system where unspent levy was common and the cost of over-committing was low. What it changed to: one where underspending destroys money faster and overspending costs five times what it did.",
      "What follows: levy forecasting stops being an annual exercise and becomes a rolling one. Employers who historically let funds lapse now lose them within a year. Employers who routinely exceed their balance face a materially larger bill and should model 2026/27 spend before committing to new cohorts. There is a partial offset — the wider Growth and Skills Levy allows shorter units and non-apprenticeship training to be funded, giving more ways to use a balance before it expires."
    ],
    sources: [
      { label: "Apprenticeship Service — Budget 2025, Growth and Skills Levy", url: "https://help.apprenticeships.education.gov.uk/hc/en-gb/articles/31398346955154-Budget-2025-Growth-and-Skills-Levy" }
    ]
  },
  {
    id: "level-7",
    title: "Level 7 funding withdrawn for new starters aged 22 and over",
    date: "2026-01-01",
    route: "",
    tag: "Funding rules",
    urgency: "high",
    standfirst: "Master's-level apprenticeships are now a young person's route, with two narrow exceptions.",
    body: [
      "From 1 January 2026, government funding for new starts on Level 7 apprenticeships was withdrawn for anyone aged 22 or over. Level 7 remains funded for apprentices aged 16 to 21, and for those aged 22 to 24 who have an Education, Health and Care plan or have been in local authority care.",
      "What it changed from: Level 7 was open to any eligible apprentice regardless of age, and had become one of the fastest-growing parts of the system. Senior Leader, Solicitor, Accountancy and Taxation Professional and Advanced Clinical Practitioner programmes were widely used by employers to develop existing senior staff.",
      "Apprentices who started before January 2026 continue to be funded through to completion, so this is a restriction on new starts only.",
      "The 2026/27 funding rules removed the transitional language around this change, which matters more than it sounds. It signals the restriction is now the settled baseline rather than a temporary measure that might be revisited.",
      "What follows: employers who used Level 7 to develop mid-career and senior staff have lost that funding route almost entirely and must either self-fund, use the wider Growth and Skills Levy flexibilities for shorter training, or redirect development spend. Providers with Level 7 portfolios have seen a demand cliff. There was a visible surge in Level 7 starts in late 2025 as employers enrolled ahead of the deadline, which contributed to the budget pressure now driving further streamlining decisions."
    ],
    sources: [
      { label: "GOV.UK — Apprenticeship funding rules", url: "https://www.gov.uk/guidance/apprenticeship-funding-rules" }
    ]
  },
  {
    id: "english-maths",
    title: "English and maths exit requirement made optional for apprentices aged 19+",
    date: "2025-02-11",
    route: "",
    tag: "Funding rules",
    urgency: "high",
    standfirst: "One of the largest single removals of a completion barrier in the history of the standard.",
    body: [
      "Since 11 February 2025, apprentices aged 19 or over at the start of their training no longer have to achieve Level 2 English and maths in order to complete their apprenticeship. The requirement became optional rather than mandatory.",
      "What it changed from: every apprentice had to hold or achieve English and maths at the relevant level before they could pass through gateway and complete. For adult apprentices returning to education after a long gap, functional skills was frequently the single reason a programme stalled or a learner withdrew.",
      "There is an important exception. Where English or maths forms an essential component of a mandatory qualification within the standard itself, it still has to be completed and evidenced before completion. That determination sits with the awarding organisation, so it must be confirmed standard by standard rather than assumed.",
      "The change applies to apprentices already on programme as well as new starts, and where content is removed from a training plan, the plan must be re-signed by the employer at the earliest opportunity and no later than the next progress review.",
      "What follows: achievement rates on adult programmes should improve, and the delivery cost of long functional skills provision falls. The trade-off is genuine and has been raised by sector bodies including the CIPD — adults completing an apprenticeship may now do so without demonstrating Level 2 literacy and numeracy, which affects transferability. Learners who opt out can still access these qualifications separately through Adult Skills Funding."
    ],
    sources: [
      { label: "Skills England — apprenticeship register policy notices", url: "https://skillsengland.education.gov.uk/apprenticeships/" }
    ]
  },
  {
    id: "min-duration",
    title: "Minimum duration cut from 12 months to 8 months",
    date: "2025-08-28",
    route: "",
    tag: "Funding rules",
    urgency: "high",
    standfirst: "A structural change to what an apprenticeship is, and it overrides your assessment plans.",
    body: [
      "For apprenticeships starting on or after 1 August 2025, the minimum duration fell from 12 months to 8 months. Apprentices who started before that date remain on the 12-month minimum.",
      "The detail that catches providers out is the override. Many end-point assessment plans still contain wording specifying a 12-month minimum duration. The policy change supersedes those references. You do not need to wait for an assessment plan to be revised before delivering to the shorter minimum.",
      "What it changed from: a fixed 12-month floor that had been in place since the standards system began, originally introduced to prevent very short programmes being badged as apprenticeships.",
      "What follows: shorter programmes are viable where the occupational competence can genuinely be reached in the time. This suits standards with tighter occupational scope and employers who need faster responses to skills gaps. It sits alongside the new 8-month foundation apprenticeships, which were designed around this floor.",
      "The risks are practical. Off-the-job training requirements did not shrink proportionally, so a compressed programme concentrates the same hours into fewer months, which is harder on both employer release and learner workload. Providers should be careful that a shorter duration is a genuine judgement about occupational competence rather than a commercial reflex, because inspection and audit will look at whether the duration was justified for the individual apprentice."
    ],
    sources: [
      { label: "Skills England — apprenticeship register policy notices", url: "https://skillsengland.education.gov.uk/apprenticeships/" }
    ]
  },
  {
    id: "sme-funding",
    title: "Full funding for under-25s at non-levy employers",
    date: "2026-08-01",
    route: "",
    tag: "Levy",
    urgency: "medium",
    standfirst: "Co-investment disappears for younger apprentices at smaller employers, and takes much of the case for levy transfers with it.",
    body: [
      "From the 2026/27 academic year, small and medium employers who do not pay the levy receive 100% government funding for apprentices aged under 25. The 5% employer co-investment contribution is removed for that group.",
      "What it changed from: non-levy employers paid 5% of training costs up to the funding band maximum, with government covering 95%. Full funding was previously available only in narrower circumstances, typically for apprentices under 21 at employers with fewer than 50 staff.",
      "What follows, and this is the part most people miss: it substantially undercuts the rationale for levy transfers. Large employers have been able to transfer levy funds to SMEs, charities and flexi-job agencies, and many built social value and supply chain programmes around doing so. If an SME can now access full funding directly for anyone under 25, the transfer adds little for that cohort.",
      "Organisations that report levy transfer as a social value metric should revisit what they are actually claiming. The transfer mechanism still matters for apprentices aged 25 and over at non-levy employers, and for cases where an SME wants a specific provider relationship, but the headline case has weakened.",
      "For SMEs the practical effect is straightforward: hiring an apprentice under 25 no longer carries a direct training cost, which changes the arithmetic on entry-level recruitment considerably."
    ],
    sources: [
      { label: "Apprenticeship Service — Budget 2025, Growth and Skills Levy", url: "https://help.apprenticeships.education.gov.uk/hc/en-gb/articles/31398346955154-Budget-2025-Growth-and-Skills-Levy" }
    ]
  },
  {
    id: "units-foundation",
    title: "Apprenticeship units and foundation apprenticeships go live",
    date: "2026-04-01",
    route: "",
    tag: "Levy",
    urgency: "medium",
    standfirst: "Levy money can now buy something shorter than an apprenticeship.",
    body: [
      "From April 2026, two new products became fundable: short modular apprenticeship units, and foundation apprenticeships.",
      "Units are standalone blocks of training rather than full standards. The first wave targets nationally critical priorities. Approved examples include three Level 5 AI Leadership units at £750 each covering AI strategy, AI adoption and governance, and AI-led organisational transformation; Solar PV Installation and Maintenance and EV Charging Point Installation at £950 each; Welding, mechanised at £2,100; Battery Manufacturing and Electrical Fitting and Assembly at £1,650; and Permanent Modular Building Assembly at £3,200. They appear on the Skills England register filtered by programme type.",
      "Foundation apprenticeships are 8-month Level 2 programmes aimed at 16 to 21 year olds, and some 22 to 24 year olds with an EHC plan or care experience. Approved routes now include Building Services Engineering, Engineering and Manufacturing, Finishing Trades, Hardware Network and Infrastructure, Onsite Trades, Software and Data, Health and Social Care, Catering and Hospitality, and Retail Service, Supply and Administration, funded between £3,000 and £4,500.",
      "What it changed from: levy funds could only be spent on full apprenticeship standards. Employers with rapid skills-change needs, project-based workforces or staff who could not commit to a year-plus programme had no fundable option.",
      "What follows: more ways to use a levy balance before the new 12-month expiry bites. It also adds real complexity for providers, who now manage three product types with different rules, durations and funding arrangements running in parallel."
    ],
    sources: [
      { label: "Skills England apprenticeship register", url: "https://skillsengland.education.gov.uk/apprenticeships/" }
    ]
  },
  {
    id: "epa-reform",
    title: "Assessment reform: what the transition actually means",
    date: "2027-04-01",
    route: "",
    tag: "Funding rules",
    urgency: "medium",
    standfirst: "Every assessment plan is being rewritten, one group at a time, and both old and new rules are live simultaneously.",
    body: [
      "Skills England is revising all apprenticeship assessment plans. The rollout began in October 2025 and runs in phases across a 12 to 18 month transition, prioritising Group 1 — standards aligned with the Industrial Strategy.",
      "The direction is towards proportionality. Assessment should match the competency being tested and remove duplication; where appropriate it can take place throughout the apprenticeship rather than only at the end; and providers will be able to deliver and mark elements of assessment. Assessment organisations, previously called end-point assessment organisations, continue to design assessments and assure the validity of outcomes. There is also more scope for remote assessment. Employers will be required to confirm behaviours before gateway.",
      "What it changed from: a uniform end-point assessment model where all assessment sat at the end, was delivered entirely by an independent EPAO, and followed a fixed plan per standard.",
      "Progress as of mid-2026: more than 100 reformed assessment plans are complete, and 328 standards are in development, with 108 having entered development in a single month. Draft plans are being published for public consultation.",
      "What follows, and this is the operational headache: until a given standard's revised plan is approved and available for starts, the existing EPA rules still apply to it. That means providers are running two assessment regimes side by side, sometimes within the same curriculum area, for a year or more. Track which of your standards have moved and which have not, because assuming either way will cause problems."
    ],
    sources: [
      { label: "GOV.UK — Changes to apprenticeship assessment 2025 to 2026", url: "https://www.gov.uk/government/publications/apprenticeship-funding-rules-2025-to-2026/changes-to-apprenticeship-assessment-2025-to-2026" }
    ]
  },
  {
    id: "tlevel-placements",
    title: "A new delivery framework for T-Level industry placements",
    date: "2026-06-15",
    route: "",
    tag: "T-Levels",
    urgency: "high",
    standfirst: "Providers get more latitude to design placements around their students and their local employers.",
    body: [
      "Updated guidance for providers, published in June 2026, introduces a new delivery framework for T-Level industry placements. It gives providers more scope to determine the structure of a placement in a way that works for their students and local context.",
      "What it changed from: a more prescriptive model set out in the previous guidance, which included an annex on delivery approaches. That annex has been removed and replaced with a set of core principles for industry placements. Example industry placement objective templates for the hair and beauty and catering and hospitality routes were also removed.",
      "The placement itself remains a substantial commitment — around 45 days with an employer — and remains the element providers most often report as the constraint on scaling T-Level delivery.",
      "Supporting funding continues. For 2025/26, T-Level funding included a 5% uplift plus £550 per student towards industry placement costs. The Employer Support Fund continues into 2026/27, helping employers delivering the Health T-Level and SMEs delivering all T-Levels with essential placement costs. T-Levels benefit from nearly £800 million of additional investment in the 2026/27 financial year.",
      "What follows: if your placement model was built around the old annex, it needs revisiting against the core principles instead. The flexibility is real, but it moves judgement onto the provider, which means placement quality and the evidence for it now rest more heavily on local decision-making. DfE is also procuring new T-Level Industry Placement Support Services from September 2026."
    ],
    sources: [
      { label: "GOV.UK — T-Level industry placements: guidance for providers", url: "https://www.gov.uk/government/publications/t-level-industry-placements-guidance-for-providers" }
    ]
  },
  {
    id: "admin-assistant",
    title: "Administration Assistant Level 2 restricted to ages 16 to 24",
    date: "2026-08-01",
    route: "business-administration",
    tag: "Standard",
    urgency: "medium",
    standfirst: "A brand new standard arrives already narrowed to young people.",
    body: [
      "The Level 2 Administration Assistant standard (ST1472) has been approved with a £4,000 funding band and a 12-month duration, and version 2.0 is approved for delivery from 1 August 2026. Alongside approval, the 2026/27 funding rules introduce an age restriction: apprentices are eligible only if aged 16 to 24 at the start of the apprenticeship.",
      "What it changed from: there was no funded Level 2 entry point in business administration. The Business Administrator standard sits at Level 3, which left a gap for genuine entry-level administrative roles and for learners not ready to start at Level 3.",
      "The age restriction is notable because it applies from the outset rather than being retrofitted, and it fits the wider pattern across the 2026/27 rules of directing funding towards younger apprentices.",
      "On the pathway, this standard now forms the bottom rung of the business and administration route. Above it sit Business Administrator at Level 3 and, until September 2026, Team Leader at Level 3 — though Team Leader is one of the 16 standards losing funding, which removes the natural next step and leaves the route's progression ladder with a gap.",
      "What follows: providers can offer a funded Level 2 administrative programme for the first time, but only to under-25s, so adult career-changers into administration have no funded entry route at Level 2. Employers should map their administrative pipeline against both this restriction and the Team Leader defunding before planning 2026/27 cohorts."
    ],
    sources: [
      { label: "Skills England apprenticeship register", url: "https://skillsengland.education.gov.uk/apprenticeships/" },
      { label: "GOV.UK — Apprenticeship funding rules", url: "https://www.gov.uk/guidance/apprenticeship-funding-rules" }
    ]
  },
  {
    id: "low-carbon-heating",
    title: "Low Carbon Heating Engineering joins the Building Services T-Level",
    date: "2026-09-01",
    route: "construction",
    tag: "T-Levels",
    urgency: "medium",
    standfirst: "The construction pathway gets a joined-up net zero route from 16 through to technician.",
    body: [
      "A new occupational specialism in Low Carbon Heating Engineering has been added to the T-Level in Building Services Engineering for Construction, ready for delivery from September 2026.",
      "What it changed from: the Building Services Engineering T-Level covered electrical, plumbing, heating and ventilation systems, but had no specialism dedicated to heat pumps and low carbon heating specifically, despite this being one of the sharpest skills shortages in the sector.",
      "The pathway effect is the interesting part. On the construction route there is now a visible progression line: the Building Services Engineering foundation apprenticeship at Level 2 (FA0001, 8 months, £4,000); this T-Level specialism at Level 3; and the Low Carbon Heating Technician apprenticeship at Level 3 (ST1020, 36 months, £22,000), described as a skilled heat pump installer. There are also new Level 3 apprenticeship units in Solar PV Installation and Maintenance and EV Charging Point Installation at £950 each, giving employers a way to upskill existing staff without a full programme.",
      "What follows: providers on the construction route can now offer a coherent 16-to-technician offer in low carbon heating rather than isolated qualifications. For employers in heating and renewables, this is the first year the full ladder exists, which matters for workforce planning against heat pump installation targets. Check local employer demand before committing — placement capacity in this specialism is untested."
    ],
    sources: [
      { label: "T-Levels update, 10 March 2026", url: "https://support.tlevels.gov.uk/hc/en-gb/articles/33892267278994-T-Levels-update-10-March-2026" }
    ]
  },
  {
    id: "rules-2627",
    title: "The 2026 to 2027 funding rules, and why three rulebooks are live at once",
    date: "2026-04-22",
    route: "",
    tag: "Funding rules",
    urgency: "high",
    standfirst: "Which rules apply depends on when each apprentice started, not on today's date.",
    body: [
      "The 2026 to 2027 apprenticeship funding rules have been published as a separate document. This is routine, but the consequence is not always handled well.",
      "Funding rules apply according to each apprentice's start date. Apprenticeships starting between 1 August 2024 and 31 July 2025 follow the 2024/25 rules. Starts between 1 August 2025 and 31 July 2026 follow the 2025/26 rules, now at version 3. Starts from 1 August 2026 follow the 2026/27 rules. All three are live simultaneously and providers must follow the correct set per apprentice.",
      "There are exceptions that cut across start dates. Some rules apply to all learners regardless of when they began — changes tied to a new version of a standard are one example, and the English and maths change from February 2025 was applied to existing learners too. These are set out explicitly in the rules and should not be assumed either way.",
      "What is new for 2026/27: the Level 7 age restriction is now baseline rather than transitional; the Administration Assistant Level 2 age restriction is added; the Skills Bootcamp exclusion is made explicit, so an individual on a government-funded Skills Bootcamp cannot receive apprenticeship funding at the same time; and the Growth and Skills Levy financial changes take effect.",
      "What follows: a single compliance question now has three possible correct answers depending on the learner. Audit exposure sits in assuming the current rulebook applies to everyone on programme."
    ],
    sources: [
      { label: "GOV.UK — Apprenticeship funding rules", url: "https://www.gov.uk/guidance/apprenticeship-funding-rules" }
    ]
  },
  {
    id: "foundation-year",
    title: "The T-Level Foundation Year becomes the Foundation Year",
    date: "2027-09-01",
    route: "",
    tag: "T-Levels",
    urgency: "medium",
    standfirst: "A rename that signals a wider role, ahead of Level 2 reform replacing it entirely.",
    body: [
      "From 2027 the T-Level Foundation Year will be renamed the Foundation Year, reflecting its role in supporting progression to a broader range of Level 3 options rather than only T-Levels. It remains unchanged for 2026.",
      "What it changed from: the Foundation Year was explicitly framed as a pre-T-Level programme, for students who were not yet ready to start a T-Level. In practice many students used it to progress to other Level 3 routes, so the name understated what it did.",
      "The larger context is Level 2 reform. Two new pathways are being introduced: a Further Study Pathway with Foundation Certificates, leading to Level 3 study including T-Levels, and an Occupational Pathway with Occupational Certificates, leading to employment. As the Further Study pathway is introduced subject by subject, it will gradually replace the Foundation Year.",
      "Alongside this sits the largest expansion of T-Level subjects since the programme began, including new T-Levels in Care Services and in Sports, Fitness and Exercise Science. Existing T-Levels are also being adjusted: awarding organisations are working on further reductions to assessment burden and streamlined content, and Ofqual is to consult on allowing learners to retake core exams individually.",
      "What follows: curriculum planning for 2027 entry needs to account for a programme that is being renamed and then progressively withdrawn. Providers running Foundation Year provision should track which subjects get a Further Study pathway first, as that determines the order in which their own offer needs to change."
    ],
    sources: [
      { label: "T-Levels update, 10 March 2026", url: "https://support.tlevels.gov.uk/hc/en-gb/articles/33892267278994-T-Levels-update-10-March-2026" }
    ]
  }
];

/* ---------- 4. HORIZON -------------------------------------------------
   Forward look. What is coming, what is uncertain, and what could bite.
   confidence : "confirmed" | "signalled" | "speculative"
   ----------------------------------------------------------------------- */

const HORIZON = [
  {
    window: "Now to September 2026",
    title: "Enrolment cliff on the 16 defunded standards",
    confidence: "confirmed",
    risk: "high",
    detail: "No new funded starts on Team Leader, Operations Manager, Coaching Professional and 13 others after the cut-off. The real deadline is earlier than the formal one — eligibility checks and contracting typically take six to eight weeks, so June was the practical last call for a clean start.",
    watch: "Whether any replacement standards are announced. For most of the 16, none has been."
  },
  {
    window: "2026/27 academic year",
    title: "Further streamlining of the standards suite",
    confidence: "signalled",
    risk: "high",
    detail: "Skills England and DWP have held employer meetings on reviewing the 700-plus standards. Ministers have said nothing is decided 'yet'. Sector bodies including the CBI have publicly objected. FE Week reporting suggests attendees left with a fear that further management and progression standards could go.",
    watch: "Any second defunding list. Employers relying on a single standard for a whole progression route are the most exposed."
  },
  {
    window: "From August 2026, rolling",
    title: "Levy balances expiring twelve months earlier",
    confidence: "confirmed",
    risk: "high",
    detail: "New funds expire after 12 months rather than 24, while older funds still run on the 24-month clock. Most employers are managing two expiry timetables at once for the first year, which is exactly when errors happen.",
    watch: "Your first month where funds expire unspent. Model it now rather than discovering it in a statement."
  },
  {
    window: "September 2026 onwards",
    title: "The 25% co-investment rate needs confirming",
    confidence: "signalled",
    risk: "medium",
    detail: "Co-investment for levy payers who exhaust their balance rises from 5% to 25%. Sector commentary indicates further guidance on the operation of this rate was still expected, and sector bodies continue to press for relief for under-25s, though no change has been confirmed.",
    watch: "Updated guidance on how the rate is applied in practice, particularly for part-year balances."
  },
  {
    window: "Through 2026 and 2027",
    title: "Two assessment regimes running side by side",
    confidence: "confirmed",
    risk: "medium",
    detail: "Reformed assessment plans arrive standard by standard across a 12 to 18 month transition. Over 100 are complete and 328 standards are in development. Until a standard's revised plan is approved, the old EPA rules still apply to it.",
    watch: "Which of your specific standards have moved. Assuming either regime applies across your portfolio will cause a compliance problem."
  },
  {
    window: "During 2026",
    title: "Detailed Growth and Skills Levy offer still to land",
    confidence: "signalled",
    risk: "medium",
    detail: "The CIPD notes that further detail is expected through additional guidance and a fuller Growth and Skills Levy offer during 2026, and that many implementation aspects have not yet been set out in full.",
    watch: "What non-apprenticeship training becomes fundable, and on what terms. This determines whether the flexibility is real or nominal."
  },
  {
    window: "September 2026 and 2027",
    title: "T-Level expansion and Level 2 reform",
    confidence: "confirmed",
    risk: "medium",
    detail: "The largest expansion of T-Level subjects since launch, including Care Services and Sports, Fitness and Exercise Science. Level 2 reform introduces Further Study and Occupational pathways which will gradually replace the Foundation Year from 2027. Finance T-Level takes its last enrolments in September 2026.",
    watch: "The order in which subjects get a Further Study pathway — it sets the sequence your own offer has to change in."
  },
  {
    window: "Ongoing",
    title: "Budget pressure is the underlying driver",
    confidence: "confirmed",
    risk: "high",
    detail: "DfE is expected to overspend its apprenticeships budget, driven by growth in older, higher-level and more expensive provision. Most recent restrictions — Level 7, defunding, age limits, the top-up removal — trace back to this. An additional £725m is being invested in the Growth and Skills Levy to support 50,000 more young people.",
    watch: "Treat any programme concentrated on older or higher-level apprentices as carrying policy risk, not just delivery risk."
  }
];

/* ---------- 5. COMPLIANCE CALENDAR ------------------------------------
   type : "deadline" | "change" | "window" | "watch"
   ----------------------------------------------------------------------- */

const MILESTONES = [
  {
    date: "2026-09-01",
    title: "Funding withdrawn from 16 standards",
    type: "deadline", urgency: "high",
    who: "Providers and employers",
    action: "No new funded starts on the 16 standards after this date. Confirm every intended learner is enrolled and on-programme. Existing learners are unaffected and remain funded to completion.",
    article: "defunding-16"
  },
  {
    date: "2026-09-01",
    title: "Low Carbon Heating specialism available",
    type: "change", urgency: "medium",
    who: "Construction providers",
    action: "First delivery of the new occupational specialism in the Building Services Engineering T-Level. Confirm placement capacity with local heating and renewables employers.",
    article: "low-carbon-heating"
  },
  {
    date: "2026-09-01",
    title: "Last enrolments for the Finance T-Level",
    type: "deadline", urgency: "medium",
    who: "Providers",
    action: "New enrolments on the Finance T-Level cease after September 2026. Plan an alternative offer for prospective students in this subject, such as Accounting.",
    article: ""
  },
  {
    date: "2026-10-01",
    title: "T-Levels Week",
    type: "window", urgency: "low",
    who: "Providers and employers",
    action: "Annual T-Levels Week takes place in October. A practical window for employer engagement and placement recruitment for the following year.",
    article: ""
  },
  {
    date: "2026-12-31",
    title: "Review levy balance against the new 12-month expiry",
    type: "watch", urgency: "high",
    who: "Levy-paying employers",
    action: "Funds paid in from August 2026 expire 12 months later. Run a forecast before the calendar year ends to identify what would lapse and commit it, including to units and foundation apprenticeships.",
    article: "growth-skills-levy"
  },
  {
    date: "2027-01-01",
    title: "Level 7 restriction fully embedded",
    type: "change", urgency: "medium",
    who: "Employers",
    action: "One year on from the restriction. Any remaining pre-2026 Level 7 apprentices should be tracked to completion; no new over-22 starts are fundable.",
    article: "level-7"
  },
  {
    date: "2027-04-01",
    title: "Assessment plan transition completes",
    type: "deadline", urgency: "medium",
    who: "Providers and assessment organisations",
    action: "End of the 12 to 18 month transition window. Audit which of your standards have moved to reformed assessment plans and which have not, and align internal quality processes to each.",
    article: "epa-reform"
  },
  {
    date: "2027-08-01",
    title: "2027 to 2028 funding rules take effect",
    type: "change", urgency: "medium",
    who: "Providers",
    action: "New rules apply to starts from this date. Three or four rulebooks will be live at once. Confirm your MIS applies the correct rule set per apprentice start date.",
    article: "rules-2627"
  },
  {
    date: "2027-09-01",
    title: "Foundation Year renamed; Further Study pathways begin",
    type: "change", urgency: "medium",
    who: "Providers",
    action: "The T-Level Foundation Year becomes the Foundation Year, and Further Study and Occupational pathways start being introduced subject by subject, gradually replacing it.",
    article: "foundation-year"
  },
  {
    date: "2028-09-01",
    title: "Social Care T-Level first delivery",
    type: "change", urgency: "low",
    who: "Care services providers",
    action: "The Social Care T-Level becomes available. Begin employer placement conversations well ahead — care placements need safeguarding clearance and lead time.",
    article: ""
  }
];

/* ---------- 6. STANDARDS REGISTER --------------------------------------
   A working subset of the Skills England register, grouped by route.
   changed : "" means no change recorded since the date in "since".
   ----------------------------------------------------------------------- */

const STANDARDS = [
  /* Business and administration */
  { name:"Administration Assistant", code:"ST1472", level:2, months:12, funding:4000, route:"business-administration", status:"Approved", version:"2.0", since:"2026-08-01", changed:"Version 2.0 approved; new age restriction 16 to 24", article:"admin-assistant" },
  { name:"Team Leader", code:"ST0384", level:3, months:12, funding:5000, route:"business-administration", status:"Defunded from Sept 2026", version:"1.1", since:"2026-09-01", changed:"Funding withdrawn from September 2026", article:"defunding-16" },
  { name:"Operations Manager", code:"ST0385", level:5, months:18, funding:7000, route:"business-administration", status:"Defunded from Sept 2026", version:"1.1", since:"2026-09-01", changed:"Funding withdrawn from September 2026", article:"defunding-16" },
  { name:"Coaching Professional", code:"ST0885", level:5, months:14, funding:5000, route:"business-administration", status:"Defunded from Sept 2026", version:"1.0", since:"2026-09-01", changed:"Funding withdrawn from September 2026", article:"defunding-16" },
  { name:"Improvement Practitioner", code:"ST0378", level:4, months:18, funding:9000, route:"business-administration", status:"Defunded from Sept 2026", version:"1.1", since:"2026-09-01", changed:"Funding withdrawn from September 2026", article:"defunding-16" },
  { name:"Improvement Leader", code:"ST0379", level:6, months:24, funding:15000, route:"business-administration", status:"Defunded from Sept 2026", version:"1.0", since:"2026-09-01", changed:"Funding withdrawn from September 2026", article:"defunding-16" },
  { name:"Chartered Manager (degree)", code:"ST0272", level:6, months:48, funding:22000, route:"business-administration", status:"Defunded from Sept 2026", version:"1.1", since:"2026-09-01", changed:"Funding withdrawn from September 2026", article:"defunding-16" },
  { name:"Governance Officer", code:"ST1302", level:4, months:18, funding:11000, route:"business-administration", status:"In development", version:"1.0", since:"2023-05-25", changed:"New version in development" },
  { name:"Senior People Professional", code:"ST0813", level:7, months:36, funding:19000, route:"business-administration", status:"Approved", version:"1.0", since:"2021-01-07", changed:"" },
  { name:"Payroll Assistant Manager", code:"ST0869", level:5, months:24, funding:11000, route:"business-administration", status:"Approved", version:"2.0", since:"2026-07-27", changed:"Version 1.1 retired; 2.0 current" },
  { name:"Express Delivery Sortation Hub Operative", code:"ST0753", level:2, months:12, funding:4000, route:"business-administration", status:"Approved", version:"1.0", since:"2022-02-11", changed:"" },

  /* Digital */
  { name:"Data Engineer", code:"ST1386", level:5, months:24, funding:19000, route:"digital", status:"In development", version:"1.0", since:"2026-08-15", changed:"Revision in development alongside approved version" },
  { name:"Applications Support Lead", code:"ST0949", level:4, months:24, funding:17000, route:"digital", status:"In development", version:"1.0", since:"2026-08-15", changed:"Moving through proposal and assessment plan stages" },
  { name:"AI Leadership — strategy and opportunity (unit)", code:"AU0009", level:5, months:0, funding:750, route:"digital", status:"Approved", version:"1.0", since:"2026-04-21", changed:"New unit approved for delivery" },
  { name:"AI Leadership — adoption, procurement and governance (unit)", code:"AU0010", level:5, months:0, funding:750, route:"digital", status:"Approved", version:"1.0", since:"2026-04-21", changed:"New unit approved for delivery" },
  { name:"AI Leadership — delivery and organisational transformation (unit)", code:"AU0011", level:5, months:0, funding:750, route:"digital", status:"Approved", version:"1.0", since:"2026-04-21", changed:"New unit approved for delivery" },
  { name:"Artificial Intelligence and Automation Practitioner", code:"ST1512", level:4, months:18, funding:18000, route:"digital", status:"Approved", version:"2.1", since:"2025-12-10", changed:"Version 2.0 retired; 2.1 current" },
  { name:"Machine Learning Engineer", code:"ST1398", level:6, months:24, funding:22000, route:"digital", status:"In development", version:"1.0", since:"2024-12-18", changed:"Notice period; new version in development" },
  { name:"Information Communications Technician", code:"ST0973", level:3, months:18, funding:15000, route:"digital", status:"In development", version:"1.2", since:"2026-01-01", changed:"Notice period; revision in development" },
  { name:"Cyber Security Technologist (2021)", code:"ST1021", level:4, months:24, funding:18000, route:"digital", status:"Approved", version:"1.1", since:"2025-09-29", changed:"Version 1.0 retired" },
  { name:"Digital Product Manager", code:"ST0964", level:4, months:24, funding:18000, route:"digital", status:"In development", version:"1.0", since:"2023-05-11", changed:"Notice period; new version in development" },
  { name:"Digital Accessibility Specialist", code:"ST0863", level:4, months:24, funding:16000, route:"digital", status:"In development", version:"1.0", since:"2021-07-01", changed:"Notice period; new version in development" },
  { name:"Digital Support Technician", code:"ST0120", level:3, months:15, funding:15000, route:"digital", status:"Approved", version:"1.1", since:"2024-05-01", changed:"" },
  { name:"Software and Data foundation apprenticeship", code:"FA0005", level:2, months:8, funding:4000, route:"digital", status:"Approved", version:"1.0", since:"2025-04-29", changed:"" },
  { name:"Hardware, Network and Infrastructure foundation apprenticeship", code:"FA0004", level:2, months:8, funding:4000, route:"digital", status:"Approved", version:"1.0", since:"2025-04-29", changed:"" },
  { name:"Digital Device Repair Technician", code:"ST0682", level:3, months:21, funding:11000, route:"digital", status:"Approved", version:"1.1", since:"2025-12-09", changed:"Version 1.0 retired" },
  { name:"Advanced Digital Forensic Professional", code:"ST1409", level:7, months:36, funding:27000, route:"digital", status:"Approved", version:"1.1", since:"2024-10-02", changed:"" },

  /* Construction */
  { name:"Low Carbon Heating Technician", code:"ST1020", level:3, months:36, funding:22000, route:"construction", status:"Approved", version:"1.2", since:"2026-05-05", changed:"Version 1.1 retired; 1.2 current", article:"low-carbon-heating" },
  { name:"Solar PV Installation and Maintenance (unit)", code:"AU0007", level:3, months:0, funding:950, route:"construction", status:"Approved", version:"1.0", since:"2026-03-17", changed:"New unit approved for delivery" },
  { name:"EV Charging Point Installation and Maintenance (unit)", code:"AU0006", level:3, months:0, funding:950, route:"construction", status:"Approved", version:"1.0", since:"2026-03-17", changed:"New unit approved for delivery" },
  { name:"Permanent Modular Building Assembly (unit)", code:"AU0001", level:2, months:0, funding:3200, route:"construction", status:"Approved", version:"1.0", since:"2026-03-17", changed:"New unit approved for delivery" },
  { name:"Building Services Engineering foundation apprenticeship", code:"FA0001", level:2, months:8, funding:4000, route:"construction", status:"Approved", version:"1.0", since:"2025-04-29", changed:"" },
  { name:"Onsite Trades foundation apprenticeship", code:"FA0003", level:2, months:8, funding:4000, route:"construction", status:"Approved", version:"1.0", since:"2025-04-29", changed:"" },
  { name:"Finishing Trades foundation apprenticeship", code:"FA0002", level:2, months:8, funding:4000, route:"construction", status:"Approved", version:"1.0", since:"2025-04-29", changed:"" },
  { name:"Insulation Installation Operative", code:"ST1480", level:2, months:24, funding:15000, route:"construction", status:"Approved", version:"1.0", since:"2025-07-25", changed:"" },
  { name:"Floorlayer Wood Based", code:"ST1498", level:2, months:30, funding:20000, route:"construction", status:"Approved", version:"1.1", since:"2025-09-09", changed:"Version 1.0 retired" },
  { name:"Domestic Electrician", code:"ST1017", level:3, months:36, funding:19000, route:"construction", status:"Approved", version:"1.1", since:"2025-08-21", changed:"Funding band raised from £15,000 to £19,000" },
  { name:"Craft Bricklayer", code:"ST1334", level:3, months:18, funding:10000, route:"construction", status:"Approved", version:"1.2", since:"2025-08-05", changed:"Version 1.1 retired" },
  { name:"Craft Plasterer", code:"ST1385", level:3, months:18, funding:13000, route:"construction", status:"Approved", version:"1.0", since:"2024-07-17", changed:"" },
  { name:"Craft Painter and Decorator", code:"ST1358", level:3, months:18, funding:12000, route:"construction", status:"Approved", version:"1.2", since:"2025-07-29", changed:"Version 1.1 retired" },
  { name:"Steeplejack", code:"ST1342", level:2, months:24, funding:13000, route:"construction", status:"Approved", version:"1.0", since:"2024-08-16", changed:"" },
  { name:"Thatcher", code:"ST0821", level:2, months:24, funding:21000, route:"construction", status:"Approved", version:"1.0", since:"2024-02-27", changed:"" },
  { name:"Fitted Interiors Installer", code:"ST0980", level:2, months:18, funding:11000, route:"construction", status:"Approved", version:"1.0", since:"2023-10-18", changed:"" },
  { name:"Facilities Management Supervisor", code:"ST0932", level:3, months:18, funding:6000, route:"construction", status:"Defunded from Sept 2026", version:"1.0", since:"2026-09-01", changed:"Funding withdrawn from September 2026", article:"defunding-16" },
  { name:"Fire Safety Engineer", code:"ST0859", level:6, months:60, funding:27000, route:"construction", status:"Approved", version:"1.2", since:"2025-12-09", changed:"Version 1.1 retired" },
  { name:"Construction Support Technician", code:"ST0960", level:3, months:24, funding:11000, route:"construction", status:"Approved", version:"1.0", since:"2022-02-11", changed:"" },
  { name:"Mastic Asphalter", code:"ST0750", level:2, months:34, funding:12000, route:"construction", status:"Approved", version:"1.0", since:"2021-05-17", changed:"" },

  /* Engineering and manufacturing */
  { name:"Engineering and Manufacturing foundation apprenticeship", code:"FA0006", level:2, months:8, funding:4500, route:"engineering-manufacturing", status:"Approved", version:"1.0", since:"2025-04-29", changed:"" },
  { name:"Welding, mechanised (unit)", code:"AU0004", level:2, months:0, funding:2100, route:"engineering-manufacturing", status:"Approved", version:"1.0", since:"2026-03-17", changed:"New unit approved for delivery" },
  { name:"Battery Manufacturing (unit)", code:"AU0008", level:2, months:0, funding:1650, route:"engineering-manufacturing", status:"Approved", version:"1.0", since:"2026-03-24", changed:"New unit approved for delivery" },
  { name:"Electrical Fitting and Assembly (unit)", code:"AU0005", level:2, months:0, funding:1650, route:"engineering-manufacturing", status:"Approved", version:"1.0", since:"2026-03-17", changed:"New unit approved for delivery" },
  { name:"Mechanical Fitting and Assembly (unit)", code:"AU0003", level:2, months:0, funding:1650, route:"engineering-manufacturing", status:"Approved", version:"1.0", since:"2026-03-17", changed:"New unit approved for delivery" },
  { name:"Production Manager", code:"ST1483", level:6, months:18, funding:14000, route:"engineering-manufacturing", status:"Approved", version:"2.0", since:"2026-04-28", changed:"Version 2.0 approved; awaiting assessment organisation" },
  { name:"Aerospace Engineering Technician", code:"ST1313", level:3, months:48, funding:27000, route:"engineering-manufacturing", status:"Approved", version:"1.1", since:"2025-12-09", changed:"Version 1.0 retired" },
  { name:"Engineering Maintenance Technician — dual discipline", code:"ST1443", level:3, months:48, funding:27000, route:"engineering-manufacturing", status:"Approved", version:"1.0", since:"2025-06-23", changed:"" },
  { name:"Engineering Maintenance Technician — single discipline", code:"ST1426", level:3, months:42, funding:27000, route:"engineering-manufacturing", status:"Approved", version:"1.0", since:"2025-06-23", changed:"" },
  { name:"Cold Forming Setter Technician", code:"ST1355", level:3, months:36, funding:24000, route:"engineering-manufacturing", status:"Approved", version:"1.0", since:"2025-05-29", changed:"Awaiting assessment organisation" },
  { name:"Maritime Mechanical Fitter", code:"ST1402", level:3, months:42, funding:27000, route:"engineering-manufacturing", status:"Approved", version:"1.2", since:"2026-05-19", changed:"Version 1.1 retired" },
  { name:"Maritime Electrical Fitter", code:"ST1403", level:3, months:42, funding:26000, route:"engineering-manufacturing", status:"Approved", version:"1.1", since:"2025-05-29", changed:"Version 1.0 retired" },
  { name:"Machining Technician", code:"ST1305", level:3, months:42, funding:27000, route:"engineering-manufacturing", status:"Approved", version:"1.5", since:"2024-06-25", changed:"" },
  { name:"Mechatronics Maintenance Technician", code:"ST1326", level:3, months:42, funding:27000, route:"engineering-manufacturing", status:"Approved", version:"1.0", since:"2024-08-19", changed:"" },
  { name:"Battery Manufacturing Technician", code:"ST1338", level:3, months:36, funding:24000, route:"engineering-manufacturing", status:"Approved", version:"1.0", since:"2023-11-30", changed:"" },
  { name:"Space Engineering Technician", code:"ST0855", level:4, months:48, funding:19000, route:"engineering-manufacturing", status:"Paused for starts", version:"1.1", since:"2024-08-24", changed:"Paused for starts; in revision" },
  { name:"Lead Engineering Maintenance Technician", code:"ST0999", level:4, months:36, funding:19000, route:"engineering-manufacturing", status:"Approved", version:"1.2", since:"2024-06-07", changed:"" },

  /* Health and science */
  { name:"Dental Nurse", code:"ST1431", level:3, months:18, funding:8000, route:"health-science", status:"Approved", version:"2.0", since:"2026-03-25", changed:"GDC 2023 version retired; 2.0 current" },
  { name:"Dental Technician", code:"ST1432", level:5, months:36, funding:22000, route:"health-science", status:"Approved", version:"2.0", since:"2026-03-25", changed:"GDC 2023 version retired; 2.0 current" },
  { name:"Clinical Dental Technician", code:"ST1433", level:5, months:24, funding:18000, route:"health-science", status:"Approved", version:"2.0", since:"2026-03-25", changed:"GDC 2023 version retired; 2.0 current" },
  { name:"Orthodontic Therapist", code:"ST1434", level:4, months:13, funding:18000, route:"health-science", status:"Approved", version:"2.0", since:"2026-03-25", changed:"GDC 2023 version retired; 2.0 current" },
  { name:"Dental Hygienist", code:"ST1383", level:6, months:36, funding:27000, route:"health-science", status:"Approved", version:"2.0", since:"2026-03-25", changed:"Version 1.0 retired; awaiting assessment organisation" },
  { name:"Doctor (degree)", code:"ST0995", level:7, months:60, funding:27000, route:"health-science", status:"Approved", version:"2.0", since:"2026-03-25", changed:"Version 1.0 retired; 2.0 current" },
  { name:"Midwife (2019 NMC standards)", code:"ST0948", level:6, months:48, funding:26000, route:"health-science", status:"Approved", version:"2.0", since:"2026-03-25", changed:"Version 1.1 retired; 2.0 current" },
  { name:"Osteopath", code:"ST1462", level:6, months:48, funding:27000, route:"health-science", status:"Approved", version:"2.0", since:"2026-02-18", changed:"Version 2.0 approved for delivery" },
  { name:"Biomedical Scientist", code:"ST1314", level:6, months:36, funding:27000, route:"health-science", status:"Approved", version:"2.0", since:"2025-08-14", changed:"Version 1.2 retired; 2.0 current" },
  { name:"Community Nurse Specialist Practitioner (NMC 2022)", code:"ST1419", level:7, months:24, funding:14000, route:"health-science", status:"Approved", version:"2.0", since:"2026-03-25", changed:"Version 1.0 retired; 2.0 current" },
  { name:"Specialist Community Public Health Nurse (NMC 2022)", code:"ST1418", level:7, months:18, funding:14000, route:"health-science", status:"Approved", version:"2.0", since:"2026-03-25", changed:"Version 1.1 retired; 2.0 current" },
  { name:"Orthoptist", code:"ST1272", level:6, months:36, funding:25000, route:"health-science", status:"Approved", version:"2.0", since:"2026-03-25", changed:"Version 1.0 retired; 2.0 current" },
  { name:"Dispensing Optician", code:"ST0774", level:6, months:36, funding:23000, route:"health-science", status:"Approved", version:"2.0", since:"2026-03-25", changed:"Version 1.3 retired; 2.0 current" },
  { name:"Optical Assistant 2022", code:"ST1377", level:3, months:18, funding:8000, route:"health-science", status:"Approved", version:"1.2", since:"2025-12-10", changed:"Version 1.1 retired" },
  { name:"Mortuary Technician", code:"ST0889", level:3, months:18, funding:13000, route:"health-science", status:"Approved", version:"1.1", since:"2025-12-10", changed:"Version 1.0 retired" },
  { name:"Health and Social Care foundation apprenticeship", code:"FA0007", level:2, months:8, funding:3000, route:"health-science", status:"Approved", version:"1.1", since:"2025-04-29", changed:"" },
  { name:"Enhanced Clinical Practitioner", code:"ST0895", level:6, months:18, funding:7000, route:"health-science", status:"Approved", version:"1.2", since:"2025-11-20", changed:"Version 1.1 retired" },

  /* Care services */
  { name:"Lead Practitioner in Adult Care", code:"ST0007", level:4, months:18, funding:7000, route:"care-services", status:"Defunded from Sept 2026", version:"1.0", since:"2026-09-01", changed:"Funding withdrawn from September 2026", article:"defunding-16" },
  { name:"Safeguarding Support Officer", code:"ST1030", level:3, months:18, funding:7000, route:"care-services", status:"Approved", version:"1.0", since:"2024-10-14", changed:"" },
  { name:"Youth Worker", code:"ST0522", level:6, months:36, funding:20000, route:"care-services", status:"Approved", version:"1.1", since:"2025-07-16", changed:"Version 1.0 retired" },
  { name:"Youth Support Worker", code:"ST0906", level:3, months:18, funding:4500, route:"care-services", status:"Approved", version:"1.2", since:"2025-12-10", changed:"Version 1.1 retired" },
  { name:"Youth Justice Practitioner", code:"ST0878", level:5, months:25, funding:17000, route:"care-services", status:"Approved", version:"1.1", since:"2025-12-10", changed:"Version 1.0 retired" },
  { name:"Domestic and Sexual Abuse Support Worker", code:"ST0862", level:4, months:18, funding:8000, route:"care-services", status:"Approved", version:"1.0", since:"2024-04-19", changed:"" },
  { name:"Peer Worker", code:"ST0896", level:3, months:15, funding:5000, route:"care-services", status:"Approved", version:"1.0", since:"2022-07-20", changed:"" },

  /* Education and early years */
  { name:"Learning and Skills Assessor", code:"ST1380", level:3, months:12, funding:5000, route:"education-early-years", status:"Defunded from Sept 2026", version:"1.1", since:"2026-09-01", changed:"Funding withdrawn from September 2026", article:"defunding-16" },
  { name:"Learning and Skills Mentor", code:"ST1379", level:4, months:12, funding:5000, route:"education-early-years", status:"Defunded from Sept 2026", version:"1.3", since:"2026-09-01", changed:"Funding withdrawn from September 2026", article:"defunding-16" },
  { name:"Outdoor Learning Specialist", code:"ST0945", level:5, months:24, funding:13000, route:"education-early-years", status:"Defunded from Sept 2026", version:"1.0", since:"2026-09-01", changed:"Funding withdrawn from September 2026", article:"defunding-16" },
  { name:"Specialist Teaching Assistant", code:"ST1414", level:5, months:24, funding:12000, route:"education-early-years", status:"In development", version:"1.1", since:"2026-12-14", changed:"Reformed assessment plan starts 14 December 2026", article:"epa-reform" },
  { name:"Teacher — Undergraduate", code:"ST1502", level:6, months:45, funding:27000, route:"education-early-years", status:"Approved", version:"2.0", since:"2026-08-13", changed:"Version 1.1 retired; 2.0 current" },
  { name:"Early Years Teacher (with EYTS)", code:"ST1077", level:6, months:33, funding:27000, route:"education-early-years", status:"Approved", version:"1.1", since:"2025-04-14", changed:"Version 1.0 retired" },
  { name:"Early Years Lead Practitioner", code:"ST0551", level:5, months:24, funding:9000, route:"education-early-years", status:"Approved", version:"1.1", since:"2025-08-01", changed:"Funding band raised from £8,000 to £9,000" },
  { name:"Digital Learning Designer", code:"ST0974", level:5, months:24, funding:16000, route:"education-early-years", status:"Approved", version:"1.0", since:"2023-05-25", changed:"" },
  { name:"Playworker", code:"ST0867", level:2, months:18, funding:5000, route:"education-early-years", status:"Approved", version:"1.0", since:"2023-02-02", changed:"" },
  { name:"Teacher for the Sensory Impaired", code:"ST0966", level:7, months:24, funding:14000, route:"education-early-years", status:"Approved", version:"1.0", since:"2023-11-14", changed:"" },

  /* Protective services */
  { name:"Professional Security Operative", code:"ST1016", level:2, months:12, funding:6000, route:"protective-services", status:"Defunded from Sept 2026", version:"1.0", since:"2026-09-01", changed:"Funding withdrawn from September 2026", article:"defunding-16" },
  { name:"Security First Line Manager", code:"ST0868", level:3, months:18, funding:6000, route:"protective-services", status:"Defunded from Sept 2026", version:"1.0", since:"2026-09-01", changed:"Funding withdrawn from September 2026", article:"defunding-16" },
  { name:"Custody and Detention Professional", code:"ST0269", level:3, months:12, funding:5000, route:"protective-services", status:"Defunded from Sept 2026", version:"1.0", since:"2026-09-01", changed:"Funding withdrawn from September 2026", article:"defunding-16" },
  { name:"Public Sector Compliance Investigator and Officer", code:"ST0263", level:3, months:18, funding:7000, route:"protective-services", status:"Defunded from Sept 2026", version:"1.0", since:"2026-09-01", changed:"Funding withdrawn from September 2026", article:"defunding-16" },
  { name:"Protective Security Adviser", code:"ST1401", level:4, months:21, funding:9000, route:"protective-services", status:"Approved", version:"1.0", since:"2025-05-14", changed:"" },
  { name:"Anti-Social Behaviour and Community Safety Officer", code:"ST0930", level:4, months:24, funding:8000, route:"protective-services", status:"Approved", version:"1.2", since:"2024-04-29", changed:"" },
  { name:"Resilience and Emergencies Professional", code:"ST1322", level:6, months:40, funding:23000, route:"protective-services", status:"Approved", version:"1.1", since:"2024-10-15", changed:"" },
  { name:"Non Home Office Police Officer", code:"ST0764", level:4, months:24, funding:13000, route:"protective-services", status:"In development", version:"1.0", since:"2021-05-17", changed:"Notice period; new version in development" },

  /* Transport and logistics */
  { name:"Bus, Coach and HGV Service and Maintenance Technician", code:"ST1422", level:2, months:24, funding:14000, route:"transport-logistics", status:"Approved", version:"2.0", since:"2026-08-05", changed:"Version 2.0 approved; awaiting assessment organisation" },
  { name:"Urban Driver", code:"ST1025", level:2, months:12, funding:8000, route:"transport-logistics", status:"Approved", version:"1.1", since:"2024-10-24", changed:"Funding band raised from £5,000 to £8,000" },
  { name:"Rail Infrastructure Operator", code:"ST1378", level:3, months:18, funding:15000, route:"transport-logistics", status:"In development", version:"1.1", since:"2024-09-04", changed:"Notice period; new version in development" },
  { name:"Transport Scheduler", code:"ST1438", level:3, months:18, funding:8000, route:"transport-logistics", status:"In development", version:"1.0", since:"2023-12-21", changed:"Notice period; new version in development" },
  { name:"Aviation Ground Handler", code:"ST0908", level:2, months:12, funding:3500, route:"transport-logistics", status:"Approved", version:"1.0", since:"2021-09-13", changed:"" },
  { name:"Aviation Customer Service Operative", code:"ST0907", level:2, months:12, funding:3500, route:"transport-logistics", status:"Retirement consultation", version:"1.1", since:"2025-12-10", changed:"Retirement consultation open" },
  { name:"Removals Operative", code:"ST1393", level:2, months:12, funding:5000, route:"transport-logistics", status:"In development", version:"1.0", since:"2024-07-19", changed:"Notice period; new version in development" },
  { name:"Traffic Operator", code:"ST1394", level:2, months:12, funding:6000, route:"transport-logistics", status:"Approved", version:"1.1", since:"2025-02-12", changed:"Version 1.0 retired" },
  { name:"Transport and Warehouse Operations Supervisor", code:"ST0647", level:3, months:12, funding:5000, route:"transport-logistics", status:"Approved", version:"1.1", since:"2022-11-18", changed:"" },

  /* Creative and design */
  { name:"Journalist", code:"ST1490", level:6, months:18, funding:14000, route:"creative-design", status:"Approved", version:"2.0", since:"2026-04-14", changed:"Replaces retired Level 5 Journalist standard" },
  { name:"Junior Journalist", code:"ST1516", level:5, months:14, funding:13000, route:"creative-design", status:"Approved", version:"1.0", since:"2026-04-14", changed:"New standard approved for delivery" },
  { name:"Interior Designer", code:"ST1361", level:6, months:36, funding:26000, route:"creative-design", status:"Approved", version:"2.0", since:"2026-05-21", changed:"Version 2.0 approved; awaiting assessment organisation" },
  { name:"Publishing Professional", code:"ST1442", level:4, months:24, funding:10000, route:"creative-design", status:"In development", version:"1.1", since:"2025-10-15", changed:"Notice period; new version in development" },
  { name:"Creative Industries Production Technician", code:"ST1297", level:3, months:24, funding:14000, route:"creative-design", status:"In development", version:"1.1", since:"2025-12-09", changed:"Notice period; new version in development" },
  { name:"Scenic Artist", code:"ST0916", level:3, months:21, funding:19000, route:"creative-design", status:"In development", version:"1.0", since:"2023-02-28", changed:"Notice period; new version in development" },
  { name:"Hair, Wigs, Make-up and Prosthetics Technician", code:"ST0918", level:3, months:24, funding:14000, route:"creative-design", status:"In development", version:"1.0", since:"2023-02-28", changed:"Notice period; new version in development" },
  { name:"Junior VFX Artist or Assistant Technical Director", code:"ST1325", level:4, months:18, funding:10000, route:"creative-design", status:"Approved", version:"1.2", since:"2025-12-09", changed:"Version 1.1 retired" },
  { name:"Furniture Restorer", code:"ST0978", level:3, months:36, funding:13000, route:"creative-design", status:"Approved", version:"1.1", since:"2025-12-09", changed:"Version 1.0 retired" },
  { name:"Craft Technician", code:"ST0919", level:3, months:18, funding:14000, route:"creative-design", status:"Approved", version:"1.1", since:"2024-08-27", changed:"" },
  { name:"Advertising Creative", code:"ST1340", level:6, months:24, funding:17000, route:"creative-design", status:"Approved", version:"1.0", since:"2023-11-24", changed:"" },
  { name:"Print Operative", code:"ST0962", level:2, months:24, funding:8000, route:"creative-design", status:"Approved", version:"1.2", since:"2025-12-10", changed:"Version 1.1 retired" },

  /* Legal, finance and accounting */
  { name:"Advanced Paralegal", code:"ST1476", level:5, months:24, funding:18000, route:"legal-finance-accounting", status:"Approved", version:"2.0", since:"2026-07-27", changed:"Version 1.0 retired; 2.0 current" },
  { name:"Professional Taxation Technician", code:"ST1458", level:4, months:24, funding:15000, route:"legal-finance-accounting", status:"Approved", version:"2.0", since:"2026-07-27", changed:"Version 1.0 retired; 2.0 current" },
  { name:"Barrister", code:"ST1389", level:7, months:72, funding:27000, route:"legal-finance-accounting", status:"Approved", version:"2.0", since:"2026-05-01", changed:"Version 1.0 retired; 2.0 current" },
  { name:"Chartered Legal Executive Litigator and Advocate", code:"ST1368", level:7, months:66, funding:27000, route:"legal-finance-accounting", status:"Approved", version:"2.1", since:"2026-05-01", changed:"Version 2.0 retired; 2.1 current" },
  { name:"Licensed Conveyancer or Licensed Probate Practitioner", code:"ST1311", level:6, months:56, funding:18000, route:"legal-finance-accounting", status:"Approved", version:"2.0", since:"2026-06-08", changed:"Version 1.1 retired; 2.0 current" },
  { name:"Legal Technician — conveyancing or probate", code:"ST1312", level:4, months:24, funding:10000, route:"legal-finance-accounting", status:"Approved", version:"2.0", since:"2026-06-08", changed:"Version 1.0 retired; 2.0 current" },
  { name:"Costs Lawyer", code:"ST1400", level:6, months:48, funding:21000, route:"legal-finance-accounting", status:"Approved", version:"2.0", since:"2024-09-16", changed:"" },
  { name:"Internal Audit Technician", code:"ST1484", level:4, months:18, funding:10000, route:"legal-finance-accounting", status:"Approved", version:"2.0", since:"2026-03-13", changed:"Version 2.0 approved for delivery" },
  { name:"Accounting Finance Manager", code:"ST1303", level:6, months:36, funding:27000, route:"legal-finance-accounting", status:"Approved", version:"1.0", since:"2023-02-21", changed:"" },
  { name:"Paraplanner and Financial Planner", code:"ST1301", level:4, months:24, funding:13000, route:"legal-finance-accounting", status:"Approved", version:"1.0", since:"2025-05-02", changed:"" },

  /* Catering and hospitality */
  { name:"Catering and Hospitality foundation apprenticeship", code:"FA0008", level:2, months:8, funding:3500, route:"catering-hospitality", status:"Approved", version:"1.0", since:"2026-04-01", changed:"New foundation apprenticeship approved" },
  { name:"Cleaning Hygiene Operative", code:"ST0808", level:2, months:12, funding:4000, route:"catering-hospitality", status:"Defunded from Sept 2026", version:"1.0", since:"2026-09-01", changed:"Funding withdrawn from September 2026", article:"defunding-16" },
  { name:"Hospitality Accommodation Team Member", code:"ST1420", level:2, months:12, funding:6000, route:"catering-hospitality", status:"Approved", version:"1.0", since:"2025-05-16", changed:"" },
  { name:"Food and Beverage Team Member", code:"ST1488", level:2, months:12, funding:6000, route:"catering-hospitality", status:"Approved", version:"1.0", since:"2024-12-18", changed:"" },
  { name:"Pastry Chef", code:"ST0929", level:3, months:18, funding:11000, route:"catering-hospitality", status:"Approved", version:"1.0", since:"2024-04-30", changed:"" },
  { name:"Lead Baker", code:"ST1349", level:3, months:24, funding:9000, route:"catering-hospitality", status:"Approved", version:"1.0", since:"2023-11-07", changed:"" },

  /* Sales, marketing and procurement */
  { name:"Retail Service, Supply and Administration foundation apprenticeship", code:"FA0009", level:2, months:8, funding:3500, route:"sales-marketing-procurement", status:"Approved", version:"1.0", since:"2026-04-14", changed:"New foundation apprenticeship approved" },
  { name:"Multi-channel Marketer", code:"ST1031", level:3, months:18, funding:11000, route:"sales-marketing-procurement", status:"In development", version:"1.1", since:"2025-05-15", changed:"Notice period; new version in development" },
  { name:"Senior Procurement and Supply Chain Professional", code:"ST0811", level:6, months:30, funding:18000, route:"sales-marketing-procurement", status:"Approved", version:"1.0", since:"2023-10-18", changed:"" },
  { name:"Procurement and Supply Assistant", code:"ST0810", level:3, months:18, funding:6000, route:"sales-marketing-procurement", status:"Approved", version:"1.1", since:"2025-12-10", changed:"Version 1.0 retired" },
  { name:"Recruiter", code:"ST1421", level:3, months:18, funding:7000, route:"sales-marketing-procurement", status:"Approved", version:"1.0", since:"2024-08-20", changed:"" },
  { name:"Market Research Executive", code:"ST0883", level:4, months:18, funding:8000, route:"sales-marketing-procurement", status:"Approved", version:"1.0", since:"2021-05-27", changed:"" },

  /* Agriculture, environmental and animal care */
  { name:"Forestry Works Manager", code:"ST1427", level:4, months:15, funding:8000, route:"agriculture", status:"Approved", version:"1.0", since:"2025-02-19", changed:"" },
  { name:"General Farm Worker", code:"ST0937", level:2, months:18, funding:8000, route:"agriculture", status:"Approved", version:"1.3", since:"2025-07-25", changed:"Funding band raised from £5,000 to £8,000" },
  { name:"Livestock Unit Technician", code:"ST0938", level:3, months:18, funding:9000, route:"agriculture", status:"Approved", version:"1.3", since:"2025-07-25", changed:"Funding band raised from £5,000 to £9,000" },
  { name:"Detection and Protection Working Dog Specialist", code:"ST1298", level:3, months:24, funding:12000, route:"agriculture", status:"Approved", version:"1.0", since:"2025-06-23", changed:"" },
  { name:"Animal Care and Welfare Manager", code:"ST1359", level:3, months:18, funding:9000, route:"agriculture", status:"Approved", version:"1.0", since:"2023-10-16", changed:"" },
  { name:"Professional Arboriculturist (integrated degree)", code:"ST0922", level:6, months:48, funding:22000, route:"agriculture", status:"In development", version:"1.0", since:"2021-11-12", changed:"New integrated degree version in development" },
  { name:"Vet Technician (livestock)", code:"ST0946", level:5, months:24, funding:13000, route:"agriculture", status:"Approved", version:"1.0", since:"2021-05-27", changed:"" },
  { name:"Fisher", code:"ST0952", level:2, months:18, funding:10000, route:"agriculture", status:"Approved", version:"1.1", since:"2025-05-12", changed:"Version 1.0 retired" },

  /* Hair and beauty */
  { name:"Barbering Professional", code:"ST1273", level:2, months:18, funding:9000, route:"hair-beauty", status:"Approved", version:"1.0", since:"2023-05-22", changed:"" },
  { name:"Wellbeing and Holistic Therapist", code:"ST0685", level:3, months:20, funding:9000, route:"hair-beauty", status:"Approved", version:"1.1", since:"2025-12-09", changed:"Version 1.0 retired" }
];
