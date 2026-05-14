import { db } from "../config/db.js";

/* ===================== 1. CREATE LISTING ===================== */
export const createListing = (req, res) => {
  if (req.user.role !== "employer") {
    return res.status(403).json({ message: "Employers only" });
  }

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

/* ===================== 2. GET LISTINGS ===================== */
export const getListings = (req, res) => {
  const employerId = req.user.id;
  db.query(
    `SELECT id, position, in_need_of AS inNeedOf, time_in AS timeIn, 
            time_out AS timeOut, salary, work_days AS workDays, progress, location
     FROM listings WHERE employer_id = ? ORDER BY created_at DESC`,
    [employerId],
    (err, rows) => {
      if (err) return res.status(500).json([]);
      res.json(rows);
    },
  );
};

/* ===================== 3. GET PROFILE ===================== */
export const getCompanyProfile = (req, res) => {
  const userId = req.user.id;
  const sql = `
    SELECT company_name AS companyName, company_email AS companyEmail, contact_number AS contactNumber, 
           company_address AS companyAddress, business_type AS businessType,
           registration_number AS registrationNumber, year_established AS yearEstablished
    FROM employers WHERE user_id = ? LIMIT 1
  `;

  db.query(sql, [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: "DB Error" });
    if (rows.length === 0) {
      return res.status(200).json({
        companyName: "",
        businessType: "",
        registrationNumber: "",
        yearEstablished: "",
        companyAddress: "",
        contactNumber: "",
        companyEmail: "",
      });
    }
    res.status(200).json(rows[0]);
  });
};

/* ===================== 4. UPDATE PROFILE ===================== */
export const updateCompanyProfile = (req, res) => {
  const userId = req.user.id;
  const {
    companyName,
    businessType,
    registrationNumber,
    yearEstablished,
    companyAddress,
    contactNumber,
    companyEmail,
  } = req.body;

  const sql = `
    INSERT INTO employers (user_id, company_name, company_email, contact_number, company_address, business_type, registration_number, year_established)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      company_name = VALUES(company_name), company_email = VALUES(company_email), contact_number = VALUES(contact_number),
      company_address = VALUES(company_address), business_type = VALUES(business_type),
      registration_number = VALUES(registration_number), year_established = VALUES(year_established),
      updated_at = CURRENT_TIMESTAMP
  `;

  db.query(
    sql,
    [
      userId,
      companyName,
      companyEmail,
      contactNumber,
      companyAddress,
      businessType,
      registrationNumber,
      yearEstablished,
    ],
    (err) => {
      if (err) return res.status(500).json({ error: "Failed to save" });
      res.status(200).json({ success: true });
    },
  );
};

/* ===================== 5. GET APPLICANTS (New) ===================== */
export const getApplicants = (req, res) => {
  const employerId = req.user.id;
  const sql = `
    SELECT a.id AS application_id, a.status, a.applied_at, l.position AS job_title,
           w.first_name, w.last_name, w.mobile_number, w.skills, w.experience
    FROM applications a
    JOIN listings l ON a.listing_id = l.id
    JOIN workers w ON a.worker_id = w.id
    WHERE l.employer_id = ?
    ORDER BY a.applied_at DESC
  `;

  db.query(sql, [employerId], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
};

/* ===================== 6. UPDATE APP STATUS (New) ===================== */
export const updateApplicationStatus = (req, res) => {
  const { status } = req.body;
  const sql = "UPDATE applications SET status = ? WHERE id = ?";
  db.query(sql, [status, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: "Update failed" });
    res.json({ success: true });
  });
};
