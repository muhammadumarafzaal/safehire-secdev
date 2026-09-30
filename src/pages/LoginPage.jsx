import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import StatusChip from '../components/StatusChip';

export default function LoginPage({ setCurrentPage, setUser, addToast }) {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('m.umar@nu.edu.pk');
  const [password, setPassword] = useState('SafeHire#2026!Sec');
  const [showPassword, setShowPassword] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(true);
  const [loading, setLoading] = useState(false);

  const roleConfig = {
    student: {
      name: 'Student Job Seeker',
      defaultEmail: 'm.umar@nu.edu.pk',
      notice: 'Student role: access verified academic credentials and review internship offers under active data minimization.'
    },
    recruiter: {
      name: 'Corporate Recruiter',
      defaultEmail: 'talent@systems-limited.com',
      notice: 'Recruiter role: review candidate match scores with masked contact details until an interview is mutually accepted.'
    },
    officer: {
      name: 'Placement Officer',
      defaultEmail: 'placement.officer@nu.edu.pk',
      notice: 'Officer role: authenticate institutional transcripts and issue cryptographic verification signatures.'
    },
    admin: {
      name: 'Platform Moderator',
      defaultEmail: 'security.moderator@safehire.internal',
      notice: 'Moderator role: review immutable audit logs, check company registrations, and monitor blocked injection alerts.'
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

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setEmail(roleConfig[newRole].defaultEmail);
  };

  const handleQuickFill = () => {
    setRole('student');
    setEmail('m.umar@nu.edu.pk');
    setPassword('SafeHire#2026!Sec');
    addToast('Loaded student demo credentials for Muhammad Umar Afzaal.', 'info');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      addToast('Please enter a valid institutional email address.', 'warning');
      return;
    }

    if (password.length < 6) {
      addToast('Password must be at least 6 characters.', 'warning');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setUser({
        name: role === 'student' ? 'Muhammad Umar Afzaal' : 'Demo Authorized User',
        rollNo: role === 'student' ? '23F-3106' : 'ADMIN-01',
        role: roleConfig[role].name,
        email: email,
        university: 'FAST-NUCES, Lahore'
      });
      addToast(`Authenticated as ${roleConfig[role].name}.`, 'success');
      setCurrentPage('dashboard');
    }, 700);
  };

  return (
    <main style={{ padding: '56px 0 72px' }}>
      <div className="container" style={{ maxWidth: '480px' }}>
        
        {/* Card */}
        <div className="card-base" style={{ padding: '32px' }}>
          
          <div style={{ marginBottom: '24px' }}>
            <span className="label-caps">Authentication</span>
            <h1 className="title-page" style={{ marginTop: '4px', marginBottom: '6px' }}>
              Sign in to SafeHire
            </h1>
            <p className="body-sm">
              Role-based access control with institutional credential verification.
            </p>
          </div>

          {/* Role Tabs */}
          <div style={{ marginBottom: '20px' }}>
            <label className="field-label">Select System Role</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', backgroundColor: 'var(--surface-2)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--line)' }}>
              {['student', 'recruiter', 'officer', 'admin'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleRoleChange(r)}
                  style={{
                    backgroundColor: role === r ? 'var(--surface)' : 'transparent',
                    color: role === r ? 'var(--ink)' : 'var(--ink-muted)',
                    fontWeight: role === r ? 600 : 500,
                    fontSize: 'var(--text-xs)',
                    padding: '8px 4px',
                    border: role === r ? '1px solid var(--line)' : '1px solid transparent',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    transition: 'all var(--transition)'
                  }}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Role Context Notice */}
          <div style={{ backgroundColor: 'var(--surface-2)', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--line)', marginBottom: '20px', fontSize: 'var(--text-xs)', color: 'var(--ink)' }}>
            <span style={{ fontWeight: 600 }}>{roleConfig[role].name}:</span> {roleConfig[role].notice}
          </div>

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
                placeholder={roleConfig[role].defaultEmail}
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
                  onClick={() => addToast('Password reset link sent to institutional registrar.', 'info')}
                  style={{ background: 'none', border: 'none', color: 'var(--emerald)', fontSize: 'var(--text-xs)', cursor: 'pointer', padding: 0 }}
                >
                  Reset password
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
                  Enable data minimization. Keep personal contact details masked from recruiters until an interview offer is mutually agreed upon.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ width: '100%' }}
            >
              {loading ? 'Authenticating...' : 'Sign In to Portal'}
            </button>
          </form>

          {/* Quick Demo Shortcut */}
          <div style={{ borderTop: '1px solid var(--line)', marginTop: '24px', paddingTop: '16px', textAlign: 'center' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleQuickFill}
              style={{ width: '100%' }}
            >
              Fill Demo Student Credentials (Umar Afzaal)
            </button>
          </div>

        </div>

        {/* Quiet Footnote */}
        <div style={{ textAlign: 'center', marginTop: '16px', fontSize: 'var(--text-xs)', color: 'var(--ink-muted)' }}>
          Rate limited to 5 attempts/min &bull; Salted hash storage &bull; FAST-NUCES IdP
        </div>

      </div>
    </main>
  );
}
