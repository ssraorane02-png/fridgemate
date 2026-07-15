import "../styles/ShoppingPage.css";
import Navbar from "../components/Navbar";
import shoppingGif from "../assets/images/shoppinggif.gif";
import { useState, useEffect } from "react";
import axios from "axios";
import ShoppingItemModal from "../components/ShoppingItemModal";
import Sidebar from "../components/Sidebar";
import EditShoppingModal from "../components/EditShoppingModal";
import Swal from "sweetalert2";

import {
  FaSearch,
  FaShoppingCart,
  FaEdit,
  FaTrash
} from "react-icons/fa";

function Shopping() {
  const [showModal, setShowModal] = useState(false);
  const [shoppingItems, setShoppingItems] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [editItem, setEditItem] = useState(null);
const handleUpdate = (updatedItem) => {
  setShoppingItems(
    shoppingItems.map((item) =>
      item._id === updatedItem._id ? updatedItem : item
    )
  );
};
const handleDelete = async (id) => {

  const result = await Swal.fire({
    title: "Delete Shopping Item?",
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
      `https://fridgemate-ym3b.onrender.com/api/shopping/${id}`
    );

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: response.data.message,
      confirmButtonColor: "#1A8FB4",
    });

    setShoppingItems(
      shoppingItems.filter((item) => item._id !== id)
    );

  } catch (error) {

    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response?.data?.message || "Something went wrong",
    });

  }

};

const user = JSON.parse(localStorage.getItem("user"));
useEffect(() => {
  const fetchShoppingItems = async () => {
    try {
      const response = await axios.get(
        `https://fridgemate-ym3b.onrender.com/api/shopping/${user.id}`
      );

      setShoppingItems(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  fetchShoppingItems();
}, []);
  const [sidebarOpen, setSidebarOpen] = useState(false);



  return (

    <div className="shopping-page">
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

  <div className="shopping-container">

    <div className="shopping-right">

      <div className="shopping-left">

        <h1>Shopping List</h1>

        <div className="shopping-search">
          <FaSearch className="search-icon" />
          <input
  type="text"
  placeholder="Search shopping item..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
        </div>

       {shoppingItems.length === 0 ? (

  <div className="shopping-empty">

    <FaShoppingCart className="empty-cart" />

    <h2>No Shopping Items</h2>

    <p>
      Add products to your shopping list and never
      forget what to buy.
    </p>

  </div>

) : (

  <div className="shopping-list">

    {shoppingItems
      .filter((item) =>
        item.itemName
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
      .map((item) => (

        <div
  className="shopping-card"
  key={item._id}
>

  <div className="shopping-card-header">

    <h3>{item.itemName}</h3>

    <div className="shopping-actions">

      <FaEdit
  className="edit-icon"
  onClick={() => setEditItem(item)}
/>

      <FaTrash
  className="delete-icon"
  onClick={() => handleDelete(item._id)}
/>

    </div>

  </div>

  <p>Category: {item.category}</p>

  <p>Quantity: {item.quantity}</p>

</div>

      ))}

  </div>

)}

        <button
    className="shopping-add-btn"
    onClick={() => setShowModal(true)}
>
    + Add Item
</button>
{showModal && (
    <ShoppingItemModal
        onClose={() => setShowModal(false)}
    />
)}
{editItem && (
  <EditShoppingModal
    item={editItem}
    onClose={() => setEditItem(null)}
    onUpdate={handleUpdate}
  />
)}

      </div>

    </div>

  </div>
</div>

  );

}

export default Shopping;