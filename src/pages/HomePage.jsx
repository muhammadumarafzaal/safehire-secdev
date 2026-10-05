import React from 'react';
import { ArrowRight, CheckCircle2, Shield, UserCheck, Key, Lock } from 'lucide-react';
import StatusChip from '../components/StatusChip';

export default function HomePage({ setCurrentPage, onOpenAudit, user }) {
  const isOfficer = user?.role === 'Placement Officer';

  return (
    <div style={{ paddingBottom: '64px' }}>
      
      {/* Editorial Hero */}
      <section style={{ paddingTop: '56px', paddingBottom: '48px', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          
          <div style={{ maxWidth: '820px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span className="label-caps" style={{ color: 'var(--emerald)' }}>
                SSD Activity 2: Role-Based Prototype
              </span>
              <StatusChip variant="mint">2 Functional Roles Active</StatusChip>
            </div>

            <h1 className="title-display" style={{ marginBottom: '20px', color: 'var(--ink)' }}>
              Verified credentials and role-segregated recruitment architecture.
            </h1>

            <p className="body-text" style={{ fontSize: '18px', maxWidth: '720px', marginBottom: '28px' }}>
              SafeHire implements strict Role-Based Access Control (RBAC). <strong>Role 1 (Student Job Seeker)</strong> controls personal PII under data minimization, while <strong>Role 2 (Placement Officer)</strong> possesses cryptographic signing keys to authenticate degree transcripts and audit corporate recruiters.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button 
                className="btn btn-primary"
                onClick={() => setCurrentPage('dashboard')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <span>{isOfficer ? 'Open Placement Officer Console' : 'Open Student Job Seeker Portal'}</span>
                <ArrowRight size={16} strokeWidth={1.5} />
              </button>
              
              <button 
                className="btn btn-secondary"
                onClick={() => setCurrentPage('login')}
              >
                Switch Role / Sign In
              </button>

              <button 
                className="btn btn-secondary"
                onClick={onOpenAudit}
                style={{ color: 'var(--emerald)', borderColor: 'var(--emerald)' }}
              >
                View Audit Ledger (0x8F22A)
              </button>
            </div>
          </div>

          {/* Activity 2 Role Switch Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '36px', paddingTop: '24px', borderTop: '1px solid var(--line)' }}>
            
            <div style={{ backgroundColor: 'var(--surface)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="label-caps" style={{ color: 'var(--emerald)' }}>Role 1</span>
                <StatusChip variant="mint">Applicant Scope</StatusChip>
              </div>
              <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--ink)' }}>
                Student Job Seeker (Muhammad Umar Afzaal)
              </h3>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-muted)', marginTop: '6px', lineHeight: 1.5 }}>
                • Inspect verified degree badges &amp; transcript checksum<br/>
                • Filter &amp; apply to jobs with prompt-injection defense<br/>
                • Enforce selective contact unlock under mutual consent
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--surface)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="label-caps" style={{ color: 'var(--pine)' }}>Role 2</span>
                <StatusChip variant="neutral">Administrative Authority</StatusChip>
              </div>
              <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--ink)' }}>
                Placement Officer (Dr. Tariq Mahmood)
              </h3>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-muted)', marginTop: '6px', lineHeight: 1.5 }}>
                • Review verification queue &amp; sign transcripts with SHA-256<br/>
                • Audit &amp; vet corporate recruiter partnerships<br/>
                • Inspect system-wide immutable telemetry ledger
              </p>
            </div>

          </div>

          {/* Metric Summary Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '24px' }}>
            <div>
              <div style={{ fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--ink)' }}>100%</div>
              <div className="label-caps" style={{ marginTop: '4px' }}>Placement Verified Transcripts</div>
            </div>
            <div>
              <div style={{ fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--ink)' }}>Zero-Leak</div>
              <div className="label-caps" style={{ marginTop: '4px' }}>Pre-Offer Contact Concealment</div>
            </div>
            <div>
              <div style={{ fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--ink)' }}>Pre-Filtered</div>
              <div className="label-caps" style={{ marginTop: '4px' }}>Untrusted Input Inspection</div>
            </div>
            <div>
              <div style={{ fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--ink)' }}>RBAC 403</div>
              <div className="label-caps" style={{ marginTop: '4px' }}>Role Boundary Guardrails</div>
            </div>
          </div>

        </div>
      </section>

      {/* Core Controls Section */}
      <section style={{ padding: '48px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <div style={{ marginBottom: '32px' }}>
            <span className="label-caps">Security-Aware Architecture</span>
            <h2 className="title-section" style={{ marginTop: '4px' }}>
              System Guardrails &amp; Security Controls
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            
            <div className="card-base" style={{ padding: '24px' }}>
              <div className="label-caps" style={{ color: 'var(--emerald)', marginBottom: '8px' }}>Control 01</div>
              <h3 className="title-card">Role-Based Access Control (RBAC)</h3>
              <p className="body-sm" style={{ marginTop: '8px' }}>
                Separation of Duties dictates that Students cannot self-certify academic records. Only authenticated Placement Officers possess the cryptographic private keys to sign degrees.
              </p>
              <div style={{ marginTop: '16px' }}>
                <StatusChip variant="mint">Separation of Duties</StatusChip>
              </div>
            </div>

            <div className="card-base" style={{ padding: '24px' }}>
              <div className="label-caps" style={{ color: 'var(--emerald)', marginBottom: '8px' }}>Control 02</div>
              <h3 className="title-card">Data Minimization &amp; PII Masking</h3>
              <p className="body-sm" style={{ marginTop: '8px' }}>
                Candidate personal phone numbers and CNICs remain strictly masked as <code>+92 3•• ••• ••21</code> until mutual consent is explicitly confirmed via a state transition.
              </p>
              <div style={{ marginTop: '16px' }}>
                <StatusChip variant="saffron">OWASP Minimization</StatusChip>
              </div>
            </div>

            <div className="card-base" style={{ padding: '24px' }}>
              <div className="label-caps" style={{ color: 'var(--emerald)', marginBottom: '8px' }}>Control 03</div>
              <h3 className="title-card">Untrusted Input Defense Scanner</h3>
              <p className="body-sm" style={{ marginTop: '8px' }}>
                Candidate notes and uploaded documents pass through an AST tokenizer to intercept prompt injection attempts (e.g. <em>"Ignore previous instructions"</em>) before LLMs evaluate matches.
              </p>
              <div style={{ marginTop: '16px' }}>
                <StatusChip variant="mint">Active Interception</StatusChip>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Lifecycle Flow Summary */}
      <section style={{ padding: '48px 0' }}>
        <div className="container">
          <div className="card-base" style={{ padding: '32px' }}>
            <div style={{ marginBottom: '24px' }}>
              <span className="label-caps">Access State Machine</span>
              <h2 className="title-card" style={{ marginTop: '4px' }}>
                Controlled 4-Stage Candidate Disclosure Lifecycle
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              <div style={{ backgroundColor: 'var(--surface-2)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--line)' }}>
                <div className="label-caps" style={{ color: 'var(--emerald)' }}>Stage 01</div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--ink)', marginTop: '4px' }}>Applied</div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-muted)', marginTop: '4px', margin: 0 }}>
                  Candidate submits verified credential bundle. PII is masked.
                </p>
              </div>

              <div style={{ backgroundColor: 'var(--surface-2)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--line)' }}>
                <div className="label-caps" style={{ color: 'var(--emerald)' }}>Stage 02</div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--ink)', marginTop: '4px' }}>Under Review</div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-muted)', marginTop: '4px', margin: 0 }}>
                  Recruiter reviews verified skills and model match percentage.
                </p>
              </div>

              <div style={{ backgroundColor: 'var(--surface-2)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--line)' }}>
                <div className="label-caps" style={{ color: 'var(--saffron-text)' }}>Stage 03</div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--ink)', marginTop: '4px' }}>Interview Offered</div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-muted)', marginTop: '4px', margin: 0 }}>
                  Recruiter requests interview. Student retains authorization control.
                </p>
              </div>

              <div style={{ backgroundColor: 'var(--surface-2)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--line)' }}>
                <div className="label-caps" style={{ color: 'var(--ink-muted)' }}>Stage 04</div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--ink)', marginTop: '4px' }}>Contact Revealed</div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-muted)', marginTop: '4px', margin: 0 }}>
                  Direct channel opens only after candidate clicks Accept.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
