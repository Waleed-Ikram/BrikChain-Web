import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import app from "../firebase/firebaseConfig";
import { getAuth } from "firebase/auth"; // Import the authentication handler
import { Link } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import ManageProperties from "./ManageProperties";


const db = getFirestore(app);
const auth = getAuth(); // Initialize the Firebase Auth

const DeveloperProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      const currentUser = auth.currentUser; // Get the current user from Firebase authentication

      if (currentUser) {
        try {
          const propertiesRef = collection(db, "Properties");
          const q = query(propertiesRef, where("developer_ID", "==", currentUser.uid)); // Use the current user's UID
          console.log(currentUser.id)
          const querySnapshot = await getDocs(q);
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
      } else {
        console.error("No user is currently signed in.");
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="full-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">
          My Properties
        </h1>
        {loading ? (
          <p className="text-center text-gray-600">Loading properties...</p>
        ) : properties.length > 0 ? (
          <div className="space-y-6">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row"
              >
                <Link to={`/manage-properties/${property.id}`}>
                  <img
                    src={property.Image_URL || "default_property_image.png"} // Fallback to a default image if no image URL is provided
                    alt={property.Name}
                    className="w-60 h-64 object-cover"
                  />
                </Link>
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
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No properties found.</p>
        )}
      </div>
    </div>
  );
};

export default DeveloperProperties;
