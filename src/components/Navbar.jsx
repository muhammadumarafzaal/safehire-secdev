import React from 'react';
import { UserCheck, LogOut, KeyRound, Shield } from 'lucide-react';

export default function Navbar({ currentPage, setCurrentPage, user, setUser, addToast }) {
  const handleLogout = () => {
    setUser(null);
    setCurrentPage('login');
    addToast('Signed out of session. Session state cleared.', 'info');
  };

  const isOfficer = user?.role === 'Placement Officer';

  return (
    <header className="app-nav" id="main-navbar">
      <div className="container nav-inner">
        
        {/* Brand Logo Left */}
        <div 
          className="nav-brand" 
          onClick={() => setCurrentPage('home')}
          title="SafeHire Home"
          style={{ cursor: 'pointer' }}
        >
          <img 
            src="/safehire-logo-light.svg" 
            alt="SafeHire" 
            style={{ height: '32px', width: 'auto', display: 'block' }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const fallback = document.getElementById('logo-fallback-text');
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <div id="logo-fallback-text" style={{ display: 'none', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 700, fontSize: '18px', color: '#F6F4EE', letterSpacing: '-0.02em' }}>
              Safe<span style={{ color: '#6EE7B7' }}>Hire</span>
            </span>
          </div>
        </div>

        {/* Links Center */}
        <nav aria-label="Main Navigation">
          <ul className="nav-links-row">
            <li>
              <button 
                className={`nav-item-btn ${currentPage === 'home' ? 'active' : ''}`}
                onClick={() => setCurrentPage('home')}
              >
                Overview
              </button>
            </li>
            
            {user ? (
              <li>
                <button 
                  className={`nav-item-btn ${currentPage === 'dashboard' ? 'active' : ''}`}
                  onClick={() => setCurrentPage('dashboard')}
                >
                  {isOfficer ? 'Officer Console' : 'Student Portal'}
                </button>
              </li>
            ) : null}

            <li>
              <button 
                className={`nav-item-btn ${currentPage === 'login' ? 'active' : ''}`}
                onClick={() => setCurrentPage('login')}
              >
                {user ? 'Switch Role' : 'Sign In'}
              </button>
            </li>
          </ul>
        </nav>

        {/* Actions Right */}
        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  backgroundColor: 'rgba(255, 255, 255, 0.08)', 
                  padding: '4px 8px', 
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'var(--text-xs)',
                  color: '#F6F4EE'
                }}
              >
                {isOfficer ? <Shield size={12} color="#E9A23B" /> : <UserCheck size={12} color="#6EE7B7" />}
                <span style={{ fontWeight: 600 }}>{isOfficer ? 'Officer' : 'Student'}</span>
                <span style={{ color: '#DDD9CC', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
                  ({user.rollNo || user.officerId || 'PO-FAST-092'})
                </span>
              </div>

              <button 
                className="btn btn-secondary btn-sm"
                onClick={handleLogout}
                style={{ 
                  backgroundColor: 'transparent', 
                  color: '#F6F4EE', 
                  borderColor: 'rgba(221, 217, 204, 0.3)',
                  padding: '5px 10px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
                title="Sign out of current session"
              >
                <LogOut size={13} strokeWidth={1.5} />
                <span className="hide-on-mobile-xs">Sign Out</span>
              </button>
            </div>
          ) : (
            <button 
              className="btn btn-sm"
              onClick={() => setCurrentPage('login')}
              style={{ backgroundColor: 'var(--saffron)', color: '#0E1A17', fontWeight: 600, border: 'none' }}
            >
              Sign In by Role
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
