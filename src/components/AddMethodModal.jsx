import "../styles/AddMethodModal.css";
import { FaBarcode, FaKeyboard, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AddMethodModal({ onClose, from }) {
  
    const navigate = useNavigate();
  return (
    <div className="modal-overlay">

      <div className="method-modal">

        <button
          className="close-btn"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        <h2>Add Product</h2>

        <p>
          How would you like to add your product?
        </p>

        <div className="method-buttons">

          <button
  className="method-btn barcode-btn"
  onClick={() => {
    onClose();
    navigate("/barcode-scanner", {
  state: { from }
});
  }}
>
  <FaBarcode />
  <span>Scan Barcode</span>
</button>

          <div className="or-text">
            OR
          </div>

          <button
    className="method-btn manual-btn"
    onClick={() => {
        onClose();
        navigate("/add-product", {
    state: { from }
});
    }}
>
    <FaKeyboard />
    <span>Add Manually</span>
</button>

        </div>

      </div>

    </div>
  );
}

export default AddMethodModal;