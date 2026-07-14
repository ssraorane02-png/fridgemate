import "../styles/BarcodeScanner.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBarcode, FaCamera, FaUpload } from "react-icons/fa";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import axios from "axios";
import { useState } from "react";


function BarcodeScanner() {

  const navigate = useNavigate();
  const location = useLocation();
  const [camera, setCamera] =
  useState(false);
  

const from = location.state?.from || "/dashboard";

const fetchProduct = async (barcode) => {
  try {
    const response = await axios.get(
      `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
    );

    const product = response.data.product;
let category = "Snacks";

const apiCategory =
  product?.categories?.toLowerCase();

if (apiCategory?.includes("milk"))
  category = "Dairy";
else if (
  apiCategory?.includes("fruit")
)
  category = "Fruits";
else if (
  apiCategory?.includes("vegetable")
)
  category = "Vegetables";
else if (
  apiCategory?.includes("beverage")
)
  category = "Beverages";
else if (
  apiCategory?.includes("frozen")
)
  category = "Frozen";

navigate("/add-product", {
  state: {
    productName:
      product?.product_name || "",
    category,
    from,
  },
});
    
  } catch (error) {
    console.log(error);
    alert("Product not found");
  }
};

  return (

    <div className="barcode-container">

      <div className="barcode-card">

        <FaBarcode className="barcode-main-icon" />

        <h2 className="barcode-title">Scan Product Barcode</h2>

        <p className="barcode-text">
          Point your camera at the product barcode or upload a barcode image.
        </p>

        <div className="barcode-frame">

  {camera ? (
    <BarcodeScannerComponent
  width={300}
  height={250}
  onUpdate={(err, result) => {
    if (result) {
      const barcode = result.text;
      setCamera(false);
      fetchProduct(barcode);
    }
  }}
/>
  ) : (
    <div className="barcode-scan-line"></div>
  )}

</div>

       <button
  className="barcode-camera-btn"
  onClick={() => setCamera(true)}
>
          <FaCamera />
          Start Camera
        </button>

        <div className="barcode-or">OR</div>

        <button className="barcode-upload-btn">
          <FaUpload />
          Upload Barcode Image
        </button>

        <button
          className="barcode-cancel-btn"
          onClick={() => navigate(from)}
        >
          Cancel
        </button>

      </div>

    </div>

  );

}

export default BarcodeScanner;