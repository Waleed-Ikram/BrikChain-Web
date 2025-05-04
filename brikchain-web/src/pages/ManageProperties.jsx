import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import app from "../firebase/firebaseConfig";
import { FaArrowLeft } from "react-icons/fa";
import GenerateTokenCard from "../components/GenerateTokenCard"; // Import the GenerateTokenCard

const db = getFirestore(app);

const ManageProperties = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newImage, setNewImage] = useState('');
  const [transferAddress, setTransferAddress] = useState('');
  const [tokenCount, setTokenCount] = useState('');

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
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

  const handleAddImage = async () => {
    if (newImage) {
      const propertyRef = doc(db, "Properties", id);
      try {
        await updateDoc(propertyRef, {
          Images: arrayUnion(newImage)
        });
        alert("Image added successfully!");
        setNewImage(''); // Clear the input after adding
      } catch (error) {
        console.error("Error adding image:", error);
        alert("Failed to add image.");
      }
    }
  };

  const handleTransferToken = () => {
    alert(`Transferring property token to ${transferAddress}`);
    // Here, integrate your token transfer functionality
  };

  const handleListProperty = () => {
    alert(`Listing ${tokenCount} tokens on the marketplace`);
    // Here, integrate your token listing functionality
  };

  const handleCancelListing = () => {
    alert("Cancelling property listing");
    // Here, integrate your cancel listing functionality
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-md p-4">
        <div className="container mx-auto flex items-center space-x-4">
          <div onClick={() => navigate("/developer-properties")} className="cursor-pointer text-gray-700 hover:text-gray-900 flex items-center">
            <FaArrowLeft className="text-2xl" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{property.Name}</h1>
            <p className="text-gray-600">{property.Location}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {property.Images?.map((image, index) => (
              <img key={index} src={image} alt={`Property ${index}`} className="w-full h-80 object-cover rounded-lg mb-4" />
            ))}
            <input type="text" value={newImage} onChange={(e) => setNewImage(e.target.value)} placeholder="Add new image URL" className="mt-2 border p-2 w-full" />
            <button onClick={handleAddImage} className="mt-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg">Add Image </button>

            <div>
                <br></br>
            </div>

             {/* Images Section */}
            <div>
                <img
                    src={property.Image_URL}
                    alt={property.Name}
                    className="w-full h-80 object-cover rounded-lg mb-4"
                />
            </div>
            
            <div className="mt-6 bg-white p-4 shadow-md rounded-lg">
              <h2 className="text-xl font-bold">Overview</h2>
              <p><strong>Developer:</strong> {property.developer_ID || "Unknown"}</p>
              <p><strong>Price:</strong> PKR {property.Price.toLocaleString()}</p>
              <p><strong>Area:</strong> {property.Area} Marlas</p>
              <p><strong>Description:</strong> {property.Description}</p>
            </div>
          </div>
          <div>
         
            <div className="col-span-12 lg:col-span-6 xl:col-span-3">
               <GenerateTokenCard />
            </div>

            <div>
                <br></br>
            </div>

            <div className="card bg-white p-4 shadow-md mb-4">
              <h2 className="text-lg font-bold mb-2">Transfer Property Token</h2>
              <input type="text" value={transferAddress} onChange={(e) => setTransferAddress(e.target.value)} placeholder="MetaMask Wallet Address" className="border p-2 w-full mb-2" />
              <button onClick={handleTransferToken} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">Transfer Token</button>
            </div>
            <div className="card bg-white p-4 shadow-md mb-4">
              <h2 className="text-lg font-bold mb-2">List Property Token</h2>
              <input type="number" value={tokenCount} onChange={(e) => setTokenCount(e.target.value)} placeholder="Number of Tokens to List" className="border p-2 w-full mb-2" />
              <button onClick={handleListProperty} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">List Property</button>
            </div>
            <div className="card bg-white p-4 shadow-md">
              <h2 className="text-lg font-bold mb-2">Cancel Listing</h2>
              <button onClick={handleCancelListing} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">Cancel Listing</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProperties;
