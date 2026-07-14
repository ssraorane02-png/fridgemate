import "./../styles/splash.css";
import logo from "../assets/images/logo.png";
import bg from "../assets/images/splash-bg.png";
import { useNavigate } from "react-router-dom";

function Splash() {
  const navigate = useNavigate();

  return (
    <div
      className="splash"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="overlay">

        <div className="brand">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="app-title">FreshSync</h1>
        </div>

        <button
          className="start-btn"
          onClick={() => navigate("/login")}
        >
          Let's Start
        </button>

      </div>
    </div>
  );
}

export default Splash;