import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AuditDrawer from './components/AuditDrawer';
import Toast from './components/Toast';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'login' | 'dashboard'
  const [user, setUser] = useState({
    name: 'Muhammad Umar Afzaal',
    rollNo: '23F-3106',
    role: 'Student Job Seeker',
    university: 'FAST-NUCES, Lahore',
    degree: 'BS Computer Science',
    cgpa: '3.78'
  });
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random().toString();
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="app-root">
      {/* 56px Solid Pine Navbar */}
      <Navbar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        user={user}
        setUser={setUser}
        addToast={addToast}
      />

      {/* Pages View */}
      {currentPage === 'home' && (
        <HomePage 
          setCurrentPage={setCurrentPage} 
          onOpenAudit={() => setIsAuditOpen(true)}
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
          addToast={addToast}
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
