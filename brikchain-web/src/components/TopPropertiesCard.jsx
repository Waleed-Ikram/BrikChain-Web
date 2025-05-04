import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "../firebase/firebaseConfig"; // Firebase configuration file

const db = getFirestore(app);

function TopPropertiesCard() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch properties from Firestore
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Properties"));
        const propertiesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProperties(propertiesList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching properties: ", error);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="card bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Top Properties</h2>

      {loading ? (
        <p className="text-gray-500 text-center">Loading properties...</p>
      ) : properties.length === 0 ? (
        <p className="text-gray-500 text-center">No properties available.</p>
      ) : (
        <div className="overflow-y-auto h-96 space-y-6">
          {properties.map((property) => (
            <div key={property.id} className="flex flex-col">
              {/* Image */}
              {property.Image_URL ? (
                <img
                  src={property.Image_URL}
                  alt={property.Name}
                  className="w-full h-40 object-cover rounded"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}

              {/* Property Details */}
              <h3 className="font-bold mt-2 text-lg">{property.Name}</h3>
              <p className="text-gray-600">{property.Location}</p>
              <p className="text-blue-600 font-semibold">
                Price: ${property.Price?.toLocaleString()}
              </p>
              <p className="text-gray-600">Tokens: {property.Token_count}</p>
              <p className="text-gray-500 text-sm mt-1">
                Description: {property.Description || "No description available"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TopPropertiesCard;
