import React from "react";

function PortfolioCard() {
  // Dummy portfolio data
  const portfolio = [
    {
      id: 1,
      name: "Luxury Apartment - Downtown",
      briks: 50,
    },
    {
      id: 2,
      name: "Beachfront Villa",
      briks: 10,
    },
    {
      id: 3,
      name: "Commercial Plaza - City Center",
      briks: 20,
    },
    {
      id: 4,
      name: "Suburban Family Home",
      briks: 50,
    },
    {
      id: 5,
      name: "Modern Studio - Uptown",
      briks: 50,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">My Portfolio</h2>
      <div className="divide-y">
        {portfolio.map((item) => (
          <div key={item.id} className="flex justify-between items-center py-4">
            {/* Property Name */}
            <span className="font-medium text-gray-800">{item.name}</span>
            {/* Briks */}
            <span className="text-blue-600 font-bold">{item.briks} Briks</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PortfolioCard;
