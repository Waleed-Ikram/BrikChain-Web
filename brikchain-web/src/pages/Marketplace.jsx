import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom"; // Import Link
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import graph2 from "../assets/graph2.png";
import bannerImg from "../assets/marketplace-pic2.jpg";
import { app } from "../firebase/firebaseConfig"; // Ensure your Firebase config is imported

const Marketplace = () => {
  const [tableData, setTableData] = useState([]);

  const fetchMarketplaceData = async () => {
    const db = getFirestore(app); // Initialize Firestore
    const tokensRef = collection(db, "tokens");
    const availableTokensQuery = query(tokensRef, where("Status", "==", "Available"));

    const fetchedData = [];
    const querySnapshot = await getDocs(availableTokensQuery);

    for (const tokenDoc of querySnapshot.docs) {
      const tokenData = tokenDoc.data();
      const propertyRef = doc(db, "properties", tokenData.Property_ID);
      const propertyDoc = await getDoc(propertyRef);

      fetchedData.push({
        rank: tokenData.rank || tokenData.Token_ID, // Rank should be stored in the tokens table
        project: tokenData.Name, // Property Name from tokens table
        price: tokenData.token_value, // Token Price from tokens table
        change: "-0.00%", // Placeholder change for now; you can calculate it
        eval: propertyDoc.exists() ? propertyDoc.data().Price : "N/A", // Property Price from properties table
        propertyId: tokenData.Property_ID // Store Property ID to use in Link
      });
    }

    // Sort by rank
    fetchedData.sort((a, b) => a.rank - b.rank);

    setTableData(fetchedData);
  };

  useEffect(() => {
    fetchMarketplaceData();
  }, []);

  return (
    <div className="font-sans">
      {/* Banner Section */}
      <section
        className="bg-cover bg-center h-[300px] flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <h2 className="text-5xl font-bold">Marketplace</h2>
      </section>

      {/* Table Section */}
      <section className="p-10 bg-gray-50">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-4 border">Ranking</th>
                <th className="p-4 border">Project</th>
                <th className="p-4 border">Token Price</th>
                <th className="p-4 border">7 Days</th>
                <th className="p-4 border">Evaluation</th>
                <th className="p-4 border">7 Day Graph</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="p-4 border">{item.rank}</td>
                  <td className="p-4 border">
                    <Link to={`/property/${item.propertyId}`} className="text-blue-500 hover:text-blue-600">
                      {item.project}
                    </Link>
                  </td>
                  <td className="p-4 border">{item.price}</td>
                  <td className="p-4 border font-semibold ${parseFloat(item.change) < 0 ? 'text-red-500' : 'text-green-500'}">
                    {item.change}
                  </td>
                  <td className="p-4 border">{item.eval}</td>
                  <td className="p-4 border">
                    <img src={graph2} alt={`Graph ${item.rank}`} className="w-24 h-auto" />
                  </td>
                </tr>
              ))}
              {tableData.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">
                    No available tokens at the moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Marketplace;
