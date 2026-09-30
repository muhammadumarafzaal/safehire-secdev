import React from 'react';
import { UserCheck, LogOut } from 'lucide-react';

export default function Navbar({ currentPage, setCurrentPage, user, setUser, addToast }) {
  const handleLogout = () => {
    setUser(null);
    setCurrentPage('login');
    addToast('Signed out of session.', 'info');
  };

  return (
    <header className="app-nav" id="main-navbar">
      <div className="container nav-inner">
        
        {/* Brand Logo Left */}
        <div 
          className="nav-brand" 
          onClick={() => setCurrentPage('home')}
          title="SafeHire Home"
        >
          <img 
            src="/safehire-logo-light.svg" 
            alt="SafeHire" 
            style={{ height: '32px', width: 'auto', display: 'block' }}
            onError={(e) => {
              // Graceful fallback to inline SVG if image fails
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
            <li>
              <button 
                className={`nav-item-btn ${currentPage === 'dashboard' ? 'active' : ''}`}
                onClick={() => setCurrentPage('dashboard')}
              >
                Student Portal
              </button>
            </li>
            <li>
              <button 
                className={`nav-item-btn ${currentPage === 'login' ? 'active' : ''}`}
                onClick={() => setCurrentPage('login')}
              >
                Sign In
              </button>
            </li>
          </ul>
        </nav>

        {/* Actions Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {currentPage === 'dashboard' && user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: 'var(--text-xs)', color: '#DDD9CC', fontFamily: 'var(--font-mono)' }}>
                {user.rollNo || '23F-3106'}
              </span>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={handleLogout}
                style={{ backgroundColor: 'transparent', color: '#F6F4EE', borderColor: 'rgba(221, 217, 204, 0.3)' }}
                title="Sign out"
              >
                <LogOut size={14} strokeWidth={1.5} />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <button 
              className="btn btn-sm"
              onClick={() => setCurrentPage('dashboard')}
              style={{ backgroundColor: 'var(--saffron)', color: '#0E1A17', fontWeight: 600, border: 'none' }}
            >
              Demo Student Portal
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
