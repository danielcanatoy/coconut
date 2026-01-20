import { db } from "../config/db.js";

export const createListing = (req, res) => {
  const employerId = req.user.id;
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
      employer_id,
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
        return res.status(500).json({ message: "DB error" });
      }
      res.status(201).json({ id: result.insertId });
    },
  );
};

export const getListings = (req, res) => {
  const employerId = req.user.id;

  db.query(
    "SELECT * FROM listings WHERE employer_id = ? ORDER BY created_at DESC",
    [employerId],
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      res.json(rows);
    },
  );
};
