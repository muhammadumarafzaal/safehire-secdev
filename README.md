# 🛡️ SafeHire: Verified Credential & Skill-Match Recruitment Portal

> **Secure Software Development (SSD) — Semester Project**  
> **Development Activity 2: Role-Based Functional Prototype (RBAC & Separation of Duties)**  
> **Institution:** FAST-NUCES, Lahore  
> **Team Members:**  
> - **Muhammad Umar Afzaal** (`23F-3106`)  
> - **Musa Rehan** (`23F-3093`)  
> **Live Production URL:** [https://safehire-secdev.vercel.app/](https://safehire-secdev.vercel.app/)  
> **Repository:** [https://github.com/muhammadumarafzaal/safehire-secdev](https://github.com/muhammadumarafzaal/safehire-secdev)

---

## 🎯 Activity 2 Overview: Role-Based Functional Prototype

SafeHire takes the frontend prototype one step further by implementing **Role-Based Access Control (RBAC)**, **Separation of Duties**, and **Fail-Safe Defaults**.

### 1. Two Distinct Functional Roles
1. **Role 1: Student Job Seeker (Muhammad Umar Afzaal &bull; `23F-3106`)**
   - **Credentials:** `m.umar@nu.edu.pk` / `SafeHire#2026!Sec`
   - View verified academic credentials and cryptographic SHA-256 transcript audit hash (`0x8F22A`).
   - Filter and apply to verified career opportunities with prompt-injection defense.
   - Authorize selective PII disclosure via a 4-step state machine (*Applied* &rarr; *Interview Offered* &rarr; *Accepted* &rarr; *Contact Revealed*).
   - Test role boundary protection: Attempting officer-restricted operations triggers an explicit **403 Forbidden Access Denied** dialog.
2. **Role 2: University Placement Officer (Dr. Tariq Mahmood &bull; `PO-FAST-092`)**
   - **Credentials:** `placement.officer@nu.edu.pk` / `Officer#2026!Safe`
   - **Role-Restricted Function:** Review candidate verification queue and cryptographically sign academic transcripts using institutional private keys (`FAST-ED25519-2026`), issuing tamper-evident SHA-256 badges.
   - Audit and vet corporate recruiter partner registrations and approve/revoke job postings.
   - Monitor real-time institutional security telemetry and immutable audit logs.

---

## 🔐 Security Principles Implemented

* **Role-Based Access Control (RBAC) & Least Privilege (PoLP):** Functional permissions are strictly partitioned. Students cannot self-attest records; only Placement Officers can compute and commit institutional signing digests.
* **Fail-Safe Defaults & Client-Side Route Guarding:** Default state requires authentication; accessing protected dashboards while logged out automatically redirects to sign in.
* **Data Minimization (OWASP / GDPR Art. 5(1)(c)):** Candidate personal phone number (`+92 3•• ••• ••21`) and CNIC (`35201-•••••••-7`) are masked by default and only revealed upon mutual agreement.
* **Untrusted Input Defense Scanner:** Intercepts prompt injection payloads (*"Ignore previous instructions..."*) before LLM matching occurs.
* **Tamper-Evident Audit Trail:** Every credential verification and security violation is assigned an immutable cryptographic block hash.

---

## 🚀 Quick Start (Run Locally)

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Launch Dev Server:**
   ```bash
   npm run dev
   ```
   Open your browser at **[http://localhost:3000](http://localhost:3000)**.

3. **Build for Production:**
   ```bash
   npm run build
   ```

---

## 📁 Repository Structure

```
SSD_PROJECT/
├── dist/                                  # Optimized production bundle
├── public/                                # Static assets (logos, icons)
├── src/                                   # Source code
│   ├── components/
│   │   ├── Navbar.jsx                     # Role-aware responsive navigation bar
│   │   ├── Footer.jsx                     # Quiet editorial university footer
│   │   ├── StatusChip.jsx                 # Minimalist status chips (mint, saffron, danger, neutral)
│   │   ├── Stepper.jsx                    # 4-stage contact authorization stepper
│   │   ├── StatTile.jsx                   # Clean stat tiles
│   │   ├── AuditDrawer.jsx                # Immutable ledger record drawer (0x8F22A)
│   │   ├── ApplicationModal.jsx           # Modal with adversarial prompt injection interceptor
│   │   ├── AccessDeniedModal.jsx          # 403 Forbidden security guardrail dialog
│   │   └── Toast.jsx                      # Notification stack
│   ├── data/
│   │   └── demoUsers.js                   # Demo users store & verification queue data
│   ├── pages/
│   │   ├── HomePage.jsx                   # Overview page with role highlights
│   │   ├── LoginPage.jsx                  # Functional login with 1-click Quick-Fill for both demo roles
│   │   ├── DashboardPage.jsx              # Protected route dispatcher
│   │   ├── StudentDashboard.jsx           # Role 1: Student Job Seeker Portal
│   │   └── OfficerDashboard.jsx           # Role 2: University Placement Officer Console
│   ├── App.jsx                            # State router, route guard & session manager
│   ├── tokens.css                         # Editorial design system with mobile/tablet responsive media queries
│   ├── index.css                          # Root stylesheet
│   └── main.jsx                           # React DOM entry point
├── Activity_1_Submission_Document.md      # Activity 1 Submission Sheet
├── Activity_2_Submission_Document.md      # Activity 2 Submission Sheet
├── SafeHire_Activity_1_Submission_Report.pdf # Activity 1 PDF Report
├── SafeHire_Activity_2_Submission_Report.pdf # Activity 2 PDF Report (Generated via ReportLab)
├── generate_activity_2_pdf.py             # Script to rebuild Activity 2 submission PDF
├── package.json                           # Dependencies & scripts
├── vite.config.js                         # Vite build configuration
└── README.md                              # Project documentation
```
