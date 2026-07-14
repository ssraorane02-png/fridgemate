import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
  type: String,
  required: true,
  minlength: 8,
},

    // Forgot Password Token
    resetToken: {
      type: String,
      default: null,
    },

    // Token Expiry Time
    resetTokenExpire: {
      type: Date,
      default: null,
    },

    avatar: {
       type: String,
       default: "",
     },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;