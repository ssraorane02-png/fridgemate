import "../styles/ResetPassword.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { FaLock } from "react-icons/fa";
import fridge from "../assets/images/fridge 1.png";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const { token } = useParams();
  const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleReset = async () => {
  if (!newPassword || !confirmPassword) {
    Swal.fire({
      icon: "warning",
      title: "Missing Fields",
      text: "Please fill in both password fields.",
      confirmButtonColor: "#1A8FB4",
    });
    return;
  }

  if (!passwordRegex.test(newPassword)) {
  Swal.fire({
    icon: "error",
    title: "Weak Password",
    text:
      "Password must be at least 8 characters long and include uppercase, lowercase, number and special character.",
    confirmButtonColor: "#1A8FB4",
  });
  return;
}

  if (newPassword !== confirmPassword) {
    Swal.fire({
      icon: "error",
      title: "Passwords do not match",
      confirmButtonColor: "#1A8FB4",
    });
    return;
  }

  try {
    const response = await axios.post(
      `https://fridgemate-ym3b.onrender.com/api/auth/reset-password/${token}`,
      {
        password: newPassword,
      }
    );

    Swal.fire({
      icon: "success",
      title: "Success",
      text: response.data.message,
      confirmButtonColor: "#1A8FB4",
    }).then(() => {
      navigate("/login");
    });

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text:
        error.response?.data?.message ||
        "Password reset failed",
      confirmButtonColor: "#1A8FB4",
    });
  }
};
  return (
    <div className="reset-container">
      <div className="reset-box">
        <div className="reset-form">

          <img
            src={fridge}
            alt="FridgeMate"
            className="reset-image"
          />

          <h1 className="reset-heading">
            Reset Password
          </h1>

          <p className="reset-description">
            Enter your new password below.
          </p>

          <div className="reset-input-box">
            <FaLock className="reset-icon" />

            <input
              type="password"
              placeholder="New Password"
              className="reset-input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="reset-input-box">
            <FaLock className="reset-icon" />

            <input
              type="password"
              placeholder="Confirm Password"
              className="reset-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            className="reset-button"
            onClick={handleReset}
          >
            Reset Password
          </button>

        </div>
      </div>
    </div>
  );
}

export default ResetPassword;