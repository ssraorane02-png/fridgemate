import "../styles/AddProduct.css";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import axios from "axios";

function AddProduct() {
const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const location = useLocation();
const scannedProduct =
  location.state;
const from = location.state?.from || "/dashboard";

 const [productName, setProductName] =
  useState(
    scannedProduct?.productName || ""
  );

const [category, setCategory] =
  useState(
    scannedProduct?.category || ""
  );
  const [quantity, setQuantity] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

const handleSave = async () => {
  console.log({
    productName,
    category,
    quantity,
    purchaseDate,
    expiryDate,
    user,
  });
  if (
    productName.trim() === "" ||
    category === "" ||
    quantity === "" ||
    purchaseDate === "" ||
    expiryDate === ""
  ) {
    Swal.fire({
      icon: "error",
      title: "Missing Information",
      text: "Please fill in all required fields.",
      confirmButtonColor: "#1A8FB4",
    });
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:5000/api/products/add",
      {
        productName,
        category,
        quantity,
        purchaseDate,
        expiryDate,
        user: user.id,   // Logged in user's id
      }
    );

    Swal.fire({
      icon: "success",
      title: "Success",
      text: response.data.message,
      confirmButtonColor: "#1A8FB4",
    }).then(() => {
      navigate(from);
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

    <div className="add-product-page">

      <div className="add-product-card">

        <h2>Add New Product</h2>

        <form onSubmit={(e) => e.preventDefault()}>

          {/* Product Name */}

          <div className="input-group">

            <label>Product Name</label>

            <input
              type="text"
              placeholder="Eg. Milk"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />

          </div>

          {/* Category */}

          <div className="input-group">
  <label>Category</label>

  <select
    value={category}
    onChange={(e) =>
      setCategory(e.target.value)
    }
  >
    <option value="">
      Select Category
    </option>
    <option value="Dairy">
      Dairy
    </option>
    <option value="Vegetables">
      Vegetables
    </option>
    <option value="Fruits">
      Fruits
    </option>
    <option value="Beverages">
      Beverages
    </option>
    <option value="Frozen">
      Frozen
    </option>
    <option value="Snacks">
      Snacks
    </option>
  </select>
</div>

          {/* Quantity */}

          <div className="input-group">

            <label>Quantity</label>

            <input
              type="number"
              placeholder="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

          </div>

          {/* Purchase Date */}

          <div className="input-group">

            <label>Purchase Date</label>

            <input
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
            />

          </div>

          {/* Expiry Date */}

          <div className="input-group">

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
              onClick={handleSave}
            >
              Save Product
            </button>

          </div>

        </form>

      </div>

    </div>

  );
}

export default AddProduct;