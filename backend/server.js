import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import shoppingRoutes from "./routes/shoppingRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import familyRoutes from "./routes/familyRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/shopping", shoppingRoutes);

app.use(
  "/api/notifications",
  notificationRoutes
);

app.use(
  "/api/recipes",
  recipeRoutes
);

app.use(
  "/api/family",
  familyRoutes
);
app.use(
  "/api/users",
  userRoutes
);
app.get("/", (req, res) => {
  res.send("FridgeMate Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});