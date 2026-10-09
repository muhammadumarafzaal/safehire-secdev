import React from 'react';
import { ArrowRight, CheckCircle2, Shield, UserCheck, Key, Lock } from 'lucide-react';
import StatusChip from '../components/StatusChip';

export default function HomePage({ setCurrentPage, onOpenAudit, user, opportunitiesCount = 6 }) {
  const isOfficer = user?.role === 'Placement Officer';

  return (
    <div style={{ paddingBottom: '64px' }}>
      
      {/* Editorial Hero */}
      <section style={{ paddingTop: '56px', paddingBottom: '48px', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          
          <div style={{ maxWidth: '840px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <span className="label-caps" style={{ color: 'var(--emerald)' }}>
                SSD Activity 3: Parallel Module Integration
              </span>
              <StatusChip variant="mint">2 Functional Modules Integrated</StatusChip>
              <StatusChip variant="saffron">{opportunitiesCount} Active Requisitions</StatusChip>
            </div>

            <h1 className="title-display" style={{ marginBottom: '20px', color: 'var(--ink)' }}>
              Verified credentials and integrated recruitment modules.
            </h1>

            <p className="body-text" style={{ fontSize: '18px', maxWidth: '740px', marginBottom: '28px' }}>
              SafeHire unites two parallel functional modules: <strong>Module 1 (Post Verified Opportunity)</strong> engineered by Muhammad Umar Afzaal (23F-3106), and <strong>Module 2 (Browse &amp; Search Opportunities)</strong> engineered by Musa Rehan (23F-3093), bound by shared application state and cryptographic verification proof.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button 
                className="btn btn-primary"
                onClick={() => setCurrentPage('browse-jobs')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <span>Browse Catalog (Module 2)</span>
                <ArrowRight size={16} strokeWidth={1.5} />
              </button>

              <button 
                className="btn btn-secondary"
                onClick={() => setCurrentPage('post-job')}
              >
                Post Opportunity (Module 1)
              </button>
              
              <button 
                className="btn btn-secondary"
                onClick={() => setCurrentPage('dashboard')}
              >
                {isOfficer ? 'Placement Console' : 'Student Portal'}
              </button>

              <button 
                className="btn btn-secondary"
                onClick={onOpenAudit}
                style={{ color: 'var(--emerald)', borderColor: 'var(--emerald)' }}
              >
                Audit Ledger (0x8F22A)
              </button>
            </div>
          </div>

          {/* Activity 3 Parallel Modules Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginTop: '36px', paddingTop: '24px', borderTop: '1px solid var(--line)' }}>
            
            <div style={{ backgroundColor: 'var(--surface)', padding: '22px', borderRadius: 'var(--radius-md)', border: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span className="label-caps" style={{ color: 'var(--emerald)' }}>Module 1 (Member 1)</span>
                <StatusChip variant="mint">Umar Afzaal (23F-3106)</StatusChip>
              </div>
              <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--ink)' }}>
                Post Verified Opportunity
              </h3>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-muted)', marginTop: '8px', lineHeight: 1.5, marginBottom: '16px' }}>
                • Enterprise requisition submission with strict input validation<br/>
                • Anti-XSS sanitization against malicious payload injection<br/>
                • Computes cryptographic verification digest (<code>0xVER-...</code>)<br/>
                • Immediate live feed display of newly posted positions
              </p>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => setCurrentPage('post-job')}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Launch Module 1 Requisition Form &rarr;
              </button>
            </div>

            <div style={{ backgroundColor: 'var(--surface)', padding: '22px', borderRadius: 'var(--radius-md)', border: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span className="label-caps" style={{ color: 'var(--pine)' }}>Module 2 (Member 2)</span>
                <StatusChip variant="neutral">Musa Rehan (23F-3093)</StatusChip>
              </div>
              <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--ink)' }}>
                Browse &amp; Search Opportunities
              </h3>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-muted)', marginTop: '8px', lineHeight: 1.5, marginBottom: '16px' }}>
                • Dynamic search engine with query sanitization &amp; length guardrail<br/>
                • Multi-facet filtering by domain, work mode, and Fair-Stipend SLA<br/>
                • Cryptographic verification proof inspection modal<br/>
                • Reactive result counter and bookmark state machine
              </p>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => setCurrentPage('browse-jobs')}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Launch Module 2 Explorer &rarr;
              </button>
            </div>

          </div>

          {/* Activity 2 Role Switch Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '20px' }}>
            
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
