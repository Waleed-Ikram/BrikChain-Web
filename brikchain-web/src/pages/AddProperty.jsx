import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import app from "../firebase/firebaseConfig"; // Firebase config
import DashboardSidebar from "../components/DashboardSidebar";
import { UserContext } from "../context/UserContext"; // Import UserContext

const db = getFirestore(app);

function AddProperty() {
  const { user } = useContext(UserContext); // Access the current user
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    area: "",
    description: "",
    imageURL: "", // Field for user-provided image URL
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Validate image URL
  const isValidImageURL = (url) => {
    const pattern = /\.(jpeg|jpg|gif|png)$/;
    return pattern.test(url);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const { name, location, price, area, description, imageURL } = formData;

    // Validate form fields
    if (!name || !location || !price || !area || !description || !imageURL) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    if (!isValidImageURL(imageURL)) {
      setError("Please enter a valid image URL (e.g., .jpg, .png).");
      setLoading(false);
      return;
    }

    try {
      console.log("Saving data to Firestore...");

      // Add property data to Firestore
      await addDoc(collection(db, "Properties"), {
        Name: name,
        Location: location,
        Price: parseFloat(price),
        Token_count: 100000, // Hardcoded token count
        Area: parseFloat(area),
        Description: description,
        Image_URL: imageURL, // User-entered image URL
        developer_ID: user?.uid || "Anonymous", // Current user ID or default
        timestamp: new Date(),
      });

      console.log("Data saved to Firestore successfully!");
      setSuccess("Property added successfully!");
      setFormData({
        name: "",
        location: "",
        price: "",
        area: "",
        description: "",
        imageURL: "",
      });
    } catch (err) {
      console.error("Error adding property:", err.message);
      setError("Failed to add property. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-grow min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-center  mb-6">Add Property</h2>
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          {success && <div className="text-green-500 text-center mb-4">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Property Name */}
            <div>
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                Property Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., The Vertical"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-gray-700 font-bold mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Bahria Town"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
                Price (in USD)
              </label>
              <input
                type="number"
                id="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g., 5700000"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Area */}
            <div>
              <label htmlFor="area" className="block text-gray-700 font-bold mb-2">
                Area (in Marlas)
              </label>
              <input
                type="number"
                id="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="e.g., 5"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                Description
              </label>
              <input
                type="text"
                id="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="e.g., Flat"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="imageURL" className="block text-gray-700 font-bold mb-2">
                Image URL
              </label>
              <input
                type="url"
                id="imageURL"
                value={formData.imageURL}
                onChange={handleChange}
                placeholder="e.g., https://example.com/image.jpg"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-myorange text-white py-2 rounded-lg hover:bg-myblue"
              disabled={loading}
            >
              {loading ? "Adding Property..." : "Add Property"}
            </button>
          </form>

          {/* Back Button */}
          <button
            onClick={() => navigate("/add-property")}
            className="mt-4 text-center text-myorange hover:underline w-full block"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProperty;
