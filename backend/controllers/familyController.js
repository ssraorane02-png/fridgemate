import crypto from "crypto";
import Invite from "../models/Invite.js";
import Family from "../models/Family.js";
import transporter from "../config/mail.js";

// ==========================
// Send Invitation
// ==========================
export const sendInvite = async (req, res) => {
  try {
    const { email, userId } = req.body;

    let family = await Family.findOne({
      owner: userId,
    });

    if (!family) {
      family = await Family.create({
        owner: userId,
        members: [],
      });
    }

    const token = crypto
      .randomBytes(32)
      .toString("hex");

    await Invite.create({
      email,
      token,
      family: family._id,
      status: "pending",
    });

    const inviteLink =
      `http://localhost:5173/join-family/${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "FridgeMate Family Invitation",
      html: `
        <h2>You've been invited to FridgeMate</h2>
        <p>Click below to join your family.</p>
        <a href="${inviteLink}">
          Join Family
        </a>
      `,
    });

    res.json({
      success: true,
      message: "Invitation sent",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to send invite",
    });
  }
};

// ==========================
// Join Family
// ==========================
export const joinFamily = async (req, res) => {
  try {
    const { token, name } = req.body;

    const invite = await Invite.findOne({
      token,
      status: "pending",
    });

    if (!invite) {
      return res.status(404).json({
        success: false,
        message: "Invalid invitation",
      });
    }

    const family = await Family.findById(
      invite.family
    );

    if (!family) {
      return res.status(404).json({
        success: false,
        message: "Family not found",
      });
    }

    const alreadyMember =
      family.members.some(
        (member) =>
          member.name &&
          member.name.toLowerCase() ===
            name.toLowerCase()
      );

    if (!alreadyMember) {
      family.members.push({
        name,
      });

      await family.save();
    }

    invite.status = "accepted";
    await invite.save();

    res.json({
      success: true,
      message:
        "Joined family successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to join family",
    });
  }
};

// ==========================
// Get Family Members
// ==========================
export const getMembers = async (
  req,
  res
) => {
  try {
    const family =
      await Family.findOne({
        owner: req.params.userId,
      }).populate("owner");

    if (!family) {
      return res.json({
        owner: null,
        members: [],
      });
    }

    res.json(family);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch members",
      });
  }
};
export const removeMember = async (
  req,
  res
) => {
  try {
    const { userId, name } = req.body;

    const family =
      await Family.findOne({
        owner: userId,
      });

    if (!family) {
      return res.status(404).json({
        success: false,
        message: "Family not found",
      });
    }

    family.members =
      family.members.filter(
        (member) =>
          member.name !== name
      );

    await family.save();

    res.json({
      success: true,
      message:
        "Member removed successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to remove member",
    });
  }
};