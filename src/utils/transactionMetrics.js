export const buildSummaryMetrics = (items) => {
  const safeItems = Array.isArray(items) ? items : [];
  const totalValue = safeItems.reduce((sum, transaction) => {
    const amount = Number(transaction.amount);
    return Number.isFinite(amount) ? sum + amount : sum;
  }, 0);

  return {
    totalTransactions: safeItems.length,
    totalValue,
    flaggedTransactions: safeItems.filter((item) => item.status === 'Flagged').length,
    highRiskTransactions: safeItems.filter((item) => item.riskLevel === 'High').length,
  };
};

export const countByField = (items, field) => {
  const counts = new Map();

  items.forEach((item) => {
    const key = item[field] || 'Unknown';
    counts.set(key, (counts.get(key) || 0) + 1);
  });

  return Array.from(counts, ([name, value]) => ({ name, value }));
};

export const buildVolumeByDate = (items) => {
  const volume = new Map();

  items.forEach((item) => {
    const date = new Date(item.date);

    if (Number.isNaN(date.getTime())) {
      return;
    }

    const label = date.toISOString().slice(0, 10);
    volume.set(label, (volume.get(label) || 0) + 1);
  });

  return Array.from(volume, ([date, transactions]) => ({ date, transactions })).sort((a, b) =>
    a.date.localeCompare(b.date),
  );
};
