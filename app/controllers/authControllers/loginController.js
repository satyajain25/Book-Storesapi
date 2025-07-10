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
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};




/* export const updateUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const { username, email } = req.body;
    const profileImage = req.file?.path; // Cloudinary image URL
    console.log("req.body====", req.body);

    console.log("req.file===", req.file);
    console.log("profileImage==", profileImage);


    if (!username && !email && !profileImage) {
      return res.status(400).json({ message: "Provide at least one field to update" });
    }

    const updateFields = {};
    if (username) updateFields.username = username;
    if (email) updateFields.email = email;
    if (profileImage) updateFields.profileImage = profileImage;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true, runValidators: true }
    ).select("username email profileImage");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("updatedUser==", updatedUser);


    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update User Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
 */



export const updateUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const { username, email } = req.body;
    const profileImage = req.file?.path; 

    
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

  
    const updateFields = {
      username: username || existingUser.username,
      email: email || existingUser.email,
      profileImage: profileImage || existingUser.profileImage,
    };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true, runValidators: true }
    ).select("username email profileImage");

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update User Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};




/* export const updateUser = async (req, res) => {

  try {
    const userId = req.user._id; 
    const { username, email } = req.body;

    if (!username && !email) {
      return res.status(400).json({ message: "Username or email is required to update" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ...(username && { username }), ...(email && { email }) },
      { new: true, runValidators: true }
    ).select("username email profileImage");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update User Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}; */