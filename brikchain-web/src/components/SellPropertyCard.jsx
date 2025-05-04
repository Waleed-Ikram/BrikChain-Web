import React from "react";

function SellPropertyCard() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">Sell</h3>
      <div className="flex justify-between mb-4">
        <label className="text-gray-500">BRIK</label>
        <select className="border px-2 py-1 rounded">
          <option value="Goldcrest">Goldcrest</option>
          <option value="Opal">Opal</option>
          <option value="Opus">Opus</option>
        </select>
      </div>
      <input
        type="text"
        placeholder="5,000"
        className="w-full border px-3 py-2 rounded mb-4"
      />
      <button className="w-full bg-green-500 text-white font-medium py-2 rounded hover:bg-green-600">
        Sell Property
      </button>
    </div>
  );
}

export default SellPropertyCard;
