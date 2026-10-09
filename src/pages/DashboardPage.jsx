import React from 'react';
import StudentDashboard from './StudentDashboard';
import OfficerDashboard from './OfficerDashboard';

export default function DashboardPage({ user, onOpenAudit, onLogout, addToast, setCurrentPage, opportunities = [] }) {
  // Defensive check: if unauthenticated, prompt redirect to login
  if (!user) {
    return (
      <div style={{ padding: '64px 0', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ maxWidth: '480px', textAlign: 'center' }}>
          <div className="card-base" style={{ padding: '36px' }}>
            <span className="label-caps" style={{ color: 'var(--danger)' }}>Access Guardrail</span>
            <h2 className="title-card" style={{ marginTop: '8px', marginBottom: '12px' }}>
              Authentication Required
            </h2>
            <p className="body-sm" style={{ marginBottom: '24px' }}>
              The protected dashboard cannot be accessed without an active session. Please sign in with one of the authorized demo roles.
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => setCurrentPage('login')}
              style={{ width: '100%' }}
            >
              Go to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Role 2: Placement Officer Dashboard
  if (user.role === 'Placement Officer') {
    return (
      <OfficerDashboard 
        user={user}
        onOpenAudit={onOpenAudit}
        onLogout={onLogout}
        addToast={addToast}
        setCurrentPage={setCurrentPage}
        opportunities={opportunities}
      />
    );
  }

  // Role 1: Student Job Seeker Dashboard (Default)
  return (
    <StudentDashboard 
      user={user}
      onOpenAudit={onOpenAudit}
      onLogout={onLogout}
      addToast={addToast}
      setCurrentPage={setCurrentPage}
      opportunities={opportunities}
    />
  );
}
