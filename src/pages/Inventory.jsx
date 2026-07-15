import "../styles/Inventory.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AddMethodModal from "../components/AddMethodModal";
import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaPlus,
  FaChevronDown,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import axios from "axios";


function Inventory() {

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Temporary empty inventory
 

const handleDelete = async (id) => {

  const result = await Swal.fire({
    title: "Delete Product?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#1A8FB4",
    confirmButtonText: "Delete",
  });

  if (!result.isConfirmed) return;

  try {

    const response = await axios.delete(
      `https://fridgemate-ym3b.onrender.com/api/products/${id}`
    );

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: response.data.message,
      confirmButtonColor: "#1A8FB4",
    });

    // Remove product from UI
    setProducts(products.filter((product) => product._id !== id));

  } catch (error) {

    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response?.data?.message || "Something went wrong",
    });

  }
};
const [searchTerm, setSearchTerm] = useState("");
const [products, setProducts] = useState([]);
const user = JSON.parse(localStorage.getItem("user"));
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `https://fridgemate-ym3b.onrender.com/api/products/${user.id}`
      );

      setProducts(response.data.products);

    } catch (error) {
      console.log(error);
    }
  };

  fetchProducts();
}, []);

const [selectedCategory, setSelectedCategory] = useState("All Categories");

  return (

    <div className="inventory-page">

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

      <div className="inventory-container">

        <div className="inventory-header">

          <h1>Inventory</h1>


<button
  className="empty-add-btn"
  onClick={() =>
    setShowModal(true, {
      state: { from: "/inventory" },
    })
  }
>
  + Add Product
</button>
        </div>

        <div className="inventory-top">

          <div className="search-box">

            <FaSearch />

            <input
  type="text"
  placeholder="Search products..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>

          </div>

          <div className="category-wrapper">
  <select
  className="category-filter"
  value={selectedCategory}
  onChange={(e) => setSelectedCategory(e.target.value)}
>
  <option>All Categories</option>
  <option>Dairy</option>
  <option>Vegetables</option>
  <option>Fruits</option>
  <option>Frozen</option>
  <option>Beverages</option>
  <option>Snacks</option>
</select>

  <FaChevronDown className="category-arrow" />
</div>

        </div>

        {products.length === 0 ? (

          <div className="inventory-empty">

            <div className="empty-icon">📦</div>

            <h2>No Products Found</h2>

            <p>
              Add your first product to start managing your refrigerator.
            </p>

          </div>

        ) : (

          <div className="inventory-list">

            {/* Products will come from backend */}
{products
  .filter((product) => {
    const matchesSearch = product.productName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All Categories" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  })
  .map((product) => (

  <div
  key={product._id}
  className="inventory-card"
  onClick={() => navigate(`/product-details/${product._id}`, {
  state: { from: "/inventory" },
})}
>

    <div className="inventory-info">

      <h3>{product.productName}</h3>

      <p>{product.category}</p>

      <p>Qty: {product.quantity}</p>
      
      <p>
  Exp: {new Date(product.expiryDate).toLocaleDateString("en-GB")}
</p>

      <div className="view-details">
        View Details →
      </div>

    </div>

    <div className="inventory-actions">

      <FaEdit
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/edit-product/${product._id}`);
        }}
      />

      <FaTrash
  onClick={(e) => {
    e.stopPropagation();
    handleDelete(product._id);
  }}
/>

    </div>

  </div>

))}
          </div>

        )}

      </div>
     {showModal && (
  <AddMethodModal
    from="/inventory"
    onClose={() => setShowModal(false)}
/>
)}
    </div>

  );

}

export default Inventory;