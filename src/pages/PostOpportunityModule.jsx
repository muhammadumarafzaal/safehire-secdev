import React, { useState } from 'react';
import { 
  Briefcase, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Sparkles, 
  Send, 
  ArrowRight, 
  FileText, 
  DollarSign, 
  GraduationCap, 
  Layers, 
  Tag, 
  Eye, 
  Building2,
  RefreshCw
} from 'lucide-react';
import StatusChip from '../components/StatusChip';
import { 
  validateOpportunityForm, 
  generateOpportunityDigest, 
  sanitizeInput 
} from '../data/opportunitiesData';

/**
 * Development Activity 3 — Module 1
 * Lead Developer: Muhammad Umar Afzaal (23F-3106)
 * Module Name: Post Verified Internship Opportunity
 *
 * Responsibilities:
 * - Enterprise & Placement Requisition Interface
 * - Strict Input Validation & Anti-XSS Sanitization
 * - Cryptographic Verification Digest Generation (0xVER-...)
 * - Live State Persistence into Central Store
 * - Feedback Banners & Live "Recently Posted" Data Display
 */
export default function PostOpportunityModule({ 
  onAddOpportunity, 
  recentPostings = [], 
  setCurrentPage, 
  addToast,
  user
}) {
  const [formData, setFormData] = useState({
    title: '',
    company: user?.role === 'Placement Officer' ? 'FAST-NUCES Career Directorate' : 'Trillium Information Security',
    category: 'security',
    mode: 'hybrid',
    stipendAmount: '55000',
    minCgpa: '3.00',
    tags: 'OWASP, Penetration Testing, Python',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);

  // Quick preset data for rapid classroom demonstration
  const handleQuickFillPreset = () => {
    setFormData({
      title: 'Cloud Security Trainee',
      company: 'Systems Limited (Cyber Defense Lab)',
      category: 'security',
      mode: 'hybrid',
      stipendAmount: '58000',
      minCgpa: '3.20',
      tags: 'AWS GuardDuty, Docker, SAST, Python',
      description: 'Assist the Cloud Security Operations team with vulnerability triage, container hardening, and automated CI/CD security posture management.'
    });
    setErrors({});
    if (addToast) addToast('Classroom Demo Preset populated successfully.', 'info');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field-specific error as user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmissionSuccess(null);

    // 1. Input Validation (Part 2 - Step 3)
    const validation = validateOpportunityForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      if (addToast) addToast('Form validation failed. Please correct highlighted errors.', 'danger');
      return;
    }

    setIsSubmitting(true);

    // 2. JavaScript Functionality & Cryptographic Verification Generation
    setTimeout(() => {
      const sanitizedTitle = sanitizeInput(formData.title);
      const sanitizedCompany = sanitizeInput(formData.company);
      const sanitizedDesc = sanitizeInput(formData.description);
      const parsedTags = formData.tags
        .split(',')
        .map(t => sanitizeInput(t))
        .filter(t => t.length > 0);

      const cryptoProof = generateOpportunityDigest(sanitizedTitle, sanitizedCompany);
      const stipendNum = Number(formData.stipendAmount);

      const newOpportunity = {
        id: `JOB-${Math.floor(10 + Math.random() * 90)}`,
        title: sanitizedTitle,
        company: sanitizedCompany,
        verified: true,
        location: `${formData.mode === 'remote' ? 'Remote' : 'Lahore'} (${formData.mode.charAt(0).toUpperCase() + formData.mode.slice(1)})`,
        mode: formData.mode,
        category: formData.category,
        stipend: `PKR ${stipendNum.toLocaleString()} / mo`,
        stipendAmount: stipendNum,
        minCgpa: Number(formData.minCgpa),
        matchScore: 92,
        tags: parsedTags,
        description: sanitizedDesc,
        auditDigest: cryptoProof.digestId,
        auditHash: cryptoProof.fullSha256,
        postedBy: user ? `${user.name} (${user.role})` : 'Muhammad Umar Afzaal (23F-3106)',
        postedAt: new Date().toISOString().split('T')[0],
        status: 'active'
      };

      // 3. Commit to Shared Application Store (Part 4 Integration)
      onAddOpportunity(newOpportunity);

      // 4. Feedback Display (Part 2 - Step 5)
      setSubmissionSuccess({
        job: newOpportunity,
        digest: cryptoProof.digestId,
        sha256: cryptoProof.fullSha256
      });

      setIsSubmitting(false);
      setErrors({});

      // Reset main input fields
      setFormData(prev => ({
        ...prev,
        title: '',
        description: ''
      }));

      if (addToast) {
        addToast(`Opportunity "${sanitizedTitle}" posted with audit digest ${cryptoProof.digestId}!`, 'success');
      }
    }, 450);
  };

  return (
    <div style={{ padding: '40px 0 64px' }}>
      <div className="container">

        {/* Module Header & Group Member Metadata */}
        <div style={{ 
          marginBottom: '32px', 
          paddingBottom: '24px', 
          borderBottom: '1px solid var(--line)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="label-caps" style={{ color: 'var(--emerald)' }}>
                SSD Activity 3 — Module 1
              </span>
              <StatusChip variant="mint">Developed by Umar Afzaal (23F-3106)</StatusChip>
              <StatusChip variant="saffron">Interactive Requisition</StatusChip>
            </div>
            
            <h1 className="title-display" style={{ fontSize: '32px', marginBottom: '8px', color: 'var(--ink)' }}>
              Post Verified Internship Opportunity
            </h1>
            <p className="body-text" style={{ maxWidth: '720px' }}>
              Publish authenticated semester internship positions to the SafeHire network. Every requisition is screened with strict input validation, sanitized against injection attacks, and issued a tamper-evident verification audit hash.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button 
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleQuickFillPreset}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              title="Auto-fill form with valid classroom demo data"
            >
              <Sparkles size={14} color="var(--saffron)" />
              <span>1-Click Demo Fill</span>
            </button>

            <button 
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setCurrentPage('browse-jobs')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <span>Explore Catalog (Module 2)</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Main 2-Column Layout: Form Left, Feed & Info Right */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: '32px' }}>

          {/* LEFT: The Requisition Form */}
          <div style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-md)',
            padding: '28px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--line)' }}>
              <Briefcase size={20} color="var(--pine)" />
              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--ink)' }}>
                Requisition Parameters
              </h2>
            </div>

            {/* Success Feedback Alert Banner (Part 2 - Step 5) */}
            {submissionSuccess && (
              <div style={{
                backgroundColor: 'var(--mint)',
                border: '1px solid var(--emerald)',
                borderRadius: 'var(--radius-sm)',
                padding: '16px',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <CheckCircle2 size={18} color="var(--emerald)" />
                  <strong style={{ color: 'var(--pine)', fontSize: 'var(--text-sm)' }}>
                    Requisition Authenticated &amp; Published!
                  </strong>
                </div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink)', marginBottom: '8px' }}>
                  Position "<strong>{submissionSuccess.job.title}</strong>" was signed and integrated into the active catalog.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--pine)' }}>
                  <span>Audit Block: <strong>{submissionSuccess.digest}</strong></span>
                  <span>•</span>
                  <span>Digest: <code>{submissionSuccess.sha256.substring(0, 22)}...</code></span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              
              {/* Job Title */}
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 600, marginBottom: '6px', color: 'var(--ink)' }}>
                  Position Title <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <input 
                  type="text"
                  placeholder="e.g. Junior AppSec Analyst Intern"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: `1px solid ${errors.title ? 'var(--danger)' : 'var(--line)'}`,
                    fontSize: 'var(--text-sm)',
                    outline: 'none',
                    backgroundColor: 'var(--surface)'
                  }}
                />
                {errors.title && (
                  <p style={{ color: 'var(--danger)', fontSize: '11px', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <AlertCircle size={12} /> {errors.title}
                  </p>
                )}
              </div>

              {/* Company & Category Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
                
                <div>
                  <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 600, marginBottom: '6px', color: 'var(--ink)' }}>
                    Organization / Company <span style={{ color: 'var(--danger)' }}>*</span>
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g. Systems Limited"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: `1px solid ${errors.company ? 'var(--danger)' : 'var(--line)'}`,
                      fontSize: 'var(--text-sm)',
                      outline: 'none',
                      backgroundColor: 'var(--surface)'
                    }}
                  />
                  {errors.company && (
                    <p style={{ color: 'var(--danger)', fontSize: '11px', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <AlertCircle size={12} /> {errors.company}
                    </p>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 600, marginBottom: '6px', color: 'var(--ink)' }}>
                    Domain Category <span style={{ color: 'var(--danger)' }}>*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--line)',
                      fontSize: 'var(--text-sm)',
                      outline: 'none',
                      backgroundColor: 'var(--surface)'
                    }}
                  >
                    <option value="security">Cybersecurity &amp; AppSec</option>
                    <option value="software">Full-Stack Software Engineering</option>
                    <option value="ai">AI &amp; Data Intelligence</option>
                    <option value="devops">DevSecOps &amp; Cloud Infrastructure</option>
                  </select>
                </div>

              </div>

              {/* Stipend, Mode & Min CGPA Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '18px' }}>
                
                <div>
                  <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 600, marginBottom: '6px', color: 'var(--ink)' }}>
                    Monthly Stipend (PKR) <span style={{ color: 'var(--danger)' }}>*</span>
                  </label>
                  <input 
                    type="number"
                    step="1000"
                    placeholder="55000"
                    value={formData.stipendAmount}
                    onChange={(e) => handleInputChange('stipendAmount', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: `1px solid ${errors.stipendAmount ? 'var(--danger)' : 'var(--line)'}`,
                      fontSize: 'var(--text-sm)',
                      outline: 'none'
                    }}
                  />
                  {errors.stipendAmount ? (
                    <p style={{ color: 'var(--danger)', fontSize: '11px', marginTop: '4px' }}>
                      {errors.stipendAmount}
                    </p>
                  ) : (
                    <span style={{ fontSize: '10px', color: 'var(--ink-muted)' }}>Min PKR 30,000 SLA</span>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 600, marginBottom: '6px', color: 'var(--ink)' }}>
                    Work Mode <span style={{ color: 'var(--danger)' }}>*</span>
                  </label>
                  <select
                    value={formData.mode}
                    onChange={(e) => handleInputChange('mode', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--line)',
                      fontSize: 'var(--text-sm)',
                      outline: 'none',
                      backgroundColor: 'var(--surface)'
                    }}
                  >
                    <option value="hybrid">Hybrid (2d Office / 3d Remote)</option>
                    <option value="remote">Fully Remote</option>
                    <option value="on-site">On-site Campus / Office</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 600, marginBottom: '6px', color: 'var(--ink)' }}>
                    Cutoff CGPA (Max 4.0) <span style={{ color: 'var(--danger)' }}>*</span>
                  </label>
                  <input 
                    type="number"
                    step="0.05"
                    min="2.0"
                    max="4.0"
                    placeholder="3.00"
                    value={formData.minCgpa}
                    onChange={(e) => handleInputChange('minCgpa', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: `1px solid ${errors.minCgpa ? 'var(--danger)' : 'var(--line)'}`,
                      fontSize: 'var(--text-sm)',
                      outline: 'none'
                    }}
                  />
                  {errors.minCgpa && (
                    <p style={{ color: 'var(--danger)', fontSize: '11px', marginTop: '4px' }}>
                      {errors.minCgpa}
                    </p>
                  )}
                </div>

              </div>

              {/* Tags / Required Skills */}
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 600, marginBottom: '6px', color: 'var(--ink)' }}>
                  Required Skills &amp; Security Badges (comma separated) <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <input 
                  type="text"
                  placeholder="e.g. OWASP Top 10, Penetration Testing, Python, Docker"
                  value={formData.tags}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: `1px solid ${errors.tags ? 'var(--danger)' : 'var(--line)'}`,
                    fontSize: 'var(--text-sm)',
                    outline: 'none'
                  }}
                />
                {errors.tags && (
                  <p style={{ color: 'var(--danger)', fontSize: '11px', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <AlertCircle size={12} /> {errors.tags}
                  </p>
                )}
              </div>

              {/* Description */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--ink)' }}>
                    Detailed Requisition Description &amp; Scope <span style={{ color: 'var(--danger)' }}>*</span>
                  </label>
                  <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>
                    Anti-XSS Filter Active (No &lt;script&gt; tags)
                  </span>
                </div>
                <textarea 
                  rows={4}
                  placeholder="Describe the candidate responsibilities, projects, and security expectations..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: `1px solid ${errors.description ? 'var(--danger)' : 'var(--line)'}`,
                    fontSize: 'var(--text-sm)',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                />
                {errors.description && (
                  <p style={{ color: 'var(--danger)', fontSize: '11px', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <AlertCircle size={12} /> {errors.description}
                  </p>
                )}
              </div>

              {/* Submit Action */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--text-xs)', color: 'var(--ink-muted)' }}>
                  <ShieldCheck size={14} color="var(--emerald)" />
                  <span>Submissions generate an immutable 0xVER digest</span>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw size={15} className="spin" />
                      <span>Validating &amp; Signing...</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>Post Verified Opportunity</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

          {/* RIGHT: Live Feed of Submitted Opportunities (Part 2 - Step 6 Data Display) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Validation Rules Card for Activity Evaluation */}
            <div style={{
              backgroundColor: 'var(--surface-2)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-md)',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <ShieldCheck size={18} color="var(--emerald)" />
                <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--ink)' }}>
                  Module 1 Validation &amp; Security Rules
                </h3>
              </div>
              <ul style={{ fontSize: 'var(--text-xs)', color: 'var(--ink)', paddingLeft: '18px', lineHeight: 1.6 }}>
                <li><strong>Title Integrity:</strong> Minimum 4 characters; HTML brackets stripped.</li>
                <li><strong>Fair-Stipend Standard:</strong> Enforces minimum PKR 30,000 threshold to prevent predatory unpaid postings.</li>
                <li><strong>Academic Boundary:</strong> Validates CGPA cutoff within valid range (2.00 &ndash; 4.00).</li>
                <li><strong>Anti-XSS Sanitization:</strong> Strips malicious <code>&lt;script&gt;</code> and injection payload tokens before memory commit.</li>
                <li><strong>Cryptographic Stamp:</strong> Issues tamper-evident SHA-256 HMAC posting digest anchored with block ID.</li>
              </ul>
            </div>

            {/* Live Data Display: "Recently Posted Opportunities" */}
            <div style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-md)',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--line)' }}>
                <div>
                  <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--ink)' }}>
                    Live Posted Opportunities
                  </h3>
                  <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>
                    Immediate reflection from active JavaScript repository
                  </span>
                </div>
                <StatusChip variant="mint">{recentPostings.length} Active</StatusChip>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '420px', overflowY: 'auto' }}>
                {recentPostings.slice(0, 5).map((job) => (
                  <div 
                    key={job.id}
                    style={{
                      padding: '14px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--paper)',
                      border: '1px solid var(--line)',
                      transition: 'border-color 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                      <div>
                        <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--ink)' }}>
                          {job.title}
                        </h4>
                        <div style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>
                          {job.company} • {job.location}
                        </div>
                      </div>
                      <StatusChip variant="neutral">{job.auditDigest || '0xVER-INIT'}</StatusChip>
                    </div>

                    <p style={{ fontSize: '11px', color: 'var(--ink-muted)', marginBottom: '8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {job.description}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
                      <span style={{ fontWeight: 600, color: 'var(--emerald)' }}>
                        {job.stipend}
                      </span>
                      <span style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)' }}>
                        Min CGPA: {job.minCgpa?.toFixed(2) || '3.00'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--line)' }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setCurrentPage('browse-jobs')}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>Search &amp; Filter All in Module 2 Explorer</span>
                  <ArrowRight size={13} />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
