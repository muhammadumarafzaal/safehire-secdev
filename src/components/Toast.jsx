import React from 'react';
import { X, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export default function Toast({ toasts, removeToast }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="quiet-toast-stack" id="toast-container">
      {toasts.map(toast => {
        let icon = <Info size={16} color="var(--ink-muted)" strokeWidth={1.5} />;
        if (toast.type === 'success') {
          icon = <CheckCircle2 size={16} color="var(--emerald)" strokeWidth={1.5} />;
        } else if (toast.type === 'warning') {
          icon = <AlertTriangle size={16} color="var(--saffron-text)" strokeWidth={1.5} />;
        }

        return (
          <div key={toast.id} className="quiet-toast">
            <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>
            <span style={{ flex: 1, fontSize: 'var(--text-sm)', color: 'var(--ink)' }}>{toast.message}</span>
            <button 
              onClick={() => removeToast(toast.id)}
              style={{ background: 'none', border: 'none', color: 'var(--ink-muted)', cursor: 'pointer', padding: '2px', display: 'flex' }}
              aria-label="Dismiss alert"
            >
              <X size={14} strokeWidth={1.5} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
