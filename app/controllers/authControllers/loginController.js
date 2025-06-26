import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/jwtUtil.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken({ userId: user._id, email: user.email });

    res.status(200).json({
      message: "Logged in successfully",
      token,
      user: { username: user.username, email: user.email, profileImage: user.profileImage },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
