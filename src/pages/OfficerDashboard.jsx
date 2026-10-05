import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  FileCheck, 
  Building2, 
  ShieldCheck, 
  ExternalLink, 
  AlertCircle, 
  Check, 
  X, 
  LogOut, 
  Key, 
  FileText,
  Lock,
  Search
} from 'lucide-react';
import StatTile from '../components/StatTile';
import StatusChip from '../components/StatusChip';
import { INITIAL_VERIFICATION_QUEUE, INITIAL_COMPANY_VETTING } from '../data/demoUsers';

export default function OfficerDashboard({ user, onOpenAudit, onLogout, addToast }) {
  const [verificationQueue, setVerificationQueue] = useState(INITIAL_VERIFICATION_QUEUE);
  const [companyList, setCompanyList] = useState(INITIAL_COMPANY_VETTING);
  const [signingStudentId, setSigningStudentId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate live stats
  const pendingCount = verificationQueue.filter(item => item.status === 'pending').length;
  const verifiedCount = verificationQueue.filter(item => item.status === 'verified').length;
  const approvedCompaniesCount = companyList.filter(c => c.status === 'approved').length;

  // Part 7: Restricted Functional Implementation
  const handleSignTranscript = (student) => {
    // RBAC Security Guardrail Check
    if (user?.role !== 'Placement Officer') {
      addToast('Security Violation: Unauthorized execution of institutional signing function.', 'danger');
      return;
    }

    setSigningStudentId(student.id);

    setTimeout(() => {
      // Generate simulated SHA-256 HMAC digest
      const randomHex = Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      const generatedHash = `sha256:e93f${randomHex}88c1a`;
      const generatedAuditId = `0x${Math.floor(100000 + Math.random() * 900000).toString(16).toUpperCase()}`;

      setVerificationQueue(prev => prev.map(item => {
        if (item.id === student.id) {
          return {
            ...item,
            status: 'verified',
            auditHash: generatedHash,
            auditId: generatedAuditId
          };
        }
        return item;
      }));

      setSigningStudentId(null);
      addToast(`Cryptographic transcript signature issued for ${student.name} (${student.rollNo}). Audit Block ID: ${generatedAuditId}`, 'success');
    }, 850);
  };

  // Function 2: Toggle Company Vetting Status
  const handleToggleCompany = (companyId) => {
    setCompanyList(prev => prev.map(c => {
      if (c.id === companyId) {
        const nextStatus = c.status === 'approved' ? 'revoked' : 'approved';
        addToast(`Corporate status for ${c.name} updated to: ${nextStatus.toUpperCase()}`, nextStatus === 'approved' ? 'success' : 'warning');
        return { ...c, status: nextStatus };
      }
      return c;
    }));
  };

  const filteredQueue = verificationQueue.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.degree.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '40px 0 64px' }}>
      <div className="container">
        
        {/* Officer Profile Header */}
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
              backgroundColor: 'var(--pine)',
              border: '1px solid var(--pine)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              fontSize: 'var(--text-lg)',
              color: '#F6F4EE'
            }}>
              {user?.avatarInitials || 'TM'}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <h1 className="title-page" style={{ margin: 0 }}>
                  {user?.name || 'Dr. Tariq Mahmood'}
                </h1>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--pine)' }}>
                  <Key size={14} /> Institutional Signing Authority
                </span>
                <StatusChip variant="neutral">Role 2: University Placement Officer</StatusChip>
              </div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-muted)', marginTop: '4px' }}>
                FAST-NUCES Directorate of Career Services &bull; <span className="mono-meta">Officer ID: {user?.officerId || 'PO-FAST-092'}</span> &bull; <span className="mono-meta">Key: FAST-ED25519-2026</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={onOpenAudit}
            >
              <span>Inspect Immutable Ledger </span>
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
            number={pendingCount} 
            label="Pending Transcripts" 
            meta="Queue awaiting digital signature"
          />
          <StatTile 
            number={approvedCompaniesCount} 
            label="Vetted Employers" 
            meta="Corporate recruiters verified"
          />
          <StatTile 
            number={verifiedCount} 
            label="Signed Transcripts" 
            meta="Tamper-evident badges issued"
          />
          <StatTile 
            number="42 Blocks" 
            label="Audit Ledger Depth" 
            meta="SHA-256 immutable history"
          />
        </div>

        {/* Activity 2 Banner: Placement Officer Role Context */}
        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '16px 20px', marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="label-caps" style={{ color: 'var(--pine)' }}>Activity 2 Functional Mode</span>
              <StatusChip variant="mint">Role 2 of 2 Active</StatusChip>
            </div>
            <p className="body-sm" style={{ marginTop: '4px' }}>
              Authenticated as <strong>Role 2: University Placement Officer</strong>. 
              You possess high-integrity cryptographic authority to sign student academic transcripts, audit employers, and monitor security telemetry.
            </p>
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-muted)' }}>
            Session: <span className="mono-meta">placement.officer@nu.edu.pk</span>
          </div>
        </div>

        {/* SECTION 1: Role-Restricted Function: Institutional Transcript Verification Console (Part 7) */}
        <div className="card-base" style={{ padding: '28px 32px', marginBottom: '32px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '8px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="label-caps" style={{ color: 'var(--emerald)' }}>Part 7 — Role-Restricted Function</span>
                <StatusChip variant="mint">Authorized Privilege: Placement Officer</StatusChip>
              </div>
              <h2 className="title-card" style={{ marginTop: '4px' }}>
                Cryptographic Transcript Signing &amp; Verification Console
              </h2>
            </div>

            {/* Search Queue */}
            <div style={{ position: 'relative', width: '220px' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-muted)' }} />
              <input
                type="text"
                className="input-text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search candidate queue..."
                style={{ paddingLeft: '32px', height: '34px', fontSize: 'var(--text-xs)' }}
              />
            </div>
          </div>

          <p className="body-sm" style={{ maxWidth: '780px', marginBottom: '20px' }}>
            <strong>Security Specification:</strong> This function <code>issueCryptographicTranscriptSignature()</code> enforces 
            <strong> Separation of Duties</strong>. Students cannot self-attest records; only Placement Officers can compute and commit 
            institutional HMAC/SHA-256 digests into candidate records.
          </p>

          {/* Transcript Verification Table */}
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <table className="editorial-table">
              <thead>
                <tr>
                  <th style={{ paddingLeft: '16px' }}>Student Name &amp; Roll No</th>
                  <th>Degree Program</th>
                  <th>Official CGPA</th>
                  <th>Academic Context</th>
                  <th>Verification Status</th>
                  <th className="text-right" style={{ paddingRight: '16px' }}>Signing Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredQueue.map(student => (
                  <tr key={student.id}>
                    <td style={{ paddingLeft: '16px' }}>
                      <div style={{ fontWeight: 600, color: 'var(--ink)' }}>{student.name}</div>
                      <div className="mono-meta" style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-muted)' }}>{student.rollNo}</div>
                    </td>
                    <td style={{ fontSize: 'var(--text-xs)', color: 'var(--ink)' }}>
                      {student.degree}
                    </td>
                    <td>
                      <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{student.cgpa}</span>
                      <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}> / 4.00</span>
                    </td>
                    <td style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-muted)', maxWidth: '240px' }}>
                      {student.academicNotes}
                    </td>
                    <td>
                      {student.status === 'verified' ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <StatusChip variant="mint">
                            <CheckCircle2 size={12} /> Verified &amp; Signed
                          </StatusChip>
                          {student.auditId && (
                            <span className="mono-meta" style={{ fontSize: '10px', color: 'var(--emerald)' }}>
                              Digest: {student.auditId}
                            </span>
                          )}
                        </div>
                      ) : (
                        <StatusChip variant="saffron">
                          <Clock size={12} /> Awaiting Signature
                        </StatusChip>
                      )}
                    </td>
                    <td className="text-right" style={{ paddingRight: '16px' }}>
                      {student.status === 'pending' ? (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleSignTranscript(student)}
                          disabled={signingStudentId === student.id}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                        >
                          <Key size={13} />
                          <span>{signingStudentId === student.id ? 'Signing...' : 'Sign Transcript'}</span>
                        </button>
                      ) : (
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={onOpenAudit}
                          style={{ fontSize: '11px', padding: '4px 8px' }}
                        >
                          View Signature
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        {/* SECTION 2: Corporate Employer Vetting & Job Opportunity Security Review */}
        <div className="card-base" style={{ padding: '28px 32px', marginBottom: '32px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '8px' }}>
            <div>
              <span className="label-caps">Function 2: Corporate Partner Authorization</span>
              <h2 className="title-card" style={{ marginTop: '2px' }}>
                Corporate Recruiter Credential Vetting
              </h2>
            </div>
            <StatusChip variant="neutral">Institutional Partner Registry</StatusChip>
          </div>

          <p className="body-sm" style={{ maxWidth: '780px', marginBottom: '20px' }}>
            Prevent predatory recruiting and credential harvesting. Placement Officers review corporate registration, 
            internship stipend fair-wage policies, and NDAs before companies can post positions to students.
          </p>

          <div style={{ width: '100%', overflowX: 'auto' }}>
            <table className="editorial-table">
              <thead>
                <tr>
                  <th style={{ paddingLeft: '16px' }}>Company Name</th>
                  <th>Industry Domain</th>
                  <th>Active Postings</th>
                  <th>Compliance Score</th>
                  <th>Authorization Status</th>
                  <th className="text-right" style={{ paddingRight: '16px' }}>Vetting Action</th>
                </tr>
              </thead>
              <tbody>
                {companyList.map(comp => (
                  <tr key={comp.id}>
                    <td style={{ paddingLeft: '16px' }}>
                      <div style={{ fontWeight: 600, color: 'var(--ink)' }}>{comp.name}</div>
                      <div className="mono-meta" style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>{comp.auditDigest}</div>
                    </td>
                    <td style={{ fontSize: 'var(--text-xs)', color: 'var(--ink)' }}>
                      {comp.domain}
                    </td>
                    <td style={{ fontSize: 'var(--text-xs)' }}>
                      {comp.internships} position(s)
                    </td>
                    <td style={{ fontSize: 'var(--text-xs)', color: comp.slaCompliance === '100%' ? 'var(--emerald)' : 'var(--ink)' }}>
                      {comp.slaCompliance}
                    </td>
                    <td>
                      {comp.status === 'approved' && <StatusChip variant="mint">Approved Partner</StatusChip>}
                      {comp.status === 'pending_review' && <StatusChip variant="saffron">Pending Review</StatusChip>}
                      {comp.status === 'revoked' && <StatusChip variant="danger">Revoked / Suspended</StatusChip>}
                    </td>
                    <td className="text-right" style={{ paddingRight: '16px' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleToggleCompany(comp.id)}
                        style={{
                          fontSize: '11px',
                          color: comp.status === 'approved' ? 'var(--danger)' : 'var(--emerald)',
                          borderColor: comp.status === 'approved' ? 'rgba(194, 65, 59, 0.3)' : 'var(--emerald)'
                        }}
                      >
                        {comp.status === 'approved' ? 'Revoke Access' : 'Approve Partner'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        {/* SECTION 3: Security-Aware Data Display for Placement Officer (Part 8) */}
        <div className="card-base" style={{ padding: '24px 28px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
            <div>
              <span className="label-caps" style={{ color: 'var(--pine)' }}>Part 8 — Security-Aware Data Display: Officer Boundary</span>
              <h2 className="title-card" style={{ marginTop: '2px' }}>
                Least Privilege Data Segregation for Staff
              </h2>
            </div>
            <StatusChip variant="mint">Institutional Scope Defined</StatusChip>
          </div>

          <p className="body-sm" style={{ marginBottom: '18px' }}>
            <strong>Security Principle Applied:</strong> Need-to-Know &amp; Principle of Least Privilege. 
            While the Placement Officer has legitimate institutional authority to inspect student grades and compute transcript hashes, 
            private recruiter commercial interview chats and candidate personal bank details remain masked from university staff.
          </p>

          <div style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              
              <div>
                <span className="label-caps" style={{ display: 'block', marginBottom: '4px' }}>Academic Records (Officer Scope)</span>
                <span className="mono-meta" style={{ fontSize: 'var(--text-xs)', color: 'var(--emerald)', display: 'block' }}>
                  FULL ACCESS: CGPA, Credits, Transcripts
                </span>
                <div style={{ fontSize: '11px', color: 'var(--ink-muted)', marginTop: '4px' }}>
                  Legitimately required to verify graduating students and sign credentials.
                </div>
              </div>

              <div>
                <span className="label-caps" style={{ display: 'block', marginBottom: '4px' }}>Recruiter Negotiation Chats</span>
                <span className="mono-meta" style={{ fontSize: 'var(--text-xs)', color: 'var(--danger)', display: 'block' }}>
                  RESTRICTED / CONCEALED
                </span>
                <div style={{ fontSize: '11px', color: 'var(--ink-muted)', marginTop: '4px' }}>
                  Preserves candidate privacy during corporate salary discussions.
                </div>
              </div>

              <div>
                <span className="label-caps" style={{ display: 'block', marginBottom: '4px' }}>Staff Verification Trace</span>
                <span className="mono-meta" style={{ fontSize: 'var(--text-xs)', color: 'var(--ink)', display: 'block' }}>
                  AUDIT ID: PO-FAST-092 (Logged)
                </span>
                <div style={{ fontSize: '11px', color: 'var(--ink-muted)', marginTop: '4px' }}>
                  All transcript lookups are recorded in the university registrar audit ledger.
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* SECTION 4: Function 3: Institutional Security & Audit Ledger Feed */}
        <div className="card-base" style={{ padding: '24px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
            <div>
              <span className="label-caps">Function 3: Institutional Audit Log</span>
              <h2 className="title-card" style={{ marginTop: '2px' }}>
                Tamper-Evident Security Telemetry
              </h2>
            </div>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={onOpenAudit}
            >
              Open Full Cryptographic Drawer
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              {
                event: 'TRANSCRIPT_DIGEST_ANCHORED',
                actor: 'Dr. Tariq Mahmood (Placement Officer)',
                digest: '0x8F22A',
                time: '2026-09-30 16:42:10 PKT',
                status: 'Committed to ledger'
              },
              {
                event: 'DATA_MINIMIZATION_MASK_ENFORCED',
                actor: 'SafeHire Security Guardrail',
                digest: '0xDM-MASK-001',
                time: '2026-10-05 11:20:04 PKT',
                status: 'PII concealed'
              },
              {
                event: 'RBAC_SECURITY_BOUNDARY_TEST',
                actor: 'System Policy Guardrail',
                digest: '0xRBAC-RULE-07',
                time: '2026-10-05 12:05:15 PKT',
                status: 'Least privilege active'
              },
              {
                event: 'PROMPT_INJECTION_DEFENSE_TRIGGERED',
                actor: 'AST Tokenizer Guardrail',
                digest: '0xINJ-BLOCKED-91',
                time: '2026-10-05 12:30:22 PKT',
                status: 'Hostile input intercepted'
              }
            ].map((log, idx) => (
              <div 
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  padding: '12px 14px',
                  backgroundColor: 'var(--surface-2)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'var(--text-xs)',
                  border: '1px solid var(--line)'
                }}
              >
                <div>
                  <span className="mono-meta" style={{ fontWeight: 600, color: 'var(--ink)' }}>{log.event}</span>
                  <span style={{ color: 'var(--ink-muted)', marginLeft: '8px' }}>by {log.actor}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="mono-meta" style={{ color: 'var(--emerald)' }}>{log.digest}</span>
                  <span style={{ color: 'var(--ink-muted)' }}>{log.time}</span>
                  <StatusChip variant="mint">{log.status}</StatusChip>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
