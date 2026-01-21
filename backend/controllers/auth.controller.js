import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../config/db.js";

export const signup = (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({
      success: false,
      message: "Missing fields",
    });
  }

  const checkUserQuery = "SELECT id FROM users WHERE email = ?";

  db.query(checkUserQuery, [email], async (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false });
    }

    if (result.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertUserQuery =
      "INSERT INTO users (email, password, role) VALUES (?, ?, ?)";

    db.query(
      insertUserQuery,
      [email, hashedPassword, role],
      (err, insertRes) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ success: false });
        }

        // ✅ AUTO LOGIN PART
        const token = jwt.sign(
          { id: insertRes.insertId, role },
          process.env.JWT_SECRET,
          { expiresIn: "1d" },
        );

        return res.json({
          success: true,
          token,
          user: {
            email,
            role,
          },
        });
      },
    );
  });
};

/* ===================== LOGIN ===================== */
export const login = (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";

  db.query(query, [email], async (err, result) => {
    if (err) {
      console.error("Login error:", err);
      return res.status(500).json({ success: false });
    }

    if (result.length === 0) {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    return res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  });
};

/* ===================== LOGOUT ===================== */
export const logout = (req, res) => {
  // JWT logout = frontend deletes token
  res.json({ success: true });
};
