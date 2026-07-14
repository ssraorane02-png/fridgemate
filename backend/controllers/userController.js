import User from "../models/User.js";
import bcrypt from "bcrypt";
// Password Validation
const isValidPassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+=])[A-Za-z\d@$!%*?&#^()_\-+=]{8,}$/;

  return passwordRegex.test(password);
};
// Get User Profile
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(
      req.params.id
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch user",
    });
  }
};

// Change Password
export const changePassword =
  async (req, res) => {
    try {
      const {
        currentPassword,
        newPassword,
      } = req.body;
      
      if (!isValidPassword(newPassword)) {
  return res.status(400).json({
    success: false,
    message:
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.",
  });
}

      const user =
        await User.findById(
          req.params.id
        );

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const isMatch =
        await bcrypt.compare(
          currentPassword,
          user.password
        );

      if (!isMatch) {
        return res.status(400).json({
          message:
            "Current password is incorrect",
        });
      }

      const hashedPassword =
        await bcrypt.hash(
          newPassword,
          10
        );

      user.password =
        hashedPassword;

      await user.save();

      res.json({
        success: true,
        message:
          "Password updated successfully",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Failed to update password",
      });
    }
  };