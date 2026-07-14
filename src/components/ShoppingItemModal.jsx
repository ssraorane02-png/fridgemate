import "../styles/ShoppingItemModal.css";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function ShoppingItemModal({ onClose }) {
  const [itemName, setItemName] = useState("");
const [quantity, setQuantity] = useState("");
const [category, setCategory] = useState("");

const user = JSON.parse(localStorage.getItem("user"));
const handleAddItem = async () => {
  if (!itemName || !quantity || !category) {
    Swal.fire({
      icon: "error",
      title: "Missing Fields",
      text: "Please fill all fields.",
    });
    return;
  }

  try {
    await axios.post("http://localhost:5000/api/shopping/add", {
      userId: user.id,
      itemName,
      quantity,
      category,
    });

    Swal.fire({
      icon: "success",
      title: "Added!",
      text: "Shopping item added successfully.",
    }).then(() => {
      onClose();
      window.location.reload(); // we'll improve this later
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
    <div className="shopping-modal-overlay">
      <div className="shopping-modal">

        <button className="shopping-close-btn" onClick={onClose}>
          <FaTimes />
        </button>

        <h2>Add Shopping Item</h2>

        <div className="shopping-form">

          <input
  type="text"
  placeholder="Item Name"
  value={itemName}
  onChange={(e) => setItemName(e.target.value)}
/>

          <input
  type="number"
  placeholder="Quantity"
  value={quantity}
  onChange={(e) => setQuantity(e.target.value)}
/>

        <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
            <option value="">Category</option>
            <option>Dairy</option>
            <option>Vegetables</option>
            <option>Fruits</option>
            <option>Frozen</option>
            <option>Beverages</option>
            <option>Others</option>
          </select>

          <div className="shopping-btns">

            <button
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
  className="add-btn"
  onClick={handleAddItem}
>
  Add Item
</button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default ShoppingItemModal;