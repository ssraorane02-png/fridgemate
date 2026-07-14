import { Routes, Route } from "react-router-dom";

import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ChooseFridge from "./pages/ChooseFridge";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import ShoppingPage from "./pages/ShoppingPage";
import FamilySharing from "./pages/FamilySharing";
import ForgotPassword from "./pages/ForgotPassword";
import OTPVerification from "./pages/OTPVerification";
import ResetPassword from "./pages/ResetPassword";
import AddProduct from "./pages/AddProduct";
import BarcodeScanner from "./pages/BarcodeScanner";
import Settings from "./pages/Settings";
import EditProduct from "./pages/EditProduct";
import RecipesPage from "./pages/RecipesPage";
import RecipeDetails from "./pages/RecipeDetails";
import ProductDetails from "./pages/ProductDetails";
import ExpiringSoon from "./pages/ExpiringSoon";
import JoinFamily from "./pages/JoinFamily";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/choose-fridge" element={<ChooseFridge />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/shopping" element={<ShoppingPage />} />
      <Route path="/recipes" element={<RecipesPage />}/>
      <Route path="/family-sharing" element={<FamilySharing />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/otp" element={<OTPVerification />} />
      <Route
  path="/reset-password/:token"
  element={<ResetPassword />}
/>
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/barcode-scanner" element={<BarcodeScanner />}/>
      <Route path="/settings" element={<Settings />}/>
      <Route path="/edit-product/:id" element={<EditProduct />}/>
      <Route path="/recipe-details/:id" element={<RecipeDetails />}/>
      <Route path="/product-details/:id" element={<ProductDetails />}/>
      <Route path="/expiring-soon" element={<ExpiringSoon />}/>
      <Route
  path="/join-family/:token"
  element={<JoinFamily />}
/>
    </Routes>
  );
}

export default App;