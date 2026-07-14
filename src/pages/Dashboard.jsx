import "../styles/Dashboard.css";
import {
  FaBell,
  FaUserCircle,
  FaBoxOpen,
  FaClock,
  FaShoppingCart,
  FaUtensils,
} from "react-icons/fa";
import AddMethodModal from "../components/AddMethodModal";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
const user = JSON.parse(localStorage.getItem("user"));

const [products, setProducts] = useState([]);
const [recipes, setRecipes] = useState([]);
const [shoppingItems, setShoppingItems] = useState([]);
const [expiringItems, setExpiringItems] = useState(0);
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
  `http://localhost:5000/api/products/${user.id}`
);

      setProducts(response.data.products);

    } catch (error) {
      console.log(error);
    }
  };

  fetchProducts();
}, []);
  // Dummy values for new user
  const totalItems = products.length;



const shoppingCount = shoppingItems.length;
const recipeCount = recipes.length;

const [showModal, setShowModal] = useState(false);
const [sidebarOpen, setSidebarOpen] = useState(false);
const navigate = useNavigate();
const recentProducts = products.slice(0, 3);

useEffect(() => {
  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/recipes/${user.id}`
      );

      console.log(response.data);

      setRecipes(response.data.recipes);
    } catch (error) {
      console.log(error);
    }
  };

  fetchRecipes();
}, []);

useEffect(() => {
  const fetchShopping = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/shopping/${user.id}`
      );

      setShoppingItems(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  fetchShopping();
}, []);

useEffect(() => {
  const fetchExpiring = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/expiring/${user.id}`
      );

      setExpiringItems(
        response.data.products.length
      );
    } catch (error) {
      console.log(error);
    }
  };

  fetchExpiring();
}, []);

  return (
    <div className="dashboard-container">


      {/* Navbar */}
      <div className="dashboard-content">
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

      {/* Welcome Section */}
      <div className="welcome-section">
        <h1>Welcome Back 👋</h1>

        <p>
          Keep your refrigerator organized and reduce food waste.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="dashboard-cards">

        <div
  className="dashboard-card"
  onClick={() => navigate("/inventory")}
>
          <div className="card-top">
            <FaBoxOpen className="dashboard-card-icon" />
            <span className="card-number">{totalItems}</span>
          </div>

          <h3>Inventory</h3>
          <p>Total Items</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/expiring-soon")}>
          <div className="card-top">
            <FaClock className="dashboard-card-icon" />
            <span className="card-number">{expiringItems}</span>
          </div>

          <h3>Expiring Soon</h3>
          <p>Need Attention</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/shopping")}>
          <div className="card-top">
            <FaShoppingCart className="dashboard-card-icon" />
            <span className="card-number">{shoppingCount}</span>
          </div>

          <h3>Shopping List</h3>
          <p>Pending Items</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/recipes")}>
          <div className="card-top">
            <FaUtensils className="dashboard-card-icon" />
            <span className="card-number">{recipeCount}</span>
          </div>

          <h3>Recipes</h3>
          <p>Available</p>
        </div>

      </div>

      {/* Inventory Section */}
<div className="dashboard-overview">
  {products.length === 0 ? (
    <div className="empty-state">
      <div className="empty-icon">📦</div>

      <h3>No items yet</h3>

      <p>Add your first product to start tracking freshness.</p>

      <button
        className="add-item-btn"
        onClick={() => setShowModal(true)}
      >
        + Add Item
      </button>
    </div>
  ) : (
    <>
      <div className="dashboard-overview-header">
        <div>
         
<h2>📦Recent Inventory </h2>
          <p>
            You currently have <strong>{totalItems}</strong> items in your
            refrigerator.
          </p>
        </div>

        <button
          className="dashboard-view-btn"
          onClick={() => navigate("/inventory")}
        >
          See All Inventory →
        </button>
      </div>

      <div className="dashboard-product-list">
        {recentProducts.map((product) => (
          <div className="dashboard-product-card" key={product._id}>
            <h3>{product.productName}</h3>

            <p>{product.category}</p>

            <p>
              Exp:
              {" "}
              {new Date(product.expiryDate).toLocaleDateString("en-IN")}
            </p>
          </div>
        ))}
      </div>
    </>
  )}
</div>

      </div>
{showModal && (
    <AddMethodModal
    from="/dashboard"
    onClose={() => setShowModal(false)}
/>
)}
</div>
    
  );
}

export default Dashboard;