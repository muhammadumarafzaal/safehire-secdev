import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import StatusChip from './StatusChip';

export default function AuditDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '620px' }}>
        
        {/* Drawer Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid var(--line)', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--ink)' }}>
              Audit Log Record: 0x8F22A
            </h3>
            <p className="body-sm" style={{ marginTop: '2px' }}>
              Immutable credential verification entry recorded by university placement office.
            </p>
          </div>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--ink-muted)', cursor: 'pointer', padding: '4px' }}
            aria-label="Close record"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Audit Meta Table */}
        <div style={{ backgroundColor: 'var(--surface-2)', borderRadius: 'var(--radius-md)', padding: '16px', marginBottom: '20px', border: '1px solid var(--line)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '10px 16px', fontSize: 'var(--text-sm)' }}>
            <span className="label-caps">Timestamp</span>
            <span className="mono-meta">2026-09-30 16:42:10 PKT</span>

            <span className="label-caps">Actor</span>
            <span style={{ color: 'var(--ink)' }}>Dr. Tariq Mahmood (Placement Officer, FAST-NUCES)</span>

            <span className="label-caps">Action</span>
            <span style={{ color: 'var(--ink)' }}>VERIFY_TRANSCRIPT_AND_ISSUE_BADGE</span>

            <span className="label-caps">Candidate</span>
            <span style={{ color: 'var(--ink)' }}>Muhammad Umar Afzaal <span className="mono-meta">#23F-3106</span></span>

            <span className="label-caps">Status</span>
            <div>
              <StatusChip variant="mint">
                <CheckCircle2 size={13} /> Verified by University
              </StatusChip>
            </div>
          </div>
        </div>

        {/* Cryptographic Digests */}
        <div style={{ marginBottom: '20px' }}>
          <span className="label-caps" style={{ display: 'block', marginBottom: '8px' }}>Cryptographic Proofs</span>
          
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-md)', padding: '12px 14px', marginBottom: '10px' }}>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-muted)', marginBottom: '4px' }}>Transcript Document SHA-256 Digest</div>
            <div className="mono-meta" style={{ color: 'var(--ink)', wordBreak: 'break-all' }}>
              8f3ac829910debe7432b49b924523bfd8c02e1b93f18a29e4726e643bb2a013c
            </div>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-md)', padding: '12px 14px' }}>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-muted)', marginBottom: '4px' }}>Previous Block Hash</div>
            <div className="mono-meta" style={{ color: 'var(--ink)', wordBreak: 'break-all' }}>
              0x7b19a0224ffc91b8a531e2d786bb9f1a0e88941cbfa098234125e1a47819bc2a
            </div>
          </div>
        </div>

        {/* Official Academic Summary */}
        <div style={{ borderTop: '1px solid var(--line)', paddingTop: '16px', marginBottom: '24px' }}>
          <span className="label-caps" style={{ display: 'block', marginBottom: '10px' }}>Verified Record Contents</span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--line)', fontSize: 'var(--text-sm)' }}>
            <span style={{ color: 'var(--ink-muted)' }}>Official CGPA</span>
            <span style={{ fontWeight: 600, color: 'var(--ink)' }}>3.78 / 4.00</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--line)', fontSize: 'var(--text-sm)' }}>
            <span style={{ color: 'var(--ink-muted)' }}>Degree Program</span>
            <span style={{ color: 'var(--ink)' }}>BS Computer Science (Final Year)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', fontSize: 'var(--text-sm)' }}>
            <span style={{ color: 'var(--ink-muted)' }}>Institution</span>
            <span style={{ color: 'var(--ink)' }}>FAST-NUCES, Lahore Campus</span>
          </div>
        </div>

        {/* Drawer Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            Close Record
          </button>
        </div>

      </div>
    </div>
  );
}
