import Product from "../models/Product.js";
import Notification from "../models/Notification.js";

// =======================
// Add Product
// =======================

export const addProduct = async (req, res) => {
  try {
    const {
      productName,
      category,
      quantity,
      unit,
      purchaseDate,
      expiryDate,
      location,
      notes,
      user,
    } = req.body;

    // Check required fields
    if (
      !productName ||
      !category ||
      !quantity ||
      !purchaseDate ||
      !expiryDate ||
      !user
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Create Product
    const product = await Product.create({
      productName,
      category,
      quantity,
      purchaseDate,
      expiryDate,
      notes,
      user,
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// =======================
// Get All Products of Logged-in User
// =======================

export const getProducts = async (req, res) => {
  try {
    const { userId } = req.params;

    const products = await Product.find({
      user: userId,
    }).sort({
      createdAt: -1,
    });

    // Create notifications for expiring products
    for (const product of products) {
      const expiryDate = new Date(product.expiryDate);
      const today = new Date();

      const diff = Math.ceil(
        (expiryDate - today) /
          (1000 * 60 * 60 * 24)
      );

      if (diff <= 3 && diff >= 0) {
        let message = "";

  if (diff === 0) {
    message = `${product.productName} expires today!`;
  } else if (diff === 1) {
    message = `${product.productName} expires tomorrow!`;
  } else {
    message = `${product.productName} expires in ${diff} days.`;
  }

        const exists =
          await Notification.findOne({
            userId: userId,
            message,
          });

        if (!exists) {
          await Notification.create({
            userId: userId,
            message,
          });
        }
      }
    }

    res.status(200).json({
      success: true,
      products,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =======================
// Delete Product
// =======================

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =======================
// Get Single Product
// =======================

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// =======================
// Update Product
// =======================

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      productName,
      category,
      quantity,
      purchaseDate,
      expiryDate,
    } = req.body;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.productName = productName;
    product.category = category;
    product.quantity = quantity;
    product.purchaseDate = purchaseDate;
    product.expiryDate = expiryDate;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// =======================
// Get Expiring Products
// =======================

export const getExpiringProducts = async (
  req,
  res
) => {
  try {
    const { userId } = req.params;

    const products =
      await Product.find({
        user: userId,
      });

    const today = new Date();

    const expiringProducts =
      products.filter((product) => {
        const expiryDate =
          new Date(product.expiryDate);

        const diff = Math.ceil(
          (expiryDate - today) /
            (1000 * 60 * 60 * 24)
        );

        return diff <= 3 && diff >= 0;
      });

    res.status(200).json({
      success: true,
      products: expiringProducts,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};