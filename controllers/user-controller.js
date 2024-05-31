import { UserModel } from "../models/user-model.js";

export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res.json({ success: true, user });
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
