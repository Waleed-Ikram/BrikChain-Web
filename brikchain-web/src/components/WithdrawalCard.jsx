import React from "react";

function WithdrawalCard() {
  // Dummy withdrawal data
  const withdrawals = {
    balance: 12500, // Total balance in the account
    monthlyProfit: 750, // Profit earned this month
    lastWithdrawal: "2023-12-15", // Date of the last withdrawal
    pendingWithdrawals: 2, // Number of pending withdrawal requests
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">Withdrawals</h2>
      
      {/* Current Balance */}
      <div className="mb-4">
        <p className="text-gray-700">Total Balance:</p>
        <p className="font-bold text-2xl text-purple-600">
          ${withdrawals.balance.toLocaleString()}
        </p>
      </div>
      
      {/* Monthly Profit */}
      <div className="mb-4">
        <p className="text-gray-700">Monthly Profit:</p>
        <p className="text-xl font-semibold text-green-500">
          ${withdrawals.monthlyProfit.toLocaleString()}
        </p>
      </div>

      {/* Last Withdrawal */}
      <div className="mb-4">
        <p className="text-gray-700">Last Withdrawal:</p>
        <p className="text-gray-600">{withdrawals.lastWithdrawal}</p>
      </div>

      {/* Pending Withdrawals */}
      <div>
        <p className="text-gray-700">Pending Withdrawals:</p>
        <p className="text-xl font-semibold text-red-500">
          {withdrawals.pendingWithdrawals} Request(s)
        </p>
      </div>
    </div>
  );
}

export default WithdrawalCard;
