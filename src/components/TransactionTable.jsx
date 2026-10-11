import React from 'react';
import { formatCurrency, formatDate } from '../utils/formatters';

export function TransactionTable({ transactions, selectedTransactionId, onSelectTransaction }) {
  if (!transactions.length) {
    return (
      <section className="table-panel empty-state" id="transactions">
        <h2>No transactions found</h2>
        <p>Adjust the search terms or filters to broaden the simulated transaction list.</p>
      </section>
    );
  }

  return (
    <section className="table-panel" id="transactions" aria-label="Transactions">
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Customer ID</th>
              <th>Merchant</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Location</th>
              <th>Risk Score</th>
              <th>Risk Level</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                className={selectedTransactionId === transaction.id ? 'selected-row' : ''}
                key={transaction.id}
                onClick={() => onSelectTransaction(transaction)}
              >
                <td>{transaction.id || 'Unknown'}</td>
                <td>{transaction.customerId || 'Unknown'}</td>
                <td>{transaction.merchant || 'Unknown'}</td>
                <td>{transaction.category || 'Unknown'}</td>
                <td>{formatCurrency(transaction.amount)}</td>
                <td>{formatDate(transaction.date)}</td>
                <td>{transaction.location || 'Unknown'}</td>
                <td>{Number.isFinite(Number(transaction.riskScore)) ? transaction.riskScore : 0}</td>
                <td>
                  <span className={`risk-pill ${String(transaction.riskLevel || 'unknown').toLowerCase()}`}>
                    {transaction.riskLevel || 'Unknown'}
                  </span>
                </td>
                <td>
                  <span className={`status-pill ${String(transaction.status || 'unknown').toLowerCase()}`}>
                    {transaction.status || 'Unknown'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
