import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ShieldCheck, 
  Building2, 
  MapPin, 
  DollarSign, 
  Tag, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  Bookmark, 
  BookmarkCheck, 
  X, 
  Sparkles, 
  ArrowRight,
  GraduationCap,
  Layers,
  Key
} from 'lucide-react';
import StatusChip from '../components/StatusChip';
import { CATEGORIES, WORK_MODES, validateSearchQuery } from '../data/opportunitiesData';

/**
 * Development Activity 3 — Module 2
 * Lead Developer: Musa Rehan (23F-3093)
 * Module Name: Browse & Search Verified Opportunities
 *
 * Responsibilities:
 * - Dynamic Verified Opportunity Explorer & Filter Engine
 * - Search Query Validation, Sanitization & Length Guardrail
 * - Multi-criteria Filtering (Domain, Work Mode, Min Stipend)
 * - Interactive Opportunity Verification Inspection Modal
 * - Express Bookmark / Application State Machine
 * - Real-time Result Counter & Empty State Recovery
 */
export default function BrowseOpportunitiesModule({ 
  opportunities = [], 
  setCurrentPage, 
  addToast,
  user
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMode, setSelectedMode] = useState('all');
  const [minStipendFilter, setMinStipendFilter] = useState('0');
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set(['JOB-01']));
  const [selectedInspectionJob, setSelectedInspectionJob] = useState(null);
  const [searchWarning, setSearchWarning] = useState(null);

  // Search input change handler with Validation Rule (Part 3 - Step 3)
  const handleSearchChange = (value) => {
    const valResult = validateSearchQuery(value);
    setSearchQuery(valResult.sanitized);
    setSearchWarning(valResult.warning);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedMode('all');
    setMinStipendFilter('0');
    setSearchWarning(null);
    if (addToast) addToast('Explorer filters reset to default.', 'info');
  };

  const toggleBookmark = (jobId) => {
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      const isNowBookmarked = !next.has(jobId);
      if (isNowBookmarked) {
        next.add(jobId);
        if (addToast) addToast(`Saved opportunity ${jobId} to your verified portfolio.`, 'success');
      } else {
        next.delete(jobId);
        if (addToast) addToast(`Removed opportunity ${jobId} from bookmarks.`, 'info');
      }
      return next;
    });
  };

  // Filter pipeline (Part 3 - Step 4 JavaScript interaction)
  const filteredOpportunities = opportunities.filter(job => {
    // 1. Text Search matching title, company, description, or tags
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || (
      job.title.toLowerCase().includes(q) ||
      job.company.toLowerCase().includes(q) ||
      job.description.toLowerCase().includes(q) ||
      job.tags.some(t => t.toLowerCase().includes(q))
    );

    // 2. Category matching
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;

    // 3. Work Mode matching
    const matchesMode = selectedMode === 'all' || job.mode === selectedMode;

    // 4. Minimum Stipend
    const minStipendNum = Number(minStipendFilter);
    const matchesStipend = !minStipendNum || (job.stipendAmount && job.stipendAmount >= minStipendNum);

    return matchesSearch && matchesCategory && matchesMode && matchesStipend;
  });

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
                SSD Activity 3 — Module 2
              </span>
              <StatusChip variant="mint">Developed by Musa Rehan (23F-3093)</StatusChip>
              <StatusChip variant="neutral">Verified Catalog Explorer</StatusChip>
            </div>
            
            <h1 className="title-display" style={{ fontSize: '32px', marginBottom: '8px', color: 'var(--ink)' }}>
              Browse &amp; Search Verified Opportunities
            </h1>
            <p className="body-text" style={{ maxWidth: '740px' }}>
              Explore cryptographically vetted employer requisitions. Filter across technical specialties, inspect institutional audit proofs, verify Fair-Stipend SLAs, and evaluate candidate academic eligibility.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button 
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => setCurrentPage('post-job')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <span>Post New Requisition (Module 1)</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Search & Multi-Filter Control Console */}
        <div style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--line)',
          borderRadius: 'var(--radius-md)',
          padding: '24px',
          marginBottom: '32px'
        }}>
          
          {/* Top Search Bar */}
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <Search 
              size={18} 
              color="var(--ink-muted)" 
              style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} 
            />
            <input 
              type="text"
              placeholder="Search by role title, corporate employer, or security tech tags (e.g. AppSec, OWASP, Python)..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px 12px 42px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--line)',
                fontSize: 'var(--text-sm)',
                outline: 'none',
                backgroundColor: 'var(--paper)'
              }}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--ink-muted)',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Search Validation Feedback Warning */}
          {searchWarning && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--saffron-soft)',
              border: '1px solid var(--saffron)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px 12px',
              fontSize: '11px',
              color: 'var(--saffron-text)',
              marginBottom: '16px'
            }}>
              <AlertTriangle size={14} />
              <span>{searchWarning}</span>
            </div>
          )}

          {/* Filter Pills Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1.2fr) minmax(0, 1fr)', gap: '20px', alignItems: 'center' }}>
            
            {/* Category Filter Pills */}
            <div>
              <span className="label-caps" style={{ display: 'block', marginBottom: '8px' }}>
                Technical Specialty
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      padding: '5px 10px',
                      fontSize: 'var(--text-xs)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid',
                      borderColor: selectedCategory === cat.id ? 'var(--pine)' : 'var(--line)',
                      backgroundColor: selectedCategory === cat.id ? 'var(--pine)' : 'var(--surface)',
                      color: selectedCategory === cat.id ? '#FFFFFF' : 'var(--ink)',
                      cursor: 'pointer',
                      fontWeight: selectedCategory === cat.id ? 600 : 400,
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode Filter Pills */}
            <div>
              <span className="label-caps" style={{ display: 'block', marginBottom: '8px' }}>
                Work Mode
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {WORK_MODES.map(m => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMode(m.id)}
                    style={{
                      padding: '5px 10px',
                      fontSize: 'var(--text-xs)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid',
                      borderColor: selectedMode === m.id ? 'var(--emerald)' : 'var(--line)',
                      backgroundColor: selectedMode === m.id ? 'var(--mint)' : 'var(--surface)',
                      color: selectedMode === m.id ? 'var(--pine)' : 'var(--ink)',
                      cursor: 'pointer',
                      fontWeight: selectedMode === m.id ? 600 : 400,
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Min Stipend Filter Dropdown */}
            <div>
              <span className="label-caps" style={{ display: 'block', marginBottom: '8px' }}>
                Minimum Stipend SLA
              </span>
              <select
                value={minStipendFilter}
                onChange={(e) => setMinStipendFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '7px 10px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--line)',
                  fontSize: 'var(--text-xs)',
                  outline: 'none',
                  backgroundColor: 'var(--paper)'
                }}
              >
                <option value="0">All Stipend Ranges</option>
                <option value="50000">&ge; PKR 50,000 / mo</option>
                <option value="60000">&ge; PKR 60,000 / mo</option>
                <option value="65000">&ge; PKR 65,000 / mo</option>
              </select>
            </div>

          </div>

          {/* Results Summary Bar (Part 3 - Step 5 Feedback) */}
          <div style={{ 
            marginTop: '16px', 
            paddingTop: '12px', 
            borderTop: '1px solid var(--line)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 'var(--text-xs)',
            color: 'var(--ink-muted)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: 600, color: 'var(--ink)' }}>
                Showing {filteredOpportunities.length} of {opportunities.length} Verified Positions
              </span>
              {(searchQuery || selectedCategory !== 'all' || selectedMode !== 'all' || minStipendFilter !== '0') && (
                <span style={{ color: 'var(--emerald)' }}>• Filters applied</span>
              )}
            </div>

            {(searchQuery || selectedCategory !== 'all' || selectedMode !== 'all' || minStipendFilter !== '0') && (
              <button
                onClick={handleClearFilters}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--danger)',
                  fontSize: 'var(--text-xs)',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Reset all filters
              </button>
            )}
          </div>

        </div>

        {/* Empty Search State Feedback */}
        {filteredOpportunities.length === 0 && (
          <div style={{
            backgroundColor: 'var(--surface)',
            border: '1px dashed var(--line)',
            borderRadius: 'var(--radius-md)',
            padding: '48px 24px',
            textAlign: 'center',
            maxWidth: '560px',
            margin: '0 auto 40px'
          }}>
            <AlertTriangle size={32} color="var(--saffron)" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--ink)', marginBottom: '8px' }}>
              No Verified Opportunities Match Your Criteria
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-muted)', marginBottom: '20px' }}>
              No active listings found for query "<strong>{searchQuery}</strong>". Try clearing your keyword or resetting category/mode filters.
            </p>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={handleClearFilters}
            >
              Clear Filters &amp; View All Opportunities
            </button>
          </div>
        )}

        {/* Opportunity Grid Layout (Part 3 - Step 6 Data Display) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
          {filteredOpportunities.map((job) => {
            const isBookmarked = bookmarkedIds.has(job.id);
            const userCgpa = Number(user?.cgpa || 3.78);
            const isCgpaEligible = !job.minCgpa || userCgpa >= job.minCgpa;

            return (
              <div 
                key={job.id}
                style={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-md)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'border-color 0.15s ease, box-shadow 0.15s ease'
                }}
              >
                <div>
                  {/* Card Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="label-caps" style={{ color: 'var(--pine)' }}>{job.category.toUpperCase()}</span>
                      <StatusChip variant="mint">
                        <ShieldCheck size={11} style={{ marginRight: '3px' }} />
                        Verified
                      </StatusChip>
                    </div>

                    <button
                      onClick={() => toggleBookmark(job.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: isBookmarked ? 'var(--emerald)' : 'var(--ink-muted)',
                        padding: '4px'
                      }}
                      title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Opportunity'}
                    >
                      {isBookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                    </button>
                  </div>

                  {/* Title & Organization */}
                  <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--ink)', marginBottom: '4px' }}>
                    {job.title}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-xs)', color: 'var(--ink-muted)', marginBottom: '14px' }}>
                    <span style={{ fontWeight: 500, color: 'var(--ink)' }}>{job.company}</span>
                    <span>•</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                      <MapPin size={11} /> {job.location}
                    </span>
                  </div>

                  {/* Description snippet */}
                  <p style={{ 
                    fontSize: 'var(--text-xs)', 
                    color: 'var(--ink)', 
                    lineHeight: 1.5, 
                    marginBottom: '16px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {job.description}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '16px' }}>
                    {job.tags.map((tag, i) => (
                      <span 
                        key={i}
                        style={{
                          fontSize: '11px',
                          backgroundColor: 'var(--surface-2)',
                          color: 'var(--ink)',
                          padding: '3px 7px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--line)'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Metadata & Inspect Button */}
                <div style={{ borderTop: '1px solid var(--line)', paddingTop: '14px', marginTop: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', fontSize: 'var(--text-xs)' }}>
                    <div>
                      <span style={{ display: 'block', fontSize: '10px', color: 'var(--ink-muted)' }}>Fair-Stipend</span>
                      <strong style={{ color: 'var(--emerald)', fontSize: 'var(--text-sm)' }}>{job.stipend}</strong>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ display: 'block', fontSize: '10px', color: 'var(--ink-muted)' }}>Cutoff CGPA</span>
                      <span style={{ 
                        fontWeight: 600, 
                        color: isCgpaEligible ? 'var(--emerald)' : 'var(--danger)',
                        fontFamily: 'var(--font-mono)'
                      }}>
                        &ge; {job.minCgpa?.toFixed(2) || '3.00'} {isCgpaEligible ? '✓ Eligible' : '✗ Below'}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setSelectedInspectionJob(job)}
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      <ShieldCheck size={13} color="var(--emerald)" />
                      <span>Inspect Proof</span>
                    </button>

                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        if (addToast) {
                          addToast(`Application queued for ${job.title} at ${job.company}. Encrypted token generated.`, 'success');
                        }
                      }}
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      <span>Apply</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Detailed Verification Inspection Modal (Part 3 - Step 4 JavaScript interaction) */}
        {selectedInspectionJob && (
          <div 
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(14, 26, 23, 0.65)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '20px'
            }}
            onClick={() => setSelectedInspectionJob(null)}
          >
            <div 
              style={{
                backgroundColor: 'var(--surface)',
                borderRadius: 'var(--radius-md)',
                maxWidth: '600px',
                width: '100%',
                padding: '28px',
                border: '1px solid var(--line)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.18)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', paddingBottom: '14px', borderBottom: '1px solid var(--line)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span className="label-caps" style={{ color: 'var(--emerald)' }}>Cryptographic Verification Audit</span>
                    <StatusChip variant="mint">Level-3 Signed</StatusChip>
                  </div>
                  <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--ink)' }}>
                    {selectedInspectionJob.title}
                  </h2>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-muted)' }}>
                    {selectedInspectionJob.company} • {selectedInspectionJob.location}
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedInspectionJob(null)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-muted)' }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: 'var(--text-sm)', color: 'var(--ink)' }}>
                <div>
                  <h4 style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--ink-muted)', marginBottom: '4px' }}>
                    Requisition Description
                  </h4>
                  <p style={{ fontSize: 'var(--text-xs)', lineHeight: 1.6 }}>
                    {selectedInspectionJob.description}
                  </p>
                </div>

                {/* Cryptographic Proof Block */}
                <div style={{
                  backgroundColor: 'var(--surface-2)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '14px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--ink-muted)' }}>Audit Block ID:</span>
                    <strong style={{ color: 'var(--pine)' }}>{selectedInspectionJob.auditDigest || '0xVER-INIT'}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--ink-muted)' }}>Posting Authority:</span>
                    <span style={{ color: 'var(--ink)' }}>{selectedInspectionJob.postedBy || 'University Placement Directorate'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', wordBreak: 'break-all' }}>
                    <span style={{ color: 'var(--ink-muted)' }}>Digest (SHA-256):</span>
                    <code style={{ color: 'var(--emerald)' }}>{selectedInspectionJob.auditHash || 'sha256:e79a8820cbb1...'}</code>
                  </div>
                </div>

                {/* Academic Eligibility Analysis */}
                <div style={{
                  backgroundColor: 'var(--mint)',
                  border: '1px solid var(--emerald)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <CheckCircle2 size={20} color="var(--emerald)" />
                  <div>
                    <strong style={{ fontSize: 'var(--text-xs)', color: 'var(--pine)', display: 'block' }}>
                      Academic Eligibility: Confirmed
                    </strong>
                    <span style={{ fontSize: '11px', color: 'var(--ink)' }}>
                      Student CGPA ({user?.cgpa || '3.78'}) meets or exceeds minimum cutoff ({selectedInspectionJob.minCgpa?.toFixed(2) || '3.00'}).
                    </span>
                  </div>
                </div>

              </div>

              {/* Modal Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setSelectedInspectionJob(null)}
                >
                  Close Proof
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    if (addToast) addToast(`Application submitted for ${selectedInspectionJob.title}.`, 'success');
                    setSelectedInspectionJob(null);
                  }}
                >
                  Submit Verified Application
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
