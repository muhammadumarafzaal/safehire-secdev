import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, PageBreak
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

def create_activity_4_pdf(output_filename="SafeHire_Activity_4_Submission_Report.pdf"):
    doc = SimpleDocTemplate(
        output_filename,
        pagesize=letter,
        leftMargin=30,
        rightMargin=30,
        topMargin=26,
        bottomMargin=26
    )

    styles = getSampleStyleSheet()

    pine = colors.HexColor("#0B2B27")
    ink = colors.HexColor("#0E1A17")
    ink_muted = colors.HexColor("#5B6B66")
    line_color = colors.HexColor("#DDD9CC")
    surface_2 = colors.HexColor("#F6F4EE")
    emerald = colors.HexColor("#1F7A63")
    saffron = colors.HexColor("#8A5A0B")
    danger = colors.HexColor("#C0392B")

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=pine
    )

    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=ink_muted
    )

    h1_style = ParagraphStyle(
        'SectionH1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        textColor=pine,
        spaceBefore=5,
        spaceAfter=2
    )

    label_style = ParagraphStyle(
        'FieldLabel',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=10,
        textColor=ink
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.2,
        leading=9.8,
        textColor=ink
    )

    mono_style = ParagraphStyle(
        'MonoCode',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=6.8,
        leading=9,
        textColor=pine
    )

    story = []

    # ================= PAGE 1 =================
    header_data = [
        [
            Paragraph("<b>Development Activity 4 — Dependency Mapping &amp; Failure Analysis</b>", title_style),
            Paragraph("<b>FAST-NUCES, Lahore</b><br/>Secure Software Development (SSD)<br/>Fall 2026 Semester Project", subtitle_style)
        ]
    ]
    header_table = Table(header_data, colWidths=[385, 167])
    header_table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('ALIGN', (1, 0), (1, 0), 'RIGHT'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
    ]))
    story.append(header_table)
    story.append(HRFlowable(width="100%", thickness=1.5, color=pine, spaceBefore=3, spaceAfter=5))

    # PROJECT INFORMATION
    story.append(Paragraph("Project Submission Details", h1_style))
    info_data = [
        [Paragraph("<b>Project Name:</b>", label_style), Paragraph("<b>SafeHire: Verified Credential &amp; Skill-Match Recruitment Portal</b>", body_style)],
        [Paragraph("<b>Group Members:</b>", label_style), Paragraph("1. <b>Muhammad Umar Afzaal</b> (Roll No: <b>23F-3106</b>) &nbsp;|&nbsp; 2. <b>Musa Rehan</b> (Roll No: <b>23F-3093</b>)", body_style)],
        [Paragraph("<b>Live / Local URL:</b>", label_style), Paragraph("<font color='#1F7A63'><b>https://safehire-secdev.vercel.app/</b></font> &nbsp;|&nbsp; Local: <b>http://localhost:3000/</b> (Vite)", body_style)],
        [Paragraph("<b>GitHub Repo:</b>", label_style), Paragraph("<b>https://github.com/muhammadumarafzaal/safehire-secdev</b>", body_style)]
    ]
    t_info = Table(info_data, colWidths=[105, 447])
    t_info.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BACKGROUND', (0, 0), (-1, -1), surface_2),
        ('GRID', (0, 0), (-1, -1), 0.5, line_color),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_info)

    # PART 1: IDENTIFY SYSTEM COMPONENTS
    story.append(Paragraph("Part 1 — Identify Your System Components", h1_style))
    comp_header = [
        Paragraph("<b>Symbol</b>", label_style),
        Paragraph("<b>Component Name</b>", label_style),
        Paragraph("<b>Main Responsibility</b>", label_style)
    ]
    comp_rows = [
        [
            Paragraph("<b>C1</b>", body_style),
            Paragraph("<b>Authentication &amp; Role-Based Access Control Service</b>", body_style),
            Paragraph("Manages user login/logout, role selection (Student vs. Placement Officer), session state, credential validation via demo user store, privacy consent, and protected route guardrails preventing unauthenticated dashboard access.", body_style)
        ],
        [
            Paragraph("<b>C2</b>", body_style),
            Paragraph("<b>Opportunity Data Store &amp; Validation Engine</b>", body_style),
            Paragraph("Centralized data layer holding verified internship listings (<code>opportunitiesData.js</code>), demo user credentials (<code>demoUsers.js</code>), domain categories, work modes, and all shared validation/sanitization utilities (<code>sanitizeInput</code>, <code>validateOpportunityForm</code>, <code>validateSearchQuery</code>, <code>generateOpportunityDigest</code>).", body_style)
        ],
        [
            Paragraph("<b>C3</b>", body_style),
            Paragraph("<b>Post Verified Opportunity Module (Module 1)</b>", body_style),
            Paragraph("Enterprise requisition interface enabling authorized users to compose, validate, cryptographically sign (SHA-256 HMAC digest), and publish new verified internship opportunities into shared reactive state.", body_style)
        ],
        [
            Paragraph("<b>C4</b>", body_style),
            Paragraph("<b>Browse &amp; Search Opportunities Module (Module 2)</b>", body_style),
            Paragraph("Full catalog explorer with real-time keyword search (query sanitization &amp; length guardrails), multi-facet filtering, interactive cryptographic verification proof inspection modal, and bookmark state machine.", body_style)
        ],
        [
            Paragraph("<b>C5</b>", body_style),
            Paragraph("<b>Application Orchestrator &amp; Shared State Manager</b>", body_style),
            Paragraph("Central orchestrator (<code>App.jsx</code>) managing global reactive state (opportunities array, user session, toast notifications, audit drawer), page routing, cross-module data flow, and component composition/rendering.", body_style)
        ],
        [
            Paragraph("<b>C6</b>", body_style),
            Paragraph("<b>Navigation, Layout &amp; Feedback UI Layer</b>", body_style),
            Paragraph("Encompasses Navbar (role-aware links &amp; logout), Footer (cross-module navigation), Toast notification stack, Audit Ledger Drawer, and Design Token System (<code>tokens.css</code>) enforcing visual consistency across all pages.", body_style)
        ]
    ]
    t_comp = Table([comp_header] + comp_rows, colWidths=[35, 140, 377])
    t_comp.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BACKGROUND', (0, 0), (-1, 0), pine),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('GRID', (0, 0), (-1, -1), 0.5, line_color),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 4),
        ('RIGHTPADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(t_comp)

    # PART 2: DIRECT DEPENDENCIES
    story.append(Paragraph("Part 2 — Identify Direct Dependencies", h1_style))
    dep_header = [
        Paragraph("<b>Component</b>", label_style),
        Paragraph("<b>Directly Depends On</b>", label_style),
        Paragraph("<b>Reason</b>", label_style)
    ]
    dep_rows = [
        [
            Paragraph("<b>C1</b> (Auth &amp; RBAC)", body_style),
            Paragraph("<b>C2</b> (Data Store), <b>C5</b> (Orchestrator)", body_style),
            Paragraph("Login page imports credentials from <code>DEMO_USERS</code> in C2; receives <code>setUser</code> and <code>setCurrentPage</code> callbacks from C5.", body_style)
        ],
        [
            Paragraph("<b>C2</b> (Data Store)", body_style),
            Paragraph("<i>(None)</i>", body_style),
            Paragraph("Self-contained data and utility module with no runtime dependencies on other components; exports static data arrays and pure validation functions.", body_style)
        ],
        [
            Paragraph("<b>C3</b> (Post Module)", body_style),
            Paragraph("<b>C2</b> (Data Store), <b>C5</b> (Orchestrator)", body_style),
            Paragraph("Invokes <code>validateOpportunityForm()</code>, <code>sanitizeInput()</code>, and <code>generateOpportunityDigest()</code> from C2; calls <code>onAddOpportunity</code> from C5.", body_style)
        ],
        [
            Paragraph("<b>C4</b> (Browse Module)", body_style),
            Paragraph("<b>C2</b> (Data Store), <b>C5</b> (Orchestrator)", body_style),
            Paragraph("Uses <code>validateSearchQuery()</code> from C2; reads <code>CATEGORIES</code> and <code>WORK_MODES</code>; receives live <code>opportunities</code> array as prop from C5.", body_style)
        ],
        [
            Paragraph("<b>C5</b> (Orchestrator)", body_style),
            Paragraph("<b>C2</b> (Data Store), <b>C6</b> (UI Layer)", body_style),
            Paragraph("Imports <code>INITIAL_OPPORTUNITIES</code> and <code>DEMO_USERS</code> from C2 for state initialization; composes C6 sub-components (Navbar, Footer, AuditDrawer, Toast) into the app shell.", body_style)
        ],
        [
            Paragraph("<b>C6</b> (UI Layer)", body_style),
            Paragraph("<b>C5</b> (Orchestrator)", body_style),
            Paragraph("C6 components (Navbar, Toast, AuditDrawer) receive their state and callbacks (<code>currentPage</code>, <code>user</code>, <code>setCurrentPage</code>, <code>addToast</code>) as props from C5.", body_style)
        ]
    ]
    t_dep = Table([dep_header] + dep_rows, colWidths=[85, 120, 347])
    t_dep.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BACKGROUND', (0, 0), (-1, 0), pine),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('GRID', (0, 0), (-1, -1), 0.5, line_color),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 4),
        ('RIGHTPADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(t_dep)

    story.append(PageBreak())

    # ================= PAGE 2 =================
    header_data_p2 = [
        [
            Paragraph("<b>Development Activity 4 — Dependency Mapping &amp; Failure Analysis</b>", title_style),
            Paragraph("<b>FAST-NUCES, Lahore</b><br/>Secure Software Development (SSD)<br/>Page 2: Dependency Matrix &amp; Failure Analysis", subtitle_style)
        ]
    ]
    t_head2 = Table(header_data_p2, colWidths=[385, 167])
    t_head2.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('ALIGN', (1, 0), (1, 0), 'RIGHT'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
    ]))
    story.append(t_head2)
    story.append(HRFlowable(width="100%", thickness=1.5, color=pine, spaceBefore=3, spaceAfter=5))

    # PART 3: DEPENDENCY MATRIX
    story.append(Paragraph("Part 3 — Construct the Dependency Matrix", h1_style))
    story.append(Paragraph("Reading: Row component <b>depends on</b> Column component. A <b>1</b> in row Cx, column Cy means 'Cx depends on Cy.' Diagonal is always <b>0</b>.", body_style))
    story.append(Spacer(1, 3))

    matrix_header = [
        Paragraph("<b>Row / Col</b>", label_style),
        Paragraph("<b>C1</b>", label_style),
        Paragraph("<b>C2</b>", label_style),
        Paragraph("<b>C3</b>", label_style),
        Paragraph("<b>C4</b>", label_style),
        Paragraph("<b>C5</b>", label_style),
        Paragraph("<b>C6</b>", label_style)
    ]
    def mc(val, is_diag=False, is_dep=False):
        if is_diag:
            return Paragraph("<font color='#5B6B66'><b>0</b></font>", body_style)
        elif is_dep:
            return Paragraph("<font color='#1F7A63'><b>1</b></font>", body_style)
        else:
            return Paragraph("0", body_style)

    matrix_rows = [
        [Paragraph("<b>C1</b>", label_style), mc(0, True), mc(1, False, True), mc(0), mc(0), mc(1, False, True), mc(0)],
        [Paragraph("<b>C2</b>", label_style), mc(0), mc(0, True), mc(0), mc(0), mc(0), mc(0)],
        [Paragraph("<b>C3</b>", label_style), mc(0), mc(1, False, True), mc(0, True), mc(0), mc(1, False, True), mc(0)],
        [Paragraph("<b>C4</b>", label_style), mc(0), mc(1, False, True), mc(0), mc(0, True), mc(1, False, True), mc(0)],
        [Paragraph("<b>C5</b>", label_style), mc(0), mc(1, False, True), mc(0), mc(0), mc(0, True), mc(1, False, True)],
        [Paragraph("<b>C6</b>", label_style), mc(0), mc(0), mc(0), mc(0), mc(1, False, True), mc(0, True)]
    ]
    col_w = 58
    t_matrix = Table([matrix_header] + matrix_rows, colWidths=[col_w+22, col_w, col_w, col_w, col_w, col_w, col_w])
    t_matrix.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('ALIGN', (1, 0), (-1, -1), 'CENTER'),
        ('BACKGROUND', (0, 0), (-1, 0), pine),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('BACKGROUND', (0, 1), (0, -1), pine),
        ('TEXTCOLOR', (0, 1), (0, -1), colors.white),
        ('GRID', (0, 0), (-1, -1), 0.5, line_color),
        # Diagonal shading
        ('BACKGROUND', (1, 1), (1, 1), colors.HexColor("#E8E5DD")),
        ('BACKGROUND', (2, 2), (2, 2), colors.HexColor("#E8E5DD")),
        ('BACKGROUND', (3, 3), (3, 3), colors.HexColor("#E8E5DD")),
        ('BACKGROUND', (4, 4), (4, 4), colors.HexColor("#E8E5DD")),
        ('BACKGROUND', (5, 5), (5, 5), colors.HexColor("#E8E5DD")),
        ('BACKGROUND', (6, 6), (6, 6), colors.HexColor("#E8E5DD")),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ('LEFTPADDING', (0, 0), (-1, -1), 4),
        ('RIGHTPADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(t_matrix)

    story.append(Spacer(1, 3))
    story.append(Paragraph("<b>Matrix Analysis:</b> Column sums (inbound dependencies): C1: 0 | <font color='#1F7A63'><b>C2: 4</b></font> | C3: 0 | C4: 0 | <font color='#1F7A63'><b>C5: 4</b></font> | C6: 1. &nbsp; C2 is the only component with <b>zero outbound dependencies</b> (foundational leaf node).", body_style))

    # PART 4: FAILURE ANALYSIS
    story.append(Paragraph("Part 4 — Analyze Component Failures", h1_style))

    # Failure Scenario 1
    story.append(Paragraph("<font color='#C0392B'><b>Failure Scenario 1:</b></font> <b>C2 — Opportunity Data Store &amp; Validation Engine</b>", label_style))
    f1_data = [
        [
            Paragraph("<b>Direct Dependents:</b>", label_style),
            Paragraph("<b>C1</b> (Authentication), <b>C3</b> (Post Module), <b>C4</b> (Browse Module), <b>C5</b> (App Orchestrator) — 4 of 5 components.", body_style)
        ],
        [
            Paragraph("<b>Indirect Cascade:</b>", label_style),
            Paragraph("C5 depends on C2 and C6 depends on C5, so C2's failure cascades through C5 to C6. <b>Every component</b> in the system is transitively affected.", body_style)
        ],
        [
            Paragraph("<b>Functions Disrupted:</b>", label_style),
            Paragraph("&bull; <b>Total login failure</b> — no credential definitions exist.<br/>&bull; <b>No opportunity listings</b> — initial dataset undefined; catalog renders empty.<br/>&bull; <b>No form validation</b> — <code>validateOpportunityForm()</code> and <code>sanitizeInput()</code> unavailable; security guardrails removed.<br/>&bull; <b>No search sanitization</b> — <code>validateSearchQuery()</code> unavailable; injection protection lost.<br/>&bull; <b>No cryptographic digests</b> — <code>generateOpportunityDigest()</code> cannot produce tamper-evident signatures.<br/>&bull; <b>Complete application crash</b> — React render tree throws runtime error at mount, resulting in blank white page.", body_style)
        ]
    ]
    t_f1 = Table(f1_data, colWidths=[110, 442])
    t_f1.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BACKGROUND', (0, 0), (-1, -1), surface_2),
        ('GRID', (0, 0), (-1, -1), 0.5, line_color),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_f1)

    story.append(Spacer(1, 3))

    # Failure Scenario 2
    story.append(Paragraph("<font color='#C0392B'><b>Failure Scenario 2:</b></font> <b>C5 — Application Orchestrator &amp; Shared State Manager</b>", label_style))
    f2_data = [
        [
            Paragraph("<b>Direct Dependents:</b>", label_style),
            Paragraph("<b>C1</b> (Authentication), <b>C3</b> (Post Module), <b>C4</b> (Browse Module), <b>C6</b> (Navigation &amp; UI Layer) — 4 of 5 components.", body_style)
        ],
        [
            Paragraph("<b>Indirect Cascade:</b>", label_style),
            Paragraph("C5 sits at the top of the component tree. Although C2 does not depend on C5, C2 becomes effectively useless in isolation because no component can render its data without the App Orchestrator wiring it through props. <b>Total system unavailability</b> results.", body_style)
        ],
        [
            Paragraph("<b>Functions Disrupted:</b>", label_style),
            Paragraph("&bull; <b>Complete render failure</b> — no pages are mounted; browser shows blank screen.<br/>&bull; <b>Loss of shared state</b> — reactive <code>opportunities[]</code>, user session, and toast queue cease to exist.<br/>&bull; <b>No page routing</b> — navigation between Home, Login, Dashboard, Module 1, and Module 2 is impossible.<br/>&bull; <b>No cross-module data flow</b> — Module 1 cannot dispatch postings to Module 2.<br/>&bull; <b>No authentication lifecycle</b> — login, logout, and protected route enforcement all fail.", body_style)
        ]
    ]
    t_f2 = Table(f2_data, colWidths=[110, 442])
    t_f2.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BACKGROUND', (0, 0), (-1, -1), surface_2),
        ('GRID', (0, 0), (-1, -1), 0.5, line_color),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_f2)

    story.append(PageBreak())

    # ================= PAGE 3 =================
    header_data_p3 = [
        [
            Paragraph("<b>Development Activity 4 — Dependency Mapping &amp; Failure Analysis</b>", title_style),
            Paragraph("<b>FAST-NUCES, Lahore</b><br/>Secure Software Development (SSD)<br/>Page 3: Critical Component, Strategy &amp; Graph", subtitle_style)
        ]
    ]
    t_head3 = Table(header_data_p3, colWidths=[385, 167])
    t_head3.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('ALIGN', (1, 0), (1, 0), 'RIGHT'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
    ]))
    story.append(t_head3)
    story.append(HRFlowable(width="100%", thickness=1.5, color=pine, spaceBefore=3, spaceAfter=5))

    # PART 5: CRITICAL COMPONENT
    story.append(Paragraph("Part 5 — Identify a Critical Component", h1_style))
    p5_data = [
        [
            Paragraph("<b>Selected Component:</b>", label_style),
            Paragraph("<b>C2 — Opportunity Data Store &amp; Validation Engine</b>", body_style)
        ],
        [
            Paragraph("<b>Direct Dependents:</b>", label_style),
            Paragraph("C1 (Authentication), C3 (Post Module), C4 (Browse Module), and C5 (App Orchestrator) — <b>4 out of 5</b> other components.", body_style)
        ],
        [
            Paragraph("<b>Why Critical:</b>", label_style),
            Paragraph("&bull; <b>Maximum cascade depth:</b> C5 depends on C2, and C6 depends on C5, so C2's failure propagates transitively to collapse the <i>entire system</i>.<br/>&bull; <b>Security-critical functions:</b> C2 houses all input sanitization and anti-XSS validation functions. Its absence does not merely break features — it <b>removes security guardrails</b>, potentially allowing malicious payloads to propagate.<br/>&bull; <b>Single source of truth:</b> C2 is the only component with zero outbound dependencies and provides all business data (opportunities, credentials, categories). Unlike C5, C2's data and validation logic are irreplaceable without rewriting the application's business rules.", body_style)
        ]
    ]
    t_p5 = Table(p5_data, colWidths=[110, 442])
    t_p5.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BACKGROUND', (0, 0), (-1, -1), surface_2),
        ('GRID', (0, 0), (-1, -1), 0.5, line_color),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_p5)

    # PART 6: FAILURE-HANDLING STRATEGY
    story.append(Paragraph("Part 6 — Propose a Failure-Handling Strategy", h1_style))
    p6_data = [
        [
            Paragraph("<b>Component:</b>", label_style),
            Paragraph("<b>C2 — Opportunity Data Store &amp; Validation Engine</b>", body_style)
        ],
        [
            Paragraph("<b>Proposed Strategy:</b>", label_style),
            Paragraph("&bull; <b>Embedded Fallback Defaults:</b> Each consuming component (C1, C3, C4, C5) defines local hardcoded fallback constants (empty arrays for opportunities, guest-mode user objects, inline basic validation rules) that activate when C2 import fails or returns <code>undefined</code>.<br/>&bull; <b>Safe Error Boundary Wrapper:</b> A top-level React <code>ErrorBoundary</code> catches runtime exceptions (failed imports, null references) and renders an informative error screen instead of a blank white page.<br/>&bull; <b>Inline Validation Fallback (Fail-Closed):</b> If <code>validateOpportunityForm()</code> or <code>sanitizeInput()</code> are unavailable, the Post Opportunity form <b>disables the submit button entirely</b> with a warning: 'Submission temporarily disabled — security validation engine offline.' This ensures the system fails closed (denying potentially unsafe input) rather than failing open.<br/>&bull; <b>Monitoring &amp; Alerting:</b> Log the data layer failure to the browser console with structured error objects for rapid developer diagnosis.", body_style)
        ],
        [
            Paragraph("<b>Impact Reduction:</b>", label_style),
            Paragraph("The fallback defaults and error boundary prevent the entire application from crashing, allowing informational content (Home Page, Navigation) to remain accessible. The fail-closed validation strategy ensures the system never silently accepts malicious input when validators are offline. Monitoring accelerates diagnosis and reduces mean time to recovery (MTTR).", body_style)
        ],
        [
            Paragraph("<b>Partial Continuity:</b>", label_style),
            Paragraph("The entire system would <b>not</b> need to stop. Home Page and Navigation UI continue rendering static content. Login Page shows graceful degradation message. Post Opportunity and Browse Catalog enter read-only degraded mode. Only data-dependent transactional operations are paused until C2 is restored.", body_style)
        ]
    ]
    t_p6 = Table(p6_data, colWidths=[110, 442])
    t_p6.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BACKGROUND', (0, 0), (-1, -1), surface_2),
        ('GRID', (0, 0), (-1, -1), 0.5, line_color),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_p6)

    # PART 7: DEPENDENCY GRAPH
    story.append(Paragraph("Part 7 — Dependency Graph", h1_style))
    story.append(Paragraph("Arrow from A to B means '<b>A depends on B</b>.' Graph matches the dependency matrix above.", body_style))
    story.append(Spacer(1, 3))

    # Draw the graph using a table-based layout
    graph_text = (
        "<font face='Courier' size='6.5' color='#0B2B27'>"
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
        "+-----------------------------------------------+<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
        "|&nbsp;&nbsp;C2: Opportunity Data Store &amp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
        "|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Validation Engine&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
        "|&nbsp;&nbsp;(Zero outbound deps - Leaf Node)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
        "+--------+----------+----------+---------+--------+<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;v&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;v&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;v&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;v<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+--------+&nbsp;&nbsp;+--------+&nbsp;&nbsp;+--------+&nbsp;&nbsp;+-----------+<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;C1&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;|&nbsp;&nbsp;C3&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;|&nbsp;&nbsp;C4&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;C5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;Auth&nbsp;&nbsp;|&nbsp;&nbsp;|&nbsp;&nbsp;Post&nbsp;&nbsp;|&nbsp;&nbsp;|&nbsp;&nbsp;Browse|&nbsp;&nbsp;|&nbsp;&nbsp;Orchestr.|<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+----+---+&nbsp;&nbsp;+----+---+&nbsp;&nbsp;+----+---+&nbsp;&nbsp;+---+---+---+<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;v&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;v&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;v<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;+-----------------------------+&nbsp;&nbsp;+---------+<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+--->|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C5: App Orchestrator&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<-| C6: Nav &amp;|<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;Shared State Manager&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|  | Feedback |<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+-----------------------------+&nbsp;&nbsp;+---------+<br/>"
        "<br/>"
        "&nbsp;&nbsp;Dependency Paths: C1->C2,C5 | C2->(none) | C3->C2,C5 | C4->C2,C5 | C5->C2,C6 | C6->C5"
        "</font>"
    )
    story.append(Paragraph(graph_text, body_style))

    # FINAL REFLECTION
    story.append(Spacer(1, 5))
    story.append(Paragraph("Final Reflection", h1_style))
    reflection_data = [
        [
            Paragraph(
                "Dependency mapping has fundamentally deepened our understanding of SafeHire's reliability and security posture by revealing that our "
                "<b>Opportunity Data Store &amp; Validation Engine (C2)</b> is the single most critical foundation — four of the five remaining "
                "components depend on it directly, and its failure cascades transitively to collapse the entire system. This exercise also exposed a critical "
                "security insight: C2 houses all input sanitization and anti-XSS validation functions, meaning its unavailability does not merely break features "
                "but <b>removes security guardrails</b>, potentially opening the system to injection attacks if any component attempts to operate in a degraded "
                "mode without validation. Armed with this analysis, we now prioritize C2 as the component requiring the most rigorous defensive design "
                "(error boundaries, fallback defaults, fail-closed submission policies) and have identified the bidirectional dependency cycle between C5 and C6 "
                "as a structural coupling that should be refactored in future iterations to improve fault isolation.",
                body_style
            )
        ]
    ]
    t_ref = Table(reflection_data, colWidths=[552])
    t_ref.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BACKGROUND', (0, 0), (-1, -1), surface_2),
        ('BOX', (0, 0), (-1, -1), 0.5, emerald),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(t_ref)

    # SUBMISSION CHECKLIST
    story.append(Spacer(1, 5))
    story.append(Paragraph("Submission Requirements Checklist", h1_style))
    checklist_data = [
        [Paragraph("<b>Deliverable</b>", label_style), Paragraph("<b>Status</b>", label_style)],
        [Paragraph("Part 1: List of 6 system components and responsibilities", body_style), Paragraph("<font color='#1F7A63'><b>&#10003; Complete</b></font>", body_style)],
        [Paragraph("Part 2: Direct dependency table with reasons", body_style), Paragraph("<font color='#1F7A63'><b>&#10003; Complete</b></font>", body_style)],
        [Paragraph("Part 3: Completed 6x6 dependency matrix with analysis", body_style), Paragraph("<font color='#1F7A63'><b>&#10003; Complete</b></font>", body_style)],
        [Paragraph("Part 4: Two component-failure scenario analyses (C2 and C5)", body_style), Paragraph("<font color='#1F7A63'><b>&#10003; Complete</b></font>", body_style)],
        [Paragraph("Part 5: Critical component identification (C2) with justification", body_style), Paragraph("<font color='#1F7A63'><b>&#10003; Complete</b></font>", body_style)],
        [Paragraph("Part 6: Failure-handling strategy with graceful degradation", body_style), Paragraph("<font color='#1F7A63'><b>&#10003; Complete</b></font>", body_style)],
        [Paragraph("Part 7: Dependency graph (ASCII art representation)", body_style), Paragraph("<font color='#1F7A63'><b>&#10003; Complete</b></font>", body_style)],
        [Paragraph("Final Reflection: Reliability &amp; security insights", body_style), Paragraph("<font color='#1F7A63'><b>&#10003; Complete</b></font>", body_style)],
    ]
    t_checklist = Table(checklist_data, colWidths=[432, 120])
    t_checklist.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('BACKGROUND', (0, 0), (-1, 0), pine),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('GRID', (0, 0), (-1, -1), 0.5, line_color),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_checklist)

    doc.build(story)
    print(f"Generated {output_filename} successfully.")

if __name__ == '__main__':
    create_activity_4_pdf()
