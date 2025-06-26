import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export function generateToken(payload) {
    dotenv.config();

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
}
