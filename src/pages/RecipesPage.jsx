import "../styles/RecipesPage.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaClock,
  FaUtensils
} from "react-icons/fa";

function RecipesPage() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
const [search, setSearch] = useState("");

  const [recipes, setRecipes] =
  useState([]);



useEffect(() => {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!user) return;

  const fetchRecipes = async () => {
    try {
      const response =
        await axios.get(
          `http://localhost:5000/api/recipes/${user.id}`
        );

      setRecipes(
        response.data.recipes
      );
    } catch (error) {
      console.log(error);
    }
  };

  fetchRecipes();
}, []);

const filteredRecipes = recipes.filter((recipe) =>
  recipe.strMeal
    ?.toLowerCase()
    .includes(search.toLowerCase())
);

  return (
    <div className="recipes-page">

      <Navbar
        toggleSidebar={() =>
          setSidebarOpen(!sidebarOpen)
        }
      />

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() =>
            setSidebarOpen(false)
          }
        >
          <div
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <Sidebar />
          </div>
        </div>
      )}

      <div className="recipes-container">

        <div className="recipes-header">

          <h1>Recipes</h1>

          <div className="recipe-search">

            <FaSearch />

            <input
  type="text"
  placeholder="Search recipe..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

          </div>

        </div>

        <div className="recipe-grid">
  {filteredRecipes.length === 0 ? (
    <div className="empty-recipes">
      🍽 No recipes found.
    </div>
  ) : (
    filteredRecipes.map((recipe) => (
      <div
        key={recipe.idMeal}
        className="recipe-card"
        onClick={() =>
          navigate(
  `/recipe-details/${recipe.idMeal}`
)
        }
      >
        <img
  src={recipe.strMealThumb}
  alt={recipe.strMeal}
/>

        <div className="recipe-content">
  <h3>{recipe.strMeal}</h3>

  <p className="recipe-match">
  <FaUtensils />
  Recipe Available
</p>

{recipe.haveIngredients?.length > 0 && (
  <p className="recipe-have">
    ✅ You have: {recipe.haveIngredients.join(", ")}
  </p>
)}

{recipe.needIngredients && (
  <p className="recipe-need">
    ❌ Need:
    {recipe.needIngredients.length > 0
      ? recipe.needIngredients.join(", ")
      : "Nothing else"}
  </p>
)}
</div>
      </div>
    ))
  )}
</div>


      </div>

    </div>
  );
}

export default RecipesPage;