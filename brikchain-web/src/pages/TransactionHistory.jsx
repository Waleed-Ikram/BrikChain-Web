import React from "react";
import DashboardSidebar from "../components/DashboardSidebar";

function TransactionHistory() {
  // Enhanced dummy transaction data
  const transactions = [
    {
      id: 1,
      date: "2023-12-01",
      description: "Purchased 175 shares in Downtown Plaza",
      amount: "-$10,500",
      type: "debit",
    },
    {
      id: 2,
      date: "2023-12-05",
      description: "Monthly Dividend from Beachfront Villa",
      amount: "+$1,200",
      type: "credit",
    },
    {
      id: 3,
      date: "2023-12-12",
      description: "Sold 50 Briks in Uptown Apartments",
      amount: "+$5,000",
      type: "credit",
    },
    {
      id: 4,
      date: "2023-12-15",
      description: "Withdrawal to Bank Account",
      amount: "-$3,000",
      type: "debit",
    },
    {
      id: 5,
      date: "2023-12-20",
      description: "Purchased shares in Suburban Homes",
      amount: "-$7,500",
      type: "debit",
    },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 p-6">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Transaction History</h1>

        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Date</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Description</th>
                  <th className="py-4 px-6 text-right font-semibold text-gray-700">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b hover:bg-gray-100 transition-colors"
                  >
                    <td className="py-4 px-6 text-gray-700">{transaction.date}</td>
                    <td className="py-4 px-6 text-gray-700">{transaction.description}</td>
                    <td
                      className={`py-4 px-6 text-right font-bold ${
                        transaction.type === "credit"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {transaction.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionHistory;
