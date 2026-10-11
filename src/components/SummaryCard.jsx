import React from 'react';

export function SummaryCard({ icon: Icon, label, value, tone }) {
  return (
    <article className={`summary-card ${tone || ''}`}>
      <div className="summary-icon">
        <Icon size={21} />
      </div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </article>
  );
}
