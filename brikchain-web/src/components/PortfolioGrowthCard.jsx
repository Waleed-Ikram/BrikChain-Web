import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function PortfolioGrowthCard() {
  const [selectedPeriod, setSelectedPeriod] = useState("7D");

  // Data for different periods
  const dataMap = {
    "24H": {
      labels: ["6AM", "9AM", "12PM", "3PM", "6PM", "9PM"],
      values: [22000, 22100, 21000, 22500, 23000, 23200],
    },
    "7D": {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      values: [20000, 22000, 21000, 24000, 23000, 25000, 24000],
    },
    "1M": {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      values: [24000, 24200, 24500, 24300],
    },
    "1Y": {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      values: [21000, 22000, 23000, 24000, 25000, 25500, 25800, 26000, 26300, 26000, 26500, 27000],
    },
  };

  // Chart data for the selected period
  const chartData = {
    labels: dataMap[selectedPeriod].labels,
    datasets: [
      {
        label: "Portfolio Value",
        data: dataMap[selectedPeriod].values,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: `Portfolio Growth (${selectedPeriod})`,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Portfolio Growth</h3>
        <div className="flex space-x-2">
          {["24H", "7D", "1M", "1Y"].map((period) => (
            <button
              key={period}
              className={`text-xs font-medium px-2 py-1 rounded transition ${
                selectedPeriod === period
                  ? "bg-green-100 text-green-500"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
              onClick={() => setSelectedPeriod(period)}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="mt-4">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default PortfolioGrowthCard;
