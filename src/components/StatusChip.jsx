import React from 'react';

/**
 * StatusChip - Editorial status indicator
 * Variants: 'mint' (verified/success), 'saffron' (pending/attention), 'danger' (alert), 'neutral' (default)
 */
export default function StatusChip({ variant = 'neutral', children, className = '' }) {
  return (
    <span className={`status-chip ${variant} ${className}`}>
      {children}
    </span>
  );
}
