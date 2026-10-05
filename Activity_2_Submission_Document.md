# Secure Software Development (SSD)
## Semester Project — Development Activity 2 Submission
### Role-Based Functional Prototype

---

### 1. Project Information

* **Project Name:** SafeHire: Verified Credential & Skill-Match Recruitment Portal
* **Group Members:**
  1. Muhammad Umar Afzaal — Roll No: **23F-3106**
  2. Musa Rehan — Roll No: **23F-3093**
* **Institution:** National University of Computer & Emerging Sciences (FAST-NUCES), Lahore Campus
* **Course:** Secure Software Development (SSD)
* **Semester:** Fall 2026
* **Live Website URL:** [https://safehire-secdev.vercel.app/](https://safehire-secdev.vercel.app/)
* **Repository URL:** [https://github.com/muhammadumarafzaal/safehire-secdev](https://github.com/muhammadumarafzaal/safehire-secdev)
* **Local Run Command:** `npm run dev` (Runs locally on `http://localhost:3000/`)

---

### Part 1 — Select Two User Roles

* **Role 1:** **Student Job Seeker**
  * *Context:* The primary applicant stakeholder seeking verified internship opportunities, protecting personal identifiable information (PII) from predatory scraping, and managing disclosure permissions.
* **Role 2:** **University Placement Officer**
  * *Context:* The institutional registrar and regulatory authority responsible for authenticating student transcripts, issuing tamper-evident cryptographic verification signatures, and auditing corporate recruiter partnerships.

---

### Part 2 — Define What Each Role Can Do

#### Role 1: Student Job Seeker Functions
1. **View Verified Academic Credentials & Cryptographic Audit Proof:** Inspect official CGPA, verified university degree badges, and the cryptographic SHA-256 transcript audit hash (`0x8F22A`) issued by the university placement office.
2. **Explore, Filter & Apply to Verified Job Opportunities:** Filter positions by category (*Security*, *Software*, *AI*) and submit applications with built-in AST / prompt injection defense scanning.
3. **Control Selective PII Disclosure / Accept Interview Offer:** Authorize contact detail disclosure to corporate recruiters through a strict 4-stage mutual consent state machine (*Applied* &rarr; *Interview Offered* &rarr; *Accepted* &rarr; *Contact Revealed*).

#### Role 2: University Placement Officer Functions
1. **Cryptographically Authenticate & Sign Student Transcripts (Role-Restricted):** Review unverified student transcripts in the verification queue, execute institutional signing keys (`FAST-ED25519-2026`), compute SHA-256 HMAC digests, and issue official tamper-evident credential badges.
2. **Audit & Vet Corporate Recruiter Partnerships:** Review registered employer credentials (e.g. Systems Limited, Careem, Netsol, Afiniti), enforce wage/SLA compliance, and approve or revoke posting privileges.
3. **Inspect System-Wide Immutable Audit Ledger & Telemetry:** Review live security telemetry feeds including credential signature events, PII masking locks, blocked prompt injections, and unauthorized role violation logs.

---

### Part 3 — Create Demo Users

The following demo users are created directly in `src/data/demoUsers.js` with instant 1-click Quick-Fill shortcuts on the login page:

#### Demo User 1 (Role 1):
* **Name:** Muhammad Umar Afzaal
* **Role:** Student Job Seeker
* **Institutional Email:** `m.umar@nu.edu.pk`
* **Password:** `SafeHire#2026!Sec`
* **Roll No:** `23F-3106`
* **University:** FAST-NUCES, Lahore Campus
* **Degree & CGPA:** BS Computer Science — CGPA: `3.78` / 4.00
* **Audit Digest:** `0x8F22A`

#### Demo User 2 (Role 2):
* **Name:** Dr. Tariq Mahmood
* **Role:** University Placement Officer
* **Institutional Email:** `placement.officer@nu.edu.pk`
* **Password:** `Officer#2026!Safe`
* **Officer ID:** `PO-FAST-092`
* **Department:** Directorate of Career Services & Transcript Verification
* **Institutional Clearance:** Level-3 Institutional Registrar
* **Active Signing Key:** `FAST-ED25519-2026`

---

### Part 4 — Make the Login Page Functional

The login interface (`src/pages/LoginPage.jsx`) connects directly to the demo user authentication store:
1. **Interactive Role Tabs:** Toggle between *Role 1: Student* and *Role 2: Placement Officer* to preview credentials and role context notices.
2. **1-Click Classroom Quick-Fill Shortcuts:** Dedicated buttons instantly populate exact credentials for both *Muhammad Umar Afzaal* and *Dr. Tariq Mahmood*, eliminating manual typing during evaluation.
3. **Credential & Complexity Validation:** Evaluates input format, enforces password complexity (length, numeric, mixed-case, symbols), and verifies credentials against the active database.
4. **Role Recognition & Dynamic Routing:** Upon successful authentication, the system recognizes the user's role and takes them directly to their dedicated role interface:
   * Authenticating as *Student Job Seeker* routes to the **Student Job Seeker Portal**.
   * Authenticating as *Placement Officer* routes to the **Placement Officer Console**.
5. **Defensive Error Handling:** Invalid credentials trigger clean, security-conscious validation alerts.

---

### Part 5 — Create Role-Specific Dashboards

The system serves two entirely distinct, role-segregated dashboard experiences:

#### 1. Student Dashboard (`src/pages/StudentDashboard.jsx`)
* **Applicant Header:** Welcomes Muhammad Umar Afzaal, shows roll number `23F-3106`, quiet `"Verified by FAST-NUCES"` check indicator, and one-click link to Audit Record `0x8F22A`.
* **Applicant Stat Tiles:** Badges Verified (3), Active Applications (4), Interview Offers (1 Pending), Transcript Digest (SHA-256 Valid).
* **Selective Disclosure Card:** Interactive 4-step Stepper managing contact concealment until an interview offer is mutually confirmed.
* **Security-Aware PII Display:** Interactive toggle demonstrating Data Minimization (masked recruiter view vs authenticated candidate view).
* **Opportunity Table:** Editorial table with category filters (*Security*, *Software*, *AI*), match scoring, and application modal with adversarial prompt-injection screening.
* **Role Boundary Protection Test:** Direct interactive button allowing the student to test what happens when an unauthorized role attempts an officer-only function.
* **Working Logout:** Clean session termination action.

#### 2. Placement Officer Dashboard (`src/pages/OfficerDashboard.jsx`)
* **Administrative Header:** Welcomes Dr. Tariq Mahmood, displays Officer ID `PO-FAST-092`, and highlights active signing authority (`FAST-ED25519-2026`).
* **Institutional Stat Tiles:** Pending Transcripts (3), Vetted Employers (14), Signed Transcripts (8), Audit Ledger Depth (42 Blocks).
* **Role-Restricted Functional Console:** Queue of pending candidate verifications (Musa Rehan, Ayesha Khan, Bilawal Siddiqui) with functional `"Sign Transcript"` buttons that compute SHA-256 HMAC digests, issue verified badges, and commit entries to the ledger.
* **Corporate Employer Vetting Console:** Institutional registry allowing the officer to review company NDAs, inspect fair-stipend SLA compliance, and approve or revoke posting rights.
* **Officer-Scoped Least Privilege Display:** Demonstrates that while staff inspect academic marks, candidate private recruiter negotiation chats remain shielded under Least Privilege.
* **Live Security Audit Feed:** Real-time telemetry feed displaying cryptographic hashes for signed credentials, PII locks, and intercepted security violations.
* **Working Logout:** Instant session termination.

---

### Part 6 — Test the Difference Between the Roles

| Test Case | Expected Result | Observed Verification Status |
| :--- | :--- | :--- |
| **Role 1 logs in** | Authenticated as Student Job Seeker; system loads `StudentDashboard` with applicant profile and job match explorer. | **PASS:** Displays Umar Afzaal profile, roll no `23F-3106`, verified badge `0x8F22A`, and candidate toolset. |
| **Role 2 logs in** | Authenticated as Placement Officer; system loads `OfficerDashboard` with institutional administration controls. | **PASS:** Displays Dr. Tariq Mahmood profile, officer ID `PO-FAST-092`, verification queue, and signing tools. |
| **Role 1 views its dashboard** | Displays applicant-specific features: contact-unlock stepper, verified internship search, and prompt injection defense. | **PASS:** Student sees personal application progress and PII masking controls; no access to signing queue. |
| **Role 2 views its dashboard** | Displays administrative features: pending transcript verification queue, employer vetting, and system-wide security ledger. | **PASS:** Officer sees university-wide verification queue, corporate approvals, and cryptographic signing actions. |

---

### Part 7 — Protect a Function From the Wrong Role

* **Function Selected:** `issueCryptographicTranscriptSignature(studentId)`
* **Authorized Role:** `Placement Officer`
* **Defensive Implementation Logic:**
  ```javascript
  const handleSignTranscript = (student, user) => {
    // RBAC Security Guardrail Check
    if (user?.role !== 'Placement Officer') {
      logSecurityViolation({
        action: 'issueCryptographicTranscriptSignature',
        actor: user?.name,
        role: user?.role,
        outcome: '403_FORBIDDEN',
        timestamp: new Date().toISOString()
      });
      displayAccessDeniedModal({
        status: '403 Forbidden',
        rule: 'Separation of Duties (PoLP)',
        reason: 'Students cannot self-sign degrees or generate institutional credential digests.'
      });
      return false;
    }
    // Execute cryptographic signing...
  };
  ```

* **Live Verification in Prototype:**
  1. On the **Student Dashboard**, an interactive **Role Boundary Protection Test** button is provided: *"Test Security Boundary: Attempt to Sign Degree Transcripts as Student"*.
  2. When clicked by the Student, the guardrail immediately halts execution, dispatches an `AUTHZ_POLICY_REJECTION` event to the ledger, and renders a dedicated **403 Forbidden Access Denied Modal** detailing the policy violation.
  3. On the **Placement Officer Dashboard**, when Dr. Tariq Mahmood clicks `"Sign Transcript"`, the function verifies the `Placement Officer` privilege and successfully executes, generating a SHA-256 digest and updating the student status to *"Verified & Signed"*.

---

### Part 8 — Add One Security-Aware Data Display

* **Selected Information:** Student Personal Identifiable Information (PII) — Personal Phone Number (`+92 300 1234567`) and National Identity / CNIC (`35201-1234567-1`), alongside confidential academic counseling notes.
* **Who should be allowed to see it?**
  * **Authenticated Student (Candidate):** Can view their own unmasked PII.
  * **Approved Recruiter:** Can view unmasked contact details **only after** the candidate has explicitly accepted an interview offer (Mutual Consent Unlock).
  * **General Users / Preliminary Recruiters:** See strictly masked data (`+92 3•• ••• ••21` and `35201-•••••••-7`) under **Data Minimization (OWASP & GDPR Art. 5(1)(c))**.
  * **Placement Officer:** Can inspect institutional academic metrics (CGPA, degree credits, official enrollment) necessary for credential signing, but private recruiter messaging remains decoupled under the Principle of Least Privilege.
* **Implementation:** The prototype includes an interactive **Security-Aware Data Display Card** with a live view-mode switcher (*"Preview Masked Recruiter View"* vs *"Switch to Candidate View"*), demonstrating active data masking and protection against predatory scraping and KYC identity harvesting.

---

### Part 9 — Add Logout

* **Implementation:**
  * Dedicated **Sign Out / Logout** buttons are placed prominently in both the top navigation bar and the header of each dashboard.
  * When the user clicks Logout:
    1. Active session state is completely purged (`user = null`).
    2. Session memory is cleared.
    3. The application immediately redirects the user to the `/login` page.
    4. A security toast confirms: *"Signed out successfully. Session credentials purged."*
    5. **Protected Route Guard:** If an unauthenticated user attempts to visit the dashboard without logging in, `App.jsx` intercepts the route and forces a redirect to the login page with a warning: *"Protected View: Please sign in with a demo role to access the dashboard."*

---

### Part 10 — Test Your Prototype

| Test | Action | Result | Status |
| :--- | :--- | :--- | :--- |
| **Test 1 — Correct Role** | Log in using demo Student credentials (`m.umar@nu.edu.pk` / `SafeHire#2026!Sec`). | System verifies student role, displays success toast, and renders the Student Job Seeker Portal with Umar's credentials and verified badge `0x8F22A`. | **PASS** |
| **Test 2 — Different Role** | Log out and log in using demo Placement Officer credentials (`placement.officer@nu.edu.pk` / `Officer#2026!Safe`). | System verifies officer role, displays success toast, and renders the Institutional Placement Officer Console with verification queue and signing tools. | **PASS** |
| **Test 3 — Restricted Function** | While logged in as Student, attempt to execute the restricted function (*Sign Degree Transcripts*). | System intercepts unauthorized execution; prevents state change; renders 403 Forbidden Access Denied Modal; logs violation event to audit trail. | **PASS** |
| **Test 4 — Logout** | Click Logout from either navbar or dashboard. | User session is cleared (`user = null`); application returns to Sign In page; protected dashboard is unmounted and inaccessible. | **PASS** |

---

### Part 11 — Security Development Note

* **Security Concept Applied:**
  1. **Role-Based Access Control (RBAC):** Restricts system operations based on assigned organizational roles (*Student Job Seeker* vs *Placement Officer*).
  2. **Separation of Duties & Least Privilege (PoLP):** Enforces that candidates cannot self-sign degrees or alter institutional verification digests; only the university registrar possesses signing authority.
  3. **Fail-Safe Defaults & Client-Side Route Guarding:** Default state requires explicit authentication; unauthenticated visits to protected pages fail closed and redirect to sign in.
  4. **Data Minimization (OWASP / GDPR Art. 5(1)(c)):** Limits exposure of sensitive PII (phone number, CNIC) to what is strictly necessary through client-side masking and mutual consent unlock.
* **Where did you apply it?**
  * Applied at the authentication boundary (`LoginPage.jsx`), route dispatcher (`DashboardPage.jsx` and `App.jsx`), functional execution handlers (`handleSignTranscript` in `OfficerDashboard.jsx` and `handleAttemptRestrictedAction` in `StudentDashboard.jsx`), and candidate PII display cards.
* **What did you change in your project?**
  * Built a centralized demo user database (`src/data/demoUsers.js`) with two distinct roles.
  * Upgraded `LoginPage.jsx` with instant 1-click Quick-Fill demo credentials and role-based redirect logic.
  * Engineered two dedicated, role-segregated dashboards (`StudentDashboard.jsx` and `OfficerDashboard.jsx`) replacing the single-role view.
  * Added the role-restricted functional console for cryptographic transcript verification and signing.
  * Implemented an interactive 403 Forbidden Access Denied modal and security boundary testing mechanism.
  * Enforced session termination (logout) and protected route interception.
  * Enhanced responsive typography, tables, and navbar across mobile, tablet, and desktop viewports.
* **What happens when an unauthorized role attempts the restricted operation?**
  * The system performs an explicit role evaluation: `IF user.role !== 'Placement Officer'`.
  * Execution terminates immediately before any state mutation or signature calculation occurs.
  * A security violation event (`0xSEC-ERR-...`) is dispatched to the audit trail with timestamp, principal name, and attempted action.
  * An interactive **403 Forbidden Access Denied** dialog is presented to the user explaining that Principle of Least Privilege and Separation of Duties prevent students from signing degree records.

---

### Submission Summary Checklist

* [x] **Same project selected in Activity 1:** SafeHire Verified Recruitment Portal continued without separate application.
* [x] **Two functional user roles:** Role 1 (Student Job Seeker) and Role 2 (University Placement Officer).
* [x] **Functional login for demo users:** Login page with credential verification and 1-click Quick-Fill shortcuts for both demo users.
* [x] **Role-specific dashboard/interface:** Separate Student Portal and Placement Officer Console with distinct functions.
* [x] **At least one role-restricted function:** `issueCryptographicTranscriptSignature()` restricted to Placement Officer with live 403 test guardrail.
* [x] **One protected or limited piece of information:** Candidate personal phone number (`+92 300 1234567`) and CNIC (`35201-1234567-1`) masked under Data Minimization.
* [x] **Working logout:** Session purging and protected route redirection.
* [x] **Testing of both roles:** Full verification of tests 1 through 4 with PASS results.
* [x] **UI Responsiveness:** Verified on mobile (375px), tablet (768px), and desktop (1440px).

---

### Final Submission Metadata

* **Project Name:** SafeHire: Verified Credential & Skill-Match Recruitment Portal
* **Group Members:**
  1. Muhammad Umar Afzaal (23F-3106)
  2. Musa Rehan (23F-3093)
* **Live Project URL:** [https://safehire-secdev.vercel.app/](https://safehire-secdev.vercel.app/)
* **Local Project:** `http://localhost:3000/` (`npm run dev`)
* **Roles Implemented:** Role 1: Student Job Seeker &bull; Role 2: University Placement Officer
* **Restricted Function:** `issueCryptographicTranscriptSignature()` (Authorized: Placement Officer only)
* **Security Concept Applied:** Role-Based Access Control (RBAC), Separation of Duties, Least Privilege & Data Minimization.
