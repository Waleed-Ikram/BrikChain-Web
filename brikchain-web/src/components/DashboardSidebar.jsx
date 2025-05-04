import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaHistory, FaChartBar, FaSignOutAlt, FaBuilding, FaRegBuilding } from "react-icons/fa";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";

function DashboardSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [userRole, setUserRole] = useState(null); // To store the user's role
  const navigate = useNavigate();
  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const currentUser = auth.currentUser;

        if (currentUser) {
          // Fetch the user's document from the "Users" collection using their UID
          const userDocRef = doc(db, "Users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserRole(userData.Role); // Retrieve the "Role" field
          } else {
            console.error("User document does not exist.");
          }
        } else {
          console.error("No user is currently signed in.");
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, [auth, db]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Successfully logged out.");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <div
      className={`h-[calc(100vh-4rem)] bg-gray-900 text-white sticky top-16 transition-all duration-300 z-10 overflow-y-auto ${
        isExpanded ? "w-64" : "w-20"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex flex-col items-center h-full">
        {/* Navigation Links */}
        <nav className="flex-1 w-full mt-6">
          <ul className="space-y-4">
            {/* Dashboard Link */}
            <li>
              <Link
                to={userRole === "Developer" ? "/developers" : "/dashboard"}
                className="flex items-center px-4 py-2 hover:bg-gray-700"
              >
                <FaHome className="text-2xl" />
                {isExpanded && <span className="ml-4 text-lg">Dashboard</span>}
              </Link>
            </li>

            {/* Transaction History Link */}
            <li>
              <Link
                to="/transactions"
                className="flex items-center px-4 py-2 hover:bg-gray-700"
              >
                <FaHistory className="text-2xl" />
                {isExpanded && (
                  <span className="ml-4 text-lg">Transaction History</span>
                )}
              </Link>
            </li>

            {/* Portfolio Link
            <li>
              <Link
                to="/portfolio"
                className="flex items-center px-4 py-2 hover:bg-gray-700"
              >
                <FaChartBar className="text-2xl" />
                {isExpanded && <span className="ml-4 text-lg">Portfolio</span>}
              </Link>
            </li> */}

            {/* Developer Properties Link (Visible only for Developers) */}
            {userRole === "Developer" && (
              <li>
                <Link
                  to="/developer-properties"
                  className="flex items-center px-4 py-2 hover:bg-gray-700"
                >
                  <FaRegBuilding className="text-2xl" />
                  {isExpanded && (
                    <span className="ml-4 text-lg">Manage Properties</span>
                  )}
                </Link>
              </li>
            )}

            {/* Add Property Link (Visible only for Developers) */}
            {userRole === "Developer" && (
              <li>
                <Link
                  to="/add-property"
                  className="flex items-center px-4 py-2 hover:bg-gray-700"
                >
                  <FaBuilding className="text-2xl" />
                  {isExpanded && (
                    <span className="ml-4 text-lg">Add Property</span>
                  )}
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Logout */}
        <div className="mt-auto mb-4">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-red-500 hover:text-red-700"
          >
            <FaSignOutAlt className="text-2xl" />
            {isExpanded && <span className="ml-4 text-lg">Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardSidebar;
