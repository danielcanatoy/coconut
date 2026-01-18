import { db } from "../config/db.js";

const getWorkerByEmail = async (email) => {
  const sql = `
    SELECT w.id, w.user_id
    FROM workers w
    JOIN users u ON u.id = w.user_id
    WHERE u.email = ?
    LIMIT 1
  `;
  const [rows] = await db.promise().query(sql, [email]);
  return rows.length ? rows[0] : null;
};

const ensureUserExists = async (email, password, role) => {
  const checkSql = `SELECT id FROM users WHERE email = ? LIMIT 1`;
  const [existing] = await db.promise().query(checkSql, [email]);

  if (existing.length > 0) return existing[0].id;

  if (!password || !role) {
    throw new Error("Password and role are required for new users");
  }

  const insertSql = `
    INSERT INTO users (email, password, role)
    VALUES (?, ?, ?)
  `;

  const [result] = await db.promise().query(insertSql, [email, password, role]);
  return result.insertId;
};

export const getWorkerProfileByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const sql = `
      SELECT
        w.first_name AS firstName,
        w.middle_initial AS middleInitial,
        w.last_name AS lastName,
        w.date_of_birth AS dateOfBirth,
        w.gender,
        u.email,
        w.mobile_number AS mobileNumber,
        w.skills,
        w.experience,
        w.certifications,
        w.availability,
        w.preferred_wages AS preferredWages,
        w.work_location AS workLocation,
        w.languages
      FROM workers w
      JOIN users u ON u.id = w.user_id
      WHERE u.email = ?
      LIMIT 1
    `;

    const [rows] = await db.promise().query(sql, [email]);

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
    console.error("GET WORKER PROFILE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const createOrUpdateWorkerProfile = async (req, res) => {
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
      password, // create only
      role, // create only
    } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!Array.isArray(skills) || !Array.isArray(languages)) {
      return res.status(400).json({
        message: "Skills and languages must be arrays",
      });
    }

    const existingWorker = await getWorkerByEmail(email);

    // 🆕 CREATE
    if (!existingWorker) {
      const userId = await ensureUserExists(email, password, role);

      const insertSql = `
        INSERT INTO workers (
          user_id,
          first_name,
          middle_initial,
          last_name,
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
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const normalizedDateOfBirth = dateOfBirth
        ? dateOfBirth.split("T")[0]
        : null;

      const values = [
        userId,
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
      ];

      const [result] = await db.promise().query(insertSql, values);

      return res.status(201).json({
        success: true,
        created: true,
        workerId: result.insertId,
      });
    }

    // 🔁 UPDATE
    const updateSql = `
      UPDATE workers
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
      WHERE user_id = ?

    `;
    const normalizedDateOfBirth = dateOfBirth
      ? dateOfBirth.split("T")[0]
      : null;

    const updateValues = [
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
      existingWorker.user_id,
    ];

    await db.promise().query(updateSql, updateValues);

    res.json({
      success: true,
      updated: true,
      message: "Worker profile updated successfully",
    });
  } catch (error) {
    console.error("CREATE / UPDATE WORKER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
