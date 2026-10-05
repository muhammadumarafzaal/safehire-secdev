import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, PageBreak
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

def create_activity_2_pdf(output_filename="SafeHire_Activity_2_Submission_Report.pdf"):
    # Clean 32pt margins
    doc = SimpleDocTemplate(
        output_filename,
        pagesize=letter,
        leftMargin=32,
        rightMargin=32,
        topMargin=28,
        bottomMargin=28
    )

    styles = getSampleStyleSheet()

    pine = colors.HexColor("#0B2B27")
    ink = colors.HexColor("#0E1A17")
    ink_muted = colors.HexColor("#5B6B66")
    line_color = colors.HexColor("#DDD9CC")
    surface_2 = colors.HexColor("#F6F4EE")
    emerald = colors.HexColor("#1F7A63")

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=17,
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
        fontSize=9.5,
        leading=12.5,
        textColor=pine,
        spaceBefore=6,
        spaceAfter=3
    )

    label_style = ParagraphStyle(
        'FieldLabel',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11,
        textColor=ink
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=10.5,
        textColor=ink
    )

    mono_style = ParagraphStyle(
        'MonoCode',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=7,
        leading=9.5,
        textColor=pine
    )

    story = []

    # ================= PAGE 1 =================
    header_data = [
        [
            Paragraph("<b>Development Activity 2 — Role-Based Functional Prototype</b>", title_style),
            Paragraph("<b>FAST-NUCES, Lahore</b><br/>Secure Software Development (SSD)<br/>Semester Project Report", subtitle_style)
        ]
    ]
    header_table = Table(header_data, colWidths=[380, 168])
    header_table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('ALIGN', (1, 0), (1, 0), 'RIGHT'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
    ]))
    story.append(header_table)
    story.append(HRFlowable(width="100%", thickness=1.5, color=pine, spaceBefore=3, spaceAfter=6))

    # PROJECT INFORMATION
    story.append(Paragraph("Project Submission Details", h1_style))
    info_data = [
        [Paragraph("<b>Project Name:</b>", label_style), Paragraph("<b>SafeHire: Verified Credential &amp; Skill-Match Recruitment Portal</b>", body_style)],
        [Paragraph("<b>Group Members:</b>", label_style), Paragraph("1. <b>Muhammad Umar Afzaal</b> (Roll No: <b>23F-3106</b>) &nbsp;&bull;&nbsp; 2. <b>Musa Rehan</b> (Roll No: <b>23F-3093</b>)", body_style)],
        [Paragraph("<b>Live / Local URL:</b>", label_style), Paragraph("<font color='#1F7A63'><b>https://safehire-secdev.vercel.app/</b></font> &nbsp;|&nbsp; Local: <b>http://localhost:3000/</b> (Vite)", body_style)],
        [Paragraph("<b>Repository:</b>", label_style), Paragraph("<b>https://github.com/muhammadumarafzaal/safehire-secdev</b>", body_style)]
    ]
    t_info = Table(info_data, colWidths=[110, 438])
    t_info.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BACKGROUND', (0, 0), (-1, -1), surface_2),
        ('GRID', (0, 0), (-1, -1), 0.5, line_color),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_info)

    # PART 1: SELECT TWO USER ROLES
    story.append(Paragraph("Part 1 — Select Two User Roles", h1_style))
    p1_data = [
        [
            Paragraph("<b>Role 1:</b>", label_style),
            Paragraph("<b>Student Job Seeker</b> &nbsp; <i>(Muhammad Umar Afzaal — Roll No: 23F-3106)</i><br/><font color='#5B6B66'>Primary candidate stakeholder. Accesses verified degree badges, applies to vetted positions with prompt-injection defense, and controls contact disclosure through a mutual consent state machine.</font>", body_style)
        ],
        [
            Paragraph("<b>Role 2:</b>", label_style),
            Paragraph("<b>University Placement Officer</b> &nbsp; <i>(Dr. Tariq Mahmood — Officer ID: PO-FAST-092)</i><br/><font color='#5B6B66'>Institutional regulatory authority. Audits student academic transcripts, issues cryptographic SHA-256 HMAC credential signatures, and approves or revokes corporate recruiter postings.</font>", body_style)
        ]
    ]
    t_p1 = Table(p1_data, colWidths=[110, 438])
    t_p1.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BACKGROUND', (0, 0), (-1, -1), surface_2),
        ('GRID', (0, 0), (-1, -1), 0.5, line_color),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_p1)

    # PART 2: DEFINE WHAT EACH ROLE CAN DO
    story.append(Paragraph("Part 2 — Define What Each Role Can Do (3 Functions Each)", h1_style))
    p2_data = [
        [
            Paragraph("<b>Role 1: Student Job Seeker</b>", label_style),
            Paragraph("1. <b>View Verified Academic Badges &amp; Cryptographic Audit Hash:</b> Inspects official CGPA and tamper-proof SHA-256 transcript digest (Audit ID: <code>0x8F22A</code>).<br/>2. <b>Search, Filter &amp; Apply with Prompt-Injection Defense:</b> Explores career matches and submits cover notes through an active AST scanner intercepting adversarial overrides.<br/>3. <b>Enforce Selective PII Disclosure / Accept Offer:</b> Operates the 4-step state machine (<i>Applied</i> &rarr; <i>Offered</i> &rarr; <i>Accepted</i> &rarr; <i>Revealed</i>) to release contact info.", body_style)
        ],
        [
            Paragraph("<b>Role 2: Placement Officer</b>", label_style),
            Paragraph("1. <b>Cryptographically Authenticate &amp; Sign Transcripts (Role-Restricted):</b> Inspects pending student queue, computes SHA-256 HMAC block digests, and commits verified credentials.<br/>2. <b>Audit &amp; Vet Corporate Recruiter Partnerships:</b> Inspects company NDAs and fair-stipend policies; approves or revokes corporate posting access.<br/>3. <b>Monitor System-Wide Security Audit Telemetry:</b> Reviews live logs of role authorizations, PII access nonces, and blocked prompt-injection security events.", body_style)
        ]
    ]
    t_p2 = Table(p2_data, colWidths=[140, 408])
    t_p2.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BACKGROUND', (0, 0), (-1, -1), surface_2),
        ('GRID', (0, 0), (-1, -1), 0.5, line_color),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_p2)

    # PART 3: CREATE DEMO USERS
    story.append(Paragraph("Part 3 — Create Demo Users", h1_style))
    p3_data = [
        [Paragraph("<b>Demo User</b>", label_style), Paragraph("<b>Assigned Role</b>", label_style), Paragraph("<b>Email &amp; Password</b>", label_style), Paragraph("<b>Authorization Scope &amp; Identifier</b>", label_style)],
        [
            Paragraph("<b>Muhammad Umar Afzaal</b>", body_style),
            Paragraph("<font color='#1F7A63'>Student Job Seeker</font>", body_style),
            Paragraph("<code>m.umar@nu.edu.pk</code><br/><code>SafeHire#2026!Sec</code>", mono_style),
            Paragraph("Roll No: <b>23F-3106</b> &bull; CGPA: 3.78<br/>Audit Digest: <code>0x8F22A</code> (Verified)", body_style)
        ],
        [
            Paragraph("<b>Dr. Tariq Mahmood</b>", body_style),
            Paragraph("<font color='#0B2B27'>Placement Officer</font>", body_style),
            Paragraph("<code>placement.officer@nu.edu.pk</code><br/><code>Officer#2026!Safe</code>", mono_style),
            Paragraph("Officer ID: <b>PO-FAST-092</b> &bull; Level-3 Registrar<br/>Key: <code>FAST-ED25519-2026</code>", body_style)
        ]
    ]
    t_p3 = Table(p3_data, colWidths=[120, 110, 150, 168])
    t_p3.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BACKGROUND', (0, 0), (-1, 0), surface_2),
        ('GRID', (0, 0), (-1, -1), 0.5, line_color),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_p3)

    # PART 4: MAKE THE LOGIN PAGE FUNCTIONAL
    story.append(Paragraph("Part 4 — Make the Login Page Functional", h1_style))
    p4_text = (
        "The login page (<code>src/pages/LoginPage.jsx</code>) provides full functional role authentication:<br/>"
        "&bull; <b>Interactive Role Switcher &amp; Quick-Fill Demo Buttons:</b> Evaluators click 1-click shortcuts for either <i>Muhammad Umar Afzaal</i> or <i>Dr. Tariq Mahmood</i> to instantly populate credentials.<br/>"
        "&bull; <b>Input Validation &amp; Password Strength Evaluator:</b> Validates institutional email domains and computes real-time password entropy.<br/>"
        "&bull; <b>Role Recognition &amp; Dynamic Interface Routing:</b> Verifies role membership and redirects students to the <b>Student Job Seeker Portal</b> and placement officers to the <b>Placement Officer Console</b>."
    )
    story.append(Paragraph(p4_text, body_style))

    # ================= PAGE 2 =================
    story.append(PageBreak())

    # PART 5: ROLE-SPECIFIC DASHBOARDS
    story.append(Paragraph("Part 5 — Create Role-Specific Dashboards", h1_style))
    p5_data = [
        [
            Paragraph("<b>Student Job Seeker Dashboard</b> (<code>StudentDashboard.jsx</code>)", label_style),
            Paragraph("<b>Placement Officer Console</b> (<code>OfficerDashboard.jsx</code>)", label_style)
        ],
        [
            Paragraph(
                "&bull; <b>Profile:</b> Welcomes Muhammad Umar Afzaal (23F-3106) with verified FAST badge.<br/>"
                "&bull; <b>Stats:</b> Badges Verified (3), Active Applications (4), Interview Offers (1).<br/>"
                "&bull; <b>Selective Disclosure Card:</b> 4-stage Stepper with PII reveal trigger.<br/>"
                "&bull; <b>PII Protection Display:</b> Data minimization toggle (Phone: <code>+92 3•• ••• ••21</code>).<br/>"
                "&bull; <b>Job Table:</b> Real-time filter tabs and prompt injection defense scanner.<br/>"
                "&bull; <b>Role Boundary Test:</b> Button to simulate unauthorized officer action.<br/>"
                "&bull; <b>Logout:</b> Dedicated sign out clearing session state.",
                body_style
            ),
            Paragraph(
                "&bull; <b>Profile:</b> Welcomes Dr. Tariq Mahmood (PO-FAST-092) with institutional key badge.<br/>"
                "&bull; <b>Stats:</b> Pending Transcripts (3), Vetted Employers (14), Signed Badges (8).<br/>"
                "&bull; <b>Role-Restricted Functional Console:</b> Review candidate queue (Musa Rehan, Ayesha Khan) &amp; click <code>Sign Transcript</code> to issue SHA-256 HMAC digest.<br/>"
                "&bull; <b>Recruiter Vetting Registry:</b> Approve/Revoke corporate employer access.<br/>"
                "&bull; <b>Officer Least Privilege Scope:</b> Segregates academic records from private chats.<br/>"
                "&bull; <b>Live Security Telemetry:</b> Audit feed of hashes, PII locks, and violations.<br/>"
                "&bull; <b>Logout:</b> Working session termination button.",
                body_style
            )
        ]
    ]
    t_p5 = Table(p5_data, colWidths=[274, 274])
    t_p5.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BACKGROUND', (0, 0), (-1, 0), surface_2),
        ('GRID', (0, 0), (-1, -1), 0.5, line_color),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_p5)

    # PART 6: TEST THE DIFFERENCE BETWEEN ROLES
    story.append(Paragraph("Part 6 — Test the Difference Between the Roles", h1_style))
    p6_data = [
        [Paragraph("<b>Test</b>", label_style), Paragraph("<b>Expected Result &amp; Actual Verification</b>", label_style)],
        [Paragraph("<b>Role 1 logs in</b>", label_style), Paragraph("System authenticates student; loads <b>Student Job Seeker Portal</b> with applicant profile and job explorer.", body_style)],
        [Paragraph("<b>Role 2 logs in</b>", label_style), Paragraph("System authenticates officer; loads <b>Placement Officer Console</b> with institutional administration controls.", body_style)],
        [Paragraph("<b>Role 1 views its dashboard</b>", label_style), Paragraph("Displays applicant features: personal verified GPA (3.78), selective contact stepper, and PII masking.", body_style)],
        [Paragraph("<b>Role 2 views its dashboard</b>", label_style), Paragraph("Displays administrative features: pending transcript queue, corporate approvals, and cryptographic signing tool.", body_style)]
    ]
    t_p6 = Table(p6_data, colWidths=[140, 408])
    t_p6.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BACKGROUND', (0, 0), (-1, 0), surface_2),
        ('GRID', (0, 0), (-1, -1), 0.5, line_color),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_p6)

    # PART 7: PROTECT A FUNCTION FROM THE WRONG ROLE
    story.append(Paragraph("Part 7 — Protect a Function From the Wrong Role", h1_style))
    p7_text = (
        "<b>Function Selected:</b> <code>issueCryptographicTranscriptSignature(studentId)</code><br/>"
        "<b>Authorized Role:</b> <code>Placement Officer</code> (Role 2)<br/>"
        "<b>Defensive Logic:</b> <code>IF user.role === 'Placement Officer' THEN performFunction() ELSE displayAccessDeniedModal('403 Forbidden')</code><br/>"
        "<b>Observed Behavior:</b> An interactive test button is provided on the Student Dashboard. When the student attempts this action, execution immediately halts, an <code>AUTHZ_POLICY_REJECTION</code> audit event is logged, and an explicit <b>403 Forbidden Access Denied Modal</b> is rendered explaining that the Principle of Least Privilege and Separation of Duties prevent students from self-attesting academic records."
    )
    story.append(Paragraph(p7_text, body_style))

    # PART 8: SECURITY-AWARE DATA DISPLAY
    story.append(Paragraph("Part 8 — Add One Security-Aware Data Display", h1_style))
    p8_text = (
        "<b>Selected Information:</b> Student Personal Identifiable Information (PII) — Personal Phone Number (<code>+92 300 1234567</code>) and National Identity / CNIC (<code>35201-1234567-1</code>).<br/>"
        "<b>Who should be allowed to see it?</b> Only the authenticated student candidate (data owner) and recruiters who have received explicit mutual consent via an accepted interview offer.<br/>"
        "<b>Implementation:</b> Displayed in masked form (<code>+92 3•• ••• ••21</code> and <code>35201-•••••••-7</code>) under the Principle of Data Minimization (OWASP / GDPR Art. 5(1)(c)). The prototype features an interactive view toggle demonstrating recruiter masking vs owner unmasking."
    )
    story.append(Paragraph(p8_text, body_style))

    # PART 9: ADD LOGOUT
    story.append(Paragraph("Part 9 — Add Logout", h1_style))
    p9_text = (
        "Dedicated Logout buttons are integrated into the top navigation bar and dashboard headers. When clicked:<br/>"
        "1. Active session state is completely purged (<code>user = null</code>).<br/>"
        "2. The application redirects to <code>/login</code> with an informative security toast.<br/>"
        "3. <b>Protected Route Guard:</b> If unauthenticated users attempt to navigate to <code>dashboard</code>, <code>App.jsx</code> intercepts and redirects them to the login screen with a warning notice."
    )
    story.append(Paragraph(p9_text, body_style))

    # ================= PAGE 3 =================
    story.append(PageBreak())

    # PART 10: TEST YOUR PROTOTYPE RESULTS
    story.append(Paragraph("Part 10 — Test Your Prototype Results", h1_style))
    p10_data = [
        [Paragraph("<b>Test Case</b>", label_style), Paragraph("<b>Action Performed</b>", label_style), Paragraph("<b>Observed Result</b>", label_style), Paragraph("<b>Status</b>", label_style)],
        [Paragraph("<b>Test 1 — Correct Role</b>", body_style), Paragraph("Log in using valid Student credentials (<code>m.umar@nu.edu.pk</code>).", body_style), Paragraph("System validates role; loads Student Job Seeker Portal with Umar's credentials and verified badge <code>0x8F22A</code>.", body_style), Paragraph("<font color='#1F7A63'><b>PASS</b></font>", body_style)],
        [Paragraph("<b>Test 2 — Different Role</b>", body_style), Paragraph("Log out and log in using Placement Officer credentials (<code>placement.officer@nu.edu.pk</code>).", body_style), Paragraph("System validates role; loads Placement Officer Console with verification queue and signing tools.", body_style), Paragraph("<font color='#1F7A63'><b>PASS</b></font>", body_style)],
        [Paragraph("<b>Test 3 — Restricted Function</b>", body_style), Paragraph("Attempt to invoke <code>issueCryptographicTranscriptSignature</code> as Student.", body_style), Paragraph("Execution halted; 403 Forbidden Access Denied Modal rendered; security violation logged to ledger.", body_style), Paragraph("<font color='#1F7A63'><b>PASS</b></font>", body_style)],
        [Paragraph("<b>Test 4 — Logout</b>", body_style), Paragraph("Click Logout from navbar or dashboard header.", body_style), Paragraph("User state purged; returned to login page; protected dashboard inaccessible without re-authentication.", body_style), Paragraph("<font color='#1F7A63'><b>PASS</b></font>", body_style)]
    ]
    t_p10 = Table(p10_data, colWidths=[105, 145, 238, 60])
    t_p10.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BACKGROUND', (0, 0), (-1, 0), surface_2),
        ('GRID', (0, 0), (-1, -1), 0.5, line_color),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_p10)

    # PART 11: SECURITY DEVELOPMENT NOTE
    story.append(Paragraph("Part 11 — Security Development Note", h1_style))
    p11_data = [
        [Paragraph("<b>Security Concept Applied:</b>", label_style), Paragraph("<b>Role-Based Access Control (RBAC)</b>, <b>Separation of Duties</b>, <b>Principle of Least Privilege (PoLP)</b>, <b>Fail-Safe Defaults</b>, and <b>Data Minimization</b>.", body_style)],
        [Paragraph("<b>Where did you apply it?</b>", label_style), Paragraph("Authentication dispatcher (<code>LoginPage.jsx</code>), client-side route guard (<code>App.jsx</code>), functional execution handlers (<code>handleSignTranscript</code> &amp; <code>handleAttemptRestrictedAction</code>), and candidate PII masking cards.", body_style)],
        [Paragraph("<b>What did you change?</b>", label_style), Paragraph("Engineered dual role-segregated dashboards (<code>StudentDashboard.jsx</code> and <code>OfficerDashboard.jsx</code>); added cryptographic transcript signing for officers; built 403 Access Denied guardrail modal; enforced session purging upon logout; enhanced responsive UI layouts.", body_style)],
        [Paragraph("<b>What happens upon unauthorized attempt?</b>", label_style), Paragraph("System evaluates <code>user.role === 'Placement Officer'</code>. When evaluated false, execution immediately terminates before any state change occurs. An <code>AUTHZ_POLICY_REJECTION</code> event is dispatched to the audit trail, and an explicit <b>403 Forbidden Access Denied</b> dialog informs the actor that Placement Officer privileges are required.", body_style)]
    ]
    t_p11 = Table(p11_data, colWidths=[130, 418])
    t_p11.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BACKGROUND', (0, 0), (-1, -1), surface_2),
        ('GRID', (0, 0), (-1, -1), 0.5, line_color),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_p11)

    # SUBMISSION SUMMARY
    story.append(Paragraph("Activity 2 Submission Checklist &amp; Summary", h1_style))
    sub_data = [
        [Paragraph("<b>Requirement Checklist</b>", label_style), Paragraph("<b>Verification Status in SafeHire Implementation</b>", label_style)],
        [Paragraph("&bull; Same project selected in Activity 1", body_style), Paragraph("SafeHire recruitment portal continued seamlessly without separate application.", body_style)],
        [Paragraph("&bull; Two functional user roles", body_style), Paragraph("Role 1: Student Job Seeker &bull; Role 2: University Placement Officer.", body_style)],
        [Paragraph("&bull; Functional login for demo users", body_style), Paragraph("Credential validation and 1-click Quick-Fill shortcuts for both demo users.", body_style)],
        [Paragraph("&bull; Role-specific dashboard / interface", body_style), Paragraph("Separate Student Portal and Placement Officer Console with distinct actions.", body_style)],
        [Paragraph("&bull; At least one role-restricted function", body_style), Paragraph("<code>issueCryptographicTranscriptSignature()</code> restricted to Placement Officer.", body_style)],
        [Paragraph("&bull; Protected or limited information", body_style), Paragraph("Personal phone and CNIC masked under Data Minimization (OWASP / GDPR).", body_style)],
        [Paragraph("&bull; Working logout", body_style), Paragraph("Purges user session state and enforces protected route guard.", body_style)],
        [Paragraph("&bull; Testing of both roles", body_style), Paragraph("Tests 1 to 4 executed with 100% PASS rate across both roles.", body_style)]
    ]
    t_sub = Table(sub_data, colWidths=[170, 378])
    t_sub.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BACKGROUND', (0, 0), (-1, 0), surface_2),
        ('GRID', (0, 0), (-1, -1), 0.5, line_color),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_sub)

    doc.build(story)
    print(f"Successfully generated {output_filename}")

if __name__ == '__main__':
    create_activity_2_pdf()
