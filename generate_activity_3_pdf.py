import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, PageBreak
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

def create_activity_3_pdf(output_filename="SafeHire_Activity_3_Submission_Report.pdf"):
    # Clean 30pt margins
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
            Paragraph("<b>Development Activity 3 — Parallel Module Development &amp; Integration</b>", title_style),
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
        [Paragraph("<b>Module Allocation:</b>", label_style), Paragraph("<b>Module 1 (Umar Afzaal):</b> Post Verified Opportunity &nbsp;|&nbsp; <b>Module 2 (Musa Rehan):</b> Browse &amp; Search Catalog", body_style)],
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

    # PART 1: SELECT TWO COMPLEMENTARY MODULES
    story.append(Paragraph("Part 1 — Select Two Complementary Modules", h1_style))
    p1_data = [
        [
            Paragraph("<b>Module 1:</b>", label_style),
            Paragraph("<b>Post Verified Internship Opportunity</b> (Enterprise &amp; Placement Requisition Console)<br/><font color='#5B6B66'>Enables employers and university placement officers to author and publish authenticated internship openings with mandatory schema validation, Fair-Stipend enforcement, and cryptographic posting signatures.</font>", body_style)
        ],
        [
            Paragraph("<b>Module 2:</b>", label_style),
            Paragraph("<b>Browse &amp; Search Verified Opportunities</b> (Candidate Catalog Explorer &amp; Audit Console)<br/><font color='#5B6B66'>Enables student job seekers and auditors to explore all active verified opportunities in real time, execute dynamic keyword searches with sanitization guardrails, filter by domain/mode, and inspect cryptographic proof digests.</font>", body_style)
        ],
        [
            Paragraph("<b>Responsibilities:</b>", label_style),
            Paragraph("<b>Module 1</b> handles the <i>producer workflow</i> (input capture, Anti-XSS sanitization, cryptographic block stamping, shared store commit). <b>Module 2</b> handles the <i>consumer and audit workflow</i> (catalog querying, multi-facet filtering, eligibility verification against student CGPA 3.78, and bookmarking state).", body_style)
        ]
    ]
    t_p1 = Table(p1_data, colWidths=[105, 447])
    t_p1.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BACKGROUND', (0, 0), (-1, -1), surface_2),
        ('GRID', (0, 0), (-1, -1), 0.5, line_color),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_p1)

    # PART 2: MEMBER 1 DEVELOP MODULE 1
    story.append(Paragraph("Part 2 — Member 1: Develop Module 1 (Muhammad Umar Afzaal — 23F-3106)", h1_style))
    p2_data = [
        [
            Paragraph("<b>Responsible Member:</b>", label_style),
            Paragraph("<b>Muhammad Umar Afzaal</b> (Roll No: <b>23F-3106</b>) &nbsp;|&nbsp; File: <code>src/pages/PostOpportunityModule.jsx</code>", body_style)
        ],
        [
            Paragraph("<b>Primary Function:</b>", label_style),
            Paragraph("Enterprise and university placement requisition portal for drafting, cryptographically signing, and publishing authenticated internship opportunities with live store integration.", body_style)
        ],
        [
            Paragraph("<b>Inputs &amp; Actions:</b>", label_style),
            Paragraph("Captures Position Title, Organization, Domain Category (Security, Software, AI, DevOps), Work Mode (Hybrid, Remote, On-site), Monthly Stipend (PKR), Cutoff CGPA, Skill Badges, and Scope Description. Includes 1-click 'Demo Preset Fill' for rapid evaluation.", body_style)
        ],
        [
            Paragraph("<b>Input Validation Rules:</b>", label_style),
            Paragraph("&bull; <b>Title:</b> Min 4 characters, angle brackets rejected.<br/>&bull; <b>Fair-Stipend SLA:</b> Must be numeric and &ge; PKR 30,000 to prevent predatory unpaid postings.<br/>&bull; <b>Academic Boundary:</b> CGPA cutoff bounded between 2.00 and 4.00.<br/>&bull; <b>Anti-XSS Defense:</b> Min 20 characters; <code>&lt;script&gt;</code> tags strictly forbidden and stripped before memory commit.", body_style)
        ],
        [
            Paragraph("<b>JavaScript Functionality:</b>", label_style),
            Paragraph("Dynamic form validation state machine rendering inline field error banners; automated computation of SHA-256 HMAC cryptographic digest (<code>sha256:4a...</code>) and short block ID (<code>0xVER-...</code>); reactive shared state dispatch; form state reset.", body_style)
        ],
        [
            Paragraph("<b>Feedback &amp; Data Display:</b>", label_style),
            Paragraph("&bull; <b>Feedback:</b> Mint success alert banner with generated audit block ID and full digest; toast notification.<br/>&bull; <b>Data Display:</b> 'Live Posted Opportunities' feed beside form immediately rendering newly submitted listings with live status chips.", body_style)
        ]
    ]
    t_p2 = Table(p2_data, colWidths=[105, 447])
    t_p2.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BACKGROUND', (0, 0), (-1, -1), surface_2),
        ('GRID', (0, 0), (-1, -1), 0.5, line_color),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_p2)

    story.append(PageBreak())

    # ================= PAGE 2 =================
    header_data_p2 = [
        [
            Paragraph("<b>Development Activity 3 — Parallel Module Development &amp; Integration</b>", title_style),
            Paragraph("<b>FAST-NUCES, Lahore</b><br/>Secure Software Development (SSD)<br/>Page 2: Module 2 &amp; Integration", subtitle_style)
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

    # PART 3: MEMBER 2 DEVELOP MODULE 2
    story.append(Paragraph("Part 3 — Member 2: Develop Module 2 (Musa Rehan — 23F-3093)", h1_style))
    p3_data = [
        [
            Paragraph("<b>Responsible Member:</b>", label_style),
            Paragraph("<b>Musa Rehan</b> (Roll No: <b>23F-3093</b>) &nbsp;|&nbsp; File: <code>src/pages/BrowseOpportunitiesModule.jsx</code>", body_style)
        ],
        [
            Paragraph("<b>Primary Function:</b>", label_style),
            Paragraph("Dynamic catalog explorer and cryptographic verification audit console allowing students and evaluators to browse, search, multi-facet filter, and inspect verified internship listings.", body_style)
        ],
        [
            Paragraph("<b>Input / Search Rules:</b>", label_style),
            Paragraph("&bull; <b>Length Guardrail:</b> Search queries capped at 50 characters to prevent client-side ReDoS.<br/>&bull; <b>Query Sanitization:</b> Automatically strips injection tokens (<code>&lt; &gt; { } \\</code>) and renders saffron security notice.<br/>&bull; <b>Empty State Recovery:</b> Renders clear empty-state visual with a 1-click 'Reset all filters' button.", body_style)
        ],
        [
            Paragraph("<b>JavaScript Functionality:</b>", label_style),
            Paragraph("&bull; <b>Multi-Criteria Filtering Engine:</b> Real-time matching across role title, company, description, and technical tags, combined with Domain Pills, Work Mode Pills, and Min Stipend SLA dropdown.<br/>&bull; <b>Cryptographic Inspection Modal:</b> Interactive modal displaying full SHA-256 digest, audit block ID, and automatic Academic Eligibility Check (compares candidate CGPA 3.78 vs requirement).<br/>&bull; <b>Bookmark State Machine:</b> Interactive bookmark toggle with state persistence and toast feedback.", body_style)
        ],
        [
            Paragraph("<b>Feedback &amp; Data Display:</b>", label_style),
            Paragraph("&bull; <b>Feedback:</b> Dynamic count banner ('Showing X of Y Verified Positions'), warning notice on sanitized queries.<br/>&bull; <b>Data Display:</b> Responsive card grid with company logos, verified chips, stipend SLA, tags, and inspect triggers.", body_style)
        ]
    ]
    t_p3 = Table(p3_data, colWidths=[105, 447])
    t_p3.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BACKGROUND', (0, 0), (-1, -1), surface_2),
        ('GRID', (0, 0), (-1, -1), 0.5, line_color),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_p3)

    # PART 4: INTEGRATE BOTH MODULES
    story.append(Paragraph("Part 4 — Integrate Both Modules", h1_style))
    p4_data = [
        [
            Paragraph("<b>Integration Strategy:</b>", label_style),
            Paragraph("Both modules reside within the same project codebase (<code>src/pages/</code>). State is unified in <code>src/App.jsx</code> using a centralized <code>opportunities</code> state array and shared utilities in <code>src/data/opportunitiesData.js</code>. Submissions in Module 1 immediately reflect in Module 2 without page refresh.", body_style)
        ],
        [
            Paragraph("<b>Navigation Links:</b>", label_style),
            Paragraph("&bull; <b>Navbar:</b> Added dedicated buttons for 'Browse Catalog' (Module 2) and 'Post Opportunity' (Module 1).<br/>&bull; <b>Home Page:</b> Added Activity 3 Parallel Module Integration cards with direct launcher buttons.<br/>&bull; <b>Dashboards:</b> Linked both modules directly within Student Portal and Placement Officer Console.<br/>&bull; <b>Footer:</b> Added quick links to both modules in site navigation.", body_style)
        ],
        [
            Paragraph("<b>Integration Checklist:</b>", label_style),
            Paragraph("<b>[&check;] Module 1 opens and works correctly</b> &nbsp;|&nbsp; <b>[&check;] Module 2 opens and works correctly</b><br/><b>[&check;] Both modules accessible via project interface</b> &nbsp;|&nbsp; <b>[&check;] Local navigation functions cleanly</b><br/><b>[&check;] Unified Senior Editorial design tokens</b> &nbsp;|&nbsp; <b>[&check;] Existing Activity 1 &amp; 2 features fully intact</b>", body_style)
        ]
    ]
    t_p4 = Table(p4_data, colWidths=[105, 447])
    t_p4.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BACKGROUND', (0, 0), (-1, -1), surface_2),
        ('GRID', (0, 0), (-1, -1), 0.5, line_color),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_p4)

    # PART 5: TEST BOTH MODULES
    story.append(Paragraph("Part 5 — Test Both Modules (Testing Results Table)", h1_style))
    test_table_data = [
        [
            Paragraph("<b>Test Case / Action</b>", label_style),
            Paragraph("<b>Module</b>", label_style),
            Paragraph("<b>Expected Result</b>", label_style),
            Paragraph("<b>Actual Result</b>", label_style),
            Paragraph("<b>Status</b>", label_style)
        ],
        [
            Paragraph("Submit valid requisition via '1-Click Demo Fill'", body_style),
            Paragraph("Module 1 (Umar)", body_style),
            Paragraph("Action succeeds, calculates audit hash, adds to live list", body_style),
            Paragraph("Computed digest <code>0xVER-4A12</code>; mint alert shown; added to live feed", body_style),
            Paragraph("<font color='#1F7A63'><b>PASS</b></font>", label_style)
        ],
        [
            Paragraph("Leave required field empty (clear title or set stipend < 30k)", body_style),
            Paragraph("Module 1 (Umar)", body_style),
            Paragraph("System prevents submission and displays localized error", body_style),
            Paragraph("Intercepted submission; displayed red validation alerts", body_style),
            Paragraph("<font color='#1F7A63'><b>PASS</b></font>", label_style)
        ],
        [
            Paragraph("Search keyword 'Security' & filter by 'Hybrid'", body_style),
            Paragraph("Module 2 (Musa)", body_style),
            Paragraph("Catalog dynamically updates with matching records", body_style),
            Paragraph("Filtered to 3 positions; result count updated reactively", body_style),
            Paragraph("<font color='#1F7A63'><b>PASS</b></font>", label_style)
        ],
        [
            Paragraph("Cross-module flow: Post job in M1 & search in M2", body_style),
            Paragraph("Integrated", body_style),
            Paragraph("Newly posted job appears in catalog without refresh", body_style),
            Paragraph("New job immediately searchable in Module 2 with proof", body_style),
            Paragraph("<font color='#1F7A63'><b>PASS</b></font>", label_style)
        ]
    ]
    t_test = Table(test_table_data, colWidths=[130, 80, 140, 157, 45])
    t_test.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('BACKGROUND', (0, 0), (-1, 0), pine),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('GRID', (0, 0), (-1, -1), 0.5, line_color),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 4),
        ('RIGHTPADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(t_test)

    story.append(PageBreak())

    # ================= PAGE 3 =================
    header_data_p3 = [
        [
            Paragraph("<b>Development Activity 3 — Parallel Module Development &amp; Integration</b>", title_style),
            Paragraph("<b>FAST-NUCES, Lahore</b><br/>Secure Software Development (SSD)<br/>Page 3: Security, Summary &amp; Deliverables", subtitle_style)
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

    # TESTING DEFECTS & CORRECTIONS
    story.append(Paragraph("Testing Issues Discovered &amp; Corrections Made", h1_style))
    defect_data = [
        [
            Paragraph("<b>Module 1 issue discovered:</b>", label_style),
            Paragraph("Stipend field originally accepted negative numbers or sub-market zero-stipend entries, and description field did not block unescaped HTML characters.", body_style)
        ],
        [
            Paragraph("<b>Module 2 issue discovered:</b>", label_style),
            Paragraph("Typing backslashes or bracket tokens in search disrupted regex filtering, and searches returning zero items left a blank container with no reset mechanism.", body_style)
        ],
        [
            Paragraph("<b>Correction made:</b>", label_style),
            Paragraph("1. In Module 1, enforced Fair-Stipend validation (&ge; PKR 30,000) and implemented <code>sanitizeInput()</code> stripping script/HTML tags.<br/>2. In Module 2, implemented <code>validateSearchQuery()</code> bounding query length to 50 chars, stripping illegal tokens, and adding an interactive empty-state reset button.", body_style)
        ]
    ]
    t_defects = Table(defect_data, colWidths=[120, 432])
    t_defects.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BACKGROUND', (0, 0), (-1, -1), surface_2),
        ('GRID', (0, 0), (-1, -1), 0.5, line_color),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_defects)

    # PART 6: SECURITY-AWARE DEVELOPMENT
    story.append(Paragraph("Part 6 — Security-Aware Development", h1_style))
    sec_table_data = [
        [
            Paragraph("<b>Module</b>", label_style),
            Paragraph("<b>Possible Misuse or Problem</b>", label_style),
            Paragraph("<b>Proposed Response &amp; Frontend Security Defense</b>", label_style)
        ],
        [
            Paragraph("<b>Module 1</b><br/>(Post Opportunity)<br/><i>Lead: Umar Afzaal</i>", body_style),
            Paragraph("<b>Stored XSS &amp; Exploitative Requisitions:</b><br/>Adversary injects malicious <code>&lt;script&gt;</code> into job description to hijack applicant sessions, or posts unpaid listings violating university guidelines.", body_style),
            Paragraph("<b>Sanitization Engine &amp; Fair-Stipend Boundary:</b><br/>Enforced client-side <code>sanitizeInput()</code> stripping script and tag characters; schema validation requiring minimum PKR 30k stipend; automated generation of tamper-evident SHA-256 HMAC posting signatures (<code>0xVER-...</code>).", body_style)
        ],
        [
            Paragraph("<b>Module 2</b><br/>(Browse Catalog)<br/><i>Lead: Musa Rehan</i>", body_style),
            Paragraph("<b>Search Injection &amp; PII Scraping:</b><br/>Adversary executes ReDoS by inputting pathological regex patterns into the search bar, or scrapes recruiter contact information in bulk.", body_style),
            Paragraph("<b>Query Bounds, Regex Sanitization &amp; Data Minimization:</b><br/>Enforced 50-character query length limit; automated stripping of special injection characters (<code>&lt; &gt; { } \\</code>); maintained Data Minimization shielding direct contact info until mutual consent unlock.", body_style)
        ]
    ]
    t_sec = Table(sec_table_data, colWidths=[95, 185, 272])
    t_sec.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BACKGROUND', (0, 0), (-1, 0), pine),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('GRID', (0, 0), (-1, -1), 0.5, line_color),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_sec)

    # SUBMISSION REQUIREMENTS BREAKDOWN
    story.append(Paragraph("Submission Requirements &amp; Student Deliverables Guide", h1_style))
    sub_data = [
        [
            Paragraph("<b>Muhammad Umar Afzaal<br/>(Roll No: 23F-3106)</b>", label_style),
            Paragraph("<b>Module 1 Lead (Post Verified Internship Opportunity)</b><br/>&bull; Authored <code>src/pages/PostOpportunityModule.jsx</code> and input validation schema.<br/>&bull; Submits: Individual/Group PDF Report (<code>SafeHire_Activity_3_Submission_Report.pdf</code>), GitHub repository link, and screenshots of Module 1 (requisition form filled, validation error, success alert with <code>0xVER-...</code> digest, live posted list).", body_style)
        ],
        [
            Paragraph("<b>Musa Rehan<br/>(Roll No: 23F-3093)</b>", label_style),
            Paragraph("<b>Module 2 Lead (Browse &amp; Search Verified Opportunities)</b><br/>&bull; Authored <code>src/pages/BrowseOpportunitiesModule.jsx</code> and search query sanitization.<br/>&bull; Submits: Individual/Group PDF Report (<code>SafeHire_Activity_3_Submission_Report.pdf</code>), GitHub repository link, and screenshots of Module 2 (search filter active, domain pills, empty-state recovery, and Cryptographic Verification Audit inspection modal).", body_style)
        ],
        [
            Paragraph("<b>Joint Project Deliverables</b>", label_style),
            Paragraph("1. Updated project source code (HTML, CSS, JS/React) with both functional modules integrated into existing semester project.<br/>2. Seamless local execution via <code>npm run dev</code> on <code>http://localhost:3000/</code> without external database dependencies.<br/>3. Completed testing matrix and security-aware development documentation.", body_style)
        ]
    ]
    t_sub = Table(sub_data, colWidths=[110, 442])
    t_sub.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BACKGROUND', (0, 0), (-1, -1), surface_2),
        ('GRID', (0, 0), (-1, -1), 0.5, line_color),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_sub)

    doc.build(story)
    print(f"Generated {output_filename} successfully.")

if __name__ == '__main__':
    create_activity_3_pdf()
