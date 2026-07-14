import User from "../models/User.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
const isValidPassword = (password) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(password);
};
// =======================
// User Signup
// =======================

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check empty fields
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }
    if (!isValidPassword(password)) {
  return res.status(400).json({
    success: false,
    message:
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.",
  });
}

    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
  id: user._id,
  fullName: user.fullName,
  email: user.email,
  avatar: user.avatar,
},
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
// User Login
// =======================

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check empty fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

   res.status(200).json({
  success: true,
  message: "Login successful",
  user: {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    avatar: user.avatar,
  },
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
// Forgot Password
// =======================

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate Reset Token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Save token in database
    user.resetToken = resetToken;
    user.resetTokenExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    // Reset Link
    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    // Send Email
    await sendEmail(
      user.email,
      "FridgeMate Password Reset",
      `Click the link below to reset your password:\n\n${resetLink}`
    );

    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
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
// Reset Password
// =======================

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    if (!isValidPassword(password)) {
  return res.status(400).json({
    success: false,
    message:
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.",
  });
}

    // Find user with valid token
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password
    user.password = hashedPassword;

    // Remove token
    user.resetToken = null;
    user.resetTokenExpire = null;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const updateAvatar = async (req, res) => {
  try {
    const { userId, avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};