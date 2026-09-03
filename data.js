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
    url: "https://assets.publishing.service.gov.uk/media/67b32312b56d8b0856c2fd60/Apprenticeship_funding_rules_2024_to_2025_summary_of_changes.pdf"
  },
  {
    date: "2025-08-28",
    title: "Minimum apprenticeship duration cut from 12 months to 8 months",
    category: "funding-rules", route: "", standard: "", article: "min-duration",
    status: "updated", urgency: "high", pinned: false,
    summary: "For new starts from 1 August 2025 the minimum programme duration fell to 8 months. This supersedes 12-month references in existing end-point assessment plans. Earlier starters stay on 12 months.",
    url: "https://www.gov.uk/guidance/apprenticeship-funding-rules"
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
    standard: "Bus, Coach and HGV Service and Maintenance Technician, Level 2 (ST1422)", article: "route-transport",
    status: "updated", urgency: "medium", pinned: false,
    summary: "A revised version approved for delivery from August 2026, covering servicing and maintenance of buses, coaches and heavy goods vehicles. 24 months, £14,000 funding band.",
    url: "https://skillsengland.education.gov.uk/apprenticeships/"
  },
  {
    date: "2026-08-15",
    title: "Data Engineer standard revision underway",
    category: "standard", route: "digital",
    standard: "Data Engineer, Level 5 (ST1386)", article: "route-digital",
    status: "in-review", urgency: "low", pinned: false,
    summary: "An approved version sits alongside a new version in development. Learners progressing from the Digital Data Analytics T-Level commonly feed into this standard.",
    url: "https://skillsengland.education.gov.uk/apprenticeships/"
  },
  {
    date: "2026-08-15",
    title: "Applications Support Lead standard in development",
    category: "standard", route: "digital",
    standard: "Applications Support Lead, Level 4 (ST0949)", article: "standards-in-review",
    status: "in-review", urgency: "low", pinned: false,
    summary: "Moving through proposal, standard, assessment plan and funding stages rather than being approved for delivery. 24 months, £17,000 funding band.",
    url: "https://skillsengland.education.gov.uk/apprenticeships/"
  },
  {
    date: "2026-04-21",
    title: "Three AI leadership apprenticeship units approved",
    category: "standard", route: "digital",
    standard: "AI Leadership units, Level 5 (AU0009, AU0010, AU0011)", article: "route-digital",
    status: "updated", urgency: "low", pinned: false,
    summary: "Level 5 units covering AI strategy and opportunity, AI adoption, procurement and governance, and AI delivery and organisational transformation. £750 per unit.",
    url: "https://skillsengland.education.gov.uk/apprenticeships/"
  },
  {
    date: "2026-04-14",
    title: "Journalist and Junior Journalist standards restructured",
    category: "standard", route: "creative-design",
    standard: "Journalist, Level 6 (ST1490) and Junior Journalist, Level 5 (ST1516)", article: "route-creative",
    status: "updated", urgency: "low", pinned: false,
    summary: "The Level 5 Journalist standard has retired, replaced by a Level 6 Journalist and a new Level 5 Junior Journalist, changing the progression ladder on this pathway.",
    url: "https://skillsengland.education.gov.uk/apprenticeships/"
  },
  {
    date: "2026-04-01",
    title: "Two new foundation apprenticeships approved for delivery",
    category: "standard", route: "catering-hospitality",
    standard: "Catering and Hospitality (FA0008) and Retail Service, Supply and Administration (FA0009), Level 2", article: "route-hospitality-retail",
    status: "updated", urgency: "medium", pinned: false,
    summary: "Both are 8-month Level 2 foundation apprenticeships funded at £3,500, giving an entry route for learners not yet ready for a full standard.",
    url: "https://skillsengland.education.gov.uk/apprenticeships/"
  },
  {
    date: "2026-01-01",
    title: "2025 to 2026 funding rules updated to version 3",
    category: "funding-rules", route: "", standard: "", article: "rules-2627",
    status: "updated", urgency: "medium", pinned: false,
    summary: "References to the former Education and Skills Funding Agency removed following the move of its functions into the Department for Education. A new annex sets out minimum off-the-job training by standard.",
    url: "https://assets.publishing.service.gov.uk/media/6936acd76a167b6884b7360e/Funding_Rules_2025_to_2026.pdf"
  },
  {
    date: "2026-03-10",
    title: "Employer Support Fund continues into 2026/27",
    category: "levy", route: "", standard: "", article: "tlevel-placements",
    status: "updated", urgency: "low", pinned: false,
    summary: "The fund continues for 2026/27, helping employers delivering the Health T-Level, and small and medium employers delivering all T-Levels, meet the essential costs of industry placements.",
    url: "https://support.tlevels.gov.uk/hc/en-gb/articles/33892267278994-T-Levels-update-10-March-2026"
  },
  {
    date: "2026-05-21",
    title: "Interior Designer standard updated to version 2.0",
    category: "standard", route: "creative-design",
    standard: "Interior Designer, Level 6 (ST1361)", article: "route-creative",
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
    icon: "stop",
    summary: "Sixteen standards including Team Leader and Operations Manager lose funding — existing learners are safe, new starts are not.",
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
    icon: "coin",
    summary: "Funds now expire in 12 months, the 10% top-up is gone, and co-investment jumps from 5% to 25%.",
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
    icon: "cap",
    summary: "Master's-level apprenticeships are now funded only for under-22s, with two narrow exceptions.",
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
    icon: "book",
    summary: "Adults aged 19+ no longer need Level 2 English and maths to complete — unless the standard makes it mandatory.",
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
      { label: "GOV.UK — Apprenticeship funding rules 2024 to 2025 (the rules themselves)", url: "https://www.gov.uk/government/publications/apprenticeship-funding-rules-2024-to-2025" },
      { label: "GOV.UK — Summary of changes, version 2, February 2025", url: "https://assets.publishing.service.gov.uk/media/67b32312b56d8b0856c2fd60/Apprenticeship_funding_rules_2024_to_2025_summary_of_changes.pdf" }
    ]
  },
  {
    id: "min-duration",
    icon: "clock",
    summary: "Programmes can now run to 8 months instead of 12, and this overrides the wording in your assessment plans.",
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
      { label: "GOV.UK — Apprenticeship funding rules 2024 to 2025 (the rules themselves)", url: "https://www.gov.uk/government/publications/apprenticeship-funding-rules-2024-to-2025" },
      { label: "GOV.UK — Summary of changes, version 2, February 2025", url: "https://assets.publishing.service.gov.uk/media/67b32312b56d8b0856c2fd60/Apprenticeship_funding_rules_2024_to_2025_summary_of_changes.pdf" }
    ]
  },
  {
    id: "sme-funding",
    icon: "shop",
    summary: "Under-25s at smaller employers are now fully funded, which quietly removes most of the case for levy transfers.",
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
      "For SMEs the practical effect is that an apprentice under 25 carries no direct training cost. That is worth knowing when you build a training budget or make the case for an apprenticeship programme internally. It is not a reason to prefer younger candidates: age is a protected characteristic under the Equality Act 2010, and selecting on it is unlawful regardless of the funding position."
    ],
    sources: [
      { label: "Apprenticeship Service — Budget 2025, Growth and Skills Levy", url: "https://help.apprenticeships.education.gov.uk/hc/en-gb/articles/31398346955154-Budget-2025-Growth-and-Skills-Levy" }
    ]
  },
  {
    id: "units-foundation",
    icon: "blocks",
    summary: "Levy money can finally buy something shorter than a full apprenticeship.",
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
      { label: "Skills England apprenticeship register", url: "https://skillsengland.education.gov.uk/apprenticeships/" },
      { label: "GOV.UK — Funding rules for apprenticeships collection", url: "https://www.gov.uk/government/collections/funding-rules-for-apprenticeships" }
    ]
  },
  {
    id: "epa-reform",
    icon: "check",
    summary: "Every assessment plan is being rewritten one group at a time, so two regimes run side by side for a year or more.",
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
    icon: "handshake",
    summary: "Providers get real latitude to design placements locally, but judgement moves onto you.",
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
    icon: "desk",
    summary: "A brand new Level 2 entry point into business administration, already restricted to under-25s.",
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
      { label: "GOV.UK — Funding rules for apprenticeships collection", url: "https://www.gov.uk/government/collections/funding-rules-for-apprenticeships" },
      { label: "GOV.UK — Apprenticeship funding rules", url: "https://www.gov.uk/guidance/apprenticeship-funding-rules" }
    ]
  },
  {
    id: "low-carbon-heating",
    icon: "flame",
    summary: "The construction route finally has a joined-up net zero ladder from 16 through to technician.",
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
    icon: "layers",
    summary: "Three rulebooks are live at once and which applies depends on the learner, not the date.",
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
    icon: "signpost",
    summary: "A rename that signals a wider role, ahead of Level 2 reform replacing it entirely.",
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
    scope:"standards", standards:["Team Leader","Operations Manager","Coaching Professional","Improvement Practitioner","Improvement Leader","Chartered Manager (degree)","Cleaning Hygiene Operative","Custody and Detention Professional","Facilities Management Supervisor","Lead Practitioner in Adult Care","Learning and Skills Assessor","Learning and Skills Mentor","Outdoor Learning Specialist","Professional Security Operative","Public Sector Compliance Investigator and Officer","Security First Line Manager"], routes:[],
    type: "deadline", urgency: "high",
    who: "Providers and employers",
    action: "No new funded starts on the 16 standards after this date. Confirm every intended learner is enrolled and on-programme. Existing learners are unaffected and remain funded to completion.",
    article: "defunding-16"
  },
  {
    date: "2026-09-01",
    title: "Low Carbon Heating specialism available",
    scope:"route", standards:[], routes:["construction"],
    type: "change", urgency: "medium",
    who: "Construction providers",
    action: "First delivery of the new occupational specialism in the Building Services Engineering T-Level. Confirm placement capacity with local heating and renewables employers.",
    article: "low-carbon-heating"
  },
  {
    date: "2026-09-01",
    title: "Last enrolments for the Finance T-Level",
    scope:"route", standards:[], routes:["legal-finance-accounting"],
    type: "deadline", urgency: "medium",
    who: "Providers",
    action: "New enrolments on the Finance T-Level cease after September 2026. Plan an alternative offer for prospective students in this subject, such as Accounting.",
    article: ""
  },
  {
    date: "2026-10-01",
    title: "T-Levels Week",
    scope:"all", standards:[], routes:[],
    type: "window", urgency: "low",
    who: "Providers and employers",
    action: "Annual T-Levels Week takes place in October. A practical window for employer engagement and placement recruitment for the following year.",
    article: ""
  },
  {
    date: "2026-12-31",
    title: "Review levy balance against the new 12-month expiry",
    scope:"all", standards:[], routes:[],
    type: "watch", urgency: "high",
    who: "Levy-paying employers",
    action: "Funds paid in from August 2026 expire 12 months later. Run a forecast before the calendar year ends to identify what would lapse and commit it, including to units and foundation apprenticeships.",
    article: "growth-skills-levy"
  },
  {
    date: "2027-01-01",
    title: "Level 7 restriction fully embedded",
    scope:"all", standards:[], routes:[],
    type: "change", urgency: "medium",
    who: "Employers",
    action: "One year on from the restriction. Any remaining pre-2026 Level 7 apprentices should be tracked to completion; no new over-22 starts are fundable.",
    article: "level-7"
  },
  {
    date: "2027-04-01",
    title: "Assessment plan transition completes",
    scope:"all", standards:[], routes:[],
    type: "deadline", urgency: "medium",
    who: "Providers and assessment organisations",
    action: "End of the 12 to 18 month transition window. Audit which of your standards have moved to reformed assessment plans and which have not, and align internal quality processes to each.",
    article: "epa-reform"
  },
  {
    date: "2027-08-01",
    title: "2027 to 2028 funding rules take effect",
    scope:"all", standards:[], routes:[],
    type: "change", urgency: "medium",
    who: "Providers",
    action: "New rules apply to starts from this date. Three or four rulebooks will be live at once. Confirm your MIS applies the correct rule set per apprentice start date.",
    article: "rules-2627"
  },
  {
    date: "2027-09-01",
    title: "Foundation Year renamed; Further Study pathways begin",
    scope:"all", standards:[], routes:[],
    type: "change", urgency: "medium",
    who: "Providers",
    action: "The T-Level Foundation Year becomes the Foundation Year, and Further Study and Occupational pathways start being introduced subject by subject, gradually replacing it.",
    article: "foundation-year"
  },
  {
    date: "2028-09-01",
    title: "Social Care T-Level first delivery",
    scope:"route", standards:[], routes:["care-services"],
    type: "change", urgency: "low",
    who: "Care services providers",
    action: "The Social Care T-Level becomes available. Begin employer placement conversations well ahead — care placements need safeguarding clearance and lead time.",
    article: ""
  }
];

MILESTONES.push(
  { date:"2026-09-30", title:"Confirm every 2026/27 start is on the correct rulebook",
    scope:"all", standards:[], routes:[],
    type:"watch", urgency:"medium", who:"Providers",
    action:"Three rulebooks are live at once. Audit your MIS to confirm each apprentice is being funded under the rules that applied on their start date, not the current year's.",
    article:"rules-2627" },
  { date:"2026-11-30", title:"Plan replacement provision for defunded management standards",
    scope:"standards", standards:["Team Leader","Operations Manager","Coaching Professional"], routes:[],
    type:"watch", urgency:"high", who:"Providers and employers",
    action:"With no announced replacement for most of the 16, decide now whether to move learners to an adjacent standard, use apprenticeship units, or fund development outside the levy.",
    article:"defunding-16" },
  { date:"2027-01-31", title:"Review off-the-job hours against the new annex",
    scope:"all", standards:[], routes:[],
    type:"watch", urgency:"medium", who:"Providers",
    action:"Version 3 of the 2025/26 rules added an annex setting minimum off-the-job training by standard. Check your planned hours per programme against it.",
    article:"" },
  { date:"2027-07-31", title:"2026/27 funding year ends",
    scope:"all", standards:[], routes:[],
    type:"deadline", urgency:"medium", who:"Providers and employers",
    action:"Final date for starts under the 2026/27 rules. Reservations, ILR records and subcontractor declarations should be reconciled before year end.",
    article:"" }
);

MILESTONES.push(
  { date:"2027-02-08", title:"National Apprenticeship Week 2027",
    scope:"all", standards:[], routes:[],
    type:"window", urgency:"low", who:"Providers and employers",
    action:"The sector's main annual campaign week, usually early February. Historically the window in which apprenticeship policy announcements are made, so worth watching as well as taking part in.",
    article:"" },
  { date:"2026-10-12", title:"T Levels Week 2026",
    scope:"all", standards:[], routes:[],
    type:"window", urgency:"low", who:"Providers and employers",
    action:"Annual T Levels campaign week each October. A practical window for employer engagement and recruiting industry placements for the following academic year.",
    article:"tlevel-placements" },
  { date:"2027-10-11", title:"T Levels Week 2027",
    scope:"all", standards:[], routes:[],
    type:"window", urgency:"low", who:"Providers and employers",
    action:"Falls in the first year of the renamed Foundation Year and the new Further Study pathways, so expect the messaging to change.",
    article:"foundation-year" },
  { date:"2026-10-01", title:"£2,000 hiring payment starts for non-levy employers",
    scope:"all", standards:[], routes:[],
    type:"change", urgency:"high", who:"Non-levy employers and their providers",
    action:"Applies to apprentices aged 16 to 24 starting from 1 October 2026 who joined the employer within the previous 3 months. Paid in two instalments, the first after 90 days. Check your onboarding records capture the job start date, since eligibility depends on it.",
    article:"" },
  { date:"2026-09-30", title:"Subcontracting review concludes",
    scope:"all", standards:[], routes:[],
    type:"watch", urgency:"medium", who:"Providers using subcontractors",
    action:"DWP is reviewing the whole subcontracting section — policy, rules, evidence requirements and definitions — with sector bodies. Changes take effect from 2027 and new subcontractor definitions are likely from 1 January 2027.",
    article:"" }
);

/* ---------- 6. STANDARDS REGISTER --------------------------------------
   A working subset of the Skills England register, grouped by route.
   changed : "" means no change recorded since the date in "since".
   ----------------------------------------------------------------------- */

const STANDARDS = [
  /* Business and administration */
  { name:"Administration Assistant", code:"ST1472", level:2, months:12, funding:4000, route:"business-administration", epa:"Assigned", status:"Approved", version:"2.0", since:"2026-08-01", changed:"Version 2.0 approved; new age restriction 16 to 24", article:"admin-assistant" },
  { common:true, name:"Team Leader", code:"", level:3, months:12, funding:5000, route:"business-administration", epa:"Assigned", status:"Defunded from Sept 2026", version:"1.1", since:"2026-09-01", changed:"Funding withdrawn from September 2026", article:"defunding-16" },
  { common:true, name:"Operations Manager", code:"", level:5, months:18, funding:7000, route:"business-administration", epa:"Assigned", status:"Defunded from Sept 2026", version:"1.1", since:"2026-09-01", changed:"Funding withdrawn from September 2026", article:"defunding-16" },
  { common:true, name:"Coaching Professional", code:"", level:5, months:14, funding:5000, route:"business-administration", epa:"Assigned", status:"Defunded from Sept 2026", version:"1.0", since:"2026-09-01", changed:"Funding withdrawn from September 2026", article:"defunding-16" },
  { common:true, name:"Improvement Practitioner", code:"", level:4, months:18, funding:9000, route:"business-administration", epa:"Assigned", status:"Defunded from Sept 2026", version:"1.1", since:"2026-09-01", changed:"Funding withdrawn from September 2026", article:"defunding-16" },
  { name:"Improvement Leader", code:"", level:6, months:24, funding:15000, route:"business-administration", epa:"Assigned", status:"Defunded from Sept 2026", version:"1.0", since:"2026-09-01", changed:"Funding withdrawn from September 2026", article:"defunding-16" },
  { name:"Chartered Manager (degree)", code:"", level:6, months:48, funding:22000, route:"business-administration", epa:"Assigned", status:"Defunded from Sept 2026", version:"1.1", since:"2026-09-01", changed:"Funding withdrawn from September 2026", article:"defunding-16" },
  { name:"Governance Officer", code:"ST1302", level:4, months:18, funding:11000, route:"business-administration", epa:"Pending — standard in development", status:"In development", version:"1.0", since:"2023-05-25", changed:"New version in development" },
  { name:"Senior People Professional", code:"ST0813", level:7, months:36, funding:19000, route:"business-administration", epa:"Assigned", status:"Approved", version:"1.0", since:"2021-01-07", changed:"" },
  { name:"Payroll Assistant Manager", code:"ST0869", level:5, months:24, funding:11000, route:"business-administration", epa:"Assigned", status:"Approved", version:"2.0", since:"2026-07-27", changed:"Version 1.1 retired; 2.0 current" },
  { name:"Express Delivery Sortation Hub Operative", code:"ST0753", level:2, months:12, funding:4000, route:"business-administration", epa:"Assigned", status:"Approved", version:"1.0", since:"2022-02-11", changed:"" },

  /* Digital */
  { name:"Data Engineer", code:"ST1386", level:5, months:24, funding:19000, route:"digital", epa:"Pending — standard in development", status:"In development", version:"1.0", since:"2026-08-15", changed:"Revision in development alongside approved version" },
  { name:"Applications Support Lead", code:"ST0949", level:4, months:24, funding:17000, route:"digital", epa:"Pending — standard in development", status:"In development", version:"1.0", since:"2026-08-15", changed:"Moving through proposal and assessment plan stages" },
  { name:"AI Leadership — strategy and opportunity (unit)", code:"AU0009", level:5, months:0, funding:750, route:"digital", epa:"Not applicable (unit)", status:"Approved", version:"1.0", since:"2026-04-21", changed:"New unit approved for delivery" },
  { name:"AI Leadership — adoption, procurement and governance (unit)", code:"AU0010", level:5, months:0, funding:750, route:"digital", epa:"Not applicable (unit)", status:"Approved", version:"1.0", since:"2026-04-21", changed:"New unit approved for delivery" },
  { name:"AI Leadership — delivery and organisational transformation (unit)", code:"AU0011", level:5, months:0, funding:750, route:"digital", epa:"Not applicable (unit)", status:"Approved", version:"1.0", since:"2026-04-21", changed:"New unit approved for delivery" },
  { name:"Artificial Intelligence and Automation Practitioner", code:"ST1512", level:4, months:18, funding:18000, route:"digital", epa:"Assigned", status:"Approved", version:"2.1", since:"2025-12-10", changed:"Version 2.0 retired; 2.1 current" },
  { name:"Machine Learning Engineer", code:"ST1398", level:6, months:24, funding:22000, route:"digital", epa:"Pending — standard in development", status:"In development", version:"1.0", since:"2024-12-18", changed:"Notice period; new version in development" },
  { name:"Information Communications Technician", code:"ST0973", level:3, months:18, funding:15000, route:"digital", epa:"Pending — standard in development", status:"In development", version:"1.2", since:"2026-01-01", changed:"Notice period; revision in development" },
  { name:"Cyber Security Technologist (2021)", code:"ST1021", level:4, months:24, funding:18000, route:"digital", epa:"Assigned", status:"Approved", version:"1.1", since:"2025-09-29", changed:"Version 1.0 retired" },
  { name:"Digital Product Manager", code:"ST0964", level:4, months:24, funding:18000, route:"digital", epa:"Pending — standard in development", status:"In development", version:"1.0", since:"2023-05-11", changed:"Notice period; new version in development" },
  { name:"Digital Accessibility Specialist", code:"ST0863", level:4, months:24, funding:16000, route:"digital", epa:"Pending — standard in development", status:"In development", version:"1.0", since:"2021-07-01", changed:"Notice period; new version in development" },
  { name:"Digital Support Technician", code:"ST0120", level:3, months:15, funding:15000, route:"digital", epa:"Assigned", status:"Approved", version:"1.1", since:"2024-05-01", changed:"" },
  { name:"Software and Data foundation apprenticeship", code:"FA0005", level:2, months:8, funding:4000, route:"digital", epa:"Assigned", status:"Approved", version:"1.0", since:"2025-04-29", changed:"" },
  { name:"Hardware, Network and Infrastructure foundation apprenticeship", code:"FA0004", level:2, months:8, funding:4000, route:"digital", epa:"Assigned", status:"Approved", version:"1.0", since:"2025-04-29", changed:"" },
  { name:"Digital Device Repair Technician", code:"ST0682", level:3, months:21, funding:11000, route:"digital", epa:"Assigned", status:"Approved", version:"1.1", since:"2025-12-09", changed:"Version 1.0 retired" },
  { name:"Advanced Digital Forensic Professional", code:"ST1409", level:7, months:36, funding:27000, route:"digital", epa:"Assigned", status:"Approved", version:"1.1", since:"2024-10-02", changed:"" },

  /* Construction */
  { name:"Low Carbon Heating Technician", code:"ST1020", level:3, months:36, funding:22000, route:"construction", epa:"Assigned", status:"Approved", version:"1.2", since:"2026-05-05", changed:"Version 1.1 retired; 1.2 current", article:"low-carbon-heating" },
  { name:"Solar PV Installation and Maintenance (unit)", code:"AU0007", level:3, months:0, funding:950, route:"construction", epa:"Not applicable (unit)", status:"Approved", version:"1.0", since:"2026-03-17", changed:"New unit approved for delivery" },
  { name:"EV Charging Point Installation and Maintenance (unit)", code:"AU0006", level:3, months:0, funding:950, route:"construction", epa:"Not applicable (unit)", status:"Approved", version:"1.0", since:"2026-03-17", changed:"New unit approved for delivery" },
  { name:"Permanent Modular Building Assembly (unit)", code:"AU0001", level:2, months:0, funding:3200, route:"construction", epa:"Not applicable (unit)", status:"Approved", version:"1.0", since:"2026-03-17", changed:"New unit approved for delivery" },
  { name:"Building Services Engineering foundation apprenticeship", code:"FA0001", level:2, months:8, funding:4000, route:"construction", epa:"Assigned", status:"Approved", version:"1.0", since:"2025-04-29", changed:"" },
  { name:"Onsite Trades foundation apprenticeship", code:"FA0003", level:2, months:8, funding:4000, route:"construction", epa:"Assigned", status:"Approved", version:"1.0", since:"2025-04-29", changed:"" },
  { name:"Finishing Trades foundation apprenticeship", code:"FA0002", level:2, months:8, funding:4000, route:"construction", epa:"Assigned", status:"Approved", version:"1.0", since:"2025-04-29", changed:"" },
  { name:"Insulation Installation Operative", code:"ST1480", level:2, months:24, funding:15000, route:"construction", epa:"Assigned", status:"Approved", version:"1.0", since:"2025-07-25", changed:"" },
  { name:"Floorlayer Wood Based", code:"ST1498", level:2, months:30, funding:20000, route:"construction", epa:"Assigned", status:"Approved", version:"1.1", since:"2025-09-09", changed:"Version 1.0 retired" },
  { name:"Domestic Electrician", code:"ST1017", level:3, months:36, funding:19000, route:"construction", epa:"Assigned", status:"Approved", version:"1.1", since:"2025-08-21", changed:"Funding band raised from £15,000 to £19,000" },
  { name:"Craft Bricklayer", code:"ST1334", level:3, months:18, funding:10000, route:"construction", epa:"Assigned", status:"Approved", version:"1.2", since:"2025-08-05", changed:"Version 1.1 retired" },
  { name:"Craft Plasterer", code:"ST1385", level:3, months:18, funding:13000, route:"construction", epa:"Assigned", status:"Approved", version:"1.0", since:"2024-07-17", changed:"" },
  { name:"Craft Painter and Decorator", code:"ST1358", level:3, months:18, funding:12000, route:"construction", epa:"Assigned", status:"Approved", version:"1.2", since:"2025-07-29", changed:"Version 1.1 retired" },
  { name:"Steeplejack", code:"ST1342", level:2, months:24, funding:13000, route:"construction", epa:"Assigned", status:"Approved", version:"1.0", since:"2024-08-16", changed:"" },
  { name:"Thatcher", code:"ST0821", level:2, months:24, funding:21000, route:"construction", epa:"Assigned", status:"Approved", version:"1.0", since:"2024-02-27", changed:"" },
  { name:"Fitted Interiors Installer", code:"ST0980", level:2, months:18, funding:11000, route:"construction", epa:"Assigned", status:"Approved", version:"1.0", since:"2023-10-18", changed:"" },
  { name:"Facilities Management Supervisor", code:"", level:3, months:18, funding:6000, route:"construction", epa:"Assigned", status:"Defunded from Sept 2026", version:"1.0", since:"2026-09-01", changed:"Funding withdrawn from September 2026", article:"defunding-16" },
  { name:"Fire Safety Engineer", code:"ST0859", level:6, months:60, funding:27000, route:"construction", epa:"Assigned", status:"Approved", version:"1.2", since:"2025-12-09", changed:"Version 1.1 retired" },
  { name:"Construction Support Technician", code:"ST0960", level:3, months:24, funding:11000, route:"construction", epa:"Assigned", status:"Approved", version:"1.0", since:"2022-02-11", changed:"" },
  { name:"Mastic Asphalter", code:"ST0750", level:2, months:34, funding:12000, route:"construction", epa:"Assigned", status:"Approved", version:"1.0", since:"2021-05-17", changed:"" },

  /* Engineering and manufacturing */
  { name:"Engineering and Manufacturing foundation apprenticeship", code:"FA0006", level:2, months:8, funding:4500, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.0", since:"2025-04-29", changed:"" },
  { name:"Welding, mechanised (unit)", code:"AU0004", level:2, months:0, funding:2100, route:"engineering-manufacturing", epa:"Not applicable (unit)", status:"Approved", version:"1.0", since:"2026-03-17", changed:"New unit approved for delivery" },
  { name:"Battery Manufacturing (unit)", code:"AU0008", level:2, months:0, funding:1650, route:"engineering-manufacturing", epa:"Not applicable (unit)", status:"Approved", version:"1.0", since:"2026-03-24", changed:"New unit approved for delivery" },
  { name:"Electrical Fitting and Assembly (unit)", code:"AU0005", level:2, months:0, funding:1650, route:"engineering-manufacturing", epa:"Not applicable (unit)", status:"Approved", version:"1.0", since:"2026-03-17", changed:"New unit approved for delivery" },
  { name:"Mechanical Fitting and Assembly (unit)", code:"AU0003", level:2, months:0, funding:1650, route:"engineering-manufacturing", epa:"Not applicable (unit)", status:"Approved", version:"1.0", since:"2026-03-17", changed:"New unit approved for delivery" },
  { name:"Production Manager", code:"ST1483", level:6, months:18, funding:14000, route:"engineering-manufacturing", status:"Approved", version:"2.0", since:"2026-04-28", epa:"none", changed:"Version 2.0 approved; no assessment organisation yet" },
  { name:"Aerospace Engineering Technician", code:"ST1313", level:3, months:48, funding:27000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.1", since:"2025-12-09", changed:"Version 1.0 retired" },
  { name:"Engineering Maintenance Technician — dual discipline", code:"ST1443", level:3, months:48, funding:27000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.0", since:"2025-06-23", changed:"" },
  { name:"Engineering Maintenance Technician — single discipline", code:"ST1426", level:3, months:42, funding:27000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.0", since:"2025-06-23", changed:"" },
  { name:"Cold Forming Setter Technician", code:"ST1355", level:3, months:36, funding:24000, route:"engineering-manufacturing", status:"Approved", version:"1.0", since:"2025-05-29", epa:"none", changed:"Approved; no assessment organisation yet" },
  { name:"Maritime Mechanical Fitter", code:"ST1402", level:3, months:42, funding:27000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.2", since:"2026-05-19", changed:"Version 1.1 retired" },
  { name:"Maritime Electrical Fitter", code:"ST1403", level:3, months:42, funding:26000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.1", since:"2025-05-29", changed:"Version 1.0 retired" },
  { name:"Machining Technician", code:"ST1305", level:3, months:42, funding:27000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.5", since:"2024-06-25", changed:"" },
  { name:"Mechatronics Maintenance Technician", code:"ST1326", level:3, months:42, funding:27000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.0", since:"2024-08-19", changed:"" },
  { name:"Battery Manufacturing Technician", code:"ST1338", level:3, months:36, funding:24000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.0", since:"2023-11-30", changed:"" },
  { name:"Space Engineering Technician", code:"ST0855", level:4, months:48, funding:19000, route:"engineering-manufacturing", epa:"Pending — standard in development", status:"Paused for starts", version:"1.1", since:"2024-08-24", changed:"Paused for starts; in revision" },
  { name:"Lead Engineering Maintenance Technician", code:"ST0999", level:4, months:36, funding:19000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.2", since:"2024-06-07", changed:"" },

  /* Health and science */
  { name:"Dental Nurse", code:"ST1431", level:3, months:18, funding:8000, route:"health-science", epa:"Assigned", status:"Approved", version:"2.0", since:"2026-03-25", changed:"GDC 2023 version retired; 2.0 current" },
  { name:"Dental Technician", code:"ST1432", level:5, months:36, funding:22000, route:"health-science", epa:"Assigned", status:"Approved", version:"2.0", since:"2026-03-25", changed:"GDC 2023 version retired; 2.0 current" },
  { name:"Clinical Dental Technician", code:"ST1433", level:5, months:24, funding:18000, route:"health-science", epa:"Assigned", status:"Approved", version:"2.0", since:"2026-03-25", changed:"GDC 2023 version retired; 2.0 current" },
  { name:"Orthodontic Therapist", code:"ST1434", level:4, months:13, funding:18000, route:"health-science", epa:"Assigned", status:"Approved", version:"2.0", since:"2026-03-25", changed:"GDC 2023 version retired; 2.0 current" },
  { name:"Dental Hygienist", code:"ST1383", level:6, months:36, funding:27000, route:"health-science", status:"Approved", version:"2.0", since:"2026-03-25", epa:"none", changed:"Version 1.0 retired; no assessment organisation yet" },
  { name:"Doctor (degree)", code:"ST0995", level:7, months:60, funding:27000, route:"health-science", epa:"Assigned", status:"Approved", version:"2.0", since:"2026-03-25", changed:"Version 1.0 retired; 2.0 current" },
  { name:"Midwife (2019 NMC standards)", code:"ST0948", level:6, months:48, funding:26000, route:"health-science", epa:"Assigned", status:"Approved", version:"2.0", since:"2026-03-25", changed:"Version 1.1 retired; 2.0 current" },
  { name:"Osteopath", code:"ST1462", level:6, months:48, funding:27000, route:"health-science", epa:"Assigned", status:"Approved", version:"2.0", since:"2026-02-18", changed:"Version 2.0 approved for delivery" },
  { name:"Biomedical Scientist", code:"ST1314", level:6, months:36, funding:27000, route:"health-science", epa:"Assigned", status:"Approved", version:"2.0", since:"2025-08-14", changed:"Version 1.2 retired; 2.0 current" },
  { name:"Community Nurse Specialist Practitioner (NMC 2022)", code:"ST1419", level:7, months:24, funding:14000, route:"health-science", epa:"Assigned", status:"Approved", version:"2.0", since:"2026-03-25", changed:"Version 1.0 retired; 2.0 current" },
  { name:"Specialist Community Public Health Nurse (NMC 2022)", code:"ST1418", level:7, months:18, funding:14000, route:"health-science", epa:"Assigned", status:"Approved", version:"2.0", since:"2026-03-25", changed:"Version 1.1 retired; 2.0 current" },
  { name:"Orthoptist", code:"ST1272", level:6, months:36, funding:25000, route:"health-science", epa:"Assigned", status:"Approved", version:"2.0", since:"2026-03-25", changed:"Version 1.0 retired; 2.0 current" },
  { name:"Dispensing Optician", code:"ST0774", level:6, months:36, funding:23000, route:"health-science", epa:"Assigned", status:"Approved", version:"2.0", since:"2026-03-25", changed:"Version 1.3 retired; 2.0 current" },
  { name:"Optical Assistant 2022", code:"ST1377", level:3, months:18, funding:8000, route:"health-science", epa:"Assigned", status:"Approved", version:"1.2", since:"2025-12-10", changed:"Version 1.1 retired" },
  { name:"Mortuary Technician", code:"ST0889", level:3, months:18, funding:13000, route:"health-science", epa:"Assigned", status:"Approved", version:"1.1", since:"2025-12-10", changed:"Version 1.0 retired" },
  { name:"Health and Social Care foundation apprenticeship", code:"FA0007", level:2, months:8, funding:3000, route:"health-science", epa:"Assigned", status:"Approved", version:"1.1", since:"2025-04-29", changed:"" },
  { name:"Enhanced Clinical Practitioner", code:"ST0895", level:6, months:18, funding:7000, route:"health-science", epa:"Assigned", status:"Approved", version:"1.2", since:"2025-11-20", changed:"Version 1.1 retired" },

  /* Care services */
  { name:"Lead Practitioner in Adult Care", code:"", level:4, months:18, funding:7000, route:"care-services", epa:"Assigned", status:"Defunded from Sept 2026", version:"1.0", since:"2026-09-01", changed:"Funding withdrawn from September 2026", article:"defunding-16" },
  { name:"Safeguarding Support Officer", code:"ST1030", level:3, months:18, funding:7000, route:"care-services", epa:"Assigned", status:"Approved", version:"1.0", since:"2024-10-14", changed:"" },
  { name:"Youth Worker", code:"ST0522", level:6, months:36, funding:20000, route:"care-services", epa:"Assigned", status:"Approved", version:"1.1", since:"2025-07-16", changed:"Version 1.0 retired" },
  { name:"Youth Support Worker", code:"ST0906", level:3, months:18, funding:4500, route:"care-services", epa:"Assigned", status:"Approved", version:"1.2", since:"2025-12-10", changed:"Version 1.1 retired" },
  { name:"Youth Justice Practitioner", code:"ST0878", level:5, months:25, funding:17000, route:"care-services", epa:"Assigned", status:"Approved", version:"1.1", since:"2025-12-10", changed:"Version 1.0 retired" },
  { name:"Domestic and Sexual Abuse Support Worker", code:"ST0862", level:4, months:18, funding:8000, route:"care-services", epa:"Assigned", status:"Approved", version:"1.0", since:"2024-04-19", changed:"" },
  { name:"Peer Worker", code:"ST0896", level:3, months:15, funding:5000, route:"care-services", epa:"Assigned", status:"Approved", version:"1.0", since:"2022-07-20", changed:"" },

  /* Education and early years */
  { common:true, name:"Learning and Skills Assessor", code:"ST1380", level:3, months:12, funding:5000, route:"education-early-years", epa:"Assigned", status:"Defunded from Sept 2026", version:"1.1", since:"2026-09-01", changed:"Funding withdrawn from September 2026", article:"defunding-16" },
  { common:true, name:"Learning and Skills Mentor", code:"ST1379", level:4, months:12, funding:5000, route:"education-early-years", epa:"Assigned", status:"Defunded from Sept 2026", version:"1.3", since:"2026-09-01", changed:"Funding withdrawn from September 2026", article:"defunding-16" },
  { name:"Outdoor Learning Specialist", code:"ST0945", level:5, months:24, funding:13000, route:"education-early-years", epa:"Assigned", status:"Defunded from Sept 2026", version:"1.0", since:"2026-09-01", changed:"Funding withdrawn from September 2026", article:"defunding-16" },
  { name:"Specialist Teaching Assistant", code:"ST1414", level:5, months:24, funding:12000, route:"education-early-years", epa:"Pending — standard in development", status:"In development", version:"1.1", since:"2026-12-14", changed:"Reformed assessment plan starts 14 December 2026", article:"epa-reform" },
  { name:"Teacher — Undergraduate", code:"ST1502", level:6, months:45, funding:27000, route:"education-early-years", epa:"Assigned", status:"Approved", version:"2.0", since:"2026-08-13", changed:"Version 1.1 retired; 2.0 current" },
  { name:"Early Years Teacher (with EYTS)", code:"ST1077", level:6, months:33, funding:27000, route:"education-early-years", epa:"Assigned", status:"Approved", version:"1.1", since:"2025-04-14", changed:"Version 1.0 retired" },
  { name:"Early Years Lead Practitioner", code:"ST0551", level:5, months:24, funding:9000, route:"education-early-years", epa:"Assigned", status:"Approved", version:"1.1", since:"2025-08-01", changed:"Funding band raised from £8,000 to £9,000" },
  { name:"Digital Learning Designer", code:"ST0974", level:5, months:24, funding:16000, route:"education-early-years", epa:"Assigned", status:"Approved", version:"1.0", since:"2023-05-25", changed:"" },
  { name:"Playworker", code:"ST0867", level:2, months:18, funding:5000, route:"education-early-years", epa:"Assigned", status:"Approved", version:"1.0", since:"2023-02-02", changed:"" },
  { name:"Teacher for the Sensory Impaired", code:"ST0966", level:7, months:24, funding:14000, route:"education-early-years", epa:"Assigned", status:"Approved", version:"1.0", since:"2023-11-14", changed:"" },

  /* Protective services */
  { name:"Professional Security Operative", code:"ST1016", level:2, months:12, funding:6000, route:"protective-services", epa:"Assigned", status:"Defunded from Sept 2026", version:"1.0", since:"2026-09-01", changed:"Funding withdrawn from September 2026", article:"defunding-16" },
  { name:"Security First Line Manager", code:"", level:3, months:18, funding:6000, route:"protective-services", epa:"Assigned", status:"Defunded from Sept 2026", version:"1.0", since:"2026-09-01", changed:"Funding withdrawn from September 2026", article:"defunding-16" },
  { name:"Custody and Detention Professional", code:"", level:3, months:12, funding:5000, route:"protective-services", epa:"Assigned", status:"Defunded from Sept 2026", version:"1.0", since:"2026-09-01", changed:"Funding withdrawn from September 2026", article:"defunding-16" },
  { name:"Public Sector Compliance Investigator and Officer", code:"", level:3, months:18, funding:7000, route:"protective-services", epa:"Assigned", status:"Defunded from Sept 2026", version:"1.0", since:"2026-09-01", changed:"Funding withdrawn from September 2026", article:"defunding-16" },
  { name:"Protective Security Adviser", code:"ST1401", level:4, months:21, funding:9000, route:"protective-services", epa:"Assigned", status:"Approved", version:"1.0", since:"2025-05-14", changed:"" },
  { name:"Anti-Social Behaviour and Community Safety Officer", code:"ST0930", level:4, months:24, funding:8000, route:"protective-services", epa:"Assigned", status:"Approved", version:"1.2", since:"2024-04-29", changed:"" },
  { name:"Resilience and Emergencies Professional", code:"ST1322", level:6, months:40, funding:23000, route:"protective-services", epa:"Assigned", status:"Approved", version:"1.1", since:"2024-10-15", changed:"" },
  { name:"Non Home Office Police Officer", code:"ST0764", level:4, months:24, funding:13000, route:"protective-services", epa:"Pending — standard in development", status:"In development", version:"1.0", since:"2021-05-17", changed:"Notice period; new version in development" },

  /* Transport and logistics */
  { name:"Bus, Coach and HGV Service and Maintenance Technician", code:"ST1422", level:2, months:24, funding:14000, route:"transport-logistics", status:"Approved", version:"2.0", since:"2026-08-05", epa:"none", changed:"Version 2.0 approved; no assessment organisation yet" },
  { name:"Urban Driver", code:"ST1025", level:2, months:12, funding:8000, route:"transport-logistics", epa:"Assigned", status:"Approved", version:"1.1", since:"2024-10-24", changed:"Funding band raised from £5,000 to £8,000" },
  { name:"Rail Infrastructure Operator", code:"ST1378", level:3, months:18, funding:15000, route:"transport-logistics", epa:"Pending — standard in development", status:"In development", version:"1.1", since:"2024-09-04", changed:"Notice period; new version in development" },
  { name:"Transport Scheduler", code:"ST1438", level:3, months:18, funding:8000, route:"transport-logistics", epa:"Pending — standard in development", status:"In development", version:"1.0", since:"2023-12-21", changed:"Notice period; new version in development" },
  { name:"Aviation Ground Handler", code:"ST0908", level:2, months:12, funding:3500, route:"transport-logistics", epa:"Assigned", status:"Approved", version:"1.0", since:"2021-09-13", changed:"" },
  { name:"Aviation Customer Service Operative", code:"ST0907", level:2, months:12, funding:3500, route:"transport-logistics", epa:"Assigned", status:"Retirement consultation", version:"1.1", since:"2025-12-10", changed:"Retirement consultation open" },
  { name:"Removals Operative", code:"ST1393", level:2, months:12, funding:5000, route:"transport-logistics", epa:"Pending — standard in development", status:"In development", version:"1.0", since:"2024-07-19", changed:"Notice period; new version in development" },
  { name:"Traffic Operator", code:"ST1394", level:2, months:12, funding:6000, route:"transport-logistics", epa:"Assigned", status:"Approved", version:"1.1", since:"2025-02-12", changed:"Version 1.0 retired" },
  { name:"Transport and Warehouse Operations Supervisor", code:"ST0647", level:3, months:12, funding:5000, route:"transport-logistics", epa:"Assigned", status:"Approved", version:"1.1", since:"2022-11-18", changed:"" },

  /* Creative and design */
  { name:"Journalist", code:"ST1490", level:6, months:18, funding:14000, route:"creative-design", epa:"Assigned", status:"Approved", version:"2.0", since:"2026-04-14", changed:"Replaces retired Level 5 Journalist standard" },
  { name:"Junior Journalist", code:"ST1516", level:5, months:14, funding:13000, route:"creative-design", epa:"Assigned", status:"Approved", version:"1.0", since:"2026-04-14", changed:"New standard approved for delivery" },
  { name:"Interior Designer", code:"ST1361", level:6, months:36, funding:26000, route:"creative-design", status:"Approved", version:"2.0", since:"2026-05-21", epa:"none", changed:"Version 2.0 approved; no assessment organisation yet" },
  { name:"Publishing Professional", code:"ST1442", level:4, months:24, funding:10000, route:"creative-design", epa:"Pending — standard in development", status:"In development", version:"1.1", since:"2025-10-15", changed:"Notice period; new version in development" },
  { name:"Creative Industries Production Technician", code:"ST1297", level:3, months:24, funding:14000, route:"creative-design", epa:"Pending — standard in development", status:"In development", version:"1.1", since:"2025-12-09", changed:"Notice period; new version in development" },
  { name:"Scenic Artist", code:"ST0916", level:3, months:21, funding:19000, route:"creative-design", epa:"Pending — standard in development", status:"In development", version:"1.0", since:"2023-02-28", changed:"Notice period; new version in development" },
  { name:"Hair, Wigs, Make-up and Prosthetics Technician", code:"ST0918", level:3, months:24, funding:14000, route:"creative-design", epa:"Pending — standard in development", status:"In development", version:"1.0", since:"2023-02-28", changed:"Notice period; new version in development" },
  { name:"Junior VFX Artist or Assistant Technical Director", code:"ST1325", level:4, months:18, funding:10000, route:"creative-design", epa:"Assigned", status:"Approved", version:"1.2", since:"2025-12-09", changed:"Version 1.1 retired" },
  { name:"Furniture Restorer", code:"ST0978", level:3, months:36, funding:13000, route:"creative-design", epa:"Assigned", status:"Approved", version:"1.1", since:"2025-12-09", changed:"Version 1.0 retired" },
  { name:"Craft Technician", code:"ST0919", level:3, months:18, funding:14000, route:"creative-design", epa:"Assigned", status:"Approved", version:"1.1", since:"2024-08-27", changed:"" },
  { name:"Advertising Creative", code:"ST1340", level:6, months:24, funding:17000, route:"creative-design", epa:"Assigned", status:"Approved", version:"1.0", since:"2023-11-24", changed:"" },
  { name:"Print Operative", code:"ST0962", level:2, months:24, funding:8000, route:"creative-design", epa:"Assigned", status:"Approved", version:"1.2", since:"2025-12-10", changed:"Version 1.1 retired" },

  /* Legal, finance and accounting */
  { name:"Advanced Paralegal", code:"ST1476", level:5, months:24, funding:18000, route:"legal-finance-accounting", epa:"Assigned", status:"Approved", version:"2.0", since:"2026-07-27", changed:"Version 1.0 retired; 2.0 current" },
  { name:"Professional Taxation Technician", code:"ST1458", level:4, months:24, funding:15000, route:"legal-finance-accounting", epa:"Assigned", status:"Approved", version:"2.0", since:"2026-07-27", changed:"Version 1.0 retired; 2.0 current" },
  { name:"Barrister", code:"ST1389", level:7, months:72, funding:27000, route:"legal-finance-accounting", epa:"Assigned", status:"Approved", version:"2.0", since:"2026-05-01", changed:"Version 1.0 retired; 2.0 current" },
  { name:"Chartered Legal Executive Litigator and Advocate", code:"ST1368", level:7, months:66, funding:27000, route:"legal-finance-accounting", epa:"Assigned", status:"Approved", version:"2.1", since:"2026-05-01", changed:"Version 2.0 retired; 2.1 current" },
  { name:"Licensed Conveyancer or Licensed Probate Practitioner", code:"ST1311", level:6, months:56, funding:18000, route:"legal-finance-accounting", epa:"Assigned", status:"Approved", version:"2.0", since:"2026-06-08", changed:"Version 1.1 retired; 2.0 current" },
  { name:"Legal Technician — conveyancing or probate", code:"ST1312", level:4, months:24, funding:10000, route:"legal-finance-accounting", epa:"Assigned", status:"Approved", version:"2.0", since:"2026-06-08", changed:"Version 1.0 retired; 2.0 current" },
  { name:"Costs Lawyer", code:"ST1400", level:6, months:48, funding:21000, route:"legal-finance-accounting", epa:"Assigned", status:"Approved", version:"2.0", since:"2024-09-16", changed:"" },
  { name:"Internal Audit Technician", code:"ST1484", level:4, months:18, funding:10000, route:"legal-finance-accounting", epa:"Assigned", status:"Approved", version:"2.0", since:"2026-03-13", changed:"Version 2.0 approved for delivery" },
  { name:"Accounting Finance Manager", code:"ST1303", level:6, months:36, funding:27000, route:"legal-finance-accounting", epa:"Assigned", status:"Approved", version:"1.0", since:"2023-02-21", changed:"" },
  { name:"Paraplanner and Financial Planner", code:"ST1301", level:4, months:24, funding:13000, route:"legal-finance-accounting", epa:"Assigned", status:"Approved", version:"1.0", since:"2025-05-02", changed:"" },

  /* Catering and hospitality */
  { name:"Catering and Hospitality foundation apprenticeship", code:"FA0008", level:2, months:8, funding:3500, route:"catering-hospitality", epa:"Assigned", status:"Approved", version:"1.0", since:"2026-04-01", changed:"New foundation apprenticeship approved" },
  { name:"Cleaning Hygiene Operative", code:"", level:2, months:12, funding:4000, route:"catering-hospitality", epa:"Assigned", status:"Defunded from Sept 2026", version:"1.0", since:"2026-09-01", changed:"Funding withdrawn from September 2026", article:"defunding-16" },
  { name:"Hospitality Accommodation Team Member", code:"ST1420", level:2, months:12, funding:6000, route:"catering-hospitality", epa:"Assigned", status:"Approved", version:"1.0", since:"2025-05-16", changed:"" },
  { name:"Food and Beverage Team Member", code:"ST1488", level:2, months:12, funding:6000, route:"catering-hospitality", epa:"Assigned", status:"Approved", version:"1.0", since:"2024-12-18", changed:"" },
  { name:"Pastry Chef", code:"ST0929", level:3, months:18, funding:11000, route:"catering-hospitality", epa:"Assigned", status:"Approved", version:"1.0", since:"2024-04-30", changed:"" },
  { name:"Lead Baker", code:"ST1349", level:3, months:24, funding:9000, route:"catering-hospitality", epa:"Assigned", status:"Approved", version:"1.0", since:"2023-11-07", changed:"" },

  /* Sales, marketing and procurement */
  { name:"Retail Service, Supply and Administration foundation apprenticeship", code:"FA0009", level:2, months:8, funding:3500, route:"sales-marketing-procurement", epa:"Assigned", status:"Approved", version:"1.0", since:"2026-04-14", changed:"New foundation apprenticeship approved" },
  { name:"Multi-channel Marketer", code:"ST1031", level:3, months:18, funding:11000, route:"sales-marketing-procurement", epa:"Pending — standard in development", status:"In development", version:"1.1", since:"2025-05-15", changed:"Notice period; new version in development" },
  { name:"Senior Procurement and Supply Chain Professional", code:"ST0811", level:6, months:30, funding:18000, route:"sales-marketing-procurement", epa:"Assigned", status:"Approved", version:"1.0", since:"2023-10-18", changed:"" },
  { name:"Procurement and Supply Assistant", code:"ST0810", level:3, months:18, funding:6000, route:"sales-marketing-procurement", epa:"Assigned", status:"Approved", version:"1.1", since:"2025-12-10", changed:"Version 1.0 retired" },
  { name:"Recruiter", code:"ST1421", level:3, months:18, funding:7000, route:"sales-marketing-procurement", epa:"Assigned", status:"Approved", version:"1.0", since:"2024-08-20", changed:"" },
  { name:"Market Research Executive", code:"ST0883", level:4, months:18, funding:8000, route:"sales-marketing-procurement", epa:"Assigned", status:"Approved", version:"1.0", since:"2021-05-27", changed:"" },

  /* Agriculture, environmental and animal care */
  { name:"Forestry Works Manager", code:"ST1427", level:4, months:15, funding:8000, route:"agriculture", epa:"Assigned", status:"Approved", version:"1.0", since:"2025-02-19", changed:"" },
  { name:"General Farm Worker", code:"ST0937", level:2, months:18, funding:8000, route:"agriculture", epa:"Assigned", status:"Approved", version:"1.3", since:"2025-07-25", changed:"Funding band raised from £5,000 to £8,000" },
  { name:"Livestock Unit Technician", code:"ST0938", level:3, months:18, funding:9000, route:"agriculture", epa:"Assigned", status:"Approved", version:"1.3", since:"2025-07-25", changed:"Funding band raised from £5,000 to £9,000" },
  { name:"Detection and Protection Working Dog Specialist", code:"ST1298", level:3, months:24, funding:12000, route:"agriculture", epa:"Assigned", status:"Approved", version:"1.0", since:"2025-06-23", changed:"" },
  { name:"Animal Care and Welfare Manager", code:"ST1359", level:3, months:18, funding:9000, route:"agriculture", epa:"Assigned", status:"Approved", version:"1.0", since:"2023-10-16", changed:"" },
  { name:"Professional Arboriculturist (integrated degree)", code:"ST0922", level:6, months:48, funding:22000, route:"agriculture", epa:"Pending — standard in development", status:"In development", version:"1.0", since:"2021-11-12", changed:"New integrated degree version in development" },
  { name:"Vet Technician (livestock)", code:"ST0946", level:5, months:24, funding:13000, route:"agriculture", epa:"Assigned", status:"Approved", version:"1.0", since:"2021-05-27", changed:"" },
  { name:"Fisher", code:"ST0952", level:2, months:18, funding:10000, route:"agriculture", epa:"Assigned", status:"Approved", version:"1.1", since:"2025-05-12", changed:"Version 1.0 retired" },

  /* Hair and beauty */
  { name:"Barbering Professional", code:"ST1273", level:2, months:18, funding:9000, route:"hair-beauty", epa:"Assigned", status:"Approved", version:"1.0", since:"2023-05-22", changed:"" },
  { name:"Wellbeing and Holistic Therapist", code:"ST0685", level:3, months:20, funding:9000, route:"hair-beauty", epa:"Assigned", status:"Approved", version:"1.1", since:"2025-12-09", changed:"Version 1.0 retired" },

/* ---- Additional register entries ---- */

  { common:true, name:"Business Administrator", code:"ST0070", level:3, months:18, funding:5000, route:"business-administration", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-06-01", changed:"" },
  { name:"HR Support", code:"ST0239", level:3, months:18, funding:4500, route:"business-administration", epa:"Assigned", status:"Approved", version:"1.2", since:"2024-03-01", changed:"" },
  { name:"HR Consultant Partner", code:"ST0240", level:5, months:24, funding:7000, route:"business-administration", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-09-01", changed:"" },
  { name:"Project Manager (integrated degree)", code:"ST0275", level:6, months:36, funding:22000, route:"business-administration", epa:"Assigned", status:"Approved", version:"1.1", since:"2024-02-01", changed:"" },
  { name:"Associate Project Manager", code:"ST0310", level:4, months:24, funding:6000, route:"business-administration", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-11-01", changed:"" },
  { name:"Senior Leader", code:"ST0480", level:7, months:24, funding:14000, route:"business-administration", epa:"Assigned", status:"Approved", version:"1.2", since:"2026-01-01", changed:"Level 7 age restriction now applies to new starts", article:"level-7" },
  { common:true, name:"Customer Service Practitioner", code:"ST0072", level:2, months:12, funding:3500, route:"business-administration", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-04-01", changed:"" },
  { common:true, name:"Customer Service Specialist", code:"ST0071", level:3, months:15, funding:4000, route:"business-administration", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-04-01", changed:"" },
  { name:"Business Improvement Practitioner", code:"ST0377", level:3, months:12, funding:5000, route:"business-administration", epa:"Assigned", status:"Approved", version:"1.0", since:"2022-06-01", changed:"" },
  { name:"Data Protection and Information Governance Practitioner", code:"ST0967", level:4, months:18, funding:10000, route:"business-administration", epa:"Pending — standard in development", status:"In development", version:"1.1", since:"2024-08-19", changed:"Notice period; new version in development" },
  { name:"Asset Manager", code:"ST0861", level:4, months:18, funding:9000, route:"business-administration", epa:"Assigned", status:"Approved", version:"1.0", since:"2021-05-17", changed:"" },
  { name:"Corporate Responsibility and Sustainability Practitioner", code:"ST0934", level:4, months:36, funding:14000, route:"business-administration", epa:"Pending — standard in development", status:"In development", version:"1.1", since:"2025-05-21", changed:"Notice period; new version in development" },
  { name:"Infrastructure Asset Management Professional", code:"ST0860", level:7, months:24, funding:20000, route:"business-administration", epa:"Assigned", status:"Approved", version:"1.0", since:"2023-08-29", changed:"" },
  { name:"Quality Practitioner", code:"ST0853", level:4, months:14, funding:6000, route:"business-administration", epa:"Assigned", status:"Approved", version:"1.0", since:"2020-09-10", changed:"" },
  { name:"Human Factors Specialist", code:"ST0785", level:7, months:36, funding:19000, route:"business-administration", epa:"Assigned", status:"Approved", version:"1.0", since:"2023-05-11", changed:"" },
  { name:"Operational Research Specialist", code:"ST0884", level:7, months:24, funding:14000, route:"business-administration", epa:"Assigned", status:"Approved", version:"1.2", since:"2025-12-09", changed:"Version 1.1 retired" },

  { common:true, name:"Software Developer", code:"ST0116", level:4, months:24, funding:18000, route:"digital", epa:"Assigned", status:"Approved", version:"1.1", since:"2024-01-01", changed:"" },
  { name:"Software Development Technician", code:"ST0128", level:3, months:18, funding:15000, route:"digital", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-10-01", changed:"" },
  { common:true, name:"Data Analyst", code:"ST0118", level:4, months:24, funding:15000, route:"digital", epa:"Assigned", status:"Approved", version:"1.1", since:"2024-04-01", changed:"" },
  { name:"Data Technician", code:"ST0951", level:3, months:15, funding:12000, route:"digital", epa:"Assigned", status:"Approved", version:"1.0", since:"2022-09-01", changed:"" },
  { name:"Data Scientist (integrated degree)", code:"ST0585", level:6, months:36, funding:24000, route:"digital", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-07-01", changed:"" },
  { name:"Cyber Security Technician", code:"ST1071", level:3, months:24, funding:15000, route:"digital", epa:"Assigned", status:"Approved", version:"1.0", since:"2022-11-01", changed:"" },
  { name:"Cyber Security Technical Professional (integrated degree)", code:"ST0409", level:6, months:48, funding:25000, route:"digital", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-05-01", changed:"" },
  { name:"Network Engineer", code:"ST0127", level:4, months:24, funding:18000, route:"digital", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-08-01", changed:"" },
  { name:"IT Solutions Technician", code:"ST0505", level:3, months:24, funding:15000, route:"digital", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-06-01", changed:"" },
  { name:"Digital and Technology Solutions Professional (degree)", code:"ST0119", level:6, months:48, funding:25000, route:"digital", epa:"Assigned", status:"Approved", version:"1.2", since:"2024-05-01", changed:"" },
  { name:"Digital and Technology Solutions Specialist (degree)", code:"ST0482", level:7, months:24, funding:21000, route:"digital", epa:"Assigned", status:"Approved", version:"1.1", since:"2026-01-01", changed:"Level 7 age restriction now applies to new starts", article:"level-7" },
  { name:"Game Programmer", code:"ST0953", level:7, months:24, funding:19000, route:"digital", epa:"Assigned", status:"Approved", version:"1.2", since:"2023-02-13", changed:"Version 1.1 retired" },
  { name:"Digital Forensic Technician", code:"ST1343", level:4, months:24, funding:18000, route:"digital", epa:"Assigned", status:"Approved", version:"1.1", since:"2024-03-19", changed:"Version 1.0 retired" },
  { name:"Radio Network Technician", code:"ST0757", level:3, months:24, funding:19000, route:"digital", epa:"Pending — standard in development", status:"In development", version:"1.2", since:"2025-12-09", changed:"Notice period; new version in development" },
  { name:"Cellular Network Field Engineer", code:"ST1299", level:4, months:36, funding:27000, route:"digital", epa:"Assigned", status:"Approved", version:"1.1", since:"2025-12-09", changed:"Version 1.0 retired" },
  { name:"Spatial Data Specialist", code:"ST0957", level:7, months:24, funding:18000, route:"digital", epa:"Assigned", status:"Approved", version:"1.1", since:"2024-09-30", changed:"Version 1.0 retired" },
  { name:"Service Designer", code:"ST0894", level:6, months:24, funding:15000, route:"digital", epa:"Assigned", status:"Approved", version:"1.0", since:"2023-03-23", changed:"" },
  { name:"Audiovisual Technician", code:"ST0940", level:5, months:24, funding:18000, route:"digital", epa:"Assigned", status:"Approved", version:"1.0", since:"2022-09-13", changed:"" },

  { name:"Bricklayer", code:"ST0091", level:2, months:24, funding:14000, route:"construction", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-08-01", changed:"" },
  { common:true, name:"Carpentry and Joinery", code:"ST0175", level:2, months:24, funding:15000, route:"construction", epa:"Assigned", status:"Approved", version:"1.2", since:"2024-06-01", changed:"" },
  { name:"Advanced Carpentry and Joinery", code:"ST0176", level:3, months:18, funding:15000, route:"construction", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-08-01", changed:"" },
  { name:"Plasterer", code:"ST0353", level:2, months:24, funding:14000, route:"construction", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-09-01", changed:"" },
  { name:"Painter and Decorator", code:"ST0352", level:2, months:24, funding:12000, route:"construction", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-09-01", changed:"" },
  { name:"Plumbing and Domestic Heating Technician", code:"ST0303", level:3, months:48, funding:21000, route:"construction", epa:"Assigned", status:"Approved", version:"1.2", since:"2024-04-01", changed:"" },
  { name:"Installation and Maintenance Electrician", code:"ST0152", level:3, months:42, funding:21000, route:"construction", epa:"Assigned", status:"Approved", version:"1.2", since:"2024-02-01", changed:"" },
  { name:"Construction Site Supervisor", code:"ST0044", level:4, months:36, funding:21000, route:"construction", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-05-01", changed:"" },
  { name:"Construction Site Management (degree)", code:"ST0045", level:6, months:60, funding:27000, route:"construction", epa:"Assigned", status:"Approved", version:"1.2", since:"2024-01-01", changed:"" },
  { name:"Civil Engineering Technician", code:"ST0043", level:3, months:36, funding:21000, route:"construction", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-07-01", changed:"" },
  { name:"Civil Engineer (degree)", code:"ST0042", level:6, months:60, funding:27000, route:"construction", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-07-01", changed:"" },
  { name:"Surveying Technician", code:"ST0058", level:3, months:24, funding:15000, route:"construction", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-10-01", changed:"" },
  { name:"Chartered Surveyor (degree)", code:"ST0057", level:6, months:60, funding:27000, route:"construction", epa:"Assigned", status:"Approved", version:"1.2", since:"2024-03-01", changed:"" },
  { name:"Building Services Engineering Technician", code:"ST0165", level:3, months:48, funding:21000, route:"construction", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-11-01", changed:"" },
  { name:"Building Services Engineering Installer", code:"ST0164", level:2, months:24, funding:15000, route:"construction", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-11-01", changed:"" },
  { name:"Scaffolder", code:"ST0567", level:2, months:24, funding:16000, route:"construction", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-06-01", changed:"" },
  { name:"Roofer", code:"ST0570", level:2, months:24, funding:14000, route:"construction", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-06-01", changed:"" },
  { name:"Stonemason", code:"ST0442", level:2, months:24, funding:11000, route:"construction", epa:"Assigned", status:"Approved", version:"1.2", since:"2023-08-10", changed:"Version 1.1 retired; dispensation in place" },
  { name:"Fall Protection Technician", code:"ST0614", level:3, months:12, funding:8000, route:"construction", epa:"Assigned", status:"Approved", version:"1.0", since:"2021-06-28", changed:"" },
  { name:"Lightning Protection Operative", code:"ST0651", level:2, months:18, funding:14000, route:"construction", epa:"Assigned", status:"Approved", version:"1.1", since:"2025-12-09", changed:"Version 1.0 retired" },
  { name:"Heat Network Maintenance Technician", code:"ST1308", level:3, months:36, funding:26000, route:"construction", epa:"Assigned", status:"Approved", version:"1.0", since:"2024-10-17", changed:"" },
  { name:"Heritage Construction Specialist", code:"ST1105", level:5, months:24, funding:8000, route:"construction", status:"Approved", version:"1.0", since:"2023-10-26", epa:"none", changed:"Approved; no assessment organisation yet" },
  { name:"Construction Equipment Maintenance Technician", code:"ST0671", level:3, months:36, funding:19000, route:"construction", epa:"Assigned", status:"Approved", version:"1.1", since:"2025-06-17", changed:"Version 1.0 retired" },
  { name:"Construction Equipment Maintenance Mechanic", code:"ST0805", level:2, months:24, funding:10000, route:"construction", epa:"Assigned", status:"Approved", version:"1.0", since:"2020-08-07", changed:"" },
  { name:"Drainage Network Operative", code:"ST1348", level:2, months:18, funding:9000, route:"construction", epa:"Assigned", status:"Approved", version:"1.0", since:"2024-04-19", changed:"" },
  { name:"Town Planning Assistant", code:"ST0936", level:4, months:24, funding:12000, route:"construction", epa:"Assigned", status:"Approved", version:"1.0", since:"2021-06-15", changed:"" },
  { name:"Chartered Landscape Professional", code:"ST0742", level:7, months:60, funding:25000, route:"construction", status:"Retirement consultation", version:"1.1", since:"2025-12-09", epa:"none", changed:"Retirement consultation open; no assessment organisation" },
  { name:"Geotechnical Engineer (integrated degree)", code:"ST0881", level:7, months:30, funding:21000, route:"construction", epa:"Assigned", status:"Approved", version:"1.0", since:"2021-08-03", changed:"" },
  { name:"Signage Technician", code:"ST0824", level:3, months:24, funding:10000, route:"construction", epa:"Assigned", status:"Approved", version:"1.0", since:"2020-11-09", changed:"" },

  { name:"Engineering Technician", code:"ST0457", level:3, months:36, funding:21000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.2", since:"2024-05-01", changed:"" },
  { common:true, name:"Engineering Operative", code:"ST0537", level:2, months:12, funding:9000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-06-01", changed:"" },
  { name:"Manufacturing Engineer (degree)", code:"ST0025", level:6, months:48, funding:27000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-09-01", changed:"" },
  { name:"Manufacturing Support Technician", code:"ST0587", level:3, months:36, funding:19000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-10-01", changed:"" },
  { name:"Engineering and Manufacturing Support Technician", code:"ST1395", level:3, months:42, funding:27000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.0", since:"2024-08-21", changed:"" },
  { name:"Metal Fabricator", code:"ST0288", level:3, months:42, funding:24000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-08-01", changed:"" },
  { name:"Plate Welder", code:"ST0463", level:3, months:36, funding:22000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-07-01", changed:"" },
  { name:"General Welder", code:"ST0517", level:2, months:18, funding:9000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-07-01", changed:"" },
  { name:"Motor Vehicle Service and Maintenance Technician", code:"ST0033", level:3, months:36, funding:21000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.2", since:"2024-02-01", changed:"" },
  { name:"Autocare Technician", code:"ST0499", level:2, months:15, funding:9000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-05-01", changed:"" },
  { name:"Aircraft Maintenance Technician", code:"ST1315", level:3, months:36, funding:27000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.1", since:"2024-12-03", changed:"Version 1.0 retired" },
  { name:"Maritime Pipeworker", code:"ST1391", level:3, months:42, funding:24000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.0", since:"2024-11-19", changed:"" },
  { name:"Marine Electrician", code:"ST0808", level:3, months:42, funding:23000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.2", since:"2023-11-15", changed:"Version 1.1 retired" },
  { name:"Nuclear Reactor Desk Engineer", code:"ST0784", level:6, months:30, funding:27000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.0", since:"2021-05-06", changed:"" },
  { name:"Advanced Robotics Engineer", code:"ST1381", level:7, months:36, funding:27000, route:"engineering-manufacturing", status:"Approved", version:"1.0", since:"2024-04-26", epa:"none", changed:"Approved; no assessment organisation yet" },
  { name:"Robotics Engineer (degree)", code:"ST1317", level:6, months:48, funding:27000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.2", since:"2024-11-18", changed:"Version 1.1 retired" },
  { name:"Space Systems Engineer", code:"ST0856", level:6, months:48, funding:27000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.1", since:"2025-11-14", changed:"Version 1.0 retired" },
  { name:"Polymer Processing Technician", code:"ST1328", level:3, months:36, funding:25000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.0", since:"2023-08-09", changed:"" },
  { name:"Process Industry Manufacturing Technician", code:"ST1407", level:3, months:36, funding:24000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.0", since:"2023-11-30", changed:"" },
  { name:"Science Manufacturing Technician 2023", code:"ST1406", level:3, months:36, funding:22000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.0", since:"2024-03-04", changed:"" },
  { name:"Surface Finisher", code:"ST0963", level:3, months:42, funding:24000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.0", since:"2023-03-23", changed:"" },
  { name:"Power Industry Substation Fitter", code:"ST1331", level:3, months:30, funding:27000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.2", since:"2024-10-28", changed:"Version 1.1 retired" },
  { name:"Power Industry Overhead Linesperson", code:"ST1330", level:3, months:30, funding:27000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.2", since:"2025-02-25", changed:"Version 1.1 retired" },
  { name:"Power Industry Distribution Cable Jointer", code:"ST1332", level:3, months:30, funding:27000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-11-30", changed:"" },
  { name:"Lifting Equipment Technician", code:"ST0872", level:3, months:24, funding:12000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.2", since:"2024-06-10", changed:"Version 1.1 retired" },
  { name:"Mobile Transport Refrigeration Technician", code:"ST1327", level:3, months:36, funding:16000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.1", since:"2024-07-01", changed:"Version 1.0 retired" },
  { name:"Electro-mechanical Engineer", code:"ST0672", level:6, months:60, funding:27000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.0", since:"2020-12-16", changed:"" },
  { name:"Healthcare Engineering Specialist Technician", code:"ST0950", level:3, months:48, funding:24000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.0", since:"2021-05-27", changed:"" },
  { name:"Engineer Surveyor", code:"ST0847", level:4, months:24, funding:12000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.2", since:"2025-06-19", changed:"Version 1.1 retired" },
  { name:"Model Maker", code:"ST1371", level:6, months:36, funding:26000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.0", since:"2024-07-23", changed:"" },
  { name:"Material Cutter", code:"ST0899", level:2, months:12, funding:5000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.0", since:"2020-08-24", changed:"" },
  { name:"Knitted Product Manufacturing Technician", code:"ST0910", level:3, months:24, funding:11000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.0", since:"2020-08-24", changed:"" },
  { name:"Mattress Manufacturing Operative", code:"ST0981", level:2, months:15, funding:9000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.0", since:"2024-10-15", changed:"" },
  { name:"Furniture Making Operative", code:"ST0982", level:2, months:18, funding:11000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.0", since:"2024-08-22", changed:"" },
  { name:"Furniture Finisher", code:"ST0977", level:2, months:15, funding:9000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.0", since:"2024-08-22", changed:"" },
  { name:"Wood Machinist", code:"ST0976", level:2, months:24, funding:14000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.1", since:"2025-04-17", changed:"Version 1.0 retired" },
  { name:"Bulk Storage Terminal Technician", code:"ST1339", level:3, months:30, funding:22000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.0", since:"2024-10-17", changed:"" },
  { name:"Mine Management", code:"ST1309", level:6, months:48, funding:24000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.0", since:"2022-09-29", changed:"" },
  { name:"Power and Propulsion Gas Turbine Engineer", code:"ST0790", level:7, months:36, funding:16000, route:"engineering-manufacturing", epa:"Assigned", status:"Approved", version:"1.0", since:"2024-12-17", changed:"" },

  { common:true, name:"Healthcare Support Worker", code:"ST0217", level:2, months:12, funding:3000, route:"health-science", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-05-01", changed:"" },
  { common:true, name:"Senior Healthcare Support Worker", code:"ST0216", level:3, months:18, funding:5000, route:"health-science", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-05-01", changed:"" },
  { common:true, name:"Nursing Associate (NMC 2018)", code:"ST0827", level:5, months:24, funding:15000, route:"health-science", epa:"Assigned", status:"Approved", version:"1.2", since:"2024-06-01", changed:"" },
  { name:"Registered Nurse (degree)", code:"ST0781", level:6, months:48, funding:26000, route:"health-science", epa:"Assigned", status:"Approved", version:"1.2", since:"2024-08-01", changed:"" },
  { name:"Pharmacy Services Assistant", code:"ST0322", level:2, months:12, funding:3000, route:"health-science", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-04-01", changed:"" },
  { name:"Pharmacy Technician (integrated)", code:"ST0311", level:3, months:24, funding:12000, route:"health-science", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-09-01", changed:"" },
  { name:"Ambulance Support Worker", code:"ST0433", level:3, months:12, funding:6000, route:"health-science", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-06-01", changed:"" },
  { name:"Associate Ambulance Practitioner", code:"ST0245", level:4, months:18, funding:9000, route:"health-science", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-06-01", changed:"" },
  { name:"Laboratory Technician", code:"ST0246", level:3, months:24, funding:15000, route:"health-science", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-08-01", changed:"" },
  { name:"Laboratory Scientist (degree)", code:"ST0247", level:6, months:60, funding:27000, route:"health-science", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-08-01", changed:"" },
  { name:"Clinical Scientist", code:"ST0893", level:7, months:36, funding:20000, route:"health-science", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-07-24", changed:"Version 1.0 retired" },
  { name:"Clinical Associate in Psychology (integrated degree)", code:"ST0820", level:7, months:18, funding:16000, route:"health-science", epa:"Assigned", status:"Approved", version:"1.1", since:"2025-02-11", changed:"Version 1.0 retired" },
  { name:"Play Therapist", code:"ST0905", level:7, months:36, funding:20000, route:"health-science", epa:"Assigned", status:"Approved", version:"1.0", since:"2021-06-23", changed:"" },
  { name:"Family and Systemic Psychotherapist", code:"ST1310", level:7, months:24, funding:16000, route:"health-science", status:"Approved", version:"1.1", since:"2024-10-25", epa:"none", changed:"Version 1.0 retired; no assessment organisation yet" },
  { name:"Medical Statistician", code:"ST0892", level:7, months:30, funding:17000, route:"health-science", epa:"Assigned", status:"Approved", version:"1.0", since:"2021-11-12", changed:"Dispensation in place" },
  { name:"Clinical Pharmacology Scientist (integrated degree)", code:"ST0798", level:7, months:30, funding:18000, route:"health-science", epa:"Assigned", status:"Approved", version:"1.0", since:"2020-10-23", changed:"" },
  { name:"Community Health and Wellbeing Worker", code:"ST0958", level:3, months:12, funding:7000, route:"health-science", epa:"Pending — standard in development", status:"In development", version:"1.1", since:"2024-04-18", changed:"Notice period; new version in development" },
  { name:"Soil Scientist", code:"ST1362", level:7, months:24, funding:21000, route:"health-science", epa:"Assigned", status:"Approved", version:"1.0", since:"2023-10-26", changed:"" },
  { name:"Water Industry Network Technician", code:"ST1292", level:3, months:30, funding:15000, route:"health-science", epa:"Assigned", status:"Approved", version:"1.0", since:"2022-09-13", changed:"" },
  { name:"Water Industry Treatment Process Technician", code:"ST1291", level:3, months:36, funding:16000, route:"health-science", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-06-30", changed:"Version 1.0 retired" },
  { name:"Water Industry Asset Maintenance Technician", code:"ST1404", level:3, months:48, funding:27000, route:"health-science", epa:"Assigned", status:"Approved", version:"1.0", since:"2025-06-26", changed:"" },
  { name:"Water Process Operative", code:"ST0876", level:2, months:18, funding:9000, route:"health-science", epa:"Assigned", status:"Approved", version:"1.0", since:"2020-08-24", changed:"" },
  { name:"Embalmer", code:"ST0890", level:5, months:36, funding:20000, route:"health-science", epa:"Assigned", status:"Approved", version:"1.1", since:"2025-12-09", changed:"Version 1.0 retired" },

  { common:true, name:"Adult Care Worker", code:"ST0005", level:2, months:12, funding:3000, route:"care-services", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-05-01", changed:"" },
  { common:true, name:"Lead Adult Care Worker", code:"ST0006", level:3, months:18, funding:4000, route:"care-services", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-05-01", changed:"" },
  { name:"Leader in Adult Care", code:"ST0008", level:5, months:18, funding:7000, route:"care-services", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-05-01", changed:"" },
  { name:"Children, Young People and Families Practitioner", code:"ST0210", level:4, months:18, funding:6000, route:"care-services", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-07-01", changed:"" },
  { name:"Children, Young People and Families Manager", code:"ST0209", level:5, months:24, funding:7000, route:"care-services", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-07-01", changed:"" },
  { name:"Social Worker (integrated degree)", code:"ST0510", level:6, months:36, funding:25000, route:"care-services", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-09-01", changed:"" },
  { name:"Housing and Property Management", code:"ST0234", level:3, months:18, funding:6000, route:"care-services", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-06-01", changed:"" },
  { name:"Early Intervention Practitioner", code:"ST0868", level:4, months:18, funding:5000, route:"care-services", epa:"Pending — standard in development", status:"In development", version:"1.1", since:"2025-09-29", changed:"Notice period; new version in development" },

  { common:true, name:"Teaching Assistant", code:"ST0454", level:3, months:18, funding:5000, route:"education-early-years", epa:"Assigned", status:"Approved", version:"1.2", since:"2024-02-01", changed:"" },
  { common:true, name:"Early Years Practitioner", code:"ST0888", level:2, months:12, funding:4000, route:"education-early-years", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-06-01", changed:"" },
  { common:true, name:"Early Years Educator", code:"ST0135", level:3, months:18, funding:6000, route:"education-early-years", epa:"Assigned", status:"Approved", version:"1.2", since:"2024-04-01", changed:"" },
  { name:"Teacher (Postgraduate)", code:"ST0489", level:6, months:12, funding:9000, route:"education-early-years", epa:"Assigned", status:"Approved", version:"1.2", since:"2024-08-01", changed:"" },
  { name:"Education Technician", code:"ST0666", level:3, months:24, funding:10000, route:"education-early-years", epa:"Assigned", status:"Approved", version:"1.0", since:"2021-07-01", changed:"" },
  { name:"Academic Professional", code:"ST0477", level:7, months:24, funding:9000, route:"education-early-years", epa:"Assigned", status:"Approved", version:"1.1", since:"2026-01-01", changed:"Level 7 age restriction now applies to new starts", article:"level-7" },

  { common:true, name:"Accounts or Finance Assistant", code:"ST0002", level:2, months:12, funding:5000, route:"legal-finance-accounting", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-04-01", changed:"" },
  { name:"Assistant Accountant", code:"ST0002B", level:3, months:15, funding:8000, route:"legal-finance-accounting", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-04-01", changed:"" },
  { name:"Professional Accounting or Taxation Technician", code:"ST0003", level:4, months:18, funding:8000, route:"legal-finance-accounting", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-04-01", changed:"" },
  { name:"Accountancy or Taxation Professional", code:"ST0001", level:7, months:36, funding:21000, route:"legal-finance-accounting", epa:"Assigned", status:"Approved", version:"1.2", since:"2026-01-01", changed:"Level 7 age restriction now applies to new starts", article:"level-7" },
  { name:"Solicitor", code:"ST0246S", level:7, months:60, funding:27000, route:"legal-finance-accounting", epa:"Assigned", status:"Approved", version:"1.2", since:"2026-01-01", changed:"Level 7 age restriction now applies to new starts", article:"level-7" },
  { name:"Paralegal", code:"ST0137", level:3, months:24, funding:9000, route:"legal-finance-accounting", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-06-01", changed:"" },
  { name:"Insurance Practitioner", code:"ST0241", level:3, months:18, funding:6000, route:"legal-finance-accounting", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-08-01", changed:"" },
  { name:"Insurance Professional", code:"ST0242", level:4, months:24, funding:9000, route:"legal-finance-accounting", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-08-01", changed:"" },
  { name:"Financial Services Professional", code:"ST0472", level:6, months:36, funding:21000, route:"legal-finance-accounting", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-10-01", changed:"" },
  { name:"Investment Operations Technician", code:"ST0257", level:3, months:18, funding:6000, route:"legal-finance-accounting", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-07-01", changed:"" },
  { name:"Compliance and Risk Officer", code:"ST0123", level:3, months:24, funding:9000, route:"legal-finance-accounting", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-09-01", changed:"" },
  { name:"Archivist and Records Manager", code:"ST0904", level:7, months:36, funding:12000, route:"legal-finance-accounting", epa:"Assigned", status:"Approved", version:"1.0", since:"2021-11-12", changed:"" },
  { name:"Land Referencer", code:"ST0877", level:4, months:30, funding:14000, route:"legal-finance-accounting", status:"Retirement consultation", version:"1.1", since:"2025-12-10", epa:"none", changed:"Retirement consultation open; no assessment organisation" },
  { name:"Trading Standards Professional", code:"ST0998", level:6, months:36, funding:22000, route:"legal-finance-accounting", epa:"Assigned", status:"Approved", version:"1.1", since:"2024-11-14", changed:"Version 1.0 retired" },

  { common:true, name:"Commis Chef", code:"ST0231", level:2, months:12, funding:5000, route:"catering-hospitality", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-05-01", changed:"" },
  { common:true, name:"Chef de Partie", code:"ST0229", level:3, months:12, funding:6000, route:"catering-hospitality", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-05-01", changed:"" },
  { name:"Senior Chef Production Cooking", code:"ST0232", level:3, months:12, funding:6000, route:"catering-hospitality", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-05-01", changed:"" },
  { common:true, name:"Hospitality Team Member", code:"ST0233", level:2, months:12, funding:5000, route:"catering-hospitality", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-05-01", changed:"" },
  { name:"Hospitality Supervisor", code:"ST0235", level:3, months:12, funding:5000, route:"catering-hospitality", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-05-01", changed:"" },
  { name:"Hospitality Manager", code:"ST0236", level:4, months:18, funding:6000, route:"catering-hospitality", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-05-01", changed:"" },
  { name:"Baker", code:"ST0186", level:2, months:15, funding:6000, route:"catering-hospitality", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-06-01", changed:"" },
  { name:"Butcher", code:"ST0195", level:2, months:18, funding:7000, route:"catering-hospitality", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-06-01", changed:"" },
  { name:"Food and Drink Process Operator", code:"ST0198", level:2, months:12, funding:6000, route:"catering-hospitality", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-06-01", changed:"" },

  { common:true, name:"Retailer", code:"ST0324", level:2, months:12, funding:4000, route:"sales-marketing-procurement", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-05-01", changed:"" },
  { name:"Retail Team Leader", code:"ST0326", level:3, months:15, funding:5000, route:"sales-marketing-procurement", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-05-01", changed:"" },
  { name:"Retail Manager", code:"ST0325", level:4, months:19, funding:6000, route:"sales-marketing-procurement", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-05-01", changed:"" },
  { name:"Sales Executive", code:"ST0442S", level:4, months:18, funding:6000, route:"sales-marketing-procurement", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-07-01", changed:"" },
  { name:"Business to Business Sales Professional", code:"ST0806", level:6, months:24, funding:15000, route:"sales-marketing-procurement", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-09-01", changed:"" },
  { name:"Marketing Executive", code:"ST0790M", level:4, months:18, funding:8000, route:"sales-marketing-procurement", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-08-01", changed:"" },
  { name:"Marketing Manager", code:"ST0791", level:6, months:24, funding:16000, route:"sales-marketing-procurement", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-08-01", changed:"" },
  { common:true, name:"Digital Marketer", code:"ST0122", level:3, months:18, funding:11000, route:"sales-marketing-procurement", epa:"Assigned", status:"Defunded from Sept 2026", version:"1.1", since:"2026-09-01", changed:"Funding withdrawn from September 2026", article:"defunding-16" },
  { name:"Procurement and Supply Chain Practitioner", code:"ST0812", level:4, months:24, funding:9000, route:"sales-marketing-procurement", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-09-01", changed:"" },
  { name:"Supply Chain Practitioner", code:"ST0270", level:3, months:24, funding:5000, route:"sales-marketing-procurement", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-07-01", changed:"" },

  { name:"Large Goods Vehicle Driver", code:"ST0257L", level:2, months:13, funding:7000, route:"transport-logistics", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-06-01", changed:"" },
  { common:true, name:"Supply Chain Warehouse Operative", code:"ST0268", level:2, months:12, funding:4000, route:"transport-logistics", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-06-01", changed:"" },
  { name:"Rail Engineering Technician", code:"ST0342", level:3, months:36, funding:21000, route:"transport-logistics", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-08-01", changed:"" },
  { name:"Rail Engineering Operative", code:"ST0341", level:2, months:18, funding:12000, route:"transport-logistics", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-08-01", changed:"" },
  { name:"Train Driver", code:"ST0343", level:3, months:12, funding:9000, route:"transport-logistics", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-08-01", changed:"" },
  { name:"Aviation Flight Operations Coordinator", code:"ST1007", level:3, months:18, funding:8000, route:"transport-logistics", epa:"Assigned", status:"Approved", version:"1.0", since:"2023-09-04", changed:"" },
  { name:"Aviation Movement Specialist", code:"ST0954", level:3, months:18, funding:7000, route:"transport-logistics", epa:"Assigned", status:"Approved", version:"1.1", since:"2021-08-03", changed:"" },
  { name:"Officer of the Watch (near coastal)", code:"ST0842", level:3, months:36, funding:15000, route:"transport-logistics", epa:"Assigned", status:"Retirement consultation", version:"1.2", since:"2025-08-19", changed:"Retirement consultation open" },
  { name:"Ship's Master — under 500gt near coastal", code:"ST1333", level:4, months:48, funding:27000, route:"transport-logistics", epa:"Assigned", status:"Approved", version:"1.0", since:"2025-02-19", changed:"" },
  { name:"Small Vessel Chief Engineer", code:"ST0875", level:4, months:48, funding:16000, route:"transport-logistics", epa:"Assigned", status:"Approved", version:"1.0", since:"2022-06-01", changed:"" },
  { name:"Port Agent", code:"ST0544", level:3, months:18, funding:13000, route:"transport-logistics", epa:"Assigned", status:"Approved", version:"1.0", since:"2025-02-18", changed:"Version retired and replaced" },
  { name:"Lead Traffic Management Operative", code:"ST0985", level:2, months:18, funding:8000, route:"transport-logistics", epa:"Assigned", status:"Approved", version:"1.2", since:"2025-12-09", changed:"Version 1.1 retired" },

  { name:"Junior Grip", code:"ST1318", level:2, months:24, funding:15000, route:"creative-design", epa:"Assigned", status:"Approved", version:"1.0", since:"2023-08-29", changed:"" },
  { name:"Post Production Engineer", code:"ST0933", level:5, months:24, funding:14000, route:"creative-design", epa:"Assigned", status:"Approved", version:"1.0", since:"2021-08-03", changed:"" },
  { name:"VFX Supervisor", code:"ST0901", level:7, months:18, funding:21000, route:"creative-design", epa:"Assigned", status:"Approved", version:"1.0", since:"2021-05-27", changed:"" },
  { name:"VFX Artist or Technical Director", code:"ST0902", level:6, months:18, funding:11000, route:"creative-design", epa:"Assigned", status:"Approved", version:"1.0", since:"2021-08-03", changed:"" },
  { name:"Assistant Recording Technician", code:"ST0944", level:4, months:24, funding:10000, route:"creative-design", epa:"Pending — standard in development", status:"In development", version:"1.0", since:"2021-05-27", changed:"Notice period; new version in development" },
  { name:"Scenic Automation Technician", code:"ST0915", level:3, months:24, funding:17000, route:"creative-design", epa:"Pending — standard in development", status:"In development", version:"1.0", since:"2024-05-14", changed:"Notice period; new version in development" },
  { name:"Scenic Construction Technician", code:"ST0917", level:3, months:30, funding:23000, route:"creative-design", epa:"Pending — standard in development", status:"In development", version:"1.0", since:"2024-02-27", changed:"Notice period; new version in development" },
  { name:"Costume Technician — stage and screen", code:"ST0783", level:3, months:15, funding:9000, route:"creative-design", epa:"Pending — standard in development", status:"In development", version:"1.1", since:"2023-10-18", changed:"Notice period; new version in development" },
  { name:"Junior Production Coordinator", code:"ST0792", level:4, months:18, funding:11000, route:"creative-design", epa:"Pending — standard in development", status:"In development", version:"1.2", since:"2024-09-02", changed:"Notice period; new version in development" },
  { name:"Photographer", code:"ST1388", level:4, months:18, funding:8000, route:"creative-design", epa:"Assigned", status:"Approved", version:"1.1", since:"2024-03-06", changed:"Version 1.0 retired" },
  { name:"Jewellery, Silversmithing and Allied Trades Professional", code:"ST0439", level:3, months:36, funding:16000, route:"creative-design", epa:"Assigned", status:"Approved", version:"1.1", since:"2025-12-08", changed:"Version 1.0 retired" },
  { name:"Stained Glass Craftsperson", code:"ST0912", level:4, months:36, funding:27000, route:"creative-design", epa:"Assigned", status:"Approved", version:"1.0", since:"2021-09-13", changed:"" },
  { name:"Bookbinder", code:"ST0469", level:2, months:24, funding:10000, route:"creative-design", status:"Approved", version:"1.0", since:"2020-08-24", epa:"none", changed:"Approved; no assessment organisation yet" },
  { name:"Collections Technician", code:"ST1469", level:3, months:18, funding:13000, route:"creative-design", epa:"Assigned", status:"Approved", version:"1.0", since:"2025-06-23", changed:"" },
  { name:"Social Researcher", code:"ST1341", level:6, months:42, funding:24000, route:"creative-design", epa:"Assigned", status:"Approved", version:"1.0", since:"2023-08-29", changed:"" },

  { name:"Horticulture and Landscaping Technical Manager", code:"ST0924", level:5, months:36, funding:17000, route:"agriculture", epa:"Assigned", status:"Approved", version:"1.0", since:"2021-09-28", changed:"" },
  { name:"Arboriculturist", code:"ST0921", level:4, months:30, funding:14000, route:"agriculture", epa:"Assigned", status:"Approved", version:"1.0", since:"2021-09-14", changed:"" },
  { name:"Forest Craftsperson", code:"ST1321", level:3, months:24, funding:14000, route:"agriculture", epa:"Assigned", status:"Approved", version:"1.1", since:"2024-11-13", changed:"Version 1.0 retired" },
  { name:"Professional Forester (integrated degree)", code:"ST0923", level:6, months:36, funding:22000, route:"agriculture", epa:"Assigned", status:"Approved", version:"1.2", since:"2025-03-14", changed:"Version 1.1 retired" },
  { name:"Assistant Farm Manager", code:"ST1320", level:4, months:24, funding:11000, route:"agriculture", epa:"Assigned", status:"Approved", version:"1.1", since:"2024-11-18", changed:"Version 1.0 retired" },
  { name:"Countryside Ranger", code:"ST0926", level:4, months:26, funding:9000, route:"agriculture", epa:"Assigned", status:"Approved", version:"1.3", since:"2024-11-18", changed:"Version 1.2 retired" },
  { name:"Advanced Sports Turf Technician", code:"ST1323", level:3, months:24, funding:8000, route:"agriculture", epa:"Assigned", status:"Approved", version:"1.2", since:"2025-12-09", changed:"Version 1.1 retired" },
  { name:"Dog Groomer", code:"ST0943", level:2, months:12, funding:5000, route:"agriculture", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-03-17", changed:"Version 1.0 retired" },
  { name:"Underkeeper", code:"ST0412", level:2, months:18, funding:7000, route:"agriculture", epa:"Assigned", status:"Approved", version:"1.2", since:"2023-12-14", changed:"" },
  { name:"Agriculture or Horticulture Professional Adviser", code:"ST0761", level:6, months:30, funding:14000, route:"agriculture", epa:"Assigned", status:"Approved", version:"1.0", since:"2025-07-24", changed:"Version retired and replaced" },
  { name:"Fundraiser", code:"ST0416", level:3, months:18, funding:8000, route:"agriculture", epa:"Assigned", status:"Approved", version:"1.0", since:"2020-07-10", changed:"" },

  { name:"Hairdressing Professional", code:"ST0217H", level:2, months:18, funding:9000, route:"hair-beauty", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-05-22", changed:"" },
  { name:"Advanced and Creative Hair Professional", code:"ST0218", level:3, months:18, funding:9000, route:"hair-beauty", epa:"Assigned", status:"Approved", version:"1.0", since:"2023-05-22", changed:"" },
  { name:"Beauty Professional", code:"ST0219", level:2, months:18, funding:9000, route:"hair-beauty", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-05-22", changed:"" },
  { name:"Advanced Beauty Therapist", code:"ST0220", level:3, months:18, funding:9000, route:"hair-beauty", epa:"Assigned", status:"Approved", version:"1.0", since:"2023-05-22", changed:"" },

  { name:"Firefighter", code:"ST0289", level:3, months:24, funding:12000, route:"protective-services", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-07-01", changed:"" },
  { name:"Police Constable (degree)", code:"ST0642", level:6, months:36, funding:24000, route:"protective-services", epa:"Assigned", status:"Approved", version:"1.2", since:"2024-04-01", changed:"" },
  { name:"Prison Officer", code:"ST0646", level:3, months:12, funding:6000, route:"protective-services", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-06-01", changed:"" },
  { name:"Probation Officer", code:"ST0644", level:6, months:24, funding:19000, route:"protective-services", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-09-01", changed:"" },
  { name:"Intelligence Analyst", code:"ST0292", level:4, months:18, funding:9000, route:"protective-services", epa:"Assigned", status:"Approved", version:"1.1", since:"2023-08-01", changed:"" }
];

/* ---------- 7. FURTHER READING -----------------------------------------
   Reputable places to read more. Shown on the articles page.
   type : "official" | "press" | "sector" | "provider"
   ----------------------------------------------------------------------- */

const FURTHER_READING = [
  {
    name: "FE Week",
    type: "press",
    what: "The trade paper of record for further education and skills. First to report the defunding list and the streamlining review, and the place where policy leaks tend to surface before official guidance.",
    url: "https://feweek.co.uk/"
  },
  {
    name: "Skills England — Apprenticeship finder",
    type: "official",
    what: "The register itself. Every standard, its version history, funding band, duration and status. Filter by route, level or approval date, and download the full list as a CSV.",
    url: "https://skillsengland.education.gov.uk/apprenticeships/"
  },
  {
    name: "Skills England — Occupational maps",
    type: "official",
    what: "How standards, T-Levels and other technical qualifications connect across the 15 routes, plus progression maps showing where each one can lead. Has a public API.",
    url: "https://occupational-maps.skillsengland.education.gov.uk/"
  },
  {
    name: "GOV.UK — Apprenticeship funding rules",
    type: "official",
    what: "The rulebooks themselves, published per funding year with a summary of changes. If a Skills Radar article and the rules disagree, the rules win.",
    url: "https://www.gov.uk/guidance/apprenticeship-funding-rules"
  },
  {
    name: "Apprenticeship Service help centre",
    type: "official",
    what: "Operational guidance for employers and providers, including the Growth and Skills Levy changes, streamlining, foundation apprenticeships and apprenticeship units.",
    url: "https://help.apprenticeships.education.gov.uk/"
  },
  {
    name: "T Levels support for schools and colleges",
    type: "official",
    what: "Provider-facing T-Level updates, including the monthly policy bulletins that carry industry placement and subject changes before they reach GOV.UK.",
    url: "https://support.tlevels.gov.uk/"
  },
  {
    name: "CIPD",
    type: "sector",
    what: "The professional body for HR and people development. Useful for the employer-side reading of levy reform, and among the more willing to name trade-offs rather than just summarise.",
    url: "https://www.cipd.org/uk/"
  },
  {
    name: "Association of Employment and Learning Providers",
    type: "sector",
    what: "Represents independent training providers and is consulted on the funding rules before publication. Its responses often signal where rules are likely to shift.",
    url: "https://www.aelp.org.uk/"
  },
  {
    name: "Association of Colleges",
    type: "sector",
    what: "Represents colleges, and is closest to the T-Level and Level 2 reform picture including the Foundation Year transition.",
    url: "https://www.aoc.co.uk/"
  },
  {
    name: "NCFE — apprenticeship reform updates",
    type: "provider",
    what: "An awarding organisation tracking the reformed assessment plan rollout, with a status page showing which standards have moved and which are still in development.",
    url: "https://www.ncfe.org.uk/epa-and-apprenticeship-assessment/apprenticeship-assessment-reforms/apprenticeship-reform-updates/"
  },
  {
    name: "Gateway Qualifications — apprenticeship reforms",
    type: "provider",
    what: "Assessment-organisation view of the reform programme, including the changes to apprenticeship assessment companion document and the indicative timeline.",
    url: "https://www.gatewayqualifications.org.uk/end-point-assessment/apprenticeship-reforms/"
  },
  {
    name: "Ofqual",
    type: "official",
    what: "The regulator. Relevant for T-Level assessment changes, including the consultation on allowing learners to retake core exams individually.",
    url: "https://www.gov.uk/government/organisations/ofqual"
  }
];

/* ---------- 7. FURTHER READING ----------------------------------------
   Reputable places to follow this beat. Grouped by topic so the articles
   page can suggest relevant onward reading.
   ----------------------------------------------------------------------- */

const READING = [
  { name:"FE Week", url:"https://feweek.co.uk/", tags:["Funding rules","Levy","Standard","T-Levels"],
    note:"The trade paper of record for further education. Breaks most funding and defunding stories first." },
  { name:"Skills England", url:"https://skillsengland.education.gov.uk/", tags:["Standard","Funding rules"],
    note:"The apprenticeship register itself, plus policy notices attached to the search page." },
  { name:"Apprenticeship Service help centre", url:"https://help.apprenticeships.education.gov.uk/", tags:["Levy","Funding rules"],
    note:"Where levy and funding operational guidance actually lands, usually before it reaches GOV.UK." },
  { name:"GOV.UK apprenticeship funding rules", url:"https://www.gov.uk/guidance/apprenticeship-funding-rules", tags:["Funding rules","Levy"],
    note:"The rules themselves. Always the final word over any summary, including ours." },
  { name:"T Levels provider support", url:"https://support.tlevels.gov.uk/", tags:["T-Levels"],
    note:"DfE's own update service for schools and colleges delivering T-Levels." },
  { name:"CIPD", url:"https://www.cipd.org/uk/", tags:["Levy","Funding rules"],
    note:"Reliable employer-side analysis of levy reform and what it means for people teams." },
  { name:"Association of Employment and Learning Providers", url:"https://www.aelp.org.uk/", tags:["Funding rules","Standard"],
    note:"Provider representative body. Useful for reading where the sector is pushing back." },
  { name:"Association of Colleges", url:"https://www.aoc.co.uk/", tags:["T-Levels","Funding rules"],
    note:"College-side policy commentary, particularly strong on 16-19 and T-Level delivery." },
  { name:"Ofqual", url:"https://www.gov.uk/government/organisations/ofqual", tags:["T-Levels","Funding rules"],
    note:"Consultations on assessment and qualification reform, including T-Level exam retakes." },
  { name:"NCFE apprenticeship reform updates", url:"https://www.ncfe.org.uk/", tags:["Funding rules","Standard"],
    note:"An awarding organisation tracking reformed assessment plan progress standard by standard." }
];

/* ---------- 8. 2024/25 FUNDING RULES INDEX ------------------------------
   A searchable index of the August 2024 to July 2025 apprenticeship funding
   rules. Paragraph numbers are the real ones from the published document.
   "related" lists other sections a reader should check at the same time —
   this drives the "you should also review" suggestions.
   ----------------------------------------------------------------------- */

const RULES_DOC = {
  title: "Apprenticeship funding rules: August 2026 to July 2027",
  version: "Version 3, published 29 July 2026",
  applies: "Apprenticeships starting on or after 1 August 2026",
  history: "Draft published 22 April 2026. Version 1 on 15 June, version 2 on 15 July, version 3 on 29 July to reflect updates to co-investment policy.",
  landing: "https://www.gov.uk/government/publications/apprenticeship-funding-rules-and-assessment-plan-guidance-2026-to-2027",
  changes: "https://www.gov.uk/government/publications/apprenticeship-funding-rules-and-assessment-plan-guidance-2026-to-2027/apprenticeship-funding-rules-summary-of-changes-version-1",
  collection: "https://www.gov.uk/government/collections/funding-rules-for-apprenticeships",
  guidance: "https://www.gov.uk/guidance/apprenticeship-funding-rules",
  owner: "Department for Work and Pensions",
  licence: "Crown copyright, licensed under the Open Government Licence v3.0"
};

/* Sections of the 2026/27 rules, with the real paragraph numbers.
   "related" drives the "you should also review" suggestions. */

const RULES_SECTIONS = [
  { id:"intro", name:"Introduction and purpose", paras:"2, 5, 13, 15, 26",
    terms:["introduction","purpose","scope","growth and skills levy","dwp","machinery of government","apprenticeship units","growth pilot","end-point assessment terminology"],
    gist:"Confirms the rules may change at any time, including to funding and to the products available under the growth and skills levy. Language and definitions were updated following the transfer of responsibility for apprenticeships from DfE to DWP. Reference to Annex C is removed — minimum off-the-job volumes now sit on the Skills England website against each standard. Rules for apprenticeship units, live since April 2026, are included; the Growth Pilot ended in March 2026.",
    related:["off-the-job","subcontracting"] },

  { id:"eligibility", name:"Learner eligibility", paras:"30.5, 33, 34.5, 34.6.4",
    terms:["eligibility","eligible","age","50% in England","working hours","administration assistant","st1472","skills bootcamp","visa","residency","ordinary residence"],
    gist:"Working hours no longer all need to be known in advance to meet the 50% in England rule. Apprentices starting the Level 2 Administration Assistant standard (ST1472) are only eligible if aged 16 to 24 at the start, or 15 where their 16th birthday falls between the last Friday of June and 31 August. Individuals on a government-funded Skills Bootcamp are not eligible for apprenticeship funding. Evidence requirements around visas and ordinary residence were clarified.",
    related:["english-maths","co-investment","prior-learning"] },

  { id:"prior-learning", name:"Recognition of prior learning and experience", paras:"38.2, 38.3, 39.2.1",
    terms:["prior learning","rpl","skills scan","accelerated apprenticeship","regulated professions","progression profiles"],
    gist:"A skills scan can be conducted against a training plan provided it maps to the standard's outcomes. The term accelerated apprenticeship has been dropped as it is no longer used, and progression profiles linked to Skills Bootcamps have gone because the product was never developed. A list of regulated professions has been added.",
    related:["initial-assessment","eligibility"] },

  { id:"learning-support", name:"Apprentices who need learning support", paras:"44.5",
    terms:["learning support","support","disability","permanent disability","light touch","reviews"],
    gist:"Where a learning support need is stable because of a permanent disability and is unlikely to change, reviews may be light-touch rather than full.",
    related:["english-maths","progress-reviews"] },

  { id:"english-maths", name:"Support for English and maths training", paras:"47, 49.2, 49.3, 50.2, 52.2, 54.2.1, 57.2, 60",
    terms:["english","maths","functional skills","initial assessment","opt in","opt out","19 plus","distance learning","adult skills fund","exempt","level 1","level 2"],
    gist:"The provider must establish at initial assessment whether the apprentice will study a standalone English or maths qualification. Where English or maths is an essential component of a mandatory qualification it must be completed. Training must not be delivered fully by self-directed distance learning. If a 19+ apprentice opts in then withdraws, the provider must withdraw them to the last day of learning. Apprentices may use their adult skills fund statutory entitlement alongside an apprenticeship. Providers must still support exempt apprentices to develop these skills.",
    related:["initial-assessment","training-plan","eligibility","off-the-job"] },

  { id:"initial-assessment", name:"The outcome of the initial assessment", paras:"65.4",
    terms:["initial assessment","job role","occupational competence","substantial link"],
    gist:"The link between the job role and the apprenticeship must be clear and substantial, with the apprenticeship leading to full occupational competence for that role.",
    related:["prior-learning","training-plan","programme-eligibility"] },

  { id:"programme-eligibility", name:"Programme eligibility", paras:"67, 68, 68.3",
    terms:["programme eligibility","ksb","knowledge skills behaviours","approved standard","level 7","level 6","non-mandatory qualification","funding agreement","restrictions"],
    gist:"All new apprentices must start on an approved standard that is eligible for funding, and providers must comply with any restrictions on specific standards in their own funding agreement. A Level 7 non-mandatory unit or qualification must not be used to deliver the content of a Level 6 standard.",
    related:["eligibility","what-funded"] },

  { id:"employment", name:"Employment arrangements and the apprenticeship agreement", paras:"69.2, 70.4",
    terms:["employment","paye","apprenticeship agreement","planned end date","ilr","extended"],
    gist:"The employer must keep their PAYE information in their apprenticeship service account up to date. The original ILR planned end date must not change once submitted, even where the apprenticeship agreement is extended, unless there has been a break in learning and a subsequent restart.",
    related:["wages","service-account","breaks"] },

  { id:"wages", name:"Apprentice wages", paras:"76.1",
    terms:["wages","pay","national minimum wage","nmw","withdraw"],
    gist:"If a provider is made aware that a learner is not being paid in line with the National Minimum Wage Regulations, the learner must be withdrawn from the programme.",
    related:["employment"] },

  { id:"off-the-job", name:"Off-the-job training", paras:"85, 90, 91, 95.1",
    terms:["off the job","otj","off-the-job","annex c","actual hours","evidence","subcontractor","active learning","minimum volume"],
    gist:"Annex C has been removed — the minimum volume of off-the-job training for each standard is now published on the Skills England website against that standard. Only eligible off-the-job training can go in the actual hours field. The provider is responsible for evidencing all required off-the-job training even where a subcontractor or the employer delivers it. Active learning does not include standalone English and maths qualifications.",
    related:["training-plan","english-maths","subcontracting"] },

  { id:"training-plan", name:"The training plan", paras:"100.3, 101",
    terms:["training plan","initial assessment summary","gateway","sign off","delivered"],
    gist:"Providers may include a summary of the initial assessment on the training plan. At the end of the programme the employer, provider and learner must agree that the content of the training plan has been delivered, recorded either in the plan or in the provider's gateway review process.",
    related:["initial-assessment","progress-reviews","assessment"] },

  { id:"progress-reviews", name:"Progress reviews", paras:"102.1",
    terms:["progress review","review","timetable","6 months","frequency"],
    gist:"Where an alternative progress review timetable is agreed with the employer, it must be agreed in advance and reviews must be no more than 6 months apart.",
    related:["training-plan","learning-support"] },

  { id:"what-funded", name:"What can be funded", paras:"107.5, 110.4",
    terms:["what can be funded","eligible costs","ineligible","on-programme assessment","level 7","level 6","co-investment reporting"],
    gist:"The section has been restructured and some costs combined, with material moved to the price of an apprenticeship section. The term on-programme assessment has been removed throughout to avoid confusion following assessment reform. A Level 7 non-mandatory qualification must not be used to deliver Level 6 content. Reference to the costs of reporting employer co-investment has been removed.",
    related:["price","co-investment","assessment"] },

  { id:"additional-payments", name:"Additional payments and the care leaver bursary", paras:"125, 127.1, 132",
    terms:["additional payments","incentive","care leaver","bursary","bank details","employer payment","provider payment"],
    gist:"Both the provider and the employer receive the additional payment where the apprentice meets the eligibility criteria. Providers must give apprentices the information they need to declare care leaver status, and there are minimum expectations on providers when contacting employers for bank details.",
    related:["hiring-payment","co-investment"] },

  { id:"hiring-payment", name:"Apprenticeship hiring payment for non-levy employers", paras:"133 to 141",
    terms:["hiring payment","£2000","2000","non-levy","recruitment","16 to 24","october 2026","foundation apprenticeship"],
    gist:"From October 2026 non-levy employers can receive a £2,000 hiring payment when recruiting a new apprentice aged 16 to 24. It applies to apprenticeships starting from 1 October 2026 where the apprentice started their job with that employer within the previous 3 months. It is paid in two instalments, the first once the apprentice completes 90 days. It applies to foundation apprenticeships, and is outside subsidy control from 1 August 2026 to 31 July 2027.",
    related:["additional-payments","co-investment","foundation"] },

  { id:"foundation", name:"Foundation apprenticeships", paras:"162, 170",
    terms:["foundation apprenticeship","consent","data sharing","hiring payment"],
    gist:"Where an apprentice does not consent to share the information set out at paragraph 150, they are ineligible for funding and must not be placed on a foundation apprenticeship. Employers who do not pay the levy receive the new hiring payment for eligible foundation apprentices.",
    related:["hiring-payment","eligibility"] },

  { id:"service-account", name:"Funds in and use of the apprenticeship service account", paras:"189.2, 190, 192.3, 193, 195, 195.1, 197",
    terms:["service account","apprenticeship service","completion payment","20%","paye","reconciliation","third party","ilr"],
    gist:"The 20% completion payment is not aligned to assessment costs. References to monthly payments being matched with equivalent employer co-investment have been removed, as has the requirement to collect and record co-investment on the ILR before the completion payment is released. The PAYE scheme used to pay apprentices must be declared, and evidence may be requested. Reconciliation changes must be actioned within the current funding year. Third parties cannot access or operate payments in an employer's account.",
    related:["co-investment","reservations","price"] },

  { id:"reservations", name:"Reservation of funds by non-levy employers", paras:"200.1, 201",
    terms:["reservation","reserve","non-levy","backdate","permission"],
    gist:"Employers can give providers permission to reserve funds on their behalf. Reservations are only expected to be backdated by exception.",
    related:["co-investment","service-account"] },

  { id:"price", name:"The price of an apprenticeship", paras:"207, 208, 208.1, 210, 211.1, 211.3",
    terms:["price","contract for services","tnp1","tnp2","total negotiated price","programme level","learner level","price change","epao"],
    gist:"The contract for services with the employer can now be at programme level rather than learner level, and no longer needs the price broken down into eligible cost areas — though it must state funding will only be used on eligible costs. Learner level pricing is managed through the ILR and apprenticeship service. TNP1 must only contain the cost of training. Employers now only need to approve a price change where the total price increases, for changes on or after 1 August 2026.",
    related:["what-funded","service-account","co-investment"] },

  { id:"co-investment", name:"Employer co-investment", paras:"213, 213.1, 214, 214.2",
    terms:["co-investment","coinvestment","25%","5%","75%","100%","insufficient funds","levy payer","non-levy","age","16 to 24","25 and over","full funding"],
    gist:"For new starts from 1 August 2026: a levy payer with insufficient funds in their account co-invests at 25%, but government funds 100% of training and assessment costs up to the band maximum for apprentices aged 16 to 24, and 75% for those aged 25 and over. An employer who does not pay the levy co-invests 5% where the apprentice is aged 25 or above, and pays nothing where the apprentice is aged 16 to 24, with government funding all costs up to the band maximum.",
    related:["reservations","transfers","subsidy","hiring-payment"] },

  { id:"qualifying-days", name:"Qualifying days for funding", paras:"221, 222, 224",
    terms:["qualifying days","actual end date","planned end date","episode of learning","break in learning"],
    gist:"Planned end date has been amended to actual end date to reflect the position more accurately. Where a learner does not complete one episode of learning the provider must remove the learner record from the ILR. The position on breaks in learning during the qualifying period has been clarified.",
    related:["breaks","change-circumstance"] },

  { id:"subsidy", name:"Subsidy control", paras:"230, 233.1",
    terms:["subsidy","subsidy control","mfa","minimal financial assistance","public sector","hiring payment"],
    gist:"Public sector employers receiving transfers of levy funds fall outside these subsidy control rules and do not need to complete an MFA declaration. The apprenticeship hiring payment for non-levy employers is outside the scope of subsidy control from 1 August 2026 to 31 July 2027.",
    related:["transfers","hiring-payment"] },

  { id:"transfers", name:"Apprentices funded by transfers of levy funds", paras:"234, 234.1, 242",
    terms:["transfer","levy transfer","top up","10%","pledge","allowance","apprenticeship units"],
    gist:"The transfer allowance covers both apprenticeships and apprenticeship units. Reference to the 10% government top-up has been removed — it is no longer added to new funds entering levy accounts from 1 August 2026. How and when automated features operate within the online pledge service has been clarified.",
    related:["co-investment","subsidy","service-account"] },

  { id:"subcontracting", name:"Subcontracting", paras:"262.3, 263, 267, 283, 283.1",
    terms:["subcontract","subcontracting","subcontractor","de-minimis","deminimis","apar","procurement act","itt","directly managed","review"],
    gist:"The de-minimis exemption is extended to all providers from 1 August 2026 — it is no longer restricted to those who have achieved the subcontracting standard, and the separate ITT exemption has gone as a result. Providers remain responsible for the subcontracting rules however a subcontractor is selected. The Procurement Act 2023 replaced the Public Contract Regulations 2015 for new procurements. A full review of this section runs to September 2026 with changes from 2027.",
    related:["intro","off-the-job","what-funded"] },

  { id:"change-circumstance", name:"Change of circumstance and redundancy", paras:"301.2, 306.1, 306.2, 313.1, 313.2",
    terms:["change of circumstance","redundancy","new employer","4 weeks","8 weeks","12 weeks","self-employed","break in learning"],
    gist:"Where an apprentice has not started new employment within 4 weeks of their apprenticeship agreement or employment ending, the provider must record a break in learning. Where they have not restarted with a new employer within 8 weeks of the break beginning — 12 weeks from the end of employment — the main provider must withdraw them. An apprentice being fully funded to completion may become self-employed, though not under the time-limited 12-week funding support.",
    related:["breaks","qualifying-days","employment"] },

  { id:"breaks", name:"Breaks in learning", paras:"—",
    terms:["break in learning","bil","medical","absent","illness"],
    gist:"Following feedback, queries and further legal advice, the reference to apprentices absent from work for medical reasons being able to continue with their apprenticeship has been removed.",
    related:["change-circumstance","qualifying-days"] },

  { id:"new-version", name:"Changing to a new version of a standard", paras:"328, 339",
    terms:["new version","version change","assessment plan revised","minimum duration","annex b"],
    gist:"For apprentices moving to a new version of a standard where the assessment plan has been revised, see Annex B and the changes to apprenticeship assessment guidance. Minimum duration requirements are those that applied to the standard on the apprentice's original start date.",
    related:["assessment","eligibility"] },

  { id:"assessment", name:"Annex B — apprenticeship assessment", paras:"382, 383.1, 383.2, 387, 388, 389, 390, 393, 395, 397, 416",
    terms:["assessment","annex b","epa","gateway","gateway to completion","assessment organisation","epao","certification","integrated","grading"],
    gist:"Gateway, or gateway to assessment, is replaced by gateway to completion, reflecting that assessment can now take place at any stage. The provider must engage an assessment organisation at the start of the apprenticeship, and the price negotiated must reflect each party's role in developing, designing and delivering the assessment including quality assurance. For revised plans where a mandatory qualification fully or substantially covers the required knowledge and skills, the requirement for an occupational participant in grading who was not involved in training no longer applies. Rules for certification and for moving to a new version following assessment reform are included.",
    related:["new-version","training-plan","price"] },

  { id:"annex-a", name:"Annex A — residency", paras:"374.6",
    terms:["annex a","residency","outside england","exemption"],
    gist:"An additional exemption has been added to those outside England who can be funded for an apprenticeship.",
    related:["eligibility"] },

  { id:"glossary", name:"Glossary", paras:"—",
    terms:["glossary","definitions","growth and skills levy","gateway to completion","care leaver","irrefutable","ir35","subcontractor"],
    gist:"Definitions added or amended for additional payments, apprenticeship levy, care experienced, care leaver, co-investment, completion payment, directly managed and controlled, gateway to completion, growth and skills levy, irrefutable, IR35, learning actual and planned end dates, levy, on-the-job training, progression profiles, Skills England, subcontracting and subcontractor. Accelerated apprenticeship and on-programme assessment have been deleted.",
    related:["intro"] }
];

/* Material changes from the 2025/26 rules.
   when : "v1" (15 June 2026), "v2" (15 July 2026), "v3" (29 July 2026),
          "draft" (in the rules from 1 August 2026) */

const RULES_CHANGES = [
  { section:"hiring-payment", when:"v1", paras:"133 to 141", impact:"high",
    title:"New £2,000 apprenticeship hiring payment for non-levy employers",
    from:"There was no hiring payment. Non-levy employers received only the existing additional payments for 16 to 18 year olds and certain 19 to 24 year olds.",
    to:"From October 2026, non-levy employers get £2,000 when recruiting an apprentice aged 16 to 24 starting from 1 October 2026, provided the apprentice began their job within the previous 3 months. Paid in two instalments, the first after 90 days on programme. It applies to foundation apprenticeships and sits outside subsidy control for the year." },

  { section:"co-investment", when:"v3", paras:"213.1, 214.2", impact:"high",
    title:"Co-investment reworked around the apprentice's age, not just levy status",
    from:"A levy payer who exhausted their balance co-invested at a single rate regardless of who the apprentice was.",
    to:"For new starts from 1 August 2026, a levy payer with insufficient funds pays 25% — but government funds 100% for apprentices aged 16 to 24 and 75% for those aged 25 and over. Non-levy employers pay 5% for apprentices aged 25 and above and nothing at all for those aged 16 to 24." },

  { section:"transfers", when:"draft", paras:"234.1", impact:"high",
    title:"The 10% government top-up is gone",
    from:"Government added 10% to funds entering a levy account each month.",
    to:"No top-up is added to new funds entering levy accounts from 1 August 2026. Employers access only what they paid in. The transfer allowance now explicitly covers apprenticeship units as well as apprenticeships." },

  { section:"subcontracting", when:"v1", paras:"262.3", impact:"high",
    title:"Subcontracting de-minimis opened up to every provider",
    from:"The de-minimis could only be used by providers with written confirmation that they had fully achieved the subcontracting standard.",
    to:"From 1 August 2026 any provider can use the exemption. The separate exemption for initial teacher training provision has been removed as a result. A full review of the whole subcontracting section runs to September 2026, with changes expected from 2027 and new subcontractor definitions likely from 1 January 2027." },

  { section:"intro", when:"draft", paras:"—", impact:"high",
    title:"Apprenticeships moved from the Department for Education to the Department for Work and Pensions",
    from:"Apprenticeship policy, funding and the funding rules sat with the Department for Education.",
    to:"Following a Machinery of Government change on 1 April 2026, responsibility transferred to DWP. Language and definitions have been updated throughout the rules, and DWP now appears in the subcontracting section. The rules themselves are published by DWP." },

  { section:"eligibility", when:"draft", paras:"33", impact:"high",
    title:"Administration Assistant Level 2 restricted to apprentices aged 16 to 24",
    from:"There was no age restriction on this standard.",
    to:"Apprentices are only eligible for funding on ST1472 if aged 16 to 24 at the start, or 15 where their 16th birthday falls between the last Friday of June and 31 August." },

  { section:"off-the-job", when:"draft", paras:"85", impact:"medium",
    title:"Annex C removed — off-the-job minimums move to the Skills England website",
    from:"The minimum volume of off-the-job training for each standard was listed in Annex C of the funding rules.",
    to:"Annex C is gone. Each standard's minimum volume is now published on the Skills England website against that standard, so it can change without a new version of the rules. Check the register rather than the rulebook." },

  { section:"assessment", when:"draft", paras:"387, 393", impact:"medium",
    title:"Gateway becomes 'gateway to completion', and grading independence relaxes",
    from:"Gateway marked the point at which on-programme learning ended and end-point assessment began, with an occupational participant in grading who had not been involved in training.",
    to:"The term is now gateway to completion, reflecting that assessment can take place at any stage. For revised plans where a mandatory qualification fully or substantially covers the required knowledge and skills, the requirement for an uninvolved occupational participant in the grading decision no longer applies." },

  { section:"price", when:"draft", paras:"208, 208.1, 211.3", impact:"medium",
    title:"Contracting simplified to programme level, and fewer price approvals",
    from:"The contract for services was at learner level and had to break the price down into eligible cost areas. Employers approved any change to the split between TNP1 and TNP2.",
    to:"The contract can now be at programme level with no cost breakdown, provided it states funding will only be used on eligible costs. Employers only approve a price change where the total price increases, for changes on or after 1 August 2026. TNP1 must contain only the cost of training." },

  { section:"progress-reviews", when:"draft", paras:"102.1", impact:"medium",
    title:"Alternative progress review timetables allowed, capped at six months",
    from:"Reviews ran to a fixed timetable of every three calendar months.",
    to:"An alternative timetable can be agreed with the employer, but must be agreed in advance and reviews must be no more than 6 months apart." },

  { section:"wages", when:"v1", paras:"76.1", impact:"medium",
    title:"Learners not paid the National Minimum Wage must be withdrawn",
    from:"Underpayment was a matter between the employer, the apprentice and HMRC.",
    to:"If a provider is made aware that a learner is not being paid in line with the National Minimum Wage Regulations, the learner must be withdrawn from the programme. This places a positive obligation on providers." },

  { section:"programme-eligibility", when:"v2", paras:"68.3, 107.5", impact:"medium",
    title:"Level 7 content cannot be used to deliver a Level 6 standard",
    from:"There was no explicit restriction on the level of non-mandatory qualifications used within a standard.",
    to:"A Level 7 non-mandatory unit or qualification must not be used to deliver the content of a Level 6 standard. DWP is working with Skills England to make the mandatory and non-mandatory position clear on each standard." },

  { section:"service-account", when:"v2", paras:"189.2, 190", impact:"medium",
    title:"Completion payment no longer withheld over uncollected co-investment",
    from:"Employer co-investment had to be collected and recorded on the ILR before the completion payment was released, and monthly payments were matched to equivalent co-investment payments.",
    to:"Both requirements are removed. The 20% completion payment is also confirmed as not being aligned to assessment costs." },

  { section:"change-circumstance", when:"draft", paras:"306.1, 306.2", impact:"medium",
    title:"Hard timings on what happens when an apprentice loses their job",
    from:"The point at which a provider had to act was not tightly specified.",
    to:"If new employment has not started within 4 weeks of the agreement or employment ending, the provider must record a break in learning. If there is no restart with a new employer within 8 weeks of that break — 12 weeks from the end of employment — the apprentice must be withdrawn." },

  { section:"breaks", when:"v1", paras:"—", impact:"medium",
    title:"Medical absence no longer allows an apprenticeship to continue",
    from:"Apprentices absent from work for medical reasons could continue with their apprenticeship.",
    to:"Following feedback and further legal advice, that reference has been removed. Medical absence now falls to be handled through breaks in learning." },

  { section:"eligibility", when:"draft", paras:"34.5", impact:"medium",
    title:"Skills Bootcamp participants are not eligible for apprenticeship funding",
    from:"The interaction between Skills Bootcamps and apprenticeships was not stated explicitly.",
    to:"Individuals undertaking a government-funded Skills Bootcamp are not eligible for apprenticeship funding at the same time." },

  { section:"foundation", when:"draft", paras:"162", impact:"medium",
    title:"No consent to share data means no foundation apprenticeship",
    from:"Consent was collected but the funding consequence was not spelled out.",
    to:"Where an apprentice does not consent to share the information at paragraph 150, they are ineligible for funding and must not be placed on a foundation apprenticeship." },

  { section:"english-maths", when:"draft", paras:"49.3, 50.2", impact:"medium",
    title:"English and maths cannot be all distance learning, and opt-outs have consequences",
    from:"Delivery mode was not restricted, and the position when a 19+ apprentice opted in then changed their mind was unclear.",
    to:"English and maths must not be fully delivered by self-directed distance learning. If a 19+ apprentice withdraws after opting in, the provider must withdraw them to the last day of learning. Apprentices may also use their adult skills fund entitlement alongside the apprenticeship." },

  { section:"employment", when:"v1", paras:"70.4", impact:"low",
    title:"The ILR planned end date must not change once submitted",
    from:"Practice varied where an apprenticeship agreement was extended.",
    to:"The original ILR planned end date must not change once submitted, even where the agreement is extended, unless there has been a break in learning and a subsequent restart." },

  { section:"learning-support", when:"draft", paras:"44.5", impact:"low",
    title:"Light-touch learning support reviews for stable needs",
    from:"All learning support reviews were treated the same regardless of the nature of the need.",
    to:"Where the need is stable because of a permanent disability and unlikely to change, reviews may be light-touch." },

  { section:"change-circumstance", when:"draft", paras:"313.1, 313.2", impact:"low",
    title:"Redundant apprentices can become self-employed",
    from:"Self-employment was not an available route after redundancy.",
    to:"An apprentice being fully funded to completion may become self-employed, treated the same as a job with a new unrelated employer. This is not available under the time-limited 12-week funding support." },

  { section:"prior-learning", when:"draft", paras:"38.2, 38.3", impact:"low",
    title:"Skills scans against a training plan, and accelerated apprenticeships dropped",
    from:"A skills scan was expected against the standard, and accelerated apprenticeship was still in use as a term.",
    to:"A skills scan can be conducted against a training plan provided it maps to the standard's outcomes. The term accelerated apprenticeship has gone, as have progression profiles linked to Skills Bootcamps." },

  { section:"reservations", when:"draft", paras:"200.1, 201", impact:"low",
    title:"Providers can reserve funds on an employer's behalf",
    from:"Reservation practice and backdating expectations were not clearly set out.",
    to:"Employers can give providers permission to reserve funds for them. Reservations are only expected to be backdated by exception." }
];

/* ---------- 9. MEMBER ACCOUNT ------------------------------------------
   Demo account only. Replace with real accounts and server-side auth
   before this holds anyone's actual data.
   ----------------------------------------------------------------------- */

const MEMBER = {
  username: "test",
  password: "test",
  org: "DemoIT Company",
  contact: "Programme Lead",
  type: "provider",
  levyPayer: true,
  payroll: 4500000,
  apprentices: 45,
  frequency: "weekly",
  standards: [
    { name:"Business Administrator", code:"ST0070", level:3, funding:5000,  months:18, count:18 },
    { name:"Operations Manager",     code:"",       level:5, funding:7000,  months:18, count:9  },
    { name:"Project Manager",        code:"ST0360", level:6, funding:22000, months:36, count:7  },
    { name:"Engineering Technician", code:"ST0457", level:3, funding:27000, months:42, count:11 }
  ],
  routes: ["business-administration","digital","engineering-manufacturing"]
};

/* Levy mechanics, England, as at the 2026/27 rules.
   Kept in one place so the calculator has a single source of truth. */

const LEVY_MODEL = {
  rate: 0.005,            // 0.5% of annual pay bill
  allowance: 15000,       // annual levy allowance
  threshold: 3000000,     // pay bill above which the levy is due
  topUp: 0,               // 10% government top-up removed on new funds
  expiryMonths: 12,       // new funds expire after 12 months

  /* Version 3 of the 2026/27 rules made co-investment depend on the
     apprentice's age as well as the employer's levy status. */
  levyExhausted: {
    under25: 0,           // government funds 100% for apprentices aged 16 to 24
    over25:  0.25         // employer pays 25%, government 75%
  },
  nonLevy: {
    under25: 0,           // fully funded
    over25:  0.05         // employer pays 5%
  },
  note: "Under version 3 of the 2026/27 rules, a levy payer with insufficient funds pays nothing for apprentices aged 16 to 24 and 25% for those aged 25 and over. Non-levy employers pay nothing for 16 to 24 year olds and 5% for those aged 25 and over. The 10% top-up has gone and new funds expire after 12 months."
};

/* Incentives and additional payments worth checking.
   These change frequently — every one links to the source to verify. */

const INCENTIVES = [
  { article:"inc-hiring-payment", name:"£2,000 apprenticeship hiring payment", amount:"£2,000 per apprentice",
    who:"Non-levy employers recruiting an apprentice aged 16 to 24",
    detail:"New from October 2026. Applies to apprenticeships starting on or after 1 October 2026 where the apprentice began their job with you within the previous 3 months. Paid in two instalments, the first once they complete 90 days. Applies to foundation apprenticeships too, and sits outside subsidy control for 2026/27.",
    url:"https://www.gov.uk/government/publications/apprenticeship-funding-rules-and-assessment-plan-guidance-2026-to-2027/apprenticeship-funding-rules-summary-of-changes-version-1" },
  { article:"inc-additional-payment", name:"£1,000 employer incentive payment", amount:"£1,000 per apprentice",
    who:"Apprentices aged 16 to 18, or 19 to 24 with an EHC plan or care experience",
    detail:"Paid to the employer in two instalments, at 90 days and at 365 days on programme. A matching £1,000 goes to the training provider.",
    url:"https://www.gov.uk/guidance/apprenticeship-funding-rules" },
  { article:"inc-care-leavers", name:"Care leavers' bursary", amount:"£3,000 to the apprentice",
    who:"Apprentices who have been in local authority care",
    detail:"Paid directly to the apprentice, not the employer. Separate from the employer incentive and can be claimed alongside it.",
    url:"https://www.gov.uk/government/collections/funding-rules-for-apprenticeships" },
  { article:"inc-learning-support", name:"Learning support funding", amount:"£150 per month, plus one-off claims",
    who:"Apprentices with an identified learning difficulty or disability",
    detail:"A fixed monthly rate paid to the provider. One-off costs above £150 can be claimed as they occur. Reviews every three months.",
    url:"https://www.gov.uk/government/collections/funding-rules-for-apprenticeships" },
  { article:"inc-full-funding", name:"Full funding for apprentices aged 16 to 24", amount:"100% of training costs",
    who:"Small and medium employers who do not pay the levy",
    detail:"Removes co-investment entirely for apprentices under 25. Not available to levy payers, but relevant if you transfer funds to a smaller employer.",
    url:"https://help.apprenticeships.education.gov.uk/hc/en-gb/articles/31398346955154-Budget-2025-Growth-and-Skills-Levy" },
  { article:"inc-transfers", name:"Levy transfer, as a sending employer", amount:"Up to 50% of annual funds",
    who:"Levy payers with a surplus balance",
    detail:"Transferring a surplus to another business uses funds that would otherwise expire. Receiving employers have 6 weeks to accept and 3 months to link the funds to an apprenticeship.",
    url:"https://www.gov.uk/government/collections/funding-rules-for-apprenticeships" },
  { article:"inc-english-maths-funding", name:"English and maths funding", amount:"Funded separately from the band",
    who:"Any apprentice studying English or maths",
    detail:"Does not come out of the funding band, so it does not consume your levy balance against the apprenticeship itself. Now optional for those who began aged 19 or over.",
    url:"https://assets.publishing.service.gov.uk/media/67b32312b56d8b0856c2fd60/Apprenticeship_funding_rules_2024_to_2025_summary_of_changes.pdf" }
];

/* ---------- 10. GROUPED ARTICLES ---------------------------------------
   Every change in the feed maps to an article. Where dozens of standards
   moved for the same reason, they are grouped into one piece rather than
   repeated. The mapping is done in app.js by articleFor().
   ----------------------------------------------------------------------- */

ARTICLES.push(

{
  id: "standards-in-review",
  icon: "check", tag: "Standard", urgency: "medium", route: "",
  date: "2026-08-15",
  title: "The 32 standards currently in review, and what that actually means",
  summary: "A standard in review is still fully deliverable — but the version you start someone on may not be the version they finish under.",
  standfirst: "Being in development is not the same as being withdrawn, and confusing the two costs providers cohorts they could have run.",
  body: [
    "At the time of writing 32 apprenticeship standards sit in development, revision or a notice period on the Skills England register rather than simply being approved. They are spread unevenly: creative and design carries 9, digital 7, transport and logistics 5, and most other routes one or two apiece.",
    "The register uses several statuses that mean subtly different things. A standard with an approved version alongside a new version in development is being revised — you can still start apprentices on the current version. A standard in a notice period is signalling that the current version will be withdrawn for new starts at a future date. A standard paused for starts, such as Space Engineering Technician at Level 4, cannot take new apprentices at all while the pause holds. A retirement consultation, currently open on Aviation Customer Service Operative at Level 2, means the standard may not survive.",
    "What it changed from: for several years most of the register was static, so a status other than approved was unusual. The volume in development now reflects two things happening at once — the routine cycle of standards reviews, and the wider assessment plan reform touching every standard eventually.",
    "What follows, and this is where providers get caught: contracts and curriculum plans written against a standard in revision can be overtaken. If a learner starts on version 1.1 and version 2.0 lands mid-programme, the funding rules determine which version applies, and it is usually the one in force at their start date. Check the register before each intake rather than annually, and be wary of building a new commercial offer on a standard carrying a notice period.",
    "Separately, 29 standards currently have no assessment organisation assigned. That is a distinct problem: you can recruit, but you may struggle to get anyone assessed at the end."
  ],
  sources: [
    { label: "Skills England apprenticeship register", url: "https://skillsengland.education.gov.uk/apprenticeships/" },
    { label: "GOV.UK — Changes to apprenticeship assessment", url: "https://www.gov.uk/government/publications/apprenticeship-funding-rules-2025-to-2026/changes-to-apprenticeship-assessment-2025-to-2026" }
  ]
},

{
  id: "no-epa",
  icon: "check", tag: "Standard", urgency: "high", route: "",
  date: "2026-08-01",
  title: "29 standards have no assessment organisation assigned",
  summary: "You can recruit onto them, deliver them and reach gateway — and then find there is nobody to assess your apprentice.",
  standfirst: "The quietest risk on the register, because nothing about it stops you enrolling.",
  body: [
    "Twenty-nine standards on the register are marked as waiting for an assessment organisation, or as pending because the standard itself is still in development. Several are newly approved versions: Bus, Coach and HGV Service and Maintenance Technician at Level 2, Interior Designer at Level 6, Production Manager at Level 6, Cold Forming Setter Technician at Level 3 and Dental Hygienist at Level 6 all show as approved for delivery while awaiting an organisation to assess against them.",
    "What it changed from: historically a standard reaching approved status arrived with an assessment organisation already in place, so the two were treated as the same milestone. The volume of revisions now moving through the system has separated them.",
    "The practical consequence is a timing gap rather than a block. You can start apprentices, and typically an organisation is appointed well before the first cohort reaches gateway on a two or three year programme. On a 12 to 18 month programme the margin is much thinner.",
    "What follows: before committing to a cohort on any newly approved version, check the register for an assessment organisation and, if there is none, ask how long the appointment process is expected to take against your planned end dates. Build the answer into your risk register rather than assuming it resolves itself. Where the gap is genuinely uncomfortable, the previous version of the standard may still be available for starts, which buys time — but check the funding rules for the version that applies to each start date before relying on that."
  ],
  sources: [
    { label: "Skills England apprenticeship register", url: "https://skillsengland.education.gov.uk/apprenticeships/" }
  ]
},

{
  id: "funding-bands",
  icon: "coin", tag: "Standard", urgency: "medium", route: "",
  date: "2025-08-21",
  title: "Five funding bands raised, and what a band change actually does",
  summary: "Domestic Electrician, Urban Driver, General Farm Worker, Livestock Unit Technician and Early Years Lead Practitioner all moved up.",
  standfirst: "Funding band reviews are quiet, infrequent and financially significant — and they only apply to starts after the change.",
  body: [
    "Five standards have had their maximum funding raised following routine band reviews. Domestic Electrician at Level 3 moved from £15,000 to £19,000. Urban Driver at Level 2 went from £5,000 to £8,000. General Farm Worker at Level 2 rose from £5,000 to £8,000 and Livestock Unit Technician at Level 3 from £5,000 to £9,000. Early Years Lead Practitioner at Level 5 moved from £8,000 to £9,000.",
    "What it changed from: each of these had a band set when the standard was first approved, in some cases years earlier, and the cost of delivering them had drifted well past it. The agricultural increases are the largest proportionally, reflecting how far below cost those two had fallen.",
    "The band is a maximum, not a price. It caps what can be drawn from a levy account or co-invested, but the actual price is negotiated between employer and provider. A band increase does not automatically raise what you charge, and it does not entitle you to more money for apprentices already on programme.",
    "What follows: the band that applies is the one in force at the apprentice's start date. Apprentices already on programme stay on the old band for their duration, so you may be delivering the same standard at two prices simultaneously — check your MIS applies the right one per learner. For employers, a higher band means a higher potential draw on the levy account, which matters when funds now expire after 12 months. For providers, this is the moment to revisit pricing on those five, because the previous rates were set against costs that no longer exist."
  ],
  sources: [
    { label: "Skills England apprenticeship register", url: "https://skillsengland.education.gov.uk/apprenticeships/" },
    { label: "GOV.UK — Apprenticeship technical funding guide", url: "https://www.gov.uk/government/collections/funding-rules-for-apprenticeships" }
  ]
},

{
  id: "route-health-science",
  icon: "check", tag: "Standard", urgency: "medium", route: "health-science",
  date: "2026-03-25",
  title: "Health and science: 23 standards updated as regulators rewrite their frameworks",
  summary: "The largest batch of changes on any route, driven by the GDC and NMC updating their own standards rather than by funding policy.",
  standfirst: "When a professional regulator moves, every apprenticeship mapped to it has to move with it.",
  body: [
    "Health and science carries more recorded changes than any other route: 23 standards, most of them clustered in March 2026. The pattern is unusual because the driver is regulatory rather than financial.",
    "The dental group moved as one. Dental Nurse at Level 3, Dental Technician at Level 5, Clinical Dental Technician at Level 5 and Orthodontic Therapist at Level 4 all retired their General Dental Council 2023 versions and replaced them with version 2.0. Dental Hygienist at Level 6 also moved to 2.0 and is currently awaiting an assessment organisation.",
    "The nursing and midwifery group followed the same logic against Nursing and Midwifery Council standards. Midwife moved to version 2.0, as did Community Nurse Specialist Practitioner and Specialist Community Public Health Nurse, both at Level 7 against the NMC 2022 standards. Doctor at Level 7, Orthoptist at Level 6, Dispensing Optician at Level 6 and Osteopath at Level 6 all moved to 2.0 in the same window. Biomedical Scientist at Level 6 moved earlier, in August 2025.",
    "What it changed from: each of these sat on a version mapped to an earlier iteration of its regulator's framework. Where a regulator updates the competences required for registration, the apprenticeship has to be remapped or it stops producing registrable practitioners.",
    "What follows: this is not optional catch-up. Delivering against a retired version risks apprentices completing without meeting current registration requirements. Confirm which version each cohort sits on, and where a regulator's own consultation is still open, expect another revision behind this one."
  ],
  sources: [
    { label: "Skills England apprenticeship register", url: "https://skillsengland.education.gov.uk/apprenticeships/" }
  ]
},

{
  id: "route-digital",
  icon: "blocks", tag: "Standard", urgency: "medium", route: "digital",
  date: "2026-08-15",
  title: "Digital: 18 changes, seven of them standards still in development",
  summary: "The route with the most unfinished business — plus the first AI units to reach the register.",
  standfirst: "Digital moves faster than the standards process, and the register shows the strain.",
  body: [
    "Eighteen digital standards carry a recorded change, and seven of them are in development or a notice period rather than settled. Data Engineer at Level 5, Applications Support Lead at Level 4, Machine Learning Engineer at Level 6, Information Communications Technician at Level 3, Digital Product Manager at Level 4 and Digital Accessibility Specialist at Level 4 are all mid-revision.",
    "Against that, three new AI Leadership units at Level 5 were approved in April 2026, funded at £750 each, covering AI strategy and opportunity, AI adoption and procurement and governance, and AI delivery and organisational transformation. Artificial Intelligence and Automation Practitioner at Level 4 moved to version 2.1 in December 2025. The Software and Data and Hardware, Network and Infrastructure foundation apprenticeships at Level 2 give an entry route at eight months and £4,000.",
    "What it changed from: the digital route was built around job titles that were stable in the late 2010s. Several of those roles have either split, merged or been absorbed into work that did not exist when the standard was written.",
    "What follows: the units are the interesting development. They let an employer fund a short, specific piece of AI capability from the levy without committing to a full apprenticeship, which suits a workforce that needs updating rather than qualifying. For providers, the volume of standards in revision means curriculum planning on this route should be provisional — check the register at each intake, particularly for Information Communications Technician, which is high volume and carries a notice period."
  ],
  sources: [
    { label: "Skills England apprenticeship register", url: "https://skillsengland.education.gov.uk/apprenticeships/" }
  ]
},

{
  id: "route-engineering",
  icon: "blocks", tag: "Standard", urgency: "medium", route: "engineering-manufacturing",
  date: "2026-03-24",
  title: "Engineering and manufacturing: new units target the industrial strategy priorities",
  summary: "Twenty-one changes, including short modular units in welding, battery manufacturing and electrical assembly.",
  standfirst: "The clearest example yet of apprenticeship funding being pointed at a specific industrial policy.",
  body: [
    "Twenty-one engineering and manufacturing standards carry a recorded change, four of them entirely new units approved in March 2026. Welding, mechanised at Level 2 is funded at £2,100. Battery Manufacturing, Electrical Fitting and Assembly, and Mechanical Fitting and Assembly, all at Level 2, are funded at £1,650 each. The Engineering and Manufacturing foundation apprenticeship at Level 2 runs eight months at £4,500.",
    "On the standards themselves, Maritime Mechanical Fitter at Level 3 moved to version 1.2 in May 2026 and Maritime Electrical Fitter to 1.1. Aerospace Engineering Technician at Level 3 moved to 1.1. Production Manager at Level 6 reached version 2.0 in April 2026 and is awaiting an assessment organisation, as is Cold Forming Setter Technician at Level 3. Space Engineering Technician at Level 4 is paused for starts while it is revised.",
    "What it changed from: engineering could previously only be funded through full apprenticeships running three to four years. For an employer needing twenty people who can weld to a specific standard within a quarter, that was unusable.",
    "What follows: the unit funding is small per head but the volume potential is large, and it is the first realistic route for upskilling an existing production workforce using levy money. Watch the pause on Space Engineering Technician if that sits in your portfolio, and check assessment organisation availability on Production Manager before committing a cohort, given the shorter 18-month duration leaves less margin."
  ],
  sources: [
    { label: "Skills England apprenticeship register", url: "https://skillsengland.education.gov.uk/apprenticeships/" }
  ]
},

{
  id: "route-construction",
  icon: "flame", tag: "Standard", urgency: "medium", route: "construction",
  date: "2026-05-05",
  title: "Construction: net zero units arrive and the craft standards keep moving",
  summary: "Fifteen changes including solar, EV charging and modular building units, plus a funding band rise for Domestic Electrician.",
  standfirst: "The route where new provision and defunding are happening at the same time.",
  body: [
    "Construction carries fifteen recorded changes. Three are new units approved in March 2026: Solar PV Installation and Maintenance and EV Charging Point Installation and Maintenance, both Level 3 at £950, and Permanent Modular Building Assembly at Level 2 for £3,200. Low Carbon Heating Technician at Level 3 moved to version 1.2 in May 2026 and remains the anchor programme for heat pump installation at £22,000 over 36 months.",
    "Three foundation apprenticeships give an eight-month entry route at Level 2 and £4,000 each: Building Services Engineering, Onsite Trades and Finishing Trades.",
    "On the craft standards, Craft Bricklayer moved to version 1.2, Craft Painter and Decorator to 1.2, Floorlayer Wood Based to 1.1 and Fire Safety Engineer to 1.2. Domestic Electrician at Level 3 had its funding band raised from £15,000 to £19,000, a substantial correction.",
    "Against all of that, Facilities Management Supervisor at Level 3 is one of the sixteen standards losing funding from September 2026, removing a supervisory progression step from the route.",
    "What follows: construction now has the most complete ladder of any route for net zero work — foundation apprenticeship, T-Level specialism in low carbon heating from September 2026, full technician standard, and short units for upskilling existing installers. The constraint is no longer qualification structure but employer placement capacity, which is untested at volume in this specialism."
  ],
  sources: [
    { label: "Skills England apprenticeship register", url: "https://skillsengland.education.gov.uk/apprenticeships/" },
    { label: "T-Levels update, 10 March 2026", url: "https://support.tlevels.gov.uk/hc/en-gb/articles/33892267278994-T-Levels-update-10-March-2026" }
  ]
},

{
  id: "route-creative",
  icon: "desk", tag: "Standard", urgency: "low", route: "creative-design",
  date: "2026-04-14",
  title: "Creative and design: half the route is mid-revision",
  summary: "Nine of eighteen changed standards are in development or a notice period — the highest proportion anywhere.",
  standfirst: "A route being substantially rewritten while it is being delivered.",
  body: [
    "Creative and design carries eighteen recorded changes, and nine of those standards are in development, a notice period, or otherwise unsettled. Publishing Professional at Level 4, Creative Industries Production Technician at Level 3, Scenic Artist at Level 3 and Hair, Wigs, Make-up and Prosthetics Technician at Level 3 are all mid-revision with notice periods attached.",
    "The most structurally significant change is journalism. The Level 5 Journalist standard has been retired and replaced by a Level 6 Journalist at £14,000 over 18 months and a new Level 5 Junior Journalist at £13,000 over 14 months, both approved in April 2026. That changes the progression ladder rather than simply updating a version.",
    "Elsewhere, Interior Designer at Level 6 moved to version 2.0 in May 2026 and is awaiting an assessment organisation. Junior VFX Artist or Assistant Technical Director at Level 4 moved to 1.2, Furniture Restorer at Level 3 to 1.1 and Print Operative at Level 2 to 1.2.",
    "What it changed from: many creative standards were written against production practices that have since been reshaped by streaming economics, virtual production and, more recently, generative tools.",
    "What follows: the journalism restructure is the one to act on, because a retired standard cannot take new starts and the replacement sits at a different level with different entry expectations. For the nine in revision, treat curriculum plans as provisional and confirm the position at each intake rather than at the start of the academic year."
  ],
  sources: [
    { label: "Skills England apprenticeship register", url: "https://skillsengland.education.gov.uk/apprenticeships/" }
  ]
},

{
  id: "route-legal-finance",
  icon: "cap", tag: "Standard", urgency: "medium", route: "legal-finance-accounting",
  date: "2026-07-27",
  title: "Legal, finance and accounting: eleven standards move to version 2.0",
  summary: "A coordinated batch update across the legal professions, against a route already reshaped by the Level 7 restriction.",
  standfirst: "The route hit hardest by the Level 7 age restriction is also the one rewriting the most standards.",
  body: [
    "Eleven standards on this route carry recorded changes, most of them moves to version 2.0 during 2026. Advanced Paralegal at Level 5 and Professional Taxation Technician at Level 4 both moved in July 2026. Barrister at Level 7 and Chartered Legal Executive Litigator and Advocate at Level 7 moved in May. Licensed Conveyancer or Licensed Probate Practitioner at Level 6 and Legal Technician at Level 4 moved in June. Internal Audit Technician at Level 4 moved to 2.0 in March.",
    "What it changed from: these standards map onto professional qualification routes controlled by regulators and professional bodies, so version changes tend to arrive in clusters when those bodies update their own requirements.",
    "The context that matters more than any individual version change is the Level 7 restriction. Since January 2026, Level 7 apprenticeships are funded only for apprentices aged 16 to 21, or 22 to 24 with an EHC plan or care experience. Barrister at Level 7 over 72 months and Chartered Legal Executive at Level 7 over 66 months are exactly the programmes that restriction removes for mid-career entrants — which was much of their volume.",
    "What follows: a firm that used Level 7 apprenticeships to qualify existing paralegals has lost that funding route entirely. The Level 4 Legal Technician and Level 5 Advanced Paralegal standards become more important as a consequence, since they remain funded at any age. Expect demand to redistribute downward rather than disappear."
  ],
  sources: [
    { label: "Skills England apprenticeship register", url: "https://skillsengland.education.gov.uk/apprenticeships/" },
    { label: "GOV.UK — Apprenticeship funding rules", url: "https://www.gov.uk/guidance/apprenticeship-funding-rules" }
  ]
},

{
  id: "route-transport",
  icon: "signpost", tag: "Standard", urgency: "medium", route: "transport-logistics",
  date: "2026-08-05",
  title: "Transport and logistics: half the changed standards are unsettled",
  summary: "Five of ten in development, one retirement consultation open, and a substantial funding band rise for Urban Driver.",
  standfirst: "A small route with a disproportionate amount of uncertainty in it.",
  body: [
    "Ten transport and logistics standards carry a recorded change, and five of those are in development or a notice period: Rail Infrastructure Operator at Level 3, Transport Scheduler at Level 3, Removals Operative at Level 2 and Non Home Office Police Officer among them. Aviation Customer Service Operative at Level 2 has a retirement consultation open, which means the standard may not continue at all.",
    "The settled changes matter financially. Urban Driver at Level 2 had its funding band raised from £5,000 to £8,000, a 60% increase reflecting how far below delivery cost it had fallen. Bus, Coach and HGV Service and Maintenance Technician at Level 2 moved to version 2.0 in August 2026 at £14,000 over 24 months, and is awaiting an assessment organisation. Traffic Operator at Level 2 moved to version 1.1.",
    "What it changed from: driver and logistics standards were priced when the sector looked very different, before the driver shortage of the early 2020s reset both wages and training costs.",
    "What follows: the Urban Driver band change makes that programme commercially viable for providers who had stopped offering it. The retirement consultation on Aviation Customer Service Operative is worth responding to if you deliver it, because consultation is the only point at which the outcome can be influenced. And given five standards are mid-revision, this is a route where checking the register at each intake genuinely matters."
  ],
  sources: [
    { label: "Skills England apprenticeship register", url: "https://skillsengland.education.gov.uk/apprenticeships/" }
  ]
},

{
  id: "route-education",
  icon: "book", tag: "Standard", urgency: "high", route: "education-early-years",
  date: "2026-09-01",
  title: "Education and early years: three standards defunded, and the assessor pipeline breaks",
  summary: "Learning and Skills Assessor, Learning and Skills Mentor and Outdoor Learning Specialist all lose funding.",
  standfirst: "The sector loses the apprenticeship route into the roles that train apprentices.",
  body: [
    "Three standards on this route lose funding from September 2026: Learning and Skills Assessor at Level 3, Learning and Skills Mentor at Level 4 and Outdoor Learning Specialist at Level 5. The first two are the standards the FE sector itself used to develop assessors and mentors.",
    "There is a circularity here worth stating plainly. Providers used the Learning and Skills Assessor apprenticeship to qualify the people who assess other apprentices. Removing it does not remove the need for assessors; it removes the funded route into becoming one, at a point when reformed assessment plans are increasing the demands on that workforce.",
    "Elsewhere on the route, Specialist Teaching Assistant at Level 5 has a reformed assessment plan taking effect from 14 December 2026, one of the first cohort of standards to move under assessment reform. Teacher — Undergraduate at Level 6 moved to version 2.0 in August 2026. Early Years Lead Practitioner at Level 5 had its band raised from £8,000 to £9,000. Early Years Teacher with EYTS at Level 6 moved to version 1.1.",
    "What follows: if you deliver the assessor or mentor standards, September 2026 is a hard stop for new starts and there is no announced replacement. Existing apprentices remain funded to completion. Workforce planning for your own assessment capacity should assume self-funded or non-apprenticeship development from that point, and the Specialist Teaching Assistant reformed plan is worth reading early as an indicator of what the rest of the reform looks like."
  ],
  sources: [
    { label: "Skills England — Streamlining apprenticeships", url: "https://help.apprenticeships.education.gov.uk/hc/en-gb/articles/34005717182226-Streamlining-apprenticeships" },
    { label: "Skills England apprenticeship register", url: "https://skillsengland.education.gov.uk/apprenticeships/" }
  ]
},

{
  id: "route-protective-care",
  icon: "cap", tag: "Standard", urgency: "high", route: "protective-services",
  date: "2026-09-01",
  title: "Protective services and care: five standards defunded between them",
  summary: "Four of five changed protective services standards are losing funding, alongside Lead Practitioner in Adult Care.",
  standfirst: "Proportionally the worst hit route on the register.",
  body: [
    "Protective services loses four standards from September 2026: Professional Security Operative at Level 2, Security First Line Manager at Level 3, Custody and Detention Professional at Level 3, and Public Sector Compliance Investigator and Officer at Level 3. Care services loses Lead Practitioner in Adult Care at Level 4.",
    "Proportionally this is the heaviest impact anywhere. Of the five protective services standards carrying a recorded change, four are being defunded. The route retains Protective Security Adviser at Level 4, Anti-Social Behaviour and Community Safety Officer at Level 4 and Resilience and Emergencies Professional at Level 6, but loses both its Level 2 entry point and its first-line management step.",
    "What it changed from: security in particular used the Level 2 standard as a structured entry route into a sector with high turnover and a young workforce, which is precisely the demographic the streamlining exercise says it wants to protect.",
    "In adult care, Lead Practitioner at Level 4 sat between Lead Adult Care Worker at Level 3 and Leader in Adult Care at Level 5. Removing it leaves a two-level gap in a sector already struggling with progression and retention.",
    "What follows: for both routes the practical question is whether an adjacent standard can absorb the demand, and in most cases it cannot at the same level. Employers using these as recruitment pipelines need an alternative in place before the September cut-off, and given contracting and eligibility checks typically take six to eight weeks, that decision is effectively already due."
  ],
  sources: [
    { label: "Skills England — Streamlining apprenticeships", url: "https://help.apprenticeships.education.gov.uk/hc/en-gb/articles/34005717182226-Streamlining-apprenticeships" }
  ]
},

{
  id: "route-agriculture",
  icon: "shop", tag: "Standard", urgency: "medium", route: "agriculture",
  date: "2025-07-25",
  title: "Agriculture: two funding bands corrected sharply upward",
  summary: "General Farm Worker and Livestock Unit Technician both rose from £5,000, having fallen well below delivery cost.",
  standfirst: "The largest proportional band corrections on the register, and a signal about how far behind some bands had drifted.",
  body: [
    "Eleven agriculture, environmental and animal care standards carry a recorded change. Two are funding band corrections and they are substantial: General Farm Worker at Level 2 moved from £5,000 to £8,000, and Livestock Unit Technician at Level 3 from £5,000 to £9,000. Both had been set at a level that made delivery marginal for providers working across dispersed rural employers.",
    "Elsewhere, Forestry Works Manager at Level 4 was approved in February 2025 at £8,000 over 15 months. Detection and Protection Working Dog Specialist at Level 3 was approved in June 2025 at £12,000. Fisher at Level 2 moved to version 1.1. Professional Arboriculturist at Level 6 has an integrated degree version in development.",
    "What it changed from: agricultural standards were among the earliest approved and several kept their original bands for the best part of a decade, through a period when travel costs, assessor time and employer engagement in rural areas all became more expensive.",
    "What follows: the corrections make these programmes viable to deliver again, and providers who withdrew from agricultural provision on cost grounds should revisit the numbers. As with every band change, it applies to starts from the change date only, so learners already on programme continue at the old rate — worth checking your MIS handles both. The route still has no T-Level, with Agriculture, Land Management and Production in development, so foundation apprenticeships and direct entry remain the ways in."
  ],
  sources: [
    { label: "Skills England apprenticeship register", url: "https://skillsengland.education.gov.uk/apprenticeships/" }
  ]
},

{
  id: "route-business-admin",
  icon: "desk", tag: "Standard", urgency: "high", route: "business-administration",
  date: "2026-09-01",
  title: "Business and administration: six standards defunded, gutting the management ladder",
  summary: "Team Leader, Operations Manager, Coaching Professional, Improvement Practitioner, Improvement Leader and Chartered Manager all go.",
  standfirst: "The route that loses most, and the one where almost every employer in the country has provision.",
  body: [
    "Six business and administration standards lose funding from September 2026, and between them they represent the standard management progression route used across almost every sector: Team Leader at Level 3, Operations Manager at Level 5, Coaching Professional at Level 5, Improvement Practitioner at Level 4, Improvement Leader at Level 6 and Chartered Manager Degree at Level 6.",
    "What remains on the route is thin by comparison. Business Administrator sits at Level 3, the new Administration Assistant at Level 2 is restricted to apprentices aged 16 to 24, Senior People Professional sits at Level 7 and is therefore subject to the age restriction, and Payroll Assistant Manager at Level 5 moved to version 2.0 in July 2026. Governance Officer at Level 4 is in development.",
    "What it changed from: Team Leader and Operations Manager were among the highest-volume standards in the country, functioning as the default first and second rungs of management development. Chartered Manager Degree was the flagship degree apprenticeship.",
    "What follows: an employer developing supervisors and managers through the levy has, from September, essentially no funded route at Levels 3 to 6 on this route. The realistic responses are apprenticeship units for specific capability, self-funded management development, or moving people onto a sector-specific standard where one exists. Skills England has signalled further streamlining is under discussion and sector bodies have publicly warned more management standards could follow, so treat any remaining management provision as carrying policy risk."
  ],
  sources: [
    { label: "Skills England — Streamlining apprenticeships", url: "https://help.apprenticeships.education.gov.uk/hc/en-gb/articles/34005717182226-Streamlining-apprenticeships" },
    { label: "Skills England apprenticeship register", url: "https://skillsengland.education.gov.uk/apprenticeships/" }
  ]
},

{
  id: "route-hospitality-retail",
  icon: "shop", tag: "Standard", urgency: "medium", route: "catering-hospitality",
  date: "2026-04-01",
  title: "Hospitality and retail: new foundation apprenticeships, one standard defunded",
  summary: "Two eight-month Level 2 foundation routes arrive at £3,500 as Cleaning Hygiene Operative loses funding.",
  standfirst: "Entry-level provision reshaped rather than reduced — though not for everyone.",
  body: [
    "Two foundation apprenticeships were approved in April 2026: Catering and Hospitality at Level 2 and Retail Service, Supply and Administration at Level 2, both running eight months at £3,500. They are aimed at 16 to 21 year olds, and at 22 to 24 year olds with an EHC plan or care experience.",
    "At the same time Cleaning Hygiene Operative at Level 2 is one of the sixteen standards losing funding from September 2026, removing a funded entry route into facilities and cleaning work.",
    "The rest of the route is stable. Hospitality Accommodation Team Member at Level 2 and Food and Beverage Team Member at Level 2 sit at £6,000, Pastry Chef at Level 3 at £11,000 and Lead Baker at Level 3 at £9,000, none carrying recent changes.",
    "What it changed from: entry into hospitality and retail through apprenticeships previously meant a full Level 2 standard running twelve months or more, which suited neither the seasonal shape of the sector nor learners who were not yet ready to commit.",
    "What follows: the eight-month foundation route fits the sector's rhythm considerably better and is worth building recruitment around, particularly for September and January intakes. The age restriction is the constraint — there is no equivalent funded entry route for an adult career-changer into hospitality, and with Cleaning Hygiene Operative going, the options for over-25s at Level 2 on this route narrow further."
  ],
  sources: [
    { label: "Skills England apprenticeship register", url: "https://skillsengland.education.gov.uk/apprenticeships/" },
    { label: "Skills England — Streamlining apprenticeships", url: "https://help.apprenticeships.education.gov.uk/hc/en-gb/articles/34005717182226-Streamlining-apprenticeships" }
  ]
}

);

/* Other funding rule documents. Which set applies depends on each
   apprentice's start date, so several are live at any one time. */

const OTHER_DOCS = [
  { name:"2025 to 2026 funding rules", url:"https://www.gov.uk/government/collections/funding-rules-for-apprenticeships",
    note:"Applies to starts between 1 August 2025 and 31 July 2026, at version 3. Still live for everyone who started in that window." },
  { name:"2024 to 2025 funding rules", url:"https://www.gov.uk/government/publications/apprenticeship-funding-rules-2024-to-2025",
    note:"Applies to starts between 1 August 2024 and 31 July 2025. Carries the February 2025 change making English and maths optional for those aged 19 and over." },
  { name:"Changes to apprenticeship assessment", url:"https://www.gov.uk/government/publications/apprenticeship-funding-rules-2025-to-2026/changes-to-apprenticeship-assessment-2025-to-2026",
    note:"How reformed assessment plans are being introduced, and which rules apply while a standard still waits for its revised plan." },
  { name:"Apprenticeship technical funding guide", url:"https://www.gov.uk/government/collections/funding-rules-for-apprenticeships",
    note:"How payments are actually calculated — monthly instalments, the 20% completion payment, and what happens on breaks and withdrawals." },
  { name:"Funding for employers who do not pay the levy", url:"https://www.gov.uk/government/collections/funding-rules-for-apprenticeships",
    note:"Co-investment, reservations, full funding for 16 to 24 year olds, and the new £2,000 hiring payment from October 2026." },
  { name:"Transferring your apprenticeship levy to another business", url:"https://www.gov.uk/government/collections/funding-rules-for-apprenticeships",
    note:"The sending side of levy transfers. The allowance now covers apprenticeship units as well as full apprenticeships." },
  { name:"Supporting learners with learning difficulties and disabilities", url:"https://www.gov.uk/government/collections/funding-rules-for-apprenticeships",
    note:"Learning support funding, English and maths flexibilities, and when reviews can be light-touch." },
  { name:"Apprenticeships bursary for care leavers", url:"https://www.gov.uk/government/collections/funding-rules-for-apprenticeships",
    note:"The £3,000 bursary paid directly to apprentices who have been in local authority care." },
  { name:"Skills England apprenticeship register", url:"https://skillsengland.education.gov.uk/apprenticeships/",
    note:"Now also where each standard's minimum off-the-job training volume lives, following the removal of Annex C from the rules." }
];

/* ---------- 11. INCENTIVE ARTICLES -------------------------------------
   Each incentive gets a piece on the articles page, so people read the
   detail here first and reach the source from there rather than being
   pushed straight off the site.
   ----------------------------------------------------------------------- */

ARTICLES.push(

{
  id: "inc-hiring-payment",
  icon: "coin", tag: "Levy", urgency: "high", route: "",
  date: "2026-10-01",
  title: "The £2,000 hiring payment for non-levy employers",
  summary: "New from October 2026 for smaller employers taking on an apprentice aged 16 to 24, with a three-month job-start window that catches people out.",
  standfirst: "The most substantial new money in the 2026/27 rules, and the eligibility condition most likely to be missed.",
  body: [
    "From October 2026, employers who do not pay the apprenticeship levy can claim a £2,000 hiring payment when they recruit a new apprentice aged 16 to 24. It applies to apprenticeships starting on or after 1 October 2026, and is paid in two instalments, the first once the apprentice has completed 90 days on programme.",
    "The condition that trips people up is the job-start window. The apprentice must have started their job with that employer within the previous three months. This is a hiring payment, not a training payment — it is designed to support recruitment of someone new, not to reward putting a long-standing member of staff onto an apprenticeship. If your apprentice has been with you a year and you enrol them, the payment does not apply.",
    "It applies to foundation apprenticeships as well as full standards, which matters because those are eight-month Level 2 programmes aimed squarely at this age group.",
    "It also sits outside subsidy control from 1 August 2026 to 31 July 2027, so it does not count against an employer's minimal financial assistance allowance for that year. That is worth knowing for employers already close to their threshold through other support.",
    "What follows: check that your onboarding records capture the date the apprentice started their job separately from the date they started their apprenticeship, because eligibility turns on the gap between the two. Providers should build this into enrolment paperwork now rather than reconstructing it later. It stacks with the existing £1,000 additional payment where the apprentice is 16 to 18, so a single eligible apprentice can attract £3,000 to the employer."
  ],
  sources: [
    { label: "DWP — Apprenticeship funding rules: summary of changes (version 3), paragraphs 133 to 141", url: "https://www.gov.uk/government/publications/apprenticeship-funding-rules-and-assessment-plan-guidance-2026-to-2027/apprenticeship-funding-rules-summary-of-changes-version-1" },
    { label: "GOV.UK — Apprenticeship funding rules: 2026 to 2027", url: "https://www.gov.uk/government/publications/apprenticeship-funding-rules-and-assessment-plan-guidance-2026-to-2027" }
  ]
},

{
  id: "inc-additional-payment",
  icon: "coin", tag: "Levy", urgency: "medium", route: "",
  date: "2026-08-01",
  title: "The £1,000 additional payment, and who actually receives it",
  summary: "Paid to both the employer and the provider, in two instalments, for younger apprentices and for care leavers and those with an EHC plan.",
  standfirst: "Long-standing, widely claimed, and still routinely missed because nobody chases the bank details.",
  body: [
    "Employers receive an additional payment of £1,000 for an apprentice aged 16 to 18 at the start of their apprenticeship, or aged 19 to 24 where the apprentice has an Education, Health and Care plan or has been in the care of their local authority. The training provider receives a matching £1,000.",
    "It is paid in two instalments: the first once the apprentice has completed 90 days on programme, and the second at 365 days. It is separate from the funding band, so it does not come out of a levy account or count towards co-investment.",
    "The 2026/27 rules clarified two operational points. Both the provider and the employer receive the payment where the apprentice meets the criteria — this had been a source of confusion. And there are now minimum expectations on providers when contacting employers for their bank details, because the most common reason the payment goes unclaimed is simply that nobody collected the details.",
    "The rules also set out what information providers must give apprentices about declaring care leaver status. An apprentice who does not know they can declare it will not, and the payment is lost along with the apprentice's own £3,000 bursary.",
    "What follows: this is money left on the table more often than it should be. If you are a provider, audit which of your current apprentices are eligible and whether the employer bank details are on file. If you are an employer, check your finance team knows to expect two payments rather than one, and that they are not being coded as training income."
  ],
  sources: [
    { label: "DWP — Summary of changes, paragraphs 125, 127.1 and 132", url: "https://www.gov.uk/government/publications/apprenticeship-funding-rules-and-assessment-plan-guidance-2026-to-2027/apprenticeship-funding-rules-summary-of-changes-version-1" }
  ]
},

{
  id: "inc-care-leavers",
  icon: "book", tag: "Levy", urgency: "medium", route: "",
  date: "2026-08-01",
  title: "The care leavers' bursary goes to the apprentice, not the employer",
  summary: "£3,000 paid directly to apprentices who have been in local authority care, and it depends entirely on them knowing to declare it.",
  standfirst: "A payment that only reaches the people it is meant for if somebody tells them it exists.",
  body: [
    "Apprentices who have been in the care of their local authority can receive a bursary of £3,000. Unlike the additional payments, it goes directly to the apprentice rather than to the employer or provider, and it is separate from — not instead of — the £1,000 additional payment the employer and provider receive for the same apprentice.",
    "The whole mechanism depends on declaration. An apprentice who does not know the bursary exists, or does not realise their circumstances count, will not declare their status and will not receive it. This is why the 2026/27 rules added a clarification about what information providers must give apprentices, specifically to reduce the risk that providers do not share everything an apprentice needs in order to declare.",
    "Care experience is also one of the two routes by which someone aged 19 to 24 attracts the £1,000 additional payment, and one of the two exceptions to the Level 7 age restriction — a 22 to 24 year old who has been in care remains eligible for a Level 7 apprenticeship when others of the same age do not.",
    "What follows: the practical task is making declaration easy and unembarrassing. That means clear information at enrolment rather than a box buried in a form, wording that covers the range of care arrangements people may not think of as care, and an offer to discuss it privately. For an apprentice on a Level 2 wage, £3,000 is not a marginal sum."
  ],
  sources: [
    { label: "GOV.UK — Apprenticeships bursary for care leavers", url: "https://www.gov.uk/government/collections/funding-rules-for-apprenticeships" },
    { label: "DWP — Summary of changes, paragraph 127.1", url: "https://www.gov.uk/government/publications/apprenticeship-funding-rules-and-assessment-plan-guidance-2026-to-2027/apprenticeship-funding-rules-summary-of-changes-version-1" }
  ]
},

{
  id: "inc-learning-support",
  icon: "check", tag: "Funding rules", urgency: "medium", route: "",
  date: "2026-08-01",
  title: "Learning support funding, and the new light-touch review",
  summary: "£150 a month plus one-off claims, with reviews now allowed to be lighter where a need is stable and permanent.",
  standfirst: "Funding that is neither means-tested nor capped by the band, and is under-claimed as a result of being misunderstood.",
  body: [
    "Where an apprentice has an identified learning difficulty or disability, learning support funding is paid to the provider at a fixed rate of £150 a month. Costs above that can be claimed as one-off payments as they occur. It sits outside the funding band, so it neither consumes a levy balance against the apprenticeship nor affects co-investment.",
    "Eligibility does not require an Education, Health and Care plan. Providers can determine it through a thorough, evidence-based assessment of a learning difficulty or disability, and a detailed assessment can be carried out at any point during the apprenticeship rather than only at the start. That matters because needs are often identified months in, once someone is struggling with a specific element.",
    "The 2026/27 rules added a proportionality clarification: where the need is stable because of a permanent disability and is unlikely to change, reviews may be light-touch rather than a full reassessment each time. Reviews otherwise run alongside progress reviews.",
    "The same evidence base also unlocks the English and maths flexibilities, including offering Entry Level 3 functional skills in the adjusted subject where that is appropriate.",
    "What follows: the under-claiming here is usually procedural rather than deliberate — the assessment is done, the support is delivered, and nobody records it in a way that triggers the claim. Check that your learning support process produces the evidence the funding requires as a by-product, rather than as a separate task somebody has to remember."
  ],
  sources: [
    { label: "GOV.UK — Supporting learners with learning difficulties and disabilities", url: "https://www.gov.uk/government/collections/funding-rules-for-apprenticeships" },
    { label: "DWP — Summary of changes, paragraph 44.5", url: "https://www.gov.uk/government/publications/apprenticeship-funding-rules-and-assessment-plan-guidance-2026-to-2027/apprenticeship-funding-rules-summary-of-changes-version-1" }
  ]
},

{
  id: "inc-full-funding",
  icon: "shop", tag: "Levy", urgency: "high", route: "",
  date: "2026-08-01",
  title: "Full funding for 16 to 24 year olds, and the new co-investment map",
  summary: "Since August 2026 what you pay depends on the apprentice's age as well as your levy status — and for one group it is nothing at all.",
  standfirst: "The single change most likely to alter a training budget this year.",
  body: [
    "Version 3 of the 2026/27 rules, published on 29 July 2026, set out a co-investment position that now turns on two things: whether you pay the levy, and how old the apprentice is at the start of their training.",
    "If you do not pay the levy, government funds all training and assessment costs up to the funding band maximum for apprentices aged 16 to 24. For apprentices aged 25 and over, you co-invest at 5%.",
    "If you do pay the levy and your account balance is exhausted, government funds all costs up to the band maximum for apprentices aged 16 to 24, and 75% for those aged 25 and over — leaving you co-investing at 25% for that group only.",
    "What it changed from: co-investment was previously a single rate applied regardless of who the apprentice was, with full funding available only in much narrower circumstances.",
    "What follows: this changes what a levy shortfall actually costs, sometimes dramatically, and it is worth remodelling your budget rather than assuming last year's figures hold. It also weakens the case for levy transfers as a way of supporting smaller employers with younger apprentices, since those employers can now access full funding directly.",
    "One thing it is not: a reason to prefer younger candidates. Age is a protected characteristic under the Equality Act 2010 and selecting on it is unlawful, whatever the funding position. This is information for building and defending a budget, not for shaping a shortlist."
  ],
  sources: [
    { label: "DWP — Summary of changes, paragraphs 213, 213.1, 214 and 214.2", url: "https://www.gov.uk/government/publications/apprenticeship-funding-rules-and-assessment-plan-guidance-2026-to-2027/apprenticeship-funding-rules-summary-of-changes-version-1" },
    { label: "GOV.UK — Funding for employers who do not pay the levy", url: "https://www.gov.uk/government/collections/funding-rules-for-apprenticeships" }
  ]
},

{
  id: "inc-transfers",
  icon: "handshake", tag: "Levy", urgency: "medium", route: "",
  date: "2026-08-01",
  title: "Levy transfers: what they are still good for",
  summary: "Up to 50% of your annual funds, now covering apprenticeship units too — but the strongest reason for doing it has weakened.",
  standfirst: "A mechanism worth revisiting rather than continuing on autopilot.",
  body: [
    "A levy-paying employer can transfer up to 50% of their annual funds to another business. With new funds now expiring after 12 months rather than 24, a transfer is one of the ways to use a balance that would otherwise be lost.",
    "The 2026/27 rules confirmed that the transfer allowance covers apprenticeship units as well as full apprenticeships, which widens what a receiving employer can do with the money. Public sector employers receiving transfers fall outside subsidy control and do not need to complete a minimal financial assistance declaration.",
    "The timings are unforgiving and worth restating. Once a transfer is approved by the sending employer, the receiving employer has six weeks to accept the funds or they lapse. Once accepted, they have three months to link them to an approved apprenticeship record. Miss either window and a fresh transfer has to be applied for.",
    "The strategic picture has shifted, though. Many transfer programmes were built on the argument that smaller employers could not otherwise afford apprentices. Since August 2026 a non-levy employer pays nothing for an apprentice aged 16 to 24 and 5% for those aged 25 and over. For younger apprentices the transfer now adds relatively little.",
    "What follows: transfers remain genuinely useful for apprentices aged 25 and over at smaller employers, for supply chain development, and for using funds that would otherwise expire. If your organisation reports levy transfer as a social value metric, check what you are actually claiming, because the underlying need has changed."
  ],
  sources: [
    { label: "DWP — Summary of changes, paragraphs 234, 234.1 and 242", url: "https://www.gov.uk/government/publications/apprenticeship-funding-rules-and-assessment-plan-guidance-2026-to-2027/apprenticeship-funding-rules-summary-of-changes-version-1" },
    { label: "GOV.UK — Transferring your apprenticeship levy to another business", url: "https://www.gov.uk/government/collections/funding-rules-for-apprenticeships" }
  ]
},

{
  id: "inc-english-maths-funding",
  icon: "book", tag: "Funding rules", urgency: "low", route: "",
  date: "2026-08-01",
  title: "English and maths is funded separately from the band",
  summary: "It does not consume your levy balance against the apprenticeship, and apprentices can use their adult skills entitlement alongside it.",
  standfirst: "Optional for most adults since 2025, but still funded — and the funding route is often misunderstood.",
  body: [
    "English and maths training is funded separately from the apprenticeship funding band. It does not come out of the amount available for the apprenticeship itself, so delivering it does not reduce what you can spend on training the occupational content.",
    "Since February 2025 it has been optional for apprentices who began their training aged 19 or over, except where English or maths forms an essential component of a mandatory qualification within the standard — a determination that sits with the awarding organisation and must be checked standard by standard rather than assumed. Apprentices who began aged 16 to 18 remain subject to the requirement.",
    "The 2026/27 rules added several clarifications. The provider must establish at initial assessment whether the apprentice will study a standalone qualification. Training must not be delivered entirely by self-directed distance learning. If an apprentice aged 19 or over opts in and later withdraws, the provider must withdraw them to the last day of learning. And apprentices may use their statutory adult skills fund entitlement to study English or maths while on an apprenticeship.",
    "Providers must also support apprentices who are exempt to develop these skills anyway, which can draw on Level 1 or Level 2 course material without the apprentice being enrolled on the qualification.",
    "What follows: because it is funded outside the band, there is rarely a funding reason to discourage an apprentice from taking it. The reasons to think carefully are workload and completion risk, not cost."
  ],
  sources: [
    { label: "DWP — Summary of changes, paragraphs 47 to 60", url: "https://www.gov.uk/government/publications/apprenticeship-funding-rules-and-assessment-plan-guidance-2026-to-2027/apprenticeship-funding-rules-summary-of-changes-version-1" },
    { label: "GOV.UK — Apprenticeship funding rules", url: "https://www.gov.uk/guidance/apprenticeship-funding-rules" }
  ]
}

);
