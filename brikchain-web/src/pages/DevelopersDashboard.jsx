import React, { useState, useEffect } from "react";
import { fetchCollectionData } from "../firebase/firebaseUtils";
import DashboardSidebar from "../components/DashboardSidebar";
import PortfolioGrowthCard from "../components/PortfolioGrowthCard";
import MarketValuesTable from "../components/MarketValuesTable";
import WalletCard from "../components/WalletCard";
import WithdrawalCard from "../components/WithdrawalCard";
import GenerateTokenCard from "../components/GenerateTokenCard"; // Import the GenerateTokenCard

function DevelopersDashboard() {
  const [portfolioGrowth, setPortfolioGrowth] = useState(null);
  const [marketValues, setMarketValues] = useState(null);
  const [withdrawals, setWithdrawals] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [growthData, marketData, withdrawalData] = await Promise.all([
          fetchCollectionData("portfolioGrowth"),
          fetchCollectionData("marketValues"),
          fetchCollectionData("withdrawals"),
        ]);

        setPortfolioGrowth(growthData || []);
        setMarketValues(marketData || []);
        setWithdrawals(withdrawalData[0] || {});
      } catch (error) {
        console.error("Error fetching Firestore data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex">
      <DashboardSidebar />

      <div className="ml-0 mr-72 p-6 bg-gray-100 min-h-screen w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Developers Dashboard</h1>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-6 xl:col-span-3">
            {portfolioGrowth ? (
              <PortfolioGrowthCard data={portfolioGrowth} />
            ) : (
              <div className="bg-gray-200 animate-pulse rounded-lg h-40"></div>
            )}
          </div>

          <div className="col-span-12 lg:col-span-6 xl:col-span-3">
            <GenerateTokenCard />
          </div>

          <div className="col-span-12 lg:col-span-6 xl:col-span-3">
            {withdrawals ? (
              <WithdrawalCard withdrawals={withdrawals} />
            ) : (
              <div className="bg-gray-200 animate-pulse rounded-lg h-40"></div>
            )}
          </div>

          <div className="col-span-12">
            {marketValues ? (
              <MarketValuesTable data={marketValues} />
            ) : (
              <div className="bg-gray-200 animate-pulse rounded-lg h-56"></div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed right-0 top-16 bottom-0 h-fit w-72 p-6 bg-white shadow-lg">
        <WalletCard />
      </div>
    </div>
  );
}

export default DevelopersDashboard;
