import React from 'react';
import { Check } from 'lucide-react';

const STEPS = [
  { id: 'applied', label: 'Applied', caption: 'Verified ID submitted' },
  { id: 'offered', label: 'Interview Offered', caption: 'Recruiter review complete' },
  { id: 'accepted', label: 'Accepted', caption: 'Student confirms offer' },
  { id: 'revealed', label: 'Contact Revealed', caption: 'Direct channel unlocked' }
];

export default function Stepper({ currentState = 'offered' }) {
  // Map currentState to step index (0-based)
  // 'applied': 0, 'offered': 1, 'accepted': 2, 'revealed': 3
  const stateIndexMap = {
    applied: 0,
    offered: 1,
    accepted: 2,
    revealed: 3
  };

  const currentIndex = stateIndexMap[currentState] ?? 1;

  return (
    <div style={{ width: '100%', margin: '24px 0 16px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', position: 'relative' }}>
        {STEPS.map((step, idx) => {
          const isCompleted = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          const isFuture = idx > currentIndex;

          return (
            <React.Fragment key={step.id}>
              {/* Step column */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 2 }}>
                
                {/* Circle Indicator */}
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isCompleted ? 'var(--emerald)' : isCurrent ? 'var(--surface)' : 'var(--surface)',
                  border: isCompleted 
                    ? '2px solid var(--emerald)' 
                    : isCurrent 
                    ? '3px solid var(--saffron)' 
                    : '2px solid var(--line)',
                  boxShadow: isCurrent ? '0 0 0 3px var(--saffron-soft)' : 'none',
                  transition: 'all var(--transition)'
                }}>
                  {isCompleted && <Check size={14} color="#FFFFFF" strokeWidth={2.5} />}
                  {isCurrent && (
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--saffron)' }} />
                  )}
                  {isFuture && (
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--line)' }} />
                  )}
                </div>

                {/* Label and Caption */}
                <div style={{ marginTop: '10px' }}>
                  <div style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: isCurrent ? 600 : 500,
                    color: isCurrent ? 'var(--ink)' : isCompleted ? 'var(--emerald)' : 'var(--ink-muted)'
                  }}>
                    {step.label}
                  </div>
                  <div style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--ink-muted)',
                    marginTop: '2px',
                    maxWidth: '130px',
                    lineHeight: 1.3
                  }}>
                    {step.caption}
                  </div>
                </div>
              </div>

              {/* Connecting Line (except after the last item) */}
              {idx < STEPS.length - 1 && (
                <div style={{
                  position: 'absolute',
                  top: '13px',
                  left: `calc(${(idx / (STEPS.length - 1)) * 100}% + 28px)`,
                  width: `calc(${100 / (STEPS.length - 1)}% - 56px)`,
                  height: '2px',
                  backgroundColor: idx < currentIndex ? 'var(--emerald)' : 'var(--line)',
                  zIndex: 1,
                  transition: 'background-color var(--transition)'
                }} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
