# Secure Software Development (SSD)
## Semester Project — Development Activity 3 Submission
### Parallel Module Development and Integration

---

### 1. Project Information

* **Project Name:** SafeHire: Verified Credential & Skill-Match Recruitment Portal
* **Course:** Secure Software Development (SSD)
* **Institution:** National University of Computer & Emerging Sciences (FAST-NUCES), Lahore Campus
* **Semester:** Fall 2026
* **Live Deployment URL:** [https://safehire-secdev.vercel.app/](https://safehire-secdev.vercel.app/)
* **GitHub Repository URL:** [https://github.com/muhammadumarafzaal/safehire-secdev](https://github.com/muhammadumarafzaal/safehire-secdev)
* **Local Run Command:** `npm run dev` (Runs locally on `http://localhost:3000/` without requiring external backend or internet connection)

#### Group Members & Module Allocation:
1. **Muhammad Umar Afzaal — Roll No: 23F-3106**
   * **Module Assigned:** **Module 1 — Post Verified Internship Opportunity**
   * **Role Responsibility:** Enterprise Requisition Interface, Multi-Constraint Client-Side Input Validation, Anti-XSS Sanitization Engine, Tamper-Evident Cryptographic Posting Digest (`0xVER-...`) Generation, and Live "Recently Posted" Data Display Feed.
2. **Musa Rehan — Roll No: 23F-3093**
   * **Module Assigned:** **Module 2 — Browse & Search Verified Opportunities**
   * **Role Responsibility:** Opportunity Catalog Explorer, Dynamic Keyword Search Sanitization & Length Guardrail, Multi-Criteria Facet Filtering (Technical Domains, Work Modes, Fair-Stipend SLA), Interactive Cryptographic Proof Inspection Modal, and Express Application / Bookmark State Machine.

---

### Part 1 — Select Two Complementary Modules

* **Project Name:** SafeHire: Verified Credential & Skill-Match Recruitment Portal
* **Module 1:** Post Verified Internship Opportunity
* **Module 2:** Browse & Search Verified Opportunities

#### Define the Responsibilities

* **Module 1 (Post Verified Internship Opportunity):**
  Module 1 provides an enterprise and placement officer requisition interface that allows authorized organizations and institutional administrators to draft, cryptographically validate, and publish verified internship opportunities. It enforces strict multi-field client-side input validation (position title length and character constraints, organization identity, Fair-Stipend policy thresholds &ge; PKR 30,000, academic CGPA cutoff boundaries 2.00–4.00, and Anti-XSS description screening). Upon validation, it computes a tamper-evident SHA-256 HMAC verification digest (`0xVER-POST-...`), commits the newly created opportunity into the shared application memory store, and immediately renders it in a live "Recently Posted by You" data feed with real-time feedback.

* **Module 2 (Browse & Search Verified Opportunities):**
  Module 2 provides a discovery and verification exploration console for student applicants and university auditors. It presents the entire catalog of verified listings (including newly submitted requisitions emitted from Module 1 in real time). It features dynamic text search with query sanitization and length bounds, multi-facet filtering across technical domains (Cybersecurity/AppSec, Software Engineering, AI & Data Intelligence, DevSecOps) and work modes (Remote, Hybrid, On-site), an interactive Verification Proof Inspection Modal (displaying cryptographic digest `0xVER-...`, posting authority, SHA-256 hash, and candidate academic eligibility comparison against the student's 3.78 CGPA), and an instant bookmarking state machine with real-time counters and empty-state recovery.

---

### Part 2 — Member 1: Develop Module 1

* **Responsible Group Member:** Muhammad Umar Afzaal (Roll No: **23F-3106**)
* **Component File:** [`src/pages/PostOpportunityModule.jsx`](file:///c:/Users/super.user/projects/SSD_PROJECT/src/pages/PostOpportunityModule.jsx)

#### Module 1 Implementation Details:
1. **User Interface:** Engineered a clean, responsive requisition interface adhering strictly to SafeHire's Senior Editorial design tokens (`tokens.css`). Features structured input groups, domain category selectors, work mode tabs, clear asterisk markers for mandatory inputs, and a 1-Click "Demo Preset Fill" shortcut for rapid classroom evaluation.
2. **Input or Action:** Captures comprehensive requisition metadata including Position Title, Organization/Company, Domain Category (`security`, `software`, `ai`, `devops`), Work Mode (`hybrid`, `remote`, `on-site`), Monthly Stipend in PKR, Minimum Academic CGPA Cutoff, Technical Skills / Security Badges, and Detailed Scope Description.
3. **Input Validation Rules:**
   * *Title Validation:* Must contain at least 4 characters and cannot contain HTML or angle brackets (`<`, `>`).
   * *Company Validation:* Non-empty corporate name (minimum 2 characters).
   * *Fair-Stipend SLA Validation:* Numeric validation enforcing a minimum threshold of **PKR 30,000 / month** to prevent exploitative unpaid student postings.
   * *Academic Boundary Check:* Minimum CGPA cutoff must be a numeric value strictly between **2.00 and 4.00**.
   * *Anti-XSS Script Filter:* Rejects descriptions containing `<script>` or unescaped HTML tokens; enforces a minimum of 20 characters to ensure transparent job descriptions.
   * *Skills & Badges:* Enforces at least one technical badge tag.
4. **JavaScript Functionality:**
   * Dynamic real-time validation upon user typing and form submission, rendering localized field-level error messages in danger red.
   * Generates a simulated SHA-256 HMAC cryptographic digest (`sha256:4a...`) and short block identifier (`0xVER-...`).
   * Appends the authenticated opportunity into the centralized shared memory state without full page reloads.
5. **Feedback Display:**
   * Upon successful submission, displays an alert banner highlighted in mint green with the generated audit block ID, full cryptographic digest, and confirmation of active catalog integration.
   * Emits responsive toast notification: *"Opportunity '[Title]' posted with audit digest 0xVER-XXXX!"*
   * Displays inline error banners beneath invalid fields if validation rules fail.
6. **Data Display:**
   * Live "Recently Posted Opportunities" feed placed beside the requisition form. Immediately displays the newly created opportunity with title, company, stipend, cutoff CGPA, and cryptographic audit chip.
   * Includes direct navigational bridge to Musa's Module 2 catalog explorer.

#### Activity Sheet Answers for Member 1:
* **Your module's primary function:** Allows authorized recruiters and placement staff to create, validate, cryptographically sign, and publish verified student internship requisitions.
* **Input validation rule:** Required title (&ge; 4 chars, no `<>`), company name, Fair-Stipend (&ge; PKR 30,000), CGPA cutoff bounded between 2.00 and 4.00, mandatory skill tags, and anti-XSS description validation (&ge; 20 chars, no `<script>` tags).
* **JavaScript interaction implemented:** Form validation state machine with dynamic field error triggers, automated SHA-256 HMAC cryptographic signature generation, reactive dispatch to shared memory array, and live feed update.

---

### Part 3 — Member 2: Develop Module 2

* **Responsible Group Member:** Musa Rehan (Roll No: **23F-3093**)
* **Component File:** [`src/pages/BrowseOpportunitiesModule.jsx`](file:///c:/Users/super.user/projects/SSD_PROJECT/src/pages/BrowseOpportunitiesModule.jsx)

#### Module 2 Implementation Details:
1. **User Interface:** Built a modern, card-based opportunity explorer and audit interface featuring a top search bar, responsive filter pill controls, dynamic results counter, and an interactive cryptographic audit verification modal.
2. **Primary Functionality:**
   * Catalogs all active verified opportunities, including instant updates dispatched from Module 1.
   * Dynamic keyword search evaluating role title, company name, scope description, and technical skill tags.
   * Multi-criteria filtering: Domain category pills (Cybersecurity & AppSec, Full-Stack, AI & Data, DevSecOps), Work Mode pills (All, On-site, Hybrid, Remote), and Fair-Stipend SLA minimum threshold dropdown (&ge; PKR 50k, 60k, 65k).
3. **Input Validation or Search Rule:**
   * Enforces a **50-character maximum length guardrail** on search terms to prevent buffer stress and client-side regex denial of service (ReDoS).
   * Query Sanitization Engine: Automatically identifies and neutralizes dangerous injection characters (`<`, `>`, `{`, `}`, `\`), displaying an informational saffron alert banner to the user.
   * Empty State Recovery: When a search returns zero records, the UI renders an intuitive empty-state graphic with a one-click *"Reset all filters"* action button.
4. **JavaScript Functionality:**
   * High-performance reactive search and filter pipeline executing on every keystroke and facet selection.
   * Interactive **Cryptographic Verification Proof Inspection Modal**: Clicking *"Inspect Proof"* on any opportunity card displays the institutional audit block, verification authority, full SHA-256 digest, and an automated Academic Eligibility Match confirming whether the logged-in student's CGPA (3.78) meets the job's requirements.
   * Express Bookmark State Machine: Interactive toggle enabling candidates to save and remove verified postings with instant toast notifications.
5. **Feedback:**
   * Dynamic result summary banner: *"Showing X of Y Verified Positions"*.
   * Informational warning banners for truncated or sanitized search queries.
   * Toast alerts confirming bookmarked positions or queued encrypted application tokens.
6. **Data Display:**
   * Editorial grid layout with status chips, verified employer badges, compensation figures, eligibility tags, and direct inspection triggers.
   * Direct navigational button linking to Umar's Module 1 form.

#### Activity Sheet Answers for Member 2:
* **Your module's primary function:** Enables students and auditors to explore, dynamically search, multi-facet filter, and cryptographically audit verified internship requisitions.
* **Input validation or search rule:** Search parameter length bounded to 50 characters; automated regex sanitization stripping injection tokens (`< > { } \`); empty search result fallback with one-click filter reset.
* **JavaScript interaction implemented:** Real-time multi-criteria filtering engine, interactive Cryptographic Verification Audit inspection modal with candidate CGPA eligibility evaluator, and stateful bookmarking toggle.

---

### Part 4 — Integrate Both Modules

* **Integration Architecture:**
  Both modules were integrated directly into the SafeHire root application structure:
  * Centralized Shared State in [`src/App.jsx`](file:///c:/Users/super.user/projects/SSD_PROJECT/src/App.jsx): Holds the reactive `opportunities` array and the `handleAddOpportunity` callback.
  * Shared Utilities in [`src/data/opportunitiesData.js`](file:///c:/Users/super.user/projects/SSD_PROJECT/src/data/opportunitiesData.js): Houses the initial dataset, domain categories, work modes, cryptographic digest generators, and validation sanitizers.
  * Top Navigation in [`src/components/Navbar.jsx`](file:///c:/Users/super.user/projects/SSD_PROJECT/src/components/Navbar.jsx): Provides permanent top-level links to *"Browse Catalog"* (Module 2) and *"Post Opportunity"* (Module 1).
  * Showcase Section on [`src/pages/HomePage.jsx`](file:///c:/Users/super.user/projects/SSD_PROJECT/src/pages/HomePage.jsx): Direct launcher cards for both Member 1's and Member 2's modules with clear attribution.
  * Cross-Linking in [`src/pages/StudentDashboard.jsx`](file:///c:/Users/super.user/projects/SSD_PROJECT/src/pages/StudentDashboard.jsx) and [`src/pages/OfficerDashboard.jsx`](file:///c:/Users/super.user/projects/SSD_PROJECT/src/pages/OfficerDashboard.jsx).

#### Integration Checklist Verification:
* [x] **Module 1 opens and works correctly:** Post Verified Opportunity page renders smoothly, accepts inputs, and submits new requisitions.
* [x] **Module 2 opens and works correctly:** Browse & Search page renders full catalog, executes search queries, filters facets, and opens verification modals.
* [x] **Both modules are accessible through the project interface:** Direct links present in Navbar, Home Page hero & feature cards, Dashboards, and Footer.
* [x] **Navigation between pages works locally:** Seamless switching between Home, Login, Student Portal, Officer Console, Module 1, and Module 2.
* [x] **Both modules follow a consistent design:** Unified Senior Editorial color tokens (Paper `#F6F4EE`, Pine `#0B2B27`, Emerald `#1F7A63`, Saffron `#E9A23B`), typography, button styles, and border radiuses.
* [x] **Existing functionality from previous activities still works:** Role-based authentication, 1-click Quick-Fill for demo users, 403 Access Denied restricted function test, selective PII masking, and audit ledger drawer remain 100% operational.

---

### Part 5 — Test Both Modules

#### Individual and Integrated Test Results Table:

| Test Case | Module | Action Performed | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Submit / Perform Valid Action** | Module 1 (Umar) | Clicked "1-Click Demo Fill", entered valid requisition details, and clicked "Post Verified Opportunity". | Requisition passes validation, generates cryptographic digest `0xVER-...`, commits to store, and displays mint success banner. | Form successfully submitted; generated audit block `0xVER-4A12`; added to active store; success banner rendered. | **PASS** |
| **Leave Required Field Empty** | Module 1 (Umar) | Cleared the "Position Title" input and attempted submission. | System intercepts invalid submission, displays inline danger alert, and highlights invalid input field. | Intercepted submission; displayed "Job title is required and must be at least 4 characters"; state remained unmutated. | **PASS** |
| **Perform Second Action (Search / Filter)** | Module 2 (Musa) | Typed "Security" into search box and toggled Work Mode filter to "Hybrid". | Catalog updates reactively in real time, displaying only matching positions and updating result count. | Catalog dynamically filtered to 3 positions; result summary updated to "Showing 3 of 7 Verified Positions". | **PASS** |
| **Cross-Module Integration Flow** | Integrated (Both) | Posted a new job in Module 1, then navigated immediately to Module 2 and searched for its title. | Newly posted job from Module 1 is immediately searchable and visible in Module 2 without page refresh. | New requisition immediately appeared in Module 2 search results with full cryptographic proof details. | **PASS** |

#### Issues Discovered & Corrections Made:

* **Module 1 issue discovered:** During initial testing, entering a negative number or zero for the monthly stipend passed HTML form submission, and entering angle brackets allowed potentially unescaped strings to persist into memory.
* **Module 2 issue discovered:** Searching with leading special regex characters (`\`, `{`, `}`) caused unexpected string parsing behavior, and search queries longer than 50 characters disrupted mobile container layout.
* **Correction made:**
  1. For Module 1, implemented `validateOpportunityForm()` with strict Fair-Stipend validation (&ge; PKR 30,000) and `sanitizeInput()` regex to strip `<` and `>` tags and reject script tokens before memory commit.
  2. For Module 2, engineered `validateSearchQuery()` to truncate queries at 50 characters, sanitize disallowed characters, and display a gentle warning banner, along with a dedicated empty-state recovery button.

---

### Part 6 — Security-Aware Development

Although this activity focuses on frontend functionality, both modules were engineered with proactive defensive security guardrails:

| Module | Possible Misuse or Problem | Proposed Response & Implemented Defense |
| :--- | :--- | :--- |
| **Module 1 (Post Opportunity)**<br/>*Lead: Umar Afzaal* | **Stored XSS & Fraudulent Requisition Spoofing:** A malicious user submits unescaped `<script>` payloads in the job description to execute in applicant browsers, or posts an exploitative unpaid position bypassing minimum wage standards. | **Client-Side Anti-XSS Sanitization & Fair-Stipend Boundary:** Enforced `sanitizeInput()` stripping script tokens and HTML brackets, strict schema validation requiring minimum PKR 30,000 stipend SLA, and automated generation of tamper-evident SHA-256 HMAC posting digests (`0xVER-...`) to prevent repudiation. |
| **Module 2 (Browse Opportunities)**<br/>*Lead: Musa Rehan* | **Search Parameter Injection & Unauthorized PII Harvesting:** An adversary enters malicious regex/script characters into the search bar to trigger Client-Side ReDoS, or scrapes corporate recruiter contact details without applicant consent. | **Query Length Guardrails, Regex Sanitization & Data Minimization:** Enforced a 50-character query limit, sanitized dangerous characters (`< > { } \`), provided empty-state fallback, and maintained strict Data Minimization shielding recruiter direct contacts until candidate consent is granted. |

---

### Submission Requirements Summary

* **Project Name:** SafeHire: Verified Credential & Skill-Match Recruitment Portal
* **Group Members:**
  1. Muhammad Umar Afzaal (Roll No: **23F-3106**)
  2. Musa Rehan (Roll No: **23F-3093**)
* **Module 1:** Post Verified Internship Opportunity (Developed by Muhammad Umar Afzaal)
* **Module 2:** Browse & Search Verified Opportunities (Developed by Musa Rehan)
* **Module 1 functionality implemented:**
  Full enterprise internship requisition form with multi-field input validation (title, company, Fair-Stipend &ge; PKR 30k, CGPA range 2.00–4.00, anti-XSS description), 1-click classroom demo presets, automated SHA-256 HMAC cryptographic digest computation (`0xVER-...`), reactive shared state commit, success alert banners, and live "Recently Posted Opportunities" feed.
* **Module 2 functionality implemented:**
  Full catalog explorer with real-time text search, query sanitization and length bounds (max 50 chars), multi-facet filtering (Domain category, Work mode, Min stipend SLA), dynamic result counter, empty-state recovery, interactive Cryptographic Verification Audit inspection modal with candidate CGPA eligibility evaluator, and bookmark state machine.
* **JavaScript interactions implemented:**
  1. *Interaction 1 (Module 1):* Interactive form validation engine with inline danger error triggers, automated cryptographic signature generation, and reactive shared array dispatch without page reload.
  2. *Interaction 2 (Module 2):* Live multi-criteria filter engine and interactive Cryptographic Proof Inspection modal displaying audit block ID, full SHA-256 digest, and candidate eligibility status against student's 3.78 CGPA.
* **One problem discovered during testing:**
  Entering special injection characters in search or submitting unverified zero-stipend jobs was initially possible before defensive validation.
* **How it was corrected:**
  Implemented comprehensive client-side schema validation, regex sanitization functions (`sanitizeInput` and `validateSearchQuery`), Fair-Stipend boundary enforcement, and query length capping.

---

### Deliverables & Student Submission Guide

#### 1. What Muhammad Umar Afzaal (23F-3106) Submits:
* **Assigned Contribution:** Module 1 Lead Developer (Post Verified Internship Opportunity).
* **Code Files Authored/Maintained:**
  * [`src/pages/PostOpportunityModule.jsx`](file:///c:/Users/super.user/projects/SSD_PROJECT/src/pages/PostOpportunityModule.jsx)
  * Validation and cryptographic generator logic in [`src/data/opportunitiesData.js`](file:///c:/Users/super.user/projects/SSD_PROJECT/src/data/opportunitiesData.js)
  * Shared state integration and navigation in [`src/App.jsx`](file:///c:/Users/super.user/projects/SSD_PROJECT/src/App.jsx) and [`src/components/Navbar.jsx`](file:///c:/Users/super.user/projects/SSD_PROJECT/src/components/Navbar.jsx)
* **Deliverable Files to Upload:**
  1. `SafeHire_Activity_3_Submission_Report.pdf` (Individual copy or group report with Umar's details and Module 1 answers).
  2. Source code repository link: `https://github.com/muhammadumarafzaal/safehire-secdev`
  3. Screenshots showing Module 1 interface: form filled, validation error state, success alert banner with audit digest, and live posted feed.

#### 2. What Musa Rehan (23F-3093) Submits:
* **Assigned Contribution:** Module 2 Lead Developer (Browse & Search Verified Opportunities).
* **Code Files Authored/Maintained:**
  * [`src/pages/BrowseOpportunitiesModule.jsx`](file:///c:/Users/super.user/projects/SSD_PROJECT/src/pages/BrowseOpportunitiesModule.jsx)
  * Search validation rule and facet filtering logic in [`src/data/opportunitiesData.js`](file:///c:/Users/super.user/projects/SSD_PROJECT/src/data/opportunitiesData.js)
  * Verification Inspection Modal and candidate eligibility evaluation in [`src/pages/BrowseOpportunitiesModule.jsx`](file:///c:/Users/super.user/projects/SSD_PROJECT/src/pages/BrowseOpportunitiesModule.jsx)
* **Deliverable Files to Upload:**
  1. `SafeHire_Activity_3_Submission_Report.pdf` (Individual copy or group report with Musa's details and Module 2 answers).
  2. Source code repository link: `https://github.com/muhammadumarafzaal/safehire-secdev`
  3. Screenshots showing Module 2 interface: active search for "Security", category/mode filter applied, empty-state recovery, and Cryptographic Proof Inspection modal.

#### 3. Joint Submission Deliverables (Both Members):
* Complete, runnable project source code with both functional modules integrated into a single folder.
* Generated PDF submission report matching all 6 parts of the activity sheet (`SafeHire_Activity_3_Submission_Report.pdf`).
* Live working demo accessible at `http://localhost:3000/` (via `npm run dev`) or on the live Vercel URL.
