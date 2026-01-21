import { db } from "../config/db.js";

// Helper functions (Dapat nasa loob din ito ng file o naka-import)
const getWorkerByEmail = async (email) => {
  const sql = `
    SELECT w.id, w.user_id FROM workers w
    JOIN users u ON u.id = w.user_id
    WHERE u.email = ? LIMIT 1
  `;
  const [rows] = await db.promise().query(sql, [email]);
  return rows.length ? rows[0] : null;
};

const ensureUserExists = async (email, password, role) => {
  const checkSql = `SELECT id FROM users WHERE email = ? LIMIT 1`;
  const [existing] = await db.promise().query(checkSql, [email]);
  if (existing.length > 0) return existing[0].id;

  const insertSql = `INSERT INTO users (email, password, role) VALUES (?, ?, ?)`;
  const [result] = await db.promise().query(insertSql, [email, password || 'default123', role || 'worker']);
  return result.insertId;
};

// --- ETO YUNG NAWAWALA KAYA NAG-E-ERROR ---
export const getWorkerProfileByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const sql = `
      SELECT 
        w.first_name AS firstName, w.middle_initial AS middleInitial, w.last_name AS lastName,
        w.date_of_birth AS dateOfBirth, w.gender, u.email, w.mobile_number AS mobileNumber,
        w.skills, w.experience, w.certifications, w.availability,
        w.preferred_wages AS preferredWages, w.work_location AS workLocation, w.languages
      FROM workers w
      JOIN users u ON u.id = w.user_id
      WHERE u.email = ? LIMIT 1
    `;

    const [rows] = await db.promise().query(sql, [email]);
    if (!rows.length) return res.status(404).json({ exists: false });

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

// --- ETO YUNG CODE NA PINADALA MO ---
export const createOrUpdateWorkerProfile = async (req, res) => {
  try {
    const data = req.body;
    const { email, skills, languages, dateOfBirth } = data;

    if (!email) return res.status(400).json({ message: "Email is required" });

    const safeSkills = Array.isArray(skills) ? JSON.stringify(skills) : "[]";
    const safeLanguages = Array.isArray(languages) ? JSON.stringify(languages) : "[]";
    const normalizedDate = dateOfBirth ? dateOfBirth.split("T")[0] : null;

    const existingWorker = await getWorkerByEmail(email);

    if (!existingWorker) {
      const userId = await ensureUserExists(email, data.password, data.role);
      const insertSql = `
        INSERT INTO workers (
          user_id, first_name, middle_initial, last_name, 
          date_of_birth, gender, mobile_number, skills, 
          experience, certifications, availability, 
          preferred_wages, work_location, languages
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const values = [
        userId, data.firstName, data.middleInitial, data.lastName,
        normalizedDate, data.gender, data.mobileNumber, safeSkills,
        data.experience, data.certifications, data.availability,
        data.preferredWages, data.workLocation, safeLanguages
      ];
      await db.promise().query(insertSql, values);
      return res.status(201).json({ success: true, created: true });
    } else {
      const updateSql = `
        UPDATE workers SET 
          first_name = ?, middle_initial = ?, last_name = ?, 
          date_of_birth = ?, gender = ?, mobile_number = ?, 
          skills = ?, experience = ?, certifications = ?, 
          availability = ?, preferred_wages = ?, 
          work_location = ?, languages = ?
        WHERE user_id = ?`;

      const updateValues = [
        data.firstName, data.middleInitial, data.lastName,
        normalizedDate, data.gender, data.mobileNumber, safeSkills,
        data.experience, data.certifications, data.availability,
        data.preferredWages, data.workLocation, safeLanguages,
        existingWorker.user_id
      ];
      await db.promise().query(updateSql, updateValues);
      return res.json({ success: true, updated: true });
    }
  } catch (error) {
    console.error("❌ SQL ERROR DETAIL:", error.sqlMessage || error.message);
    res.status(500).json({ message: error.message });
  }
};