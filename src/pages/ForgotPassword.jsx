import "../styles/ForgotPassword.css";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";
import fridge from "../assets/images/fridge 1.png";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
  if (!email.trim()) {
    Swal.fire({
      icon: "warning",
      title: "Email Required",
      text: "Please enter your email address.",
      confirmButtonColor: "#1A8FB4",
    });
    return;
  }

  try {
    const response = await axios.post(
      "https://fridgemate-ym3b.onrender.com/api/auth/forgot-password",
      { email }
    );

    Swal.fire({
      icon: "success",
      title: "Email Sent!",
      text: response.data.message,
      confirmButtonColor: "#1A8FB4",
    });

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text:
        error.response?.data?.message ||
        "Something went wrong",
      confirmButtonColor: "#1A8FB4",
    });
  }
};

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <div className="forgot-form">

          <img
            src={fridge}
            alt="FridgeMate"
            className="forgot-image"
          />

          <h1 className="forgot-heading">
            Forgot Password
          </h1>

          <p className="forgot-description">
            Enter your registered email address.
            We'll send you an OTP to reset your password.
          </p>

          <div className="forgot-input-box">
            <FaEnvelope className="forgot-input-icon" />

            <input
              className="forgot-input"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
  className="forgot-button"
  onClick={handleForgotPassword}
>
  Send Reset Link
</button>

          <p className="forgot-footer">
            Remember your password?
            <Link to="/login"> Login</Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;