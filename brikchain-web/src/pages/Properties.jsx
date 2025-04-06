import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "../firebase/firebaseConfig";
import { Link } from "react-router-dom";

const db = getFirestore(app);

const PropertiesList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch properties from Firestore
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Properties"));
        const propertiesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProperties(propertiesData);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-black">
        Available Properties
      </h1>
      {loading ? (
        <p className="text-center text-gray-600">Loading properties...</p>
      ) : (
        <div className="space-y-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row"
            >

              
              {/* Property Image */}
              <Link to={`/property/${property.id}`}>
                <img
                  src={property.Image_URL}
                  alt={property.Name}
                  className="w-60 h-64 object-cover"
                />
              </Link>

              {/* Property Details */}
              <div className="p-6 flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {property.Name}
                </h2>
                <p className="text-gray-600 mb-2">
                  <strong>Price:</strong> PKR {property.Price.toLocaleString()}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Area:</strong> {property.Area} Marlas
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Location:</strong> {property.Location}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Description:</strong> {property.Description}
                </p>
                <p className="text-gray-600">
                  <strong>Developer:</strong>{" "}
                  {property.developer_ID || "Unknown"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertiesList;
