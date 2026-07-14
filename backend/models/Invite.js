import mongoose from "mongoose";

const inviteSchema = new mongoose.Schema(
  {
    email: String,

    token: String,

    family: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Family",
    },

    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "Invite",
  inviteSchema
);