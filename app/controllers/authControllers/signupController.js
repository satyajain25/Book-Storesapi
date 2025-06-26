import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import { generateAvatar } from "../../helpers/avatarGenerator.js";
import { generateToken } from "../../utils/jwtUtil.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already in use" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const profileImage = generateAvatar(username);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      profileImage,
    });

    await user.save();

    const token = generateToken({ userId: user._id, email: user.email });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { username, email, profileImage },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
