import React from 'react';
import { AlertTriangle, BarChart3, ChevronsLeft, ChevronsRight, FileSearch, ShieldCheck } from 'lucide-react';

const navItems = [
  { label: 'Overview', icon: BarChart3 },
  { label: 'Transactions', icon: FileSearch },
  { label: 'Risk Queue', icon: AlertTriangle },
  { label: 'Controls', icon: ShieldCheck },
];

export function Sidebar({ collapsed, onToggle }) {
  return (
    <aside className={`sidebar ${collapsed ? 'is-collapsed' : ''}`}>
      <div className="brand">
        <div className="brand-mark">F</div>
        <div className="brand-copy">
          <strong>FraudAlert</strong>
          <span>Transaction Monitoring</span>
        </div>
      </div>

      <button className="sidebar-toggle" type="button" onClick={onToggle} aria-label="Toggle sidebar">
        {collapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
      </button>

      <nav className="nav-list" aria-label="Dashboard sections">
        {navItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <a className={index === 0 ? 'active' : ''} href={`#${item.label.toLowerCase().replace(' ', '-')}`} key={item.label}>
              <Icon size={19} />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>

      <div className="sidebar-note">
        <span>Demo data</span>
        <strong>Simulated transactions only</strong>
      </div>
    </aside>
  );
}
