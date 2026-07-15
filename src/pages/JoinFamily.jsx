import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./../styles/JoinFamily.css";
import { FaUsers } from "react-icons/fa";
import { useState } from "react";

function JoinFamily() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const handleJoin = async () => {
    if (!name.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Enter Name",
        text: "Please enter your name.",
      });
      return;
    }

    try {
      await axios.post(
        "https://fridgemate-ym3b.onrender.com/api/family/join",
        {
          token,
          name,
        }
      );

      Swal.fire({
        icon: "success",
        title: "Joined!",
        text: "You joined the family successfully.",
      }).then(() => {
        navigate("/family-sharing");
      });

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Invalid invitation.",
      });
    }
  };

  return (
    <div className="join-family-page">
      <div className="join-family-card">
        <FaUsers className="join-family-icon" />

        <h1>Join Family</h1>

        <p>
          You have been invited to join a FridgeMate
          family group. Click below to accept the
          invitation and start sharing your fridge.
        </p>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="join-input"
        />

        <button
          className="join-btn"
          onClick={handleJoin}
        >
          Join Family
        </button>
      </div>
    </div>
  );
}

export default JoinFamily;