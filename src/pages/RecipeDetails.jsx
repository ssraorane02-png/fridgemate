import "../styles/RecipeDetails.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function RecipeDetails() {

  const navigate = useNavigate();
  const { id } = useParams();

const [recipe, setRecipe] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
  const fetchRecipe = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/recipes/details/${id}`
      );

      setRecipe(response.data.recipe);
    } catch (error) {
      console.log(error);
    }
  };

  fetchRecipe();
}, [id]);

if (!recipe) {
  return (
    <div className="recipe-details-page">
      Loading...
    </div>
  );
}

  return (
    <div className="recipe-details-page">

      <Navbar
        toggleSidebar={() =>
          setSidebarOpen(!sidebarOpen)
        }
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

      <button
        className="back-btn"
        onClick={() => navigate("/recipes")}
      >
        Back
      </button>

      <div className="recipe-card-container">

       <h1>{recipe.strMeal}</h1>

<img
  src={recipe.strMealThumb}
  alt={recipe.strMeal}
  className="recipe-image"
/>



<div className="recipe-info">
  <p>
    <strong>🍽 Category:</strong> {recipe.strCategory}
  </p>

  <p>
    <strong>🌍 Cuisine:</strong> {recipe.strArea}
  </p>
</div>

<div className="recipe-section">
  <h2>Instructions</h2>

  <p>
    {recipe.strInstructions}
  </p>
</div>

        <div className="recipe-section">

          <h2>Ingredients</h2>

          <ul>
  {Array.from({ length: 20 }, (_, i) => {
    const ingredient =
      recipe[`strIngredient${i + 1}`];
    const measure =
      recipe[`strMeasure${i + 1}`];

    if (!ingredient) return null;

    return (
      <li key={i}>
        🍽 {measure} {ingredient}
      </li>
    );
  })}
</ul>


        </div>

        <div className="recipe-section">

         <h2>Steps</h2>

<ol className="recipe-steps">
  {recipe.strInstructions
    ?.split(".")
    .filter(
      (step) => step.trim() !== ""
    )
    .map((step, index) => (
      <li key={index}>
        {step.trim()}.
      </li>
    ))}
</ol>
        

        </div>

        <div className="recipe-footer">


        </div>

      </div>

    </div>
  );
}

export default RecipeDetails;