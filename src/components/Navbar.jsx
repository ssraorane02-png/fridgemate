import "../components/Navbar.css";
import { FaBell, FaUserCircle, FaBars } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import avatar1 from "../assets/avatars/avatar1.jpg";
import avatar2 from "../assets/avatars/avatar2.jpg";
import avatar3 from "../assets/avatars/avatar3.jpg";
import avatar4 from "../assets/avatars/avatar4.jpg";
import avatar5 from "../assets/avatars/avatar5.jpg";
import avatar6 from "../assets/avatars/avatar6.jpg";


function Navbar({ toggleSidebar }) {
    const [notifications, setNotifications] = useState([]);
const [showNotifications, setShowNotifications] = useState(false);
const [showProfile, setShowProfile] =
  useState(false);
const user =
  JSON.parse(localStorage.getItem("user")) || null;
useEffect(() => {
  const fetchNotifications = async () => {
    if (!user) return;
    try {
      const response = await axios.get(
        `http://localhost:5000/api/notifications/${user.id}`
      );

      setNotifications(response.data.notifications);
    } catch (error) {
      console.log(error);
    }
  };

  if (user) {
    fetchNotifications();
  }
}, [user]);
useEffect(() => {
  const handleClick = () => {
    setShowNotifications(false);
  };

  if (showNotifications) {
    window.addEventListener("click", handleClick);
  }

  return () => {
    window.removeEventListener("click", handleClick);
  };
}, [showNotifications]);
const unreadCount = notifications.filter(
  (item) => !item.isRead
).length;

useEffect(() => {
  const handleClick = () => {
    setShowProfile(false);
  };

  if (showProfile) {
    window.addEventListener(
      "click",
      handleClick
    );
  }

  return () => {
    window.removeEventListener(
      "click",
      handleClick
    );
  };
}, [showProfile]);


const handleNotifications = async (e) => {
  e.stopPropagation();

  const newState = !showNotifications;
  setShowNotifications(newState);

  if (
    newState &&
    unreadCount > 0
  ) {
    try {
      await axios.put(
        `http://localhost:5000/api/notifications/read-all/${user.id}`
      );

      setNotifications(
        notifications.map((item) => ({
          ...item,
          isRead: true,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  }
};

const [currentUser, setCurrentUser] =
  useState(user);
  
const handleLogout = () => {
  localStorage.removeItem("user");
  window.location.href = "/login";
};

const avatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
];
const handleAvatarSelect = async (avatar) => {
  try {
    const response = await axios.put(
      "http://localhost:5000/api/auth/avatar",
      {
        userId: currentUser.id,
        avatar,
      }
    );

    setCurrentUser(response.data.user);

    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );
  } catch (error) {
    console.log(error);
  }
};

  return (
    <nav className="navbar">

      <div className="navbar-left">
        <FaBars
          className="menu-icon"
          onClick={toggleSidebar}
        />

        <div className="navbar-logo">
          Fresh<span>Sync</span>
        </div>
      </div>

      <div className="navbar-icons">
       <div
  className="notification-wrapper"
 onClick={handleNotifications}
>
  <FaBell className="navbar-icon" />

  {unreadCount > 0 && (
    <span className="notification-badge">
      {unreadCount}
    </span>
  )}
</div>
{showNotifications && (
  <div className="notification-dropdown">

    {notifications.length === 0 ? (
      <div className="notification-empty">
  🔔 No Notifications
</div>
    ) : (
      notifications.map((item) => (
        <div
  key={item._id}
  className="notification-item"
>
  {item.message}
</div>
      ))
    )}

  </div>
)}
        <div
  className="profile-wrapper"
  onClick={(e) => {
    e.stopPropagation();
    setShowProfile(!showProfile);
  }}
>
  {currentUser?.avatar ? (
    <img
      src={currentUser.avatar}
      className="profile-avatar"
      alt=""
    />
  ) : (
    <FaUserCircle
      className="navbar-icon profile-icon"
    />
  )}

  {showProfile && (
    <div className="profile-dropdown">

      <div className="profile-header">

        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            className="dropdown-avatar"
            alt=""
          />
        ) : (
          <FaUserCircle
            className="dropdown-icon"
          />
        )}

        <h3>{currentUser?.fullName}</h3>
      </div>

      <div className="avatar-section">
  <h4>Choose Avatar</h4>

  <div className="avatar-grid">
    {avatars.map((avatar, index) => (
      <img
        key={index}
        src={avatar}
        className="avatar-option"
        onClick={(e) => {
          e.stopPropagation();
          handleAvatarSelect(avatar);
        }}
        alt={`Avatar ${index + 1}`}
      />
    ))}
  </div>
</div>

      <div
        className="profile-item logout"
        onClick={handleLogout}
      >
        🚪 Logout
      </div>

    </div>
  )}
</div>
      </div>

    </nav>
  );
}

export default Navbar;
