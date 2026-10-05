import React, { useState } from 'react';
import { Check, Search, Lock, Unlock, ShieldAlert, Eye, EyeOff, LogOut, CheckCircle2 } from 'lucide-react';
import StatTile from '../components/StatTile';
import Stepper from '../components/Stepper';
import StatusChip from '../components/StatusChip';
import ApplicationModal from '../components/ApplicationModal';
import AccessDeniedModal from '../components/AccessDeniedModal';

const JOBS_DATA = [
  {
    id: "JOB-01",
    title: "Junior Cloud & AppSec Intern",
    company: "Systems Limited",
    verified: true,
    location: "Lahore (Hybrid)",
    category: "security",
    stipend: "PKR 55,000 / mo",
    matchScore: 94,
    tags: ["OWASP", "FastAPI", "Docker", "Penetration Testing"],
    description: "Assist application security engineering with API vulnerability testing and Semgrep SAST pipelines."
  },
  {
    id: "JOB-02",
    title: "Full-Stack Developer Intern",
    company: "Afiniti Pakistan",
    verified: true,
    location: "Islamabad (Remote)",
    category: "software",
    stipend: "PKR 60,000 / mo",
    matchScore: 91,
    tags: ["Python", "FastAPI", "React", "PostgreSQL"],
    description: "Developing robust backend data pipelines with strict input validation and session management."
  },
  {
    id: "JOB-03",
    title: "AI Security & RAG Engineer Intern",
    company: "Netsol Technologies",
    verified: true,
    location: "Lahore (On-site)",
    category: "ai",
    stipend: "PKR 65,000 / mo",
    matchScore: 88,
    tags: ["LLM Security", "Prompt Guard", "LangChain", "Python"],
    description: "Evaluating prompt injection defense sanitizers and structured schema validation filters."
  },
  {
    id: "JOB-04",
    title: "DevSecOps & CI/CD Pipeline Trainee",
    company: "10Pearls Pakistan",
    verified: true,
    location: "Karachi (Hybrid)",
    category: "devops",
    stipend: "PKR 50,000 / mo",
    matchScore: 85,
    tags: ["GitHub Actions", "Docker", "Trivy", "Terraform"],
    description: "Automate security scanning in deployment pipelines, secret leakage prevention, and container signing."
  },
  {
    id: "JOB-05",
    title: "Cyber Threat Intelligence Intern",
    company: "Trillium Information Security",
    verified: true,
    location: "Islamabad (Hybrid)",
    category: "security",
    stipend: "PKR 58,000 / mo",
    matchScore: 82,
    tags: ["SIEM", "MITRE ATT&CK", "Network Forensics"],
    description: "Monitor threat intelligence feeds and compile structured vulnerability reports."
  },
  {
    id: "JOB-06",
    title: "Frontend UX Security Specialist",
    company: "Careem Engineering",
    verified: true,
    location: "Lahore (Hybrid)",
    category: "software",
    stipend: "PKR 70,000 / mo",
    matchScore: 79,
    tags: ["TypeScript", "CSP", "Anti-XSS", "React"],
    description: "Implement defense-in-depth UI architectures and robust Content Security Policy headers."
  }
];

export default function StudentDashboard({ user, onOpenAudit, onLogout, addToast }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [applicationsCount, setApplicationsCount] = useState(4);
  
  // Contact-Unlock State Machine ('offered' | 'accepted')
  const [offerState, setOfferState] = useState('offered');
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  // Application Modal state
  const [selectedJob, setSelectedJob] = useState(null);

  // Part 7: Access Denied Modal state
  const [isAccessDeniedOpen, setIsAccessDeniedOpen] = useState(false);
  const [denialDetails, setDenialDetails] = useState(null);

  // Part 8: PII Masking Perspective Toggle
  const [previewRecruiterView, setPreviewRecruiterView] = useState(true);

  // Filter jobs
  const filteredJobs = JOBS_DATA.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = category === 'all' || job.category === category;

    return matchesSearch && matchesCategory;
  });

  const handleAcceptOffer = () => {
    setIsAuthorizing(true);

    setTimeout(() => {
      setIsAuthorizing(false);
      setOfferState('accepted');
      addToast('Offer accepted. Contact details unlocked for Systems Limited.', 'success');
    }, 700);
  };

  const handleApplySuccess = (job) => {
    setSelectedJob(null);
    setApplicationsCount(prev => prev + 1);
    addToast(`Application to ${job.company} submitted with masked contact data.`, 'success');
  };

  // Part 7: Attempt Restricted Function with wrong role
  const handleAttemptRestrictedAction = () => {
    // RBAC Security Check
    if (user?.role !== 'Placement Officer') {
      const violation = {
        action: 'issueCryptographicTranscriptSignature',
        requiredRole: 'Placement Officer',
        currentRole: user?.role || 'Student Job Seeker',
        actor: user?.name || 'Muhammad Umar Afzaal',
        securityConcept: 'Part 7: Separation of Duties & Least Privilege (PoLP)',
        reason: 'Students cannot self-sign degrees or generate institutional placement digests. This function is restricted exclusively to authorized Placement Officers.'
      };
      setDenialDetails(violation);
      setIsAccessDeniedOpen(true);
      addToast('Access Denied (403): Placement Officer privileges required.', 'danger');
    }
  };

  return (
    <div style={{ padding: '40px 0 64px' }}>
      <div className="container">
        
        {/* Profile Header */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          flexWrap: 'wrap', 
          gap: '20px', 
          marginBottom: '32px', 
          paddingBottom: '24px', 
          borderBottom: '1px solid var(--line)' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--surface-2)',
              border: '1px solid var(--line)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              fontSize: 'var(--text-lg)',
              color: 'var(--ink)'
            }}>
              {user?.avatarInitials || 'UA'}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <h1 className="title-page" style={{ margin: 0 }}>
                  {user?.name || 'Muhammad Umar Afzaal'}
                </h1>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: 'var(--text-xs)', fontWeight: 500, color: 'var(--emerald)' }}>
                  <Check size={14} strokeWidth={2.5} /> Verified by FAST-NUCES
                </span>
                <StatusChip variant="neutral">Role 1: Student Job Seeker</StatusChip>
              </div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-muted)', marginTop: '4px' }}>
                {user?.university || 'FAST-NUCES, Lahore'} &bull; {user?.degree || 'BS Computer Science'} &bull; <span className="mono-meta">Roll: {user?.rollNo || '23F-3106'}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={onOpenAudit}
            >
              <span>View Audit Record </span>
              <span className="mono-meta" style={{ color: 'var(--emerald)' }}>0x8F22A</span>
            </button>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={onLogout}
              style={{ color: 'var(--danger)', borderColor: 'rgba(194, 65, 59, 0.3)' }}
              title="Sign Out"
            >
              <LogOut size={14} strokeWidth={1.5} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Stat Tiles (4 tiles) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          <StatTile 
            number="3" 
            label="Badges Verified" 
            meta="CGPA 3.78, Cryptography, SSD"
          />
          <StatTile 
            number={applicationsCount} 
            label="Active Applications" 
            meta="3 under review, 1 offered"
          />
          <StatTile 
            number={offerState === 'offered' ? "1 Pending" : "1 Accepted"} 
            label="Interview Offers" 
            meta="Systems Limited (Hybrid)"
          />
          <StatTile 
            number="SHA-256 Valid" 
            label="Transcript Digest" 
            meta="Anchor: FAST Placement Office"
          />
        </div>

        {/* Activity 2 Banner: Role-Based Prototype Context */}
        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '16px 20px', marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="label-caps" style={{ color: 'var(--emerald)' }}>Activity 2 Functional Mode</span>
              <StatusChip variant="mint">Role 1 of 2 Active</StatusChip>
            </div>
            <p className="body-sm" style={{ marginTop: '4px' }}>
              You are currently authenticated as <strong>Role 1: Student Job Seeker</strong>. 
              Review credentials, manage contact privacy, apply safely, or test authorization boundary protection below.
            </p>
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-muted)' }}>
            Session: <span className="mono-meta">m.umar@nu.edu.pk</span>
          </div>
        </div>

        {/* Primary Large Card: Contact-Unlock Lifecycle (Stepper) */}
        <div className="card-base" style={{ padding: '28px 32px', marginBottom: '32px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '8px' }}>
            <div>
              <span className="label-caps">Function 3: Selective Disclosure Mechanism</span>
              <h2 className="title-card" style={{ marginTop: '2px' }}>
                Contact-Unlock Lifecycle: Systems Limited
              </h2>
            </div>

            <StatusChip variant={offerState === 'offered' ? 'saffron' : 'mint'}>
              {offerState === 'offered' ? 'Action Required: Interview Offered' : 'State: Contact Revealed'}
            </StatusChip>
          </div>

          <p className="body-sm" style={{ maxWidth: '680px', marginBottom: '16px' }}>
            Candidate contact details remain masked until you explicitly confirm the interview. 
            Recruiters cannot scrape your phone or email without mutual agreement.
          </p>

          {/* Stepper Component */}
          <Stepper currentState={offerState === 'offered' ? 'offered' : 'accepted'} />

          {/* Contact Details Panel */}
          <div style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: 'var(--radius-md)', padding: '16px 20px', marginTop: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ color: offerState === 'accepted' ? 'var(--emerald)' : 'var(--ink-muted)' }}>
                  {offerState === 'accepted' ? <Unlock size={20} strokeWidth={1.5} /> : <Lock size={20} strokeWidth={1.5} />}
                </div>
                <div>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--ink)' }}>
                    {offerState === 'accepted' ? 'Candidate Contact Disclosed to Systems Limited' : 'Candidate Contact Masked (Pre-Acceptance)'}
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-muted)', marginTop: '2px' }}>
                    {offerState === 'accepted' 
                      ? 'Mutual consent established. Recruiter talent team has received verified channel access.' 
                      : 'Recruiter evaluates verified coursework and match score. Personal identity fields are concealed.'}
                  </div>
                </div>
              </div>

              {offerState === 'offered' ? (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleAcceptOffer}
                  disabled={isAuthorizing}
                  style={{ backgroundColor: 'var(--emerald)', borderColor: 'var(--emerald)' }}
                >
                  {isAuthorizing ? 'Authorizing...' : 'Accept Interview & Unlock Contact'}
                </button>
              ) : (
                <StatusChip variant="mint">Channel Active</StatusChip>
              )}

            </div>

            {/* Masked vs Unmasked Comparison */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--line)' }}>
              <div>
                <span className="label-caps" style={{ display: 'block', marginBottom: '2px' }}>Email Address</span>
                <span className="mono-meta" style={{ color: 'var(--ink)' }}>
                  {offerState === 'accepted' ? 'm.umar@nu.edu.pk' : 'm.•••••@nu.edu.pk'}
                </span>
              </div>
              <div>
                <span className="label-caps" style={{ display: 'block', marginBottom: '2px' }}>Phone Number</span>
                <span className="mono-meta" style={{ color: 'var(--ink)' }}>
                  {offerState === 'accepted' ? '+92 300 1234567' : '+92 3•• ••• ••21'}
                </span>
              </div>
              <div>
                <span className="label-caps" style={{ display: 'block', marginBottom: '2px' }}>Audit Proof</span>
                <button 
                  onClick={onOpenAudit}
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                >
                  <span className="mono-meta" style={{ color: 'var(--emerald)', textDecoration: 'underline' }}>
                    0x8F22A (Verified)
                  </span>
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Part 8 Card: Security-Aware Data Display (PII Masking & Data Minimization) */}
        <div className="card-base" style={{ padding: '24px 28px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
            <div>
              <span className="label-caps" style={{ color: 'var(--emerald)' }}>Part 8 — Security-Aware Data Display</span>
              <h2 className="title-card" style={{ marginTop: '2px' }}>
                Protected Personal Identifiable Information (PII)
              </h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setPreviewRecruiterView(!previewRecruiterView)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                {previewRecruiterView ? <Eye size={14} /> : <EyeOff size={14} />}
                <span>{previewRecruiterView ? 'Switch to Candidate View' : 'Preview Masked Recruiter View'}</span>
              </button>
            </div>
          </div>

          <p className="body-sm" style={{ marginBottom: '18px' }}>
            <strong>Security Principle Applied:</strong> Data Minimization (OWASP &amp; GDPR Art. 5(1)(c)).
            Personal phone number, CNIC, and personal email are not unnecessarily exposed. Recruiters and third parties see only the masked form until mutual consent is granted.
          </p>

          <div style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              
              <div>
                <span className="label-caps" style={{ display: 'block', marginBottom: '4px' }}>National ID (CNIC)</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="mono-meta" style={{ fontSize: 'var(--text-sm)', color: 'var(--ink)' }}>
                    {previewRecruiterView ? '35201-•••••••-7' : '35201-1234567-1'}
                  </span>
                  <StatusChip variant={previewRecruiterView ? 'saffron' : 'mint'}>
                    {previewRecruiterView ? 'Masked' : 'Owner Visible'}
                  </StatusChip>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--ink-muted)', marginTop: '4px' }}>
                  Protected against identity theft and unconsented KYC harvesting.
                </div>
              </div>

              <div>
                <span className="label-caps" style={{ display: 'block', marginBottom: '4px' }}>Personal Phone Number</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="mono-meta" style={{ fontSize: 'var(--text-sm)', color: 'var(--ink)' }}>
                    {previewRecruiterView ? '+92 3•• ••• ••21' : '+92 300 1234567'}
                  </span>
                  <StatusChip variant={previewRecruiterView ? 'saffron' : 'mint'}>
                    {previewRecruiterView ? 'Masked' : 'Owner Visible'}
                  </StatusChip>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--ink-muted)', marginTop: '4px' }}>
                  Prevents cold-calling and unsolicited WhatsApp recruitment bots.
                </div>
              </div>

              <div>
                <span className="label-caps" style={{ display: 'block', marginBottom: '4px' }}>Institutional Degree Hash</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="mono-meta" style={{ fontSize: 'var(--text-xs)', color: 'var(--emerald)' }}>
                    SHA-256: 8f3ac8...013c
                  </span>
                  <StatusChip variant="mint">Tamper-Proof</StatusChip>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--ink-muted)', marginTop: '4px' }}>
                  Degree marks are public-verifiable without revealing private disciplinary notes.
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Part 7 Card: Protect a Function From the Wrong Role (Security Boundary Test) */}
        <div className="card-base" style={{ padding: '24px 28px', marginBottom: '32px', borderLeft: '4px solid var(--saffron)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
            <div>
              <span className="label-caps" style={{ color: 'var(--saffron-text)' }}>Part 7 — Role Boundary Protection Test</span>
              <h2 className="title-card" style={{ marginTop: '2px' }}>
                Restricted Function Enforcement: Cryptographic Transcript Signing
              </h2>
            </div>
            <StatusChip variant="saffron">RBAC Guardrail Active</StatusChip>
          </div>

          <p className="body-sm" style={{ marginBottom: '16px' }}>
            The function <code>issueCryptographicTranscriptSignature()</code> belongs exclusively to <strong>Role 2 (Placement Officer)</strong>. 
            Under the Principle of Least Privilege and Separation of Duties, a Student Job Seeker must never be permitted to sign degrees or generate institutional credential digests.
          </p>

          <div style={{ backgroundColor: 'var(--surface-2)', padding: '14px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--line)', marginBottom: '16px', fontSize: 'var(--text-xs)', color: 'var(--ink)' }}>
            <strong>Security Rule:</strong> <code>IF user.role === 'Placement Officer' THEN performFunction() ELSE display 'Access Denied: 403 Forbidden'</code>
          </div>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleAttemptRestrictedAction}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--danger)', borderColor: 'rgba(194, 65, 59, 0.4)' }}
          >
            <ShieldAlert size={16} strokeWidth={1.75} />
            <span>Test Security Boundary: Attempt to Sign Degree Transcripts as Student</span>
          </button>
        </div>

        {/* Secondary Section: Plain Table of Verified Job Openings (Function 2) */}
        <div className="card-base" style={{ padding: '24px 0 0', overflow: 'hidden' }}>
          
          <div style={{ padding: '0 24px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="label-caps">Function 2: Verified Career Match</span>
              <h2 className="title-card" style={{ marginTop: '2px' }}>
                Verified Internship Opportunities
              </h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              {/* Search input */}
              <div style={{ position: 'relative', width: '240px' }}>
                <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-muted)' }} />
                <input
                  type="text"
                  className="input-text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter by title, company, tag..."
                  style={{ paddingLeft: '32px', height: '36px', fontSize: 'var(--text-xs)' }}
                />
              </div>

              {/* Category Filter Pills */}
              <div style={{ display: 'flex', gap: '4px', backgroundColor: 'var(--surface-2)', padding: '2px', borderRadius: 'var(--radius-md)', border: '1px solid var(--line)' }}>
                {[
                  { id: 'all', label: 'All' },
                  { id: 'security', label: 'Security' },
                  { id: 'software', label: 'Software' },
                  { id: 'ai', label: 'AI' }
                ].map(c => (
                  <button
                    key={c.id}
                    onClick={() => setCategory(c.id)}
                    style={{
                      background: category === c.id ? 'var(--surface)' : 'none',
                      border: category === c.id ? '1px solid var(--line)' : 'none',
                      color: category === c.id ? 'var(--ink)' : 'var(--ink-muted)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 500,
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer'
                    }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Plain Editorial Table */}
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <table className="editorial-table">
              <thead>
                <tr>
                  <th style={{ paddingLeft: '24px' }}>Position &amp; Employer</th>
                  <th>Location</th>
                  <th>Compensation</th>
                  <th>Verified Skills</th>
                  <th className="text-right">Match</th>
                  <th className="text-right" style={{ paddingRight: '24px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: 'var(--ink-muted)' }}>
                      No verified positions found matching the filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredJobs.map(job => (
                    <tr key={job.id}>
                      <td style={{ paddingLeft: '24px' }}>
                        <div style={{ fontWeight: 600, color: 'var(--ink)' }}>{job.title}</div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-muted)' }}>{job.company}</div>
                      </td>
                      <td style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-muted)' }}>
                        {job.location}
                      </td>
                      <td style={{ fontSize: 'var(--text-xs)', color: 'var(--ink)' }}>
                        {job.stipend}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                          {job.tags.slice(0, 3).map(tag => (
                            <span key={tag} style={{ fontSize: '11px', color: 'var(--ink-muted)', backgroundColor: 'var(--surface-2)', padding: '2px 6px', borderRadius: '4px' }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="text-right">
                        <span className="mono-meta" style={{ fontWeight: 600, color: 'var(--emerald)' }}>
                          {job.matchScore}%
                        </span>
                      </td>
                      <td className="text-right" style={{ paddingRight: '24px' }}>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => setSelectedJob(job)}
                        >
                          Apply Safely
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>

      </div>

      {/* Application Drawer / Modal */}
      {selectedJob && (
        <ApplicationModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onSubmitSuccess={handleApplySuccess}
          addToast={addToast}
        />
      )}

      {/* Part 7: Access Denied Dialog */}
      <AccessDeniedModal
        isOpen={isAccessDeniedOpen}
        onClose={() => setIsAccessDeniedOpen(false)}
        violationDetails={denialDetails}
      />

    </div>
  );
}
