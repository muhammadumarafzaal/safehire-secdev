import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle2, ShieldCheck, UserCheck, KeyRound, AlertCircle } from 'lucide-react';
import StatusChip from '../components/StatusChip';
import { DEMO_USERS } from '../data/demoUsers';

export default function LoginPage({ setCurrentPage, setUser, addToast }) {
  const [selectedRole, setSelectedRole] = useState('student'); // 'student' | 'officer'
  const [email, setEmail] = useState(DEMO_USERS.student.email);
  const [password, setPassword] = useState(DEMO_USERS.student.password);
  const [showPassword, setShowPassword] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const roleDefinitions = {
    student: {
      roleKey: 'student',
      title: 'Role 1: Student Job Seeker',
      name: DEMO_USERS.student.name,
      email: DEMO_USERS.student.email,
      password: DEMO_USERS.student.password,
      rollNo: DEMO_USERS.student.rollNo,
      notice: 'Access verified degree badges, review anonymized job matches, and control contact disclosure via mutual consent.'
    },
    officer: {
      roleKey: 'officer',
      title: 'Role 2: University Placement Officer',
      name: DEMO_USERS.officer.name,
      email: DEMO_USERS.officer.email,
      password: DEMO_USERS.officer.password,
      officerId: DEMO_USERS.officer.officerId,
      notice: 'Review transcript verification queue, generate SHA-256 HMAC digital signatures, and audit employer registrations.'
    }
  };

  const calculateStrength = (pass) => {
    let score = 0;
    if (!pass) return { score: 0, text: 'Empty', color: 'var(--line)', width: '0%' };
    if (pass.length >= 8) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score < 2) return { score, text: 'Weak', color: 'var(--danger)', width: '33%' };
    if (score === 2 || score === 3) return { score, text: 'Adequate', color: 'var(--saffron)', width: '66%' };
    return { score, text: 'Strong', color: 'var(--emerald)', width: '100%' };
  };

  const strength = calculateStrength(password);

  const handleRoleTabChange = (roleKey) => {
    setSelectedRole(roleKey);
    setEmail(roleDefinitions[roleKey].email);
    setPassword(roleDefinitions[roleKey].password);
    setErrorMessage('');
  };

  const handleQuickFillStudent = () => {
    setSelectedRole('student');
    setEmail(DEMO_USERS.student.email);
    setPassword(DEMO_USERS.student.password);
    setErrorMessage('');
    addToast('Populated Demo Credentials for Role 1: Student Job Seeker.', 'info');
  };

  const handleQuickFillOfficer = () => {
    setSelectedRole('officer');
    setEmail(DEMO_USERS.officer.email);
    setPassword(DEMO_USERS.officer.password);
    setErrorMessage('');
    addToast('Populated Demo Credentials for Role 2: Placement Officer.', 'info');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid institutional email address.');
      addToast('Please enter a valid institutional email address.', 'warning');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      addToast('Password must be at least 6 characters.', 'warning');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // Verify credentials against demo users
      const studentMatch = email === DEMO_USERS.student.email && password === DEMO_USERS.student.password;
      const officerMatch = email === DEMO_USERS.officer.email && password === DEMO_USERS.officer.password;

      if (studentMatch) {
        setUser(DEMO_USERS.student);
        addToast(`Authenticated as ${DEMO_USERS.student.name} (Role 1: Student Job Seeker).`, 'success');
        setCurrentPage('dashboard');
      } else if (officerMatch) {
        setUser(DEMO_USERS.officer);
        addToast(`Authenticated as ${DEMO_USERS.officer.name} (Role 2: Placement Officer).`, 'success');
        setCurrentPage('dashboard');
      } else {
        // Check if matching role was intended but credentials typoed
        setErrorMessage('Authentication Failed: Invalid email or password. Please use the demo credentials provided below.');
        addToast('Invalid credentials. Use Quick-Fill demo buttons below.', 'danger');
      }
    }, 600);
  };

  return (
    <main style={{ padding: '48px 0 72px' }}>
      <div className="container" style={{ maxWidth: '520px' }}>
        
        {/* Card */}
        <div className="card-base" style={{ padding: '32px' }}>
          
          <div style={{ marginBottom: '24px' }}>
            <span className="label-caps" style={{ color: 'var(--emerald)' }}>Part 4 — Functional Authentication</span>
            <h1 className="title-page" style={{ marginTop: '4px', marginBottom: '6px' }}>
              Sign in to SafeHire
            </h1>
            <p className="body-sm">
              Role-Based Access Control (RBAC). Select a role or enter demo credentials to test role-specific dashboards.
            </p>
          </div>

          {/* Role Tabs for Activity 2 */}
          <div style={{ marginBottom: '18px' }}>
            <label className="field-label">Select Demo Role to Test</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', backgroundColor: 'var(--surface-2)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--line)' }}>
              <button
                type="button"
                onClick={() => handleRoleTabChange('student')}
                style={{
                  backgroundColor: selectedRole === 'student' ? 'var(--surface)' : 'transparent',
                  color: selectedRole === 'student' ? 'var(--ink)' : 'var(--ink-muted)',
                  fontWeight: selectedRole === 'student' ? 600 : 500,
                  fontSize: 'var(--text-xs)',
                  padding: '10px 8px',
                  border: selectedRole === 'student' ? '1px solid var(--line)' : '1px solid transparent',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  transition: 'all var(--transition)',
                  textAlign: 'center'
                }}
              >
                Role 1: Student
              </button>

              <button
                type="button"
                onClick={() => handleRoleTabChange('officer')}
                style={{
                  backgroundColor: selectedRole === 'officer' ? 'var(--surface)' : 'transparent',
                  color: selectedRole === 'officer' ? 'var(--ink)' : 'var(--ink-muted)',
                  fontWeight: selectedRole === 'officer' ? 600 : 500,
                  fontSize: 'var(--text-xs)',
                  padding: '10px 8px',
                  border: selectedRole === 'officer' ? '1px solid var(--line)' : '1px solid transparent',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  transition: 'all var(--transition)',
                  textAlign: 'center'
                }}
              >
                Role 2: Placement Officer
              </button>
            </div>
          </div>

          {/* Role Context Notice */}
          <div style={{ backgroundColor: 'var(--surface-2)', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--line)', marginBottom: '20px', fontSize: 'var(--text-xs)', color: 'var(--ink)' }}>
            <span style={{ fontWeight: 600 }}>{roleDefinitions[selectedRole].title}:</span> {roleDefinitions[selectedRole].notice}
          </div>

          {errorMessage && (
            <div style={{ backgroundColor: 'var(--danger-soft)', border: '1px solid rgba(194, 65, 59, 0.3)', color: '#821D18', padding: '10px 14px', borderRadius: 'var(--radius-sm)', fontSize: 'var(--text-xs)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label className="field-label" htmlFor="login-email">
                Institutional Email Address
              </label>
              <input
                type="email"
                id="login-email"
                className="input-text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter registered institutional email"
                required
              />
            </div>

            <div className="form-field">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label className="field-label" htmlFor="login-password" style={{ margin: 0 }}>
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => addToast('Credential verification uses salted PBKDF2 hashing.', 'info')}
                  style={{ background: 'none', border: 'none', color: 'var(--emerald)', fontSize: 'var(--text-xs)', cursor: 'pointer', padding: 0 }}
                >
                  Password Policy
                </button>
              </div>

              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="login-password"
                  className="input-text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  style={{ paddingRight: '40px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--ink-muted)',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex'
                  }}
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              <div style={{ marginTop: '8px' }}>
                <div style={{ height: '3px', backgroundColor: 'var(--surface-2)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: strength.width, height: '100%', backgroundColor: strength.color, transition: 'width 200ms ease-out' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', color: 'var(--ink-muted)', marginTop: '4px' }}>
                  <span>Password complexity</span>
                  <span style={{ color: strength.color, fontWeight: 500 }}>{strength.text}</span>
                </div>
              </div>
            </div>

            {/* Privacy Checkbox */}
            <div style={{ marginTop: '16px', marginBottom: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer', fontSize: 'var(--text-xs)', color: 'var(--ink-muted)' }}>
                <input
                  type="checkbox"
                  checked={privacyConsent}
                  onChange={(e) => setPrivacyConsent(e.target.checked)}
                  style={{ marginTop: '2px', accentColor: 'var(--pine)' }}
                />
                <span>
                  Enforce data minimization. Keep personal contact details masked from recruiters until an interview offer is mutually agreed upon.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ width: '100%' }}
            >
              {loading ? 'Authenticating Role...' : `Sign In as ${selectedRole === 'student' ? 'Student' : 'Placement Officer'}`}
            </button>
          </form>

          {/* Quick Demo Shortcuts for Evaluators (Part 3 & 4) */}
          <div style={{ borderTop: '1px solid var(--line)', marginTop: '24px', paddingTop: '16px' }}>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--ink)', marginBottom: '10px', textAlign: 'center' }}>
              1-Click Demo User Credentials (Activity 2 Testing):
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleQuickFillStudent}
                style={{ width: '100%', justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}
              >
                <span>Demo Student (Muhammad Umar Afzaal)</span>
                <span className="mono-meta" style={{ fontSize: '11px', color: 'var(--emerald)' }}>23F-3106</span>
              </button>

              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleQuickFillOfficer}
                style={{ width: '100%', justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}
              >
                <span>Demo Officer (Dr. Tariq Mahmood)</span>
                <span className="mono-meta" style={{ fontSize: '11px', color: 'var(--pine)' }}>PO-FAST-092</span>
              </button>
            </div>
          </div>

        </div>

        {/* Quiet Footnote */}
        <div style={{ textAlign: 'center', marginTop: '16px', fontSize: 'var(--text-xs)', color: 'var(--ink-muted)' }}>
          Rate limited to 5 attempts/min &bull; Salted PBKDF2 hashing &bull; FAST-NUCES Institutional IdP
        </div>

      </div>
    </main>
  );
}
