import React from 'react';

export default function Footer({ setCurrentPage }) {
  return (
    <footer style={{ backgroundColor: 'var(--paper)', borderTop: '1px solid var(--line)', marginTop: 'auto', padding: '40px 0 32px' }}>
      <div className="container">
        
        {/* Top row */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '32px', marginBottom: '32px' }}>
          
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <img src="/safehire-icon.svg" alt="SafeHire" style={{ width: '20px', height: '22px' }} />
              <span style={{ fontWeight: 600, fontSize: 'var(--text-base)', color: 'var(--ink)' }}>SafeHire</span>
            </div>
            <p className="body-sm" style={{ maxWidth: '380px' }}>
              Verified credential and skill-matching recruitment portal engineered with academic digital signatures, data minimization, and untrusted input defense.
            </p>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-muted)', marginTop: '12px' }}>
              National University of Computer &amp; Emerging Sciences (FAST-NUCES), Lahore Campus.
            </div>
          </div>

          <div>
            <div className="label-caps" style={{ marginBottom: '12px' }}>Navigation</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                <button 
                  onClick={() => setCurrentPage('home')}
                  style={{ background: 'none', border: 'none', color: 'var(--ink)', fontSize: 'var(--text-sm)', cursor: 'pointer', padding: 0 }}
                >
                  Overview
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('browse-jobs')}
                  style={{ background: 'none', border: 'none', color: 'var(--ink)', fontSize: 'var(--text-sm)', cursor: 'pointer', padding: 0 }}
                >
                  Browse Catalog (Module 2)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('post-job')}
                  style={{ background: 'none', border: 'none', color: 'var(--ink)', fontSize: 'var(--text-sm)', cursor: 'pointer', padding: 0 }}
                >
                  Post Requisition (Module 1)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('dashboard')}
                  style={{ background: 'none', border: 'none', color: 'var(--ink)', fontSize: 'var(--text-sm)', cursor: 'pointer', padding: 0 }}
                >
                  Role Dashboards
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('login')}
                  style={{ background: 'none', border: 'none', color: 'var(--ink)', fontSize: 'var(--text-sm)', cursor: 'pointer', padding: 0 }}
                >
                  Authentication
                </button>
              </li>
            </ul>
          </div>

          <div>
            <div className="label-caps" style={{ marginBottom: '12px' }}>Project Team</div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--ink)', lineHeight: 1.6 }}>
              <div>Muhammad Umar Afzaal <span className="mono-meta" style={{ color: 'var(--ink-muted)' }}>23F-3106</span></div>
              <div>Musa Rehan <span className="mono-meta" style={{ color: 'var(--ink-muted)' }}>23F-3093</span></div>
            </div>
          </div>

        </div>

        {/* Bottom row */}
        <div style={{ borderTop: '1px solid var(--line)', paddingTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', fontSize: 'var(--text-xs)', color: 'var(--ink-muted)' }}>
          <div>
            &copy; 2026 SafeHire. Secure Software Development (SSD) Semester Project Prototype.
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>WCAG AA Contrast Compliant</span>
            <span>Data Minimization Standard</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
