import "../styles/signup.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import fridge from "../assets/images/fridge 1.png";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Signup() {
  const navigate = useNavigate();

const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
});
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const handleSignup = async (e) => {
  e.preventDefault();

  const { fullName, email, password, confirmPassword } = formData;

  // Validation
  if (!fullName || !email || !password || !confirmPassword) {
    Swal.fire("Error", "Please fill all fields", "error");
    return;
  }

  if (!passwordRegex.test(password)) {
  Swal.fire({
    icon: "error",
    title: "Weak Password",
    text:
      "Password must be at least 8 characters long and include uppercase, lowercase, number and special character.",
  });
  return;
}

  if (password !== confirmPassword) {
    Swal.fire("Error", "Passwords do not match", "error");
    return;
  }

  try {
    const response = await axios.post(
      "https://fridgemate-ym3b.onrender.com/api/auth/signup",
      {
        fullName,
        email,
        password,
      }
    );

    Swal.fire("Success", response.data.message, "success");

    navigate("/login");

  } catch (error) {
    Swal.fire(
      "Error",
      error.response?.data?.message || "Signup failed",
      "error"
    );
  }
};
  return (
    <div className="signup-container">

      <div className="signup-box">

        {/* Background Glass Card */}
      

        {/* Signup Form */}
        <form className="signup-form" onSubmit={handleSignup}>

          <img
            src={fridge}
            alt="FridgeMate"
            className="signup-image"
          />

          <h1 className="signup-heading">
            Create Account
          </h1>

          <p className="signup-description">
            Join FridgeMate and keep your food fresh and organized.
          </p>

          <div className="signup-input-box">
            <FaUser className="signup-input-icon" />
            <input
  className="signup-input"
  type="text"
  name="fullName"
  placeholder="Enter your full name"
  value={formData.fullName}
  onChange={handleChange}
/>

          </div>

          <div className="signup-input-box">
            <FaEnvelope className="signup-input-icon" />
            <input
  className="signup-input"
  type="email"
  name="email"
  placeholder="Enter your email"
  value={formData.email}
  onChange={handleChange}
/>
          </div>

          <div className="signup-input-box">
            <FaLock className="signup-input-icon" />
            <input
  className="signup-input"
  type="password"
  name="password"
  placeholder="Create password"
  value={formData.password}
  onChange={handleChange}
/>
          </div>

          <div className="signup-input-box">
            <FaLock className="signup-input-icon" />
            <input
  className="signup-input"
  type="password"
  name="confirmPassword"
  placeholder="Confirm password"
  value={formData.confirmPassword}
  onChange={handleChange}
/>
          </div>

          <button
  type="submit"
  className="signup-button"
>
  Sign Up
</button>

          <p className="signup-footer">
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>

        </form>

      </div>

    </div>
  );
}

export default Signup;