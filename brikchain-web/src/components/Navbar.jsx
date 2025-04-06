import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // Import UserContext
import { getAuth, signOut } from "firebase/auth";
import app from "../firebase/firebaseConfig";

function Navbar() {
  const { user, setUser } = useContext(UserContext); // Access user context
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear user context
      alert("Successfully logged out.");
      navigate("/"); // Redirect to the homepage
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  const getDashboardLink = () => {
    if (!user) {
      return "/login";
    }
    return user.role === "Investor" ? "/dashboard" : "/developers";
  };

  return (
    <nav className="bg-white-600 text-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="text-3xl font-semibold hover:text-gray-800">
          BrikChain
        </Link>

        {/* Links */}
        <div className="flex space-x-6">
          <Link to="/marketplace" className="hover:text-orange-500">
            Marketplace
          </Link>
          <Link to="/community" className="hover:text-orange-500">
            Community
          </Link>
          <Link to="/Properties" className="hover:text-orange-500">
            Properties
          </Link>
          <Link to={getDashboardLink()} className="hover:text-orange-500">
            Dashboard
          </Link>
        </div>

        {/* Login/Logout Button */}
        <div>
          {!user ? (
            <Link
              to="/login"
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-mygreen"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-red-500"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
