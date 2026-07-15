import "../styles/Settings.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import Swal from "sweetalert2";
import {
  FaUserCircle,
  FaLock,
  FaBell,
  FaSignOutAlt,
} from "react-icons/fa";
import axios from "axios";
import { useEffect } from "react";

function Settings() {
  const user = JSON.parse(
  localStorage.getItem("user")
);

const [profile, setProfile] =
  useState({
    name: "",
    email: "",
  });
  useEffect(() => {
  fetchProfile();
}, []);

const fetchProfile = async () => {
  try {
    const response =
      await axios.get(
        `https://fridgemate-ym3b.onrender.com/api/users/${user.id}`
      );

    setProfile(response.data);
  } catch (error) {
    console.log(error);
  }
};
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [expiryAlert, setExpiryAlert] = useState(true);
  const [shoppingAlert, setShoppingAlert] = useState(true);
  const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+=-])[A-Za-z\d@$!%*?&#^()_+=-]{8,}$/;

const isValidPassword = (password) =>
  passwordRegex.test(password);
  const [familyAlert, setFamilyAlert] = useState(true);

  const handlePassword = async () => {
  if (
    !currentPassword ||
    !newPassword ||
    !confirmPassword
  ) {
    Swal.fire({
      icon: "warning",
      title: "Missing Information",
      text:
        "Please fill all password fields.",
    });
    return;
  }

  if (
    newPassword !==
    confirmPassword
  ) {
    Swal.fire({
      icon: "error",
      title: "Passwords do not match",
    });
    return;
  }

  if (!isValidPassword(newPassword)) {
  Swal.fire({
    icon: "error",
    title: "Weak Password",
    text:
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.",
  });
  return;
}

  try {
    await axios.put(
      `https://fridgemate-ym3b.onrender.com/api/users/change-password/${user.id}`,
      {
        currentPassword,
        newPassword,
      }
    );

    Swal.fire({
      icon: "success",
      title:
        "Password Updated!",
    });

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  } catch (error) {
    Swal.fire({
      icon: "error",
      title:
        error.response?.data
          ?.message ||
        "Failed to update password",
    });
  }
};

  const handleLogout = () => {
  Swal.fire({
    title: "Logout?",
    text:
      "Are you sure you want to logout?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor:
      "#1A8FB4",
    confirmButtonText:
      "Logout",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem(
        "user"
      );

      window.location.href =
        "/login";
    }
  });
};

  return (
    <div className="settings-page">

      <Navbar
        toggleSidebar={() =>
          setSidebarOpen(!sidebarOpen)
        }
      />

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Sidebar />
          </div>
        </div>
      )}

      <div className="settings-container">

        <h1>Settings</h1>

        {/* Profile */}

        <div className="settings-card">

          <h2>
            <FaUserCircle />
            My Profile
          </h2>

          <p>
  <strong>Name:</strong> {profile.fullName}
</p>

<p>
  <strong>Email:</strong>{" "}
  {profile.email}
</p>

        </div>

        {/* Password */}

        <div className="settings-card">

          <h2>
            <FaLock />
            Change Password
          </h2>

          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
          />

          <button
            className="save-btn"
            onClick={handlePassword}
          >
            Update Password
          </button>

        </div>

        {/* Notifications */}

        <div className="settings-card">

          <h2>
            <FaBell />
            Notifications
          </h2>

          <label>
            <input
              type="checkbox"
              checked={expiryAlert}
              onChange={() =>
                setExpiryAlert(!expiryAlert)
              }
            />
            Expiry Alerts
          </label>

          <label>
            <input
              type="checkbox"
              checked={shoppingAlert}
              onChange={() =>
                setShoppingAlert(!shoppingAlert)
              }
            />
            Shopping Reminders
          </label>

          <label>
            <input
              type="checkbox"
              checked={familyAlert}
              onChange={() =>
                setFamilyAlert(!familyAlert)
              }
            />
            Family Invitations
          </label>

        </div>

        {/* Logout */}

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </div>
  );
}

export default Settings;