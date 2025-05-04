import React from "react";

function InvestmentStatsCard({ stats }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4">Investment Stats</h2>
      <p>Total Investment: <span className="font-bold">{stats.totalInvestment}180 Briks</span></p>
      <p>Weekly Returns: <span className="text-green-500 p-2">{stats.weeklyReturns}12 Briks</span></p>
      <p>Weekly Expenses: <span className="text-red-500">{stats.expenses}2 Briks</span></p>
      <p className="pt-2">Weekly Profit: <span className="text-green-500">{stats.netProfit}10 Briks</span></p>
    </div>
  );
}

export default InvestmentStatsCard;
