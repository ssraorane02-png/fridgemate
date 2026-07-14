import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  mealId: String,
  title: String,
  image: String,
  category: String,
  area: String,
  ingredients: [String],
  instructions: [String],
});

export default mongoose.model(
  "Recipe",
  recipeSchema
);