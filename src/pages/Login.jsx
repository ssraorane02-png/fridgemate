import "../styles/login.css";
import { Link ,useNavigate} from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import fridge from "../assets/images/fridge 1.png";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Login() {
  const navigate = useNavigate();
  const handleLogin = async (e) => {
  e.preventDefault();

  const { email, password } = formData;

  if (!email || !password) {
    Swal.fire("Error", "Please fill all fields", "error");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        email,
        password,
      }
    );

    Swal.fire(
      "Success",
      response.data.message,
      "success"
    );

    // Save logged-in user
    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    navigate("/dashboard");

  } catch (error) {
    Swal.fire(
      "Error",
      error.response?.data?.message || "Login failed",
      "error"
    );
  }
};
const [formData, setFormData] = useState({
  email: "",
  password: "",
});
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
  return (
   
    <div className="login-page">

      <div className="login-wrapper">

        {/* Black background container */}
        <div className="right-card"></div>

        {/* Login Card */}
        <form
  className="login-card"
  onSubmit={handleLogin}
>

          <img
            src={fridge}
            alt="FridgeMate"
            className="login-logo"
          />

          <h1 className="login-title">
            Welcome Back
          </h1>

          <p className="login-subtitle">
            Sign in to continue using FreshSync
          </p>

          <div className="input-group-box">
            <FaEnvelope className="login-input-icon" />
            <input
  className="login-input"
  type="email"
  name="email"
  placeholder="Enter your email"
  value={formData.email}
  onChange={handleChange}
/>
          </div>

          <div className="input-group-box">
            <FaLock className="login-input-icon" />
            <input
  className="login-input"
  type="password"
  name="password"
  placeholder="Enter your password"
  value={formData.password}
  onChange={handleChange}
/>
          </div>

          <div className="login-options">
            <label>
              <input type="checkbox" />
              Remember Me
            </label>

            <Link to="/forgotpassword">Forgot Password?</Link>
          </div>

          <button
  type="submit"
  className="login-btn"
>
  Login
</button>

          <p className="signup-text">
            Don't have an account?
            <Link to="/signup"> Sign Up</Link>
          </p>

        </form>

      </div>
</div>
 
  );
}

export default Login;