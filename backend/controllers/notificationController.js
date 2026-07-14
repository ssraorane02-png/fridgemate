import Notification from "../models/Notification.js";

// Get notifications
export const getNotifications = async (req, res) => {
  try {
    const notifications =
      await Notification.find({
        userId: req.params.userId,
      }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Mark as read
export const markAsRead = async (req, res) => {
  try {
    const notification =
      await Notification.findByIdAndUpdate(
        req.params.id,
        { isRead: true },
        { new: true }
      );

    res.status(200).json({
      success: true,
      notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      {
        userId: req.params.userId,
        isRead: false,
      },
      {
        isRead: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Notifications marked as read",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};