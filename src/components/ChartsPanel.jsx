import React from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { shortDate } from '../utils/formatters';

const riskColors = {
  Low: '#38bdf8',
  Medium: '#f59e0b',
  High: '#ef4444',
  Unknown: '#94a3b8',
};

const categoryColors = ['#14b8a6', '#60a5fa', '#f59e0b', '#f97316', '#a78bfa', '#f43f5e', '#22c55e'];

export function ChartsPanel({ volumeData, riskData, categoryData }) {
  return (
    <section className="charts-grid" id="risk-queue" aria-label="Transaction visualizations">
      <article className="chart-card large">
        <div className="panel-heading">
          <h2>Transaction Volume</h2>
          <span>Daily count</span>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={volumeData}>
            <defs>
              <linearGradient id="volumeFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.38} />
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#23314d" strokeDasharray="4 4" />
            <XAxis dataKey="date" tickFormatter={shortDate} stroke="#8ea3c4" />
            <YAxis allowDecimals={false} stroke="#8ea3c4" />
            <Tooltip contentStyle={{ background: '#101a2e', border: '1px solid #263650', color: '#e5edf8' }} />
            <Area type="monotone" dataKey="transactions" stroke="#22d3ee" fill="url(#volumeFill)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </article>

      <article className="chart-card">
        <div className="panel-heading">
          <h2>Risk Distribution</h2>
          <span>By level</span>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie data={riskData} dataKey="value" nameKey="name" innerRadius={58} outerRadius={86} paddingAngle={3}>
              {riskData.map((entry) => (
                <Cell fill={riskColors[entry.name] || riskColors.Unknown} key={entry.name} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ background: '#101a2e', border: '1px solid #263650', color: '#e5edf8' }} />
          </PieChart>
        </ResponsiveContainer>
        <div className="legend-list">
          {riskData.map((entry) => (
            <span key={entry.name}>
              <i style={{ background: riskColors[entry.name] || riskColors.Unknown }} />
              {entry.name}: {entry.value}
            </span>
          ))}
        </div>
      </article>

      <article className="chart-card">
        <div className="panel-heading">
          <h2>Categories</h2>
          <span>Transaction count</span>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={categoryData.slice(0, 7)} layout="vertical" margin={{ left: 12, right: 12 }}>
            <CartesianGrid stroke="#23314d" strokeDasharray="4 4" horizontal={false} />
            <XAxis type="number" allowDecimals={false} stroke="#8ea3c4" />
            <YAxis dataKey="name" type="category" width={96} stroke="#8ea3c4" />
            <Tooltip contentStyle={{ background: '#101a2e', border: '1px solid #263650', color: '#e5edf8' }} />
            <Bar dataKey="value" radius={[0, 8, 8, 0]}>
              {categoryData.slice(0, 7).map((entry, index) => (
                <Cell fill={categoryColors[index % categoryColors.length]} key={entry.name} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </article>
    </section>
  );
}
