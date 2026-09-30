import React from 'react';

export default function StatTile({ number, label, meta }) {
  return (
    <div className="card-base" style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.1 }}>
        {number}
      </div>
      <div className="label-caps" style={{ marginTop: '6px' }}>
        {label}
      </div>
      {meta && (
        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-muted)', marginTop: '4px' }}>
          {meta}
        </div>
      )}
    </div>
  );
}
