# 🛡️ SafeHire: Verified Credential & Skill-Match Recruitment Portal

> **Secure Software Development (SSD) — Semester Project**  
> **Activity 1: Working Frontend Prototype & Editorial Design System**  
> **Institution:** FAST-NUCES, Lahore  
> **Team Members:**  
> - **Muhammad Umar Afzaal** (`23F-3106`)  
> - **Musa Rehan** (`23F-3093`)  

---

## 🎨 Design Direction

* **Aesthetics:** Calm, trustworthy, editorial (Linear meets a well-run university portal).
* **Color Palette (Strict Tokens):**
  - `--paper: #F6F4EE` (page background)
  - `--surface: #FFFFFF` (cards)
  - `--surface-2: #EFECE3` (subtle panels, table stripes)
  - `--ink: #0E1A17` (primary text)
  - `--ink-muted: #5B6B66` (secondary text)
  - `--line: #DDD9CC` (1px borders)
  - `--pine: #0B2B27` (nav, primary buttons)
  - `--emerald: #1F7A63` (verified / success / links)
  - `--mint: #DFF3EA` (success backgrounds)
  - `--saffron: #E9A23B` (single accent: highlights, current step, focus ring)
  - `--saffron-soft: #FBEFD7`
  - `--danger: #C2413B`, `--danger-soft: #F9E1DF`
  - *Rule: 90% neutrals, 8% pine/emerald, 2% saffron.*
* **Typography:** Inter (400, 500, 600) for UI; JetBrains Mono strictly for IDs, hashes, and roll numbers. Real type scale (12 / 14 / 16 / 20 / 28 / 40).
* **Visual Restraint:** No neon, no glowing shadows, no glassmorphism, no gradient borders or text. 150ms ease-out transitions and 200ms fade for drawers.

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

## 📁 Clean Architecture

```
SSD_PROJECT/
├── dist/                              # Optimized production build
├── public/                            # Static assets (safehire-logo.svg, safehire-icon.svg)
├── src/                               # React source code
│   ├── components/
│   │   ├── Navbar.jsx                 # 56px solid pine navbar with saffron active underline
│   │   ├── Footer.jsx                 # Quiet editorial university footer
│   │   ├── StatusChip.jsx             # Minimalist status chips (mint, saffron, danger, neutral)
│   │   ├── Stepper.jsx                # 4-stage contact authorization stepper
│   │   ├── StatTile.jsx               # 28px/600 tiles with 12px uppercase labels
│   │   ├── AuditDrawer.jsx            # Verifiable audit ledger record drawer (0x8F22A)
│   │   ├── ApplicationModal.jsx       # Application drawer with untrusted input inspection
│   │   └── Toast.jsx                  # Quiet notification stack
│   ├── pages/
│   │   ├── HomePage.jsx               # Page 1: Overview with core system controls
│   │   ├── LoginPage.jsx              # Page 2: Clean role-based authentication
│   │   └── DashboardPage.jsx          # Page 3: Student portal with contact stepper & table
│   ├── App.jsx                        # Central state controller & router
│   ├── tokens.css                     # Editorial design tokens & typography scale
│   ├── index.css                      # Root stylesheet connecting tokens
│   └── main.jsx                       # React DOM entry point
├── index.html                         # Vite HTML template
├── package.json                       # Scripts and dependencies (React 18, Lucide React, Vite)
├── vite.config.js                     # Vite build configuration
├── Activity_1_Submission_Document.md  # Official submission sheet for grading
├── Project Activity 1.pdf             # Activity 1 Course Requirements
├── SafeHire_Project_Report.pdf        # SafeHire Project Proposal Report
└── README.md                          # Documentation
```
