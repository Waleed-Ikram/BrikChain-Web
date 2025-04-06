import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "../firebase/firebaseConfig"; // Firebase configuration file
import homeImage from "../assets/homepage11.jpg"; // Importing the main homepage image

const db = getFirestore(app);

function Home() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]); // State to store properties
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch properties from Firestore
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Properties")); // Adjust collection name as necessary
        const propertiesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProperties(propertiesList);
      } catch (error) {
        console.error("Error fetching properties:", error);
        alert("Failed to load properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full h-[65vh]">
        <div className="relative w-full h-full">
          <img
            src={homeImage}
            alt="Real Estate Blockchain"
            className="w-full h-full object-cover"
          />
          {/* Text Overlay */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black bg-opacity-50">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
              Fractional Ownership Of Real Estate
            </h1>
            <p className="text-lg md:text-2xl font-medium text-gray-200">
              Real Estate Reinvented, Using The Blockchain
            </p>
            <button
              onClick={() => navigate("/signup")}
              className="mt-6 bg-orange-500 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg"
            >
              Join Us
            </button>
          </div>
        </div>
      </div>

      {/* About Fractional Ownership Section */}
      <div className="bg-white py-12 px-4 md:px-16 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">What is Fractional Ownership?</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
          Fractional ownership is a revolutionary concept that allows multiple investors to co-own high-value assets, 
          such as real estate, by dividing the asset into smaller, affordable shares. At <strong>BrikChain</strong>, 
          we are bringing this concept to life using blockchain technology, enabling secure, transparent, and 
          efficient transactions.
        </p>
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Choose BrikChain?</h3>
          <ul className="list-none text-gray-600 space-y-4">
            <li>
              <strong>Affordable Entry:</strong> Start investing in real estate with as little as $50 and grow your portfolio.
            </li>
            <li>
              <strong>Blockchain Security:</strong> Every transaction is recorded on the blockchain, ensuring transparency 
              and reducing fraud risks.
            </li>
            <li>
              <strong>Passive Income:</strong> Earn monthly rental income and capital gains as property values appreciate.
            </li>
            <li>
              <strong>Global Access:</strong> Invest in properties worldwide, without geographical barriers.
            </li>
          </ul>
        </div>
      </div>


      {/* Hottest Properties Section */}
      <div className="bg-gray-100 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Hottest Properties</h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading properties...</p>
        ) : properties.length === 0 ? (
          <p className="text-center text-gray-500">No properties available.</p>
        ) : (
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white shadow-md rounded-xl overflow-hidden"
              >
                {/* Income and Capital Rows */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex justify-between text-gray-700 font-medium mb-2">
                    <span>Location:</span>
                    <span>{property.Location || "N/A"}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 font-medium">
                    <span>Price:</span>
                    <span>
                      {property.Price
                        ? `$${parseFloat(property.Price).toLocaleString()}`
                        : "N/A"}
                    </span>
                  </div>
                </div>
                {/* Property Image */}
                <img
                  src={property.Image_URL || "https://via.placeholder.com/400?text=No+Image"}
                  alt={property.Name || "Property"}
                  className="w-full h-48 object-cover"
                />
                {/* Property Name */}
                <div className="p-4 text-center">
                  <h3 className="text-xl font-bold text-gray-800">
                    {property.Name || "Unnamed Property"}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {property.Description || "No description available"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
