import React, { useState, useEffect } from "react";
import { fetchCollectionData } from "../firebase/firebaseUtils";
import DashboardSidebar from "../components/DashboardSidebar";
import TopPropertiesCard from "../components/TopPropertiesCard";
import InvestmentStatsCard from "../components/InvestmentStatsCard";
import PortfolioCard from "../components/PortfolioCard";
import PortfolioGrowthChart from "../components/PortfolioGrowthChart";
import WithdrawalCard from "../components/WithdrawalCard";
import WalletCard from "../components/WalletCard";
import BuyBriksCard from "../components/BuyBriksCard"; // Import the BuyBriksCard component
import TransferBriksCard from "../components/TransferBrikCard";

function Dashboard() {
  const [topProperties, setTopProperties] = useState([]);
  const [investmentStats, setInvestmentStats] = useState({});
  const [portfolio, setPortfolio] = useState([]);
  const [portfolioGrowth, setPortfolioGrowth] = useState([]);
  const [withdrawals, setWithdrawals] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await db.collection("dashboardData").get();
        const data = snapshot.docs.map((doc) => doc.data());
        // Process the data to separate into different states
        setTopProperties(data.topProperties || []);
        setInvestmentStats(data.investmentStats || {});
        setPortfolio(data.portfolio || []);
        setPortfolioGrowth(data.portfolioGrowth || []);
        setWithdrawals(data.withdrawals || {});
      } catch (error) {
        console.error("Error fetching Firestore data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading Dashboard...</div>;

  return (
    <div className="flex">
      <DashboardSidebar />

      <div className="ml-0 mr-72 p-6 bg-gray-100 min-h-screen w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Investor Dashboard</h1>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-6 xl:col-span-4">
            <TopPropertiesCard properties={topProperties} />
          </div>
           {/* Buy Briks Card */}
           <div className="col-span-12 lg:col-span-4 xl:col-span-4">
            <BuyBriksCard />
          </div>

           {/* Transfer Briks Card */}
           <div className="col-span-12 lg:col-span-4 xl:col-span-4">
            <TransferBriksCard />
          </div>


          {/* <div className="col-span-12 lg:col-span-6 xl:col-span-4">
            <InvestmentStatsCard stats={investmentStats} />
          </div> */}

          {/* <div className="col-span-12 lg:col-span-6 xl:col-span-4">
            <WithdrawalCard withdrawals={withdrawals} />
          </div> */}
          <div className="col-span-12 lg:col-span-8">
            <PortfolioCard portfolio={portfolio} />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <PortfolioGrowthChart growthData={portfolioGrowth} />
          </div>
         
        </div>
      </div>

      <div className="fixed right-0 top-16 bottom-0 h-fit w-72 p-6 bg-white shadow-lg">
        <WalletCard withdrawals={withdrawals} />
        <div>
          <br></br>
        </div>
        <WithdrawalCard withdrawals={withdrawals} />

        <div>
          <br></br>
        </div>

        <InvestmentStatsCard stats={investmentStats} />

      </div>
    </div>
  );
}

export default Dashboard;

