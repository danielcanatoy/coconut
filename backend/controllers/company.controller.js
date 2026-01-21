import { db } from "../config/db.js";

export const createListing = (req, res) => {
  if (req.user.role !== "employer") {
    return res.status(403).json({ message: "Employers only" });
  }

  const employerId = req.user.id; // users.id (OK for now)

  const { position, inNeedOf, timeIn, timeOut, salary, workDays, location } =
    req.body;

  const sql = `
    INSERT INTO listings
    (employer_id, position, in_need_of, time_in, time_out, salary, work_days, location)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      employerId,
      position,
      inNeedOf,
      timeIn,
      timeOut,
      salary,
      workDays,
      location,
    ],
    (err, result) => {
      if (err) {
        console.error("DB ERROR:", err);
        return res.status(500).json({ success: false });
      }

      res.status(201).json({ success: true, id: result.insertId });
    },
  );
};

export const getListings = (req, res) => {
  const employerId = req.user.id;

  db.query(
    `
    SELECT
      id,
      position,
      in_need_of AS inNeedOf,
      time_in AS timeIn,
      time_out AS timeOut,
      salary,
      work_days AS workDays,
      progress,
      location
    FROM listings
    WHERE employer_id = ?
    ORDER BY created_at DESC
    `,
    [employerId],
    (err, rows) => {
      if (err) {
        console.error("GET LISTINGS ERROR:", err);
        return res.status(500).json([]);
      }
      res.json(rows);
    },
  );
};
