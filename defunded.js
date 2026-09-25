/* =========================================================================
   STANDARDS LOSING FUNDING

   The sixteen standards being defunded from no earlier than 1 September 2026.

   THIS IS A SEPARATE FILE ON PURPOSE. Defunding is not recorded in the
   Skills England register CSV — it is announced separately, on the
   Streamlining apprenticeships page. So every time the register is
   imported, the CSV's status of "Approved for delivery" overwrites a
   hand-set "Defunded", and the most important fact on the site quietly
   disappears.

   Keeping the list here and applying it over the register means an import
   cannot erase it. Nothing in the import pipeline writes to this file.

   Source: Skills England, Streamlining apprenticeships
   https://help.apprenticeships.education.gov.uk/hc/en-gb/articles/34005717182226-Streamlining-apprenticeships

   To add a second list when one is announced, add the names below. Matching
   is on name, case and punctuation insensitive, so "Team Leader" catches
   "Team leader" and "Team Leader/Supervisor".
   ========================================================================= */

const DEFUNDED_FROM = "2026-09-01";

const DEFUNDED_NOTE = "Funding withdrawn from September 2026";

const DEFUNDED_STANDARDS = [
  { name: "Team Leader",                                   level: 3 },
  { name: "Operations Manager",                            level: 5 },
  { name: "Coaching Professional",                         level: 5 },
  { name: "Improvement Practitioner",                      level: 4 },
  { name: "Improvement Leader",                            level: 6 },
  { name: "Chartered Manager",                             level: 6 },
  { name: "Facilities Management Supervisor",              level: 3 },
  { name: "Lead Practitioner in Adult Care",               level: 4 },
  { name: "Learning and Skills Assessor",                  level: 3 },
  { name: "Learning and Skills Mentor",                    level: 4 },
  { name: "Outdoor Learning Specialist",                   level: 5 },
  { name: "Professional Security Operative",               level: 2 },
  { name: "Security First Line Manager",                   level: 3 },
  { name: "Custody and Detention Professional",            level: 3 },
  { name: "Public Sector Compliance Investigator and Officer", level: 3 },
  { name: "Cleaning Hygiene Operative",                    level: 2 }
];
