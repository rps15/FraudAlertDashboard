import React from 'react';
import { CreditCard, MapPin, ShieldAlert } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/formatters';

export function TransactionDetails({ transaction }) {
  if (!transaction) {
    return (
      <aside className="details-panel empty-details">
        <ShieldAlert size={24} />
        <h2>Select a transaction</h2>
        <p>Choose a row to inspect the simulated monitoring details.</p>
      </aside>
    );
  }

  return (
    <aside className="details-panel">
      <div className="panel-heading">
        <h2>Transaction Details</h2>
        <span>{transaction.id}</span>
      </div>

      <div className="risk-meter">
        <span>Risk score</span>
        <strong>{Number.isFinite(Number(transaction.riskScore)) ? transaction.riskScore : 0}</strong>
        <div className="meter-track">
          <div style={{ width: `${Math.min(Math.max(Number(transaction.riskScore) || 0, 0), 100)}%` }} />
        </div>
      </div>

      <dl className="detail-list">
        <div>
          <dt>Customer</dt>
          <dd>{transaction.customerId || 'Unknown'}</dd>
        </div>
        <div>
          <dt>Merchant</dt>
          <dd>{transaction.merchant || 'Unknown'}</dd>
        </div>
        <div>
          <dt>Amount</dt>
          <dd>{formatCurrency(transaction.amount)}</dd>
        </div>
        <div>
          <dt>Date</dt>
          <dd>{formatDate(transaction.date)}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{transaction.status || 'Unknown'}</dd>
        </div>
      </dl>

      <div className="detail-chip-grid">
        <span>
          <CreditCard size={16} />
          {transaction.paymentMethod || 'Unknown method'}
        </span>
        <span>
          <MapPin size={16} />
          {transaction.location || 'Unknown location'}
        </span>
      </div>

      <div className="analyst-note">
        <span>Analyst note</span>
        <p>{transaction.notes || 'No note is available for this simulated transaction.'}</p>
      </div>
    </aside>
  );
}
