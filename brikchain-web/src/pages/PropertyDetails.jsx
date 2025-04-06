import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from "../firebase/firebaseConfig";
import { FaArrowLeft } from "react-icons/fa";

const db = getFirestore(app);

const PropertyDetails = () => {
  const { id } = useParams(); // Get property ID from URL
  const navigate = useNavigate(); // React Router hook for navigation
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch property details from Firestore
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const docRef = doc(db, "Properties", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProperty(docSnap.data());
        } else {
          console.error("No such property!");
        }
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!property) {
    return <div className="min-h-screen flex items-center justify-center">Property not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="bg-white shadow-md p-4">
        <div className="container mx-auto flex items-center space-x-4">
          {/* Back Arrow */}
          <div
            className="cursor-pointer text-gray-700 hover:text-gray-900 flex items-center"
            onClick={() => navigate("/properties")}
          >
            <FaArrowLeft className="text-2xl" />
          </div>
          {/* Property Title */}
          <div>
            <h1 className="text-3xl font-bold">{property.Name}</h1>
            <p className="text-gray-600">{property.Location}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Images Section */}
          <div>
            <img
              src={property.Image_URL}
              alt={property.Name}
              className="w-full h-80 object-cover rounded-lg mb-4"
            />
          </div>

          {/* Details Section */}
          <div>
            <h2 className="text-2xl font-bold text-black mb-4">Overview</h2>
            <p className="mb-2">
              <strong>Developer:</strong> {property.developer_ID || "Unknown"}
            </p>
            <p className="mb-2">
              <strong>Price:</strong> PKR {property.Price.toLocaleString()}
            </p>
            <p className="mb-2">
              <strong>Area:</strong> {property.Area} Marlas
            </p>
            <p className="mb-2">
              <strong>Description:</strong> {property.Description}
            </p>
          </div>
        </div>

        {/* Evaluation Section */}
        <div className="bg-blue-50 p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-bold mb-4">Evaluation</h2>
          <p>
            <strong>Per Token:</strong> PKR {(property.Price / property.Token_count).toFixed(2)}
          </p>
          <p>
            <strong>Total Tokens:</strong> {property.Token_count}
          </p>
        </div>

        {/* Buy Button */}
        <div className="mt-6">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => alert(Buy tokens for ${property.Name})}
          >
            Buy Tokens
          </button>

          <div>
            <br></br>
          </div>

           {/* Buy Button */}
        
          <button
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
            onClick={() => alert(Sell tokens for ${property.Name})}
          >
            Sell Tokens
          </button>

        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;