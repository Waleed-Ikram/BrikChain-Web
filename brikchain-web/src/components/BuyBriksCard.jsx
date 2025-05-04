import React, { useState, useEffect } from 'react';

const BuyBriksCard = () => {
  const [briksAmount, setBriksAmount] = useState('');
  const [amountInDollars, setAmountInDollars] = useState(0);
  const [amountInEthereum, setAmountInEthereum] = useState(0);

  // Assume conversion rates (these should ideally come from a reliable data source or be state-managed globally if they change dynamically)
  const dollarRate = 2;  // 1 Brik = 2 USD
  const ethereumRate = 0.0005;  // 1 Brik = 0.0005 ETH

  // Calculate conversions when briksAmount changes
  useEffect(() => {
    if (briksAmount) {
      setAmountInDollars((briksAmount * dollarRate).toFixed(2));
      setAmountInEthereum((briksAmount * ethereumRate).toFixed(4));
    } else {
      setAmountInDollars(0);
      setAmountInEthereum(0);
    }
  }, [briksAmount]);

  return (
    <div className="card bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Buy Briks</h2>
      <div className="mb-4">
        <label htmlFor="briksAmount" className="block text-sm font-medium text-gray-700">Amount of Briks</label>
        <input
          type="number"
          id="briksAmount"
          value={briksAmount}
          onChange={(e) => setBriksAmount(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter amount"
        />
      </div>

      {/* Display the conversion results */}
      <div className="mb-4">
        <p className="text-gray-700"><strong>Amount in USD:</strong> ${amountInDollars}</p>
        <p className="text-gray-700"><strong>Amount in ETH:</strong> {amountInEthereum} ETH</p>
      </div>

      <button
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => alert(`Attempting to buy ${briksAmount} Briks`)}
      >
        Buy Briks
      </button>
    </div>
  );
};

export default BuyBriksCard;
