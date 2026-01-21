import { db } from "../config/db.js";

/* ===================== 1. CREATE LISTING ===================== */
export const createListing = (req, res) => {
  const employerId = req.user.id;
  const { position, inNeedOf, timeIn, timeOut, salary, workDays, location } = req.body;

  const sql = `
    INSERT INTO listings
    (employer_id, position, in_need_of, time_in, time_out, salary, work_days, location)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [employerId, position, inNeedOf, timeIn, timeOut, salary, workDays, location],
    (err, result) => {
      if (err) {
        console.error("DB ERROR:", err);
        return res.status(500).json({ success: false });
      }
      res.status(201).json({ success: true, id: result.insertId });
    }
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
      if (err) {
        console.error("GET LISTINGS ERROR:", err);
        return res.status(500).json([]);
      }
      res.json(rows);
    }
  );
};

/* ===================== 3. GET PROFILE (Fixed: No Kokomartin) ===================== */
export const getCompanyProfile = (req, res) => {
  const employerId = req.user.id;
  
  const sql = `
    SELECT 
       company_name AS companyName, 
       company_email AS companyEmail, 
       contact_number AS contactNumber, 
       company_address AS companyAddress,
       business_type AS businessType,
       registration_number AS registrationNumber,
       year_established AS yearEstablished
    FROM employers 
    WHERE user_id = ? 
    LIMIT 1
  `;

  db.query(sql, [employerId], (err, rows) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "DB Error" });
    }
    
    // ✅ If no user found, return null (Frontend will show blank)
    if (rows.length === 0) {
      return res.status(200).json(null);
    }
    
    const data = rows[0];
    
    // ✅ Return empty strings "" instead of nulls to prevent default text
    res.status(200).json({
      companyName: data.companyName || "",
      businessType: data.businessType || "",
      registrationNumber: data.registrationNumber || "",
      yearEstablished: data.yearEstablished || "",
      companyAddress: data.companyAddress || "",
      contactNumber: data.contactNumber || "",
      companyEmail: data.companyEmail || "",
    });
  });
};

/* ===================== 4. UPDATE PROFILE (Fixed: Saves Correctly) ===================== */
export const updateCompanyProfile = (req, res) => {
  const employerId = req.user.id;
  const { 
    companyName, 
    businessType, 
    registrationNumber, 
    yearEstablished,
    companyAddress, 
    contactNumber, 
    companyEmail 
  } = req.body;
  
  const sql = `
    INSERT INTO employers 
    (user_id, company_name, company_email, contact_number, company_address, 
     business_type, registration_number, year_established)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      company_name = VALUES(company_name),
      company_email = VALUES(company_email),
      contact_number = VALUES(contact_number),
      company_address = VALUES(company_address),
      business_type = VALUES(business_type),
      registration_number = VALUES(registration_number),
      year_established = VALUES(year_established),
      updated_at = CURRENT_TIMESTAMP
  `;

  const values = [
    employerId, 
    companyName, 
    companyEmail, 
    contactNumber, 
    companyAddress,
    businessType,
    registrationNumber,
    yearEstablished
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Save Error:", err);
      return res.status(500).json({ error: "Failed to save" });
    }
    res.status(200).json({ success: true });
  });
};
