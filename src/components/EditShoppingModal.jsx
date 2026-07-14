import "../styles/ShoppingItemModal.css";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function EditShoppingModal({ item, onClose, onUpdate }) {
  const [itemName, setItemName] = useState(item.itemName);
  const [quantity, setQuantity] = useState(item.quantity);
  const [category, setCategory] = useState(item.category);

  const handleUpdate = async () => {
    if (!itemName || !quantity || !category) {
      Swal.fire({
        icon: "warning",
        title: "All fields are required",
      });
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/shopping/${item._id}`,
        {
          itemName,
          quantity,
          category,
        }
      );

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: response.data.message,
        confirmButtonColor: "#1A8FB4",
      });

      onUpdate(response.data.item);
      onClose();
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

        <button
          className="shopping-close-btn"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        <h2>Edit Shopping Item</h2>

        <div className="shopping-form">

          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />

          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
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
              onClick={handleUpdate}
            >
              Update Item
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default EditShoppingModal;