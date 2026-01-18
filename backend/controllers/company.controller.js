import { db } from "../config/db.js";

export const createListing = (req, res) => {
  const { position, inNeedOf, timeIn, timeOut, salary, workDays, location } =
    req.body;

  const sql = `
    INSERT INTO listings
    (position, in_need_of, time_in, time_out, salary, work_days, location)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [position, inNeedOf, timeIn, timeOut, salary, workDays, location],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "DB error" });
      }
      res.status(201).json({ id: result.insertId });
    }
  );
};

export const getListings = (req, res) => {
  db.query("SELECT * FROM listings", (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
};
