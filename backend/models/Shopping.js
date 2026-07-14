import mongoose from "mongoose";

const shoppingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    itemName: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    purchased: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Shopping", shoppingSchema);