import "../styles/ProductDetails.css";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";
import {
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("Product ID:", id);
  const [product, setProduct] = useState(null);

useEffect(() => {
  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `https://fridgemate-ym3b.onrender.com/api/products/product/${id}`
      );

      setProduct(response.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  fetchProduct();
}, [id]);
const handleEdit = () => {
  navigate(`/edit-product/${product._id}`);
};

const handleDelete = () => {
  Swal.fire({
    title: "Delete Product?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#1A8FB4",
    confirmButtonText: "Delete",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        "Deleted!",
        "Product has been deleted.",
        "success"
      );

      // Later replace this with API call
      navigate("/inventory");
    }
  });
};

const [sidebarOpen, setSidebarOpen] = useState(false);
if (!product) {
  return <h2 style={{ color: "white", textAlign: "center" }}>Loading...</h2>;
}
const today = new Date();
const expiry = new Date(product.expiryDate);

const daysRemaining = Math.ceil(
  (expiry - today) / (1000 * 60 * 60 * 24)
);

const location = useLocation();

const from =
  location.state?.from ||
  "/inventory";

  return (
    <div className="product-details-page">
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

      <div className="product-container">

        <button
          className="back-button"
          onClick={() => navigate(from)}
        >
          ← Back
        </button>

        <div className="product-card">
            <div className="product-header">
            <span className="product-icon"></span>

          <h1>{product.productName}</h1>
</div>
          <div className="detail-row">
            <span>Category</span>
            <p>{product.category}</p>
          </div>

          <div className="detail-row">
            <span>Quantity</span>
            <p>{product.quantity}</p>
          </div>

          <div className="detail-row">
            <span>Added On</span>
            <p>{new Date(product.purchaseDate).toLocaleDateString("en-GB")}</p>
          </div>

          <div className="detail-row">
            <span>Expiry Date</span>
            <p>{new Date(product.expiryDate).toLocaleDateString("en-GB")}</p>
          </div>

          <div className="status-box">
            🟡 Expires in {daysRemaining} day{daysRemaining !== 1 ? "s" : ""}
          </div>

          <div className="detail-row">
            <span>Storage</span>
            <p>{product.notes || "No notes available"}</p>
          </div>

          <div className="action-buttons">

            <button
  className="edit-btn"
  onClick={handleEdit}
>
  Edit Product
</button>

<button
  className="delete-btn"
  onClick={handleDelete}
>
  Delete
</button>


          </div>

        </div>

      </div>
    </div>
  );
}

export default ProductDetails;