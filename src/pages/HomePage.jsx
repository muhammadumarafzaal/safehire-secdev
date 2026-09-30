import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import StatusChip from '../components/StatusChip';

export default function HomePage({ setCurrentPage, onOpenAudit }) {
  return (
    <div style={{ paddingBottom: '64px' }}>
      
      {/* Editorial Hero */}
      <section style={{ paddingTop: '64px', paddingBottom: '48px', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          
          <div style={{ maxWidth: '780px' }}>
            <div className="label-caps" style={{ marginBottom: '16px', color: 'var(--emerald)' }}>
              Verified Recruitment Platform
            </div>

            <h1 className="title-display" style={{ marginBottom: '20px', color: 'var(--ink)' }}>
              Verified credentials and privacy-preserving student recruitment.
            </h1>

            <p className="body-text" style={{ fontSize: '18px', maxWidth: '680px', marginBottom: '32px' }}>
              SafeHire provides verified academic credentials from university placement offices, 
              protects student contact information through strict data minimization, 
              and inspects resume text for prompt injection attempts before matching models run.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button 
                className="btn btn-primary"
                onClick={() => setCurrentPage('dashboard')}
              >
                <span>Open Student Portal</span>
                <ArrowRight size={16} strokeWidth={1.5} />
              </button>
              
              <button 
                className="btn btn-secondary"
                onClick={() => setCurrentPage('login')}
              >
                Sign In by Role
              </button>
            </div>
          </div>

          {/* Quiet Metric Summary Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--line)' }}>
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
          </div>

        </div>
      </section>

      {/* Core Controls Section (Replaces buzzword "Pillars") */}
      <section style={{ padding: '48px 0' }}>
        <div className="container">
          
          <div style={{ marginBottom: '32px' }}>
            <div className="label-caps" style={{ marginBottom: '6px' }}>System Controls</div>
            <h2 className="title-page">How verification and privacy operate</h2>
            <p className="body-sm" style={{ marginTop: '4px' }}>
              Built according to least privilege, fail-safe defaults, and untrusted input defense.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            
            {/* Control 1 */}
            <div className="card-base">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <span className="label-caps">Credential Integrity</span>
                <StatusChip variant="mint">Verified</StatusChip>
              </div>
              <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: '8px', color: 'var(--ink)' }}>
                Placement Officer Signatures
              </h3>
              <p className="body-sm" style={{ marginBottom: '16px' }}>
                University placement officers digitally sign academic claims and CGPA records. Recruiters verify candidate qualifications directly against institutional digests.
              </p>
              <button 
                onClick={onOpenAudit}
                style={{ background: 'none', border: 'none', color: 'var(--emerald)', fontSize: 'var(--text-xs)', fontWeight: 500, padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                Inspect sample audit record &rarr;
              </button>
            </div>

            {/* Control 2 */}
            <div className="card-base">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <span className="label-caps">Data Minimization</span>
                <StatusChip variant="mint">Enforced</StatusChip>
              </div>
              <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: '8px', color: 'var(--ink)' }}>
                Selective Contact Disclosure
              </h3>
              <p className="body-sm" style={{ marginBottom: '16px' }}>
                Student contact fields (phone, email, home address, CNIC) remain masked from recruiters during initial review. Details unlock only after an interview offer is mutually accepted.
              </p>
              <span className="body-sm" style={{ color: 'var(--ink-muted)', fontSize: 'var(--text-xs)' }}>
                Prevents unauthorized candidate harvesting.
              </span>
            </div>

            {/* Control 3 */}
            <div className="card-base">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <span className="label-caps">Untrusted Input Defense</span>
                <StatusChip variant="saffron">Pre-Filter</StatusChip>
              </div>
              <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: '8px', color: 'var(--ink)' }}>
                Adversarial Prompt Inspection
              </h3>
              <p className="body-sm" style={{ marginBottom: '16px' }}>
                All user-submitted resumes and application notes are treated as untrusted inputs. Texts are screened for instruction overrides before any matching language model evaluates the application.
              </p>
              <span className="body-sm" style={{ color: 'var(--ink-muted)', fontSize: 'var(--text-xs)' }}>
                Defense against indirect prompt injection.
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* Primary Lifecycle Card Summary */}
      <section style={{ padding: '0 0 48px' }}>
        <div className="container">
          <div className="card-base" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
              <div>
                <span className="label-caps">Core Workflow</span>
                <h3 className="title-page" style={{ marginTop: '4px' }}>
                  The 4-stage contact authorization lifecycle
                </h3>
              </div>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => setCurrentPage('dashboard')}
              >
                Test in Student Portal &rarr;
              </button>
            </div>

            <p className="body-sm" style={{ maxWidth: '640px', marginBottom: '24px' }}>
              The application state machine governs the boundary between candidate evaluation and personal identity disclosure.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
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
