import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../config/db.js";

/* ===================== SIGNUP ===================== */
export const signup = (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({
      success: false,
      message: "Missing fields",
    });
  }

  // Check if email exists
  db.query(
    "SELECT id FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) return res.status(500).json({ success: false, error: err });

      if (result.length > 0) {
        return res.status(409).json({
          success: false,
          message: "Email already exists",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user
      db.query(
        "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
        [email, hashedPassword, role],
        (err, insertRes) => {
          if (err) return res.status(500).json({ success: false, error: err });

          // Create JWT Token
          const token = jwt.sign(
            { id: insertRes.insertId, role },
            process.env.JWT_SECRET || "fallback_secret",
            { expiresIn: "1d" },
          );

          console.log(
            `✅ NEW USER SIGNED UP: ${email} (ID: ${insertRes.insertId})`,
          );

          // ✅ SEND COOKIE (Critical for authMiddleware)
          res.cookie("token", token, {
            httpOnly: true,
            secure: false, // Set true in production (https)
            sameSite: "lax",
          });

          return res.json({
            success: true,
            token,
            user: {
              id: insertRes.insertId,
              email,
              role,
            },
          });
        },
      );
    },
  );
};

/* ===================== LOGIN ===================== */
export const login = (req, res) => {
  const { email, password } = req.body;

  console.log(`🔍 LOGIN ATTEMPT: ${email}`);

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) return res.status(500).json({ success: false, error: err });

      if (result.length === 0) {
        console.log("❌ USER NOT FOUND");
        return res.json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const user = result[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        console.log("❌ PASSWORD MISMATCH");
        return res.json({
          success: false,
          message: "Invalid email or password",
        });
      }

      // Create JWT Token
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || "fallback_secret",
        { expiresIn: "1d" },
      );

      console.log(`✅ LOGIN SUCCESS: ${user.email} (ID: ${user.id})`);

      // ✅ SEND COOKIE (Critical for authMiddleware)
      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // Set true in production
        sameSite: "lax",
      });

      return res.json({
        success: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      });
    },
  );
};

/* ===================== LOGOUT ===================== */
export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ success: true });
};
