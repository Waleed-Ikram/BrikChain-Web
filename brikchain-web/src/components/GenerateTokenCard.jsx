import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "../firebase/firebaseConfig";

const db = getFirestore(app);

const GenerateTokenCard = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "Properties"));
        const propertiesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
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
    <div className="card bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Generate Tokens</h2>
      <div className="mb-4">
        <label htmlFor="property" className="block text-sm font-medium text-gray-700">Select Property</label>
        {loading ? (
          <p>Loading properties...</p>
        ) : (
          <select
            id="property"
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a property</option>
            {properties.map(property => (
              <option key={property.id} value={property.id}>
                {property.name} - {property.location}
              </option>
            ))}
          </select>
        )}
      </div>
      <button
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => alert(`Preparing to tokenize property: ${selectedProperty}`)}
      >
        Generate Token
      </button>
    </div>
  );
};

export default GenerateTokenCard;
