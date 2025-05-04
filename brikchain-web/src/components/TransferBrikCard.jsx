import React, { useState } from 'react';

const TransferBriksCard = () => {
  const [receiverAddress, setReceiverAddress] = useState('');
  const [briksAmount, setBriksAmount] = useState('');
  const [amountInDollars, setAmountInDollars] = useState('');
  const [amountInEthereum, setAmountInEthereum] = useState('');

  // Function to handle the conversion (Placeholder)
  const handleConversion = (briks) => {
    // Dummy conversion rates
    const dollarRate = 2; // Assume 1 Brik = 2 USD
    const ethRate = 0.001; // Assume 1 Brik = 0.001 ETH
    setAmountInDollars(briks * dollarRate);
    setAmountInEthereum(briks * ethRate);
  };

  const handleBriksChange = (e) => {
    const briks = e.target.value;
    setBriksAmount(briks);
    handleConversion(briks);
  };

  const handleTransfer = () => {
    alert(`Transferring ${briksAmount} Briks to ${receiverAddress}`);
    // Here you would typically call a function that interacts with a blockchain
  };

  return (
    <div className="card bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Transfer Briks</h2>

      {/* Wallet Address Input */}
      <div className="mb-4">
        <label htmlFor="walletAddress" className="block text-sm font-medium text-gray-700">Receiver's Wallet Address</label>
        <input
          type="text"
          id="walletAddress"
          value={receiverAddress}
          onChange={(e) => setReceiverAddress(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter wallet address"
        />
      </div>

      {/* Briks Amount Input */}
      <div className="mb-4">
        <label htmlFor="briksAmount" className="block text-sm font-medium text-gray-700">Amount of Briks</label>
        <input
          type="number"
          id="briksAmount"
          value={briksAmount}
          onChange={handleBriksChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter amount of Briks"
        />
      </div>

      {/* Amount in Dollars and Ethereum */}
      <div className="mb-4">
        <p className="text-sm text-gray-700"><strong>Equivalent in USD:</strong> ${amountInDollars}</p>
        <p className="text-sm text-gray-700"><strong>Equivalent in ETH:</strong> {amountInEthereum} ETH</p>
      </div>

      {/* Transfer Button */}
      <button
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleTransfer}
      >
        Transfer Briks
      </button>
    </div>
  );
};

export default TransferBriksCard;
