import React, { useState } from "react";

// Data for different timeframes
const marketDataByTimeFrame = {
  "24H": [
    { name: "Opal", price: 185, return: " 0.75%", trend: "up" },
    { name: "Mansion", price: 140, return: " 1.25%", trend: "up" },
    { name: "Dolmen", price: 900, return: "-0.40%", trend: "down" },
  ],
  "7D": [
    { name: "Opal", price: 180, return: " 5.25%", trend: "up" },
    { name: "Mansion", price: 130, return: " 8.50%", trend: "up" },
    { name: "Dolmen", price: 910, return: "-2.30%", trend: "down" },
  ],
  "1M": [
    { name: "Opal", price: 175, return: "15.45%", trend: "up" },
    { name: "Mansion", price: 125, return: "25.30%", trend: "up" },
    { name: "Dolmen", price: 920, return: "10.75%", trend: "up" },
  ],
  "1Y": [
    { name: "Opal", price: 160, return: "45.85%", trend: "up" },
    { name: "Mansion", price: 115, return: "55.60%", trend: "up" },
    { name: "Dolmen", price: 950, return: "35.20%", trend: "up" },
  ],
};

function MarketValuesTable() {
  const [currency, setCurrency] = useState("USD");
  const [timeFrame, setTimeFrame] = useState("24H");

  // Get market data for the selected time frame
  const marketData = marketDataByTimeFrame[timeFrame];

  // Convert price to Briks (1 Brik = 10 USD for demonstration purposes)
  const convertToBriks = (price) => (currency === "USD" ? price : price / 10);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-bold">Market Values</h3>
        <div className="flex space-x-2">
          {/* Currency Selector */}
          <select
            className="border px-2 py-1 rounded focus:ring focus:ring-green-300"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="Briks">Briks</option>
          </select>
          {/* Time Frame Selector */}
          <select
            className="border px-2 py-1 rounded focus:ring focus:ring-green-300"
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
          >
            <option value="24H">24 Hours</option>
            <option value="7D">7 Days</option>
            <option value="1M">1 Month</option>
            <option value="1Y">1 Year</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-gray-500">
            <th className="pb-2">CURRENCY NAME</th>
            <th>{`PRICE (${currency})`}</th>
            <th>Return per annum</th>
            <th>STATISTIC</th>
          </tr>
        </thead>
        <tbody>
          {marketData.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="py-2">{item.name}</td>
              <td>
                {currency === "USD"
                  ? `$${convertToBriks(item.price).toLocaleString()}`
                  : `${convertToBriks(item.price).toLocaleString()} Briks`}
              </td>
              <td>{item.return}</td>
              <td>
                {item.trend === "up" ? "📈" : item.trend === "down" ? "📉" : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <p className="text-gray-400 text-xs mt-4">
        Data shown for the selected time frame: <strong>{timeFrame}</strong>.
      </p>
    </div>
  );
}

export default MarketValuesTable;
