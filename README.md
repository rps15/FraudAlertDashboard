# FraudAlert - Transaction Monitoring Dashboard

FraudAlert is a portfolio frontend application that demonstrates a professional financial transaction monitoring dashboard. It uses simulated transaction data only and does not connect to real banking systems, production payment infrastructure, machine learning services, or real-time fraud detection feeds.

## Features

- Summary cards for total transactions, transaction value, flagged transactions, and high-risk transactions
- Search by transaction ID, customer ID, or merchant
- Filters for risk level, transaction category, and status
- Sorting by date, amount, and risk score
- Charts for transaction volume, risk distribution, and transaction categories
- Selectable transaction table with a detail inspection panel
- Collapsible sidebar navigation
- Responsive dashboard layout for desktop and smaller screens

## Tech Stack

- React.js
- JavaScript
- HTML5
- CSS3
- Vite
- Lucide React
- Recharts

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL printed by Vite, usually:

```text
http://localhost:5173/
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```text
src/
  components/          Reusable dashboard UI components
  data/                Simulated transaction dataset
  utils/               Formatting and metric helpers
  App.jsx              Main dashboard composition and state
  main.jsx             React entry point
  styles.css           Application styling
```

## Data Notice

All transactions are simulated for demonstration purposes. Risk levels and statuses are static sample fields in the dataset. Rule-based fraud scoring is intentionally left for a later development step.
