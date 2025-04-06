import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/login-image.jpg";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { UserContext } from "../context/UserContext"; // Import UserContext
import app from "../firebase/firebaseConfig";

const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

function Login() {
  const { setUser } = useContext(UserContext); // Access UserContext to update the user state
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Fetch user details from Firestore
      const userDoc = await getDoc(doc(db, "Users", firebaseUser.uid));
      if (userDoc.exists()) {
        const userData = { ...firebaseUser, role: userDoc.data().Role };
        setUser(userData); // Update the UserContext
        console.log("User logged in:", userData);

        // Navigate based on user role
        if (userData.role === "Investor") {
          navigate("/");
        } else if (userData.role === "Developer") {
          navigate("/");
        } else {
          alert("Unknown role. Please contact support.");
        }
      } else {
        setError("No user data found in Firestore.");
      }
    } catch (err) {
      console.error(err.message);
      setError("Failed to log in. Please check your credentials.");
    }
  };

  // Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      // Check if user exists in Firestore
      const userDocRef = doc(db, "Users", firebaseUser.uid);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        // If the user doesn't exist in Firestore, add a new entry
        const newUserData = {
          User_ID: firebaseUser.uid,
          User_name: firebaseUser.displayName || "Anonymous",
          Email: firebaseUser.email,
          Phone_no: "", // Default empty
          Address: "", // Default empty
          Role: "Investor", // Default role
          bio: "",
          coverPicture: "",
          followers: [],
          following: [],
          joinedDate: serverTimestamp(),
          profilePicture: firebaseUser.photoURL || "",
        };

        await setDoc(userDocRef, newUserData);
        console.log("New user created:", newUserData);
        setUser({ ...firebaseUser, role: "Investor" });
      } else {
        const existingUserData = { ...firebaseUser, role: userSnapshot.data().Role };
        setUser(existingUserData);
        console.log("Existing user logged in:", existingUserData);
      }

      alert("Login successful with Google!");

      // Navigate based on role
      if (userSnapshot.exists() && userSnapshot.data().Role === "Developer") {
        navigate("/");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err.message);
      setError("Failed to log in with Google.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Image Section */}
      <div className="hidden md:flex w-1/2 bg-gray-100">
        <img
          src={loginImage}
          alt="Login Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Form Section */}
      <div className="flex flex-col w-full md:w-1/2 justify-center items-center bg-white px-8 py-16 shadow-lg">
        <div className="max-w-md w-full p-8 shadow-lg rounded-lg">
          {/* Slogan */}
          <h1 className="text-4xl font-bold text-black mb-2 text-center">
            Lay your own Brik!
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Join the revolution of fractional real estate ownership.
          </p>

          {/* Login Form */}
          <form className="w-full max-w-md" onSubmit={handleLogin}>
            {/* Error Display */}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            {/* Email */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="haris@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Login Button */}
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Login
              </button>
            </div>
          </form>

          {/* Google Login Button */}
          <div className="mt-4 text-center">
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            >
              Login with Google
            </button>
          </div>

          {/* Footer */}
          <p className="text-gray-600 text-sm mt-6">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-blue-500 hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;