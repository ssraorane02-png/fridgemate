import "../components/Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";

function Sidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#1A8FB4",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
    }).then((result) => {

      if (result.isConfirmed) {

        navigate("/login");

      }

    });

  };

  return (

    <div className="sidebar">

      <div>

        <h2 className="sidebar-logo">
          Fridge<span>Mate</span>
        </h2>

        <nav className="sidebar-menu">

          <NavLink
            to="/dashboard"
            className="sidebar-link"
          >
            <FaHome />
            Dashboard
          </NavLink>

          <NavLink
            to="/family-sharing"
            className="sidebar-link"
          >
            <FaUsers />
            Family Sharing
          </NavLink>

          <NavLink
            to="/settings"
            className="sidebar-link"
          >
            <FaCog />
            Settings
          </NavLink>

        </nav>

      </div>

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        <FaSignOutAlt />
        Logout
      </button>

    </div>

  );

}

export default Sidebar;