import mongoose from "mongoose";

const familySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    members: [
      {
        name: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model(
  "Family",
  familySchema
);