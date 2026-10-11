import React from 'react';
import { Search } from 'lucide-react';

export function FiltersBar({
  categories,
  filters,
  onFiltersChange,
  onReset,
  sortBy,
  onSortChange,
}) {
  const updateFilter = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <section className="filters-panel" id="controls" aria-label="Transaction filters">
      <label className="search-field">
        <Search size={18} />
        <input
          type="search"
          placeholder="Search transaction, customer, or merchant"
          value={filters.search}
          onChange={(event) => updateFilter('search', event.target.value)}
        />
      </label>

      <select value={filters.riskLevel} onChange={(event) => updateFilter('riskLevel', event.target.value)} aria-label="Risk level">
        <option value="All">All risks</option>
        <option value="Low">Low risk</option>
        <option value="Medium">Medium risk</option>
        <option value="High">High risk</option>
      </select>

      <select value={filters.category} onChange={(event) => updateFilter('category', event.target.value)} aria-label="Category">
        <option value="All">All categories</option>
        {categories.map((category) => (
          <option value={category} key={category}>
            {category}
          </option>
        ))}
      </select>

      <select value={filters.status} onChange={(event) => updateFilter('status', event.target.value)} aria-label="Status">
        <option value="All">All statuses</option>
        <option value="Cleared">Cleared</option>
        <option value="Review">Review</option>
        <option value="Flagged">Flagged</option>
      </select>

      <select value={sortBy} onChange={(event) => onSortChange(event.target.value)} aria-label="Sort transactions">
        <option value="date-desc">Newest first</option>
        <option value="date-asc">Oldest first</option>
        <option value="amount-desc">Amount high to low</option>
        <option value="amount-asc">Amount low to high</option>
        <option value="risk-desc">Risk score high to low</option>
        <option value="risk-asc">Risk score low to high</option>
      </select>

      <button className="ghost-button" type="button" onClick={onReset}>
        Reset
      </button>
    </section>
  );
}
