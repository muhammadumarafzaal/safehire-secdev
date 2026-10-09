import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PostOpportunityModule from './pages/PostOpportunityModule';
import BrowseOpportunitiesModule from './pages/BrowseOpportunitiesModule';
import AuditDrawer from './components/AuditDrawer';
import Toast from './components/Toast';
import { DEMO_USERS } from './data/demoUsers';
import { INITIAL_OPPORTUNITIES } from './data/opportunitiesData';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'login' | 'dashboard' | 'post-job' | 'browse-jobs'
  // Initial default: Student Job Seeker demo user (Muhammad Umar Afzaal)
  const [user, setUser] = useState(DEMO_USERS.student);
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Shared opportunities state across Module 1 and Module 2 (Part 4 Integration)
  const [opportunities, setOpportunities] = useState(INITIAL_OPPORTUNITIES);

  const handleAddOpportunity = (newJob) => {
    setOpportunities(prev => [newJob, ...prev]);
  };

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random().toString();
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Protected Route Check (Part 9 - Ensure protected dashboard cannot be viewed while logged out)
  useEffect(() => {
    if (currentPage === 'dashboard' && !user) {
      setCurrentPage('login');
      addToast('Protected View: Please sign in with a demo role to access the dashboard.', 'warning');
    }
  }, [currentPage, user]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('login');
    addToast('Signed out successfully. Session credentials purged.', 'info');
  };

  return (
    <div className="app-root">
      {/* Pine Navigation Bar with Module 1 & Module 2 Access */}
      <Navbar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        user={user}
        setUser={setUser}
        addToast={addToast}
      />

      {/* Main Pages */}
      {currentPage === 'home' && (
        <HomePage 
          setCurrentPage={setCurrentPage} 
          onOpenAudit={() => setIsAuditOpen(true)}
          user={user}
          opportunitiesCount={opportunities.length}
        />
      )}

      {currentPage === 'login' && (
        <LoginPage 
          setCurrentPage={setCurrentPage} 
          setUser={setUser}
          addToast={addToast}
        />
      )}

      {currentPage === 'dashboard' && (
        <DashboardPage 
          user={user}
          onOpenAudit={() => setIsAuditOpen(true)}
          onLogout={handleLogout}
          addToast={addToast}
          setCurrentPage={setCurrentPage}
          opportunities={opportunities}
        />
      )}

      {/* Module 1: Post Verified Opportunity (Muhammad Umar Afzaal - 23F-3106) */}
      {currentPage === 'post-job' && (
        <PostOpportunityModule 
          onAddOpportunity={handleAddOpportunity}
          recentPostings={opportunities}
          setCurrentPage={setCurrentPage}
          addToast={addToast}
          user={user}
        />
      )}

      {/* Module 2: Browse & Search Verified Opportunities (Musa Rehan - 23F-3093) */}
      {currentPage === 'browse-jobs' && (
        <BrowseOpportunitiesModule 
          opportunities={opportunities}
          setCurrentPage={setCurrentPage}
          addToast={addToast}
          user={user}
        />
      )}

      {/* Editorial Footer */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* Verifiable Audit Log Drawer (0x8F22A) */}
      <AuditDrawer 
        isOpen={isAuditOpen} 
        onClose={() => setIsAuditOpen(false)} 
      />

      {/* Quiet Toast Stack */}
      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
