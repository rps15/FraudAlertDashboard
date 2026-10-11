import React, { useMemo, useState } from 'react';
import { AlertTriangle, BadgeDollarSign, CreditCard, ShieldAlert } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { SummaryCard } from './components/SummaryCard';
import { FiltersBar } from './components/FiltersBar';
import { ChartsPanel } from './components/ChartsPanel';
import { TransactionTable } from './components/TransactionTable';
import { TransactionDetails } from './components/TransactionDetails';
import { transactions } from './data/transactions';
import { formatCurrency } from './utils/formatters';
import { buildSummaryMetrics, buildVolumeByDate, countByField } from './utils/transactionMetrics';

const initialFilters = {
  search: '',
  riskLevel: 'All',
  category: 'All',
  status: 'All',
};

function sortTransactions(items, sortBy) {
  const sorted = [...items];

  const sorters = {
    'date-desc': (a, b) => new Date(b.date) - new Date(a.date),
    'date-asc': (a, b) => new Date(a.date) - new Date(b.date),
    'amount-desc': (a, b) => Number(b.amount || 0) - Number(a.amount || 0),
    'amount-asc': (a, b) => Number(a.amount || 0) - Number(b.amount || 0),
    'risk-desc': (a, b) => Number(b.riskScore || 0) - Number(a.riskScore || 0),
    'risk-asc': (a, b) => Number(a.riskScore || 0) - Number(b.riskScore || 0),
  };

  return sorted.sort(sorters[sortBy] || sorters['date-desc']);
}

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const [sortBy, setSortBy] = useState('date-desc');
  const [selectedTransaction, setSelectedTransaction] = useState(transactions[0]);

  const categories = useMemo(
    () => Array.from(new Set(transactions.map((transaction) => transaction.category).filter(Boolean))).sort(),
    [],
  );

  const filteredTransactions = useMemo(() => {
    const searchTerm = filters.search.trim().toLowerCase();

    const filtered = transactions.filter((transaction) => {
      const matchesSearch =
        !searchTerm ||
        [transaction.id, transaction.customerId, transaction.merchant]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(searchTerm));

      const matchesRisk = filters.riskLevel === 'All' || transaction.riskLevel === filters.riskLevel;
      const matchesCategory = filters.category === 'All' || transaction.category === filters.category;
      const matchesStatus = filters.status === 'All' || transaction.status === filters.status;

      return matchesSearch && matchesRisk && matchesCategory && matchesStatus;
    });

    return sortTransactions(filtered, sortBy);
  }, [filters, sortBy]);

  const metrics = useMemo(() => buildSummaryMetrics(transactions), []);
  const filteredMetrics = useMemo(() => buildSummaryMetrics(filteredTransactions), [filteredTransactions]);
  const volumeData = useMemo(() => buildVolumeByDate(filteredTransactions), [filteredTransactions]);
  const riskData = useMemo(() => countByField(filteredTransactions, 'riskLevel'), [filteredTransactions]);
  const categoryData = useMemo(() => countByField(filteredTransactions, 'category'), [filteredTransactions]);

  const cards = [
    {
      label: 'Total Transactions',
      value: metrics.totalTransactions.toLocaleString(),
      icon: CreditCard,
    },
    {
      label: 'Total Value',
      value: formatCurrency(metrics.totalValue),
      icon: BadgeDollarSign,
    },
    {
      label: 'Flagged Transactions',
      value: metrics.flaggedTransactions.toLocaleString(),
      icon: AlertTriangle,
      tone: 'warning',
    },
    {
      label: 'High-Risk Transactions',
      value: metrics.highRiskTransactions.toLocaleString(),
      icon: ShieldAlert,
      tone: 'danger',
    },
  ];

  return (
    <div className={`app-shell ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((value) => !value)} />

      <main className="dashboard">
        <header className="dashboard-header">
          <div>
            <span className="eyebrow">Portfolio demo</span>
            <h1>FraudAlert - Transaction Monitoring Dashboard</h1>
            <p>Monitor simulated financial transactions, review risk indicators, and inspect flagged activity.</p>
          </div>
          <div className="header-status">
            <span>Dataset</span>
            <strong>Simulated only</strong>
          </div>
        </header>

        <section className="summary-grid" id="overview" aria-label="Summary metrics">
          {cards.map((card) => (
            <SummaryCard {...card} key={card.label} />
          ))}
        </section>

        <FiltersBar
          categories={categories}
          filters={filters}
          onFiltersChange={setFilters}
          onReset={() => {
            setFilters(initialFilters);
            setSortBy('date-desc');
          }}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <div className="result-strip">
          <strong>{filteredMetrics.totalTransactions}</strong>
          <span>matching transactions</span>
          <strong>{formatCurrency(filteredMetrics.totalValue)}</strong>
          <span>filtered value</span>
        </div>

        <ChartsPanel volumeData={volumeData} riskData={riskData} categoryData={categoryData} />

        <section className="workspace-grid">
          <TransactionTable
            transactions={filteredTransactions}
            selectedTransactionId={selectedTransaction?.id}
            onSelectTransaction={setSelectedTransaction}
          />
          <TransactionDetails transaction={selectedTransaction} />
        </section>
      </main>
    </div>
  );
}

export default App;
