import "../styles/EditProduct.css";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function EditProduct() {

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const from = location.state?.from || "/inventory";

  // Temporary sample data
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

   useEffect(() => {
  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/product/${id}`
      );

      const product = response.data.product;

      setProductName(product.productName);
      setCategory(product.category);
      setQuantity(product.quantity);
      setPurchaseDate(product.purchaseDate.split("T")[0]);
      setExpiryDate(product.expiryDate.split("T")[0]);

    } catch (error) {
      console.log(error);
    }
  };

  fetchProduct();
}, [id]);
  const handleUpdate = async () => {
  if (
    !productName ||
    !category ||
    !quantity ||
    !purchaseDate ||
    !expiryDate
  ) {
    Swal.fire({
      icon: "error",
      title: "Missing Information",
      text: "Please fill all required fields.",
    });
    return;
  }

  try {
    const response = await axios.put(
      `http://localhost:5000/api/products/update/${id}`,
      {
        productName,
        category,
        quantity,
        purchaseDate,
        expiryDate,
      }
    );

    Swal.fire({
      icon: "success",
      title: "Success",
      text: response.data.message,
    }).then(() => {
      navigate("/inventory");
    });

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response?.data?.message || "Something went wrong",
    });
  }
};

  return (

    <div className="edit-product-page">

      <div className="edit-product-card">

        <h2>Edit Product</h2>

        <form onSubmit={(e) => e.preventDefault()}>

          {/* Same input fields as AddProduct */}

          {/* Product Name */}
          {/* Category */}
          {/* Quantity */}
          {/* Purchase Date */}
          {/* Expiry Date */}

          {/* Simply copy the input fields from AddProduct.jsx */}

          <div className="form-group">
  <label>Product Name</label>
  <input
    type="text"
    value={productName}
    onChange={(e) => setProductName(e.target.value)}
    placeholder="Enter product name"
  />
</div>

<div className="form-group">
  <label>Category</label>
  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
  >
    <option value="">Select Category</option>
    <option>Dairy</option>
    <option>Vegetables</option>
    <option>Fruits</option>
    <option>Frozen</option>
    <option>Beverages</option>
  </select>
</div>

<div className="form-group">
  <label>Quantity</label>
  <input
    type="number"
    value={quantity}
    onChange={(e) => setQuantity(e.target.value)}
    placeholder="Quantity"
  />
</div>

<div className="form-group">
  <label>Purchase Date</label>
  <input
    type="date"
    value={purchaseDate}
    onChange={(e) => setPurchaseDate(e.target.value)}
  />
</div>

<div className="form-group">
  <label>Expiry Date</label>
  <input
    type="date"
    value={expiryDate}
    onChange={(e) => setExpiryDate(e.target.value)}
  />
</div>

          <div className="button-group">

            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate(from)}
            >
              Cancel
            </button>

            <button
              type="button"
              className="save-btn"
              onClick={handleUpdate}
            >
              Update Product
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default EditProduct;