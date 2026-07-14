import Product from "../models/Product.js";
import axios from "axios";

export const getRecipes = async (req, res) => {
  try {
    const { userId } = req.params;

    const products = await Product.find({
      user: userId,
    });

    if (products.length === 0) {
      return res.json({
        success: true,
        recipes: [],
      });
    }

    const productNames = products.map((item) =>
      item.productName.toLowerCase()
    );

    console.log("Products:", productNames);
    console.log("User ID:", userId);

    let allRecipes = [];

    // Search recipes using ingredients
    for (const ingredient of productNames) {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/filter.php",
          {
            params: {
              i: ingredient,
            },
          }
        );

        if (response.data.meals) {
          allRecipes.push(
            ...response.data.meals
          );
        }
      } catch (err) {
        console.log(
          "Error searching:",
          ingredient
        );
        console.log(err.message);
      }
    }

    console.log(
      "All recipes:",
      allRecipes.length
    );

    // Remove duplicate recipes
    const uniqueRecipes = [
      ...new Map(
        allRecipes.map((recipe) => [
          recipe.idMeal,
          recipe,
        ])
      ).values(),
    ];

    console.log(
      "Unique recipes:",
      uniqueRecipes.length
    );

    

const recipesWithIngredients =
  await Promise.all(
    uniqueRecipes.slice(0, 20).map(
      async (recipe) => {
        try {
          const detail =
            await axios.get(
              "https://www.themealdb.com/api/json/v1/1/lookup.php",
              {
                params: {
                  i: recipe.idMeal,
                },
              }
            );

          if (!detail.data.meals)
            return null;

          const meal =
            detail.data.meals[0];

          const ingredients = [];

          for (let i = 1; i <= 20; i++) {
            const ingredient =
              meal[`strIngredient${i}`];

            if (
              ingredient &&
              ingredient.trim()
            ) {
              ingredients.push(
                ingredient.toLowerCase()
              );
            }
          }

          const haveIngredients =
            ingredients.filter(
              (ingredient) =>
                productNames.some(
                  (product) =>
                    ingredient.includes(
                      product
                    ) ||
                    product.includes(
                      ingredient
                    )
                )
            );

          const needIngredients =
            ingredients.filter(
              (ingredient) =>
                !productNames.some(
                  (product) =>
                    ingredient.includes(
                      product
                    ) ||
                    product.includes(
                      ingredient
                    )
                )
            );

          return {
            ...recipe,
            haveIngredients,
            needIngredients,
          };
        } catch {
          return null;
        }
      }
    )
  );

const finalRecipes =
  recipesWithIngredients.filter(
    Boolean
  );

    // Return recipes directly
   res.json({
  success: true,
  recipes: finalRecipes,
});
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch recipes",
    });
  }
};

// ==========================
// Get Recipe Details
// ==========================
export const getRecipeDetails =
  async (req, res) => {
    try {
      const { id } = req.params;

      const response =
        await axios.get(
          "https://www.themealdb.com/api/json/v1/1/lookup.php",
          {
            params: {
              i: id,
            },
          }
        );

      const recipe =
        response.data.meals[0];

      res.json({
        success: true,
        recipe,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch recipe details",
      });
    }
  };