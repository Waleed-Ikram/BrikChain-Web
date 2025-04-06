import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/login-image.jpg";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, setDoc, doc, serverTimestamp, getDoc } from "firebase/firestore";
import app from "../firebase/firebaseConfig"; // Firebase config

const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    role: "Investor", // Default Role
  });

  const [error, setError] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Add user data to Firestore
  const addUserToFirestore = async (user, additionalData = {}) => {
    const { phone, address, role } = formData;
    await setDoc(doc(db, "Users", user.uid), {
      User_ID: user.uid,
      User_name: user.displayName || additionalData.fullName || "Anonymous",
      Email: user.email,
      Phone_no: phone || "",
      Address: address || "",
      Role: role || "Investor",
      bio: "",
      coverPicture: "",
      followers: ["", ""],
      following: ["", ""],
      joinedDate: serverTimestamp(),
      profilePicture: user.photoURL || "",
    });
  };

  // Handle Signup with Email and Password
  const handleSignup = async (e) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user to Firestore
      await addUserToFirestore(user, { fullName });

      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle Signup with Google

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
  
      // Check if user already exists in Firestore
      const userDocRef = doc(db, "Users", user.uid); // Reference to the document
      const userSnapshot = await getDoc(userDocRef); // Fetch the document
  
      if (!userSnapshot.exists()) {
        // If the user doesn't exist, add them to Firestore
        await addUserToFirestore(user);
      }
  
      alert("Signup successful with Google!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Image Section */}
      <div className="hidden md:block w-1/2">
        <img src={loginImage} alt="Signup" className="w-full h-full object-cover" />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="max-w-md w-full p-8 shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-center text-black mb-6">Sign Up</h2>
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            {/* Full Name */}
            <div>
              <input
                type="text"
                id="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <input
                type="text"
                id="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Address */}
            <div>
              <input
                type="text"
                id="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Role Dropdown */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
              <select
                id="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Investor">Investor</option>
                <option value="Developer">Developer</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Sign Up
            </button>
          </form>

          {/* Google Sign-Up Button */}
          <div className="mt-4 text-center">
            <button
              onClick={handleGoogleSignup}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            >
              Sign Up with Google
            </button>
          </div>

          {/* Redirect to Login */}
          <p className="text-center text-gray-500 text-sm mt-4">
            Already have an account?{" "}
            <button onClick={() => navigate("/login")} className="text-blue-500 hover:underline">
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;