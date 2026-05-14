import { db } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* =========================
   REGISTER WORKER (SIGN UP)
========================= */
export const registerWorker = async (req, res) => {
  try {
    const {
      firstName,
      middleInitial,
      lastName,
      dateOfBirth,
      gender,
      email,
      mobileNumber,
      skills,
      experience,
      certifications,
      availability,
      preferredWages,
      workLocation,
      languages,
      password,
    } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    if (!Array.isArray(skills) || !Array.isArray(languages)) {
      return res.status(400).json({
        message: "Skills and languages must be arrays",
      });
    }

    // 🔍 Check if user already exists
    const [existingUsers] = await db
      .promise()
      .query("SELECT id FROM users WHERE email = ?", [email]);

    if (existingUsers.length) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 👤 Create user
    const [userResult] = await db.promise().query(
      `INSERT INTO users (email, password, role)
       VALUES (?, ?, 'worker')`,
      [email, hashedPassword],
    );

    const userId = userResult.insertId;

    // 🧑‍🔧 Create worker
    const normalizedDateOfBirth = dateOfBirth
      ? dateOfBirth.split("T")[0]
      : null;

    await db.promise().query(
      `INSERT INTO workers (
        user_id,
        first_name,
        middle_initial,
        last_name,
        email,
        date_of_birth,
        gender,
        mobile_number,
        skills,
        experience,
        certifications,
        availability,
        preferred_wages,
        work_location,
        languages
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        firstName,
        middleInitial,
        lastName,
        email,
        normalizedDateOfBirth,
        gender,
        mobileNumber,
        JSON.stringify(skills),
        experience,
        certifications,
        availability,
        preferredWages,
        workLocation,
        JSON.stringify(languages),
      ],
    );

    // 🔑 Generate JWT
    const token = jwt.sign(
      { id: userId, role: "worker" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: userId,
        email,
        role: "worker",
      },
    });
  } catch (err) {
    console.error("REGISTER WORKER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   GET WORKER PROFILE
========================= */
export const getWorkerProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const sql = `
      SELECT 
        w.first_name AS firstName, w.middle_initial AS middleInitial, w.last_name AS lastName,
        w.date_of_birth AS dateOfBirth, w.gender, u.email, w.mobile_number AS mobileNumber,
        w.skills, w.experience, w.certifications, w.availability,
        w.preferred_wages AS preferredWages, w.work_location AS workLocation, w.languages
      FROM workers w
      JOIN users u ON u.id = w.user_id
      WHERE w.user_id = ?
      LIMIT 1
    `;

    const [rows] = await db.promise().query(sql, [userId]);

    if (!rows.length) {
      return res.status(404).json({ exists: false });
    }

    const worker = rows[0];
    res.json({
      exists: true,
      data: {
        ...worker,
        skills: JSON.parse(worker.skills || "[]"),
        languages: JSON.parse(worker.languages || "[]"),
      },
    });
  } catch (err) {
    console.error("GET PROFILE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   UPDATE WORKER PROFILE
========================= */
export const updateWorkerProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      firstName,
      middleInitial,
      lastName,
      dateOfBirth,
      gender,
      mobileNumber,
      skills,
      experience,
      certifications,
      availability,
      preferredWages,
      workLocation,
      languages,
    } = req.body;

    const safeSkills = Array.isArray(skills) ? JSON.stringify(skills) : "[]";
    const safeLanguages = Array.isArray(languages)
      ? JSON.stringify(languages)
      : "[]";
    const normalizedDate = dateOfBirth ? dateOfBirth.split("T")[0] : null;

    const normalizedDateOfBirth = dateOfBirth
      ? dateOfBirth.split("T")[0]
      : null;

    await db.promise().query(
      `UPDATE workers
       SET
         first_name = ?,
         middle_initial = ?,
         last_name = ?,
         date_of_birth = ?,
         gender = ?,
         mobile_number = ?,
         skills = ?,
         experience = ?,
         certifications = ?,
         availability = ?,
         preferred_wages = ?,
         work_location = ?,
         languages = ?
       WHERE user_id = ?`,
      [
        firstName,
        middleInitial,
        lastName,
        normalizedDateOfBirth,
        gender,
        mobileNumber,
        JSON.stringify(skills),
        experience,
        certifications,
        availability,
        preferredWages,
        workLocation,
        JSON.stringify(languages),
        userId,
      ],
    );

    res.json({
      success: true,
      message: "Worker profile updated successfully",
    });
  } catch (err) {
    console.error("UPDATE WORKER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   GET ALL LISTINGS
========================= */
export const getAllListings = async (req, res) => {
  try {
    const sql = `
      SELECT l.*, e.company_name
      FROM listings l
      LEFT JOIN employers e ON l.employer_id = e.user_id
      ORDER BY l.created_at DESC
    `;

    const [rows] = await db.promise().query(sql);

    res.json({
      success: true,
      data: rows,
    });
  } catch (err) {
    console.error("GET ALL LISTINGS ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch listings",
    });
  }
};
