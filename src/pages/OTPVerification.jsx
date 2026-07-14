import "../styles/OTPVerification.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import fridge from "../assets/images/fridge 1.png";

function OTPVerification() {

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join("");

    if (code.length !== 6) {
      Swal.fire({
        icon: "warning",
        title: "Invalid OTP",
        text: "Please enter the complete 6-digit OTP.",
        confirmButtonColor: "#1A8FB4",
      });
      return;
    }

   Swal.fire({
    icon: "success",
    title: "OTP Verified!",
    text: "Now create your new password.",
    confirmButtonColor: "#1A8FB4",
  }).then(() => {
    navigate("/resetpassword");
  });
  };
const handleResendOTP = () => {
  Swal.fire({
    icon: "success",
    title: "OTP Sent!",
    text: "A new OTP has been sent to your email.",
    confirmButtonColor: "#1A8FB4",
  });
};
  return (
    <div className="otp-container">

      <div className="otp-box">

        <div className="otp-form">

          <img
            src={fridge}
            alt="FridgeMate"
            className="otp-image"
          />

          <h1 className="otp-heading">
            Verify OTP
          </h1>

          <p className="otp-description">
            Enter the 6-digit OTP sent to your email.
          </p>

          <div className="otp-input-container">

            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                className="otp-input"
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) =>
                  handleChange(e.target.value, index)
                }
              />
            ))}

          </div>

          <button
            className="otp-button"
            onClick={handleVerify}
          >
            Verify OTP
          </button>

          <p className="otp-resend">
  Didn't receive the OTP?
  <span onClick={handleResendOTP}> Resend OTP</span>
</p>

          <p className="otp-footer">
            <Link to="/login">
              Back to Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default OTPVerification;