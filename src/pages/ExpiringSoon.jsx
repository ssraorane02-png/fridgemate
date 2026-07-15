import "../styles/ExpiringSoon.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowLeft, FaSearch, FaExclamationTriangle } from "react-icons/fa";

function ExpiringSoon() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Temporary data (replace with API later)
const [products, setProducts] =
  useState([]);

  useEffect(() => {
  const user =
  JSON.parse(
    localStorage.getItem("user")
  ) || null;

  const fetchProducts = async () => {
    try {
      const response =
        await axios.get(
          `https://fridgemate-ym3b.onrender.com/api/products/expiring/${user.id}`
        );

      setProducts(
        response.data.products
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (user) {
  fetchProducts();
}
}, []);

const getStatus = (date) => {
  const today = new Date();

  const diff = Math.ceil(
    (new Date(date) - today) /
    (1000 * 60 * 60 * 24)
  );

  if (diff === 0)
    return "Expires Today";

  if (diff === 1)
    return "Expires Tomorrow";

  return `Expires in ${diff} Days`;
};
const [searchTerm, setSearchTerm] =
  useState("");

  return (
    <div className="expiring-page">
      <Navbar
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
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

      <div className="expiring-container">

        

        <h1>Expiring Soon</h1>

        <div className="search-box">
          <FaSearch />
          <input
  type="text"
  placeholder="Search product..."
  value={searchTerm}
  onChange={(e) =>
    setSearchTerm(e.target.value)
  }
/>
        </div>

        <div className="expiring-list">

          {products
  .filter((product) =>
    product.productName
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )
  .map((product) => (
    <div
      key={product._id}
      className="expiring-card"
      onClick={() =>
  navigate(`/product-details/${product._id}`, {
    state: { from: "/expiring-soon" },
  })
}
    >
      <div className="warning-icon">
        <FaExclamationTriangle />
      </div>

      <div className="product-info">
        <h3>{product.productName}</h3>

        <p>
          Expiry:{" "}
          {new Date(
            product.expiryDate
          ).toLocaleDateString("en-GB")}
        </p>

        <span>
          {getStatus(product.expiryDate)}
        </span>
      </div>

      <div className="arrow">➜</div>
    </div>
  ))}

        </div>

      </div>
    </div>
  );
}

export default ExpiringSoon;