import React from 'react';
import { ShieldAlert, X, AlertTriangle, Lock } from 'lucide-react';

export default function AccessDeniedModal({ isOpen, onClose, violationDetails }) {
  if (!isOpen) return null;

  const {
    action = 'issueCryptographicTranscriptSignature',
    requiredRole = 'Placement Officer',
    currentRole = 'Student Job Seeker',
    actor = 'Muhammad Umar Afzaal',
    securityConcept = 'Separation of Duties & Least Privilege (PoLP)',
    reason = 'The requested operation requires institutional signing authority. Students are prohibited from generating academic verification digests or self-attesting university records.'
  } = violationDetails || {};

  return (
    <div className="drawer-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="drawer-panel" 
        onClick={(e) => e.stopPropagation()} 
        style={{ 
          maxWidth: '560px', 
          borderColor: 'var(--danger)', 
          boxShadow: '0 8px 30px rgba(194, 65, 59, 0.15)' 
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: 'var(--radius-md)', 
              backgroundColor: 'var(--danger-soft)', 
              color: 'var(--danger)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <ShieldAlert size={22} strokeWidth={1.75} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="label-caps" style={{ color: 'var(--danger)', fontWeight: 700 }}>
                  Security Guardrail: 403 Forbidden
                </span>
              </div>
              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--ink)', margin: '2px 0 0' }}>
                Access Denied: Restricted Operation
              </h2>
            </div>
          </div>

          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--ink-muted)', cursor: 'pointer', padding: '4px' }}
            aria-label="Close dialog"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Security Details Container */}
        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          <div style={{ backgroundColor: 'var(--danger-soft)', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(194, 65, 59, 0.3)', fontSize: 'var(--text-sm)', color: '#821D18' }}>
            <strong>Policy Violation:</strong> Unauthorized role attempted restricted functional invocation.
          </div>

          {/* Audit Info Table */}
          <div style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: 'var(--radius-md)', padding: '14px 16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: '8px 12px', fontSize: 'var(--text-xs)' }}>
              
              <span className="label-caps">Attempted Action</span>
              <span className="mono-meta" style={{ color: 'var(--danger)', fontWeight: 600 }}>
                {action}()
              </span>

              <span className="label-caps">Authorized Role</span>
              <span style={{ fontWeight: 600, color: 'var(--emerald)' }}>
                {requiredRole}
              </span>

              <span className="label-caps">Active Principal</span>
              <span style={{ color: 'var(--ink)' }}>
                {actor} (<span className="mono-meta">{currentRole}</span>)
              </span>

              <span className="label-caps">Security Control</span>
              <span style={{ color: 'var(--ink)' }}>
                {securityConcept}
              </span>

              <span className="label-caps">Audit Event ID</span>
              <span className="mono-meta" style={{ color: 'var(--ink)' }}>
                0xSEC-ERR-{Math.floor(100000 + Math.random() * 900000).toString(16).toUpperCase()}
              </span>

            </div>
          </div>

          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-muted)', lineHeight: 1.5 }}>
            <strong style={{ color: 'var(--ink)' }}>Defensive Rationale:</strong> {reason}
          </div>

          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-muted)', backgroundColor: 'var(--surface)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--line)' }}>
            <span style={{ fontWeight: 600, color: 'var(--ink)' }}>Audit Trail Notice: </span>
            This unauthorized access attempt has been permanently logged to the SafeHire immutable ledger for administrative review.
          </div>

        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
          <button 
            type="button" 
            className="btn btn-secondary btn-sm"
            onClick={onClose}
          >
            Acknowledge &amp; Dismiss
          </button>
        </div>

      </div>
    </div>
  );
}
