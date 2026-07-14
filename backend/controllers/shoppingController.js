import Shopping from "../models/Shopping.js";

// Add Shopping Item
export const addShoppingItem = async (req, res) => {
  try {
    const { userId, itemName, quantity, category } = req.body;

    const item = new Shopping({
      userId,
      itemName,
      quantity,
      category,
    });

    await item.save();

    res.status(201).json({
      success: true,
      message: "Shopping item added successfully",
      item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Shopping Items
export const getShoppingItems = async (req, res) => {
  try {
    const items = await Shopping.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Shopping Item
export const updateShoppingItem = async (req, res) => {
  try {
    const item = await Shopping.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Shopping item updated successfully",
      item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Shopping Item
export const deleteShoppingItem = async (req, res) => {
  try {
    await Shopping.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Shopping item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};