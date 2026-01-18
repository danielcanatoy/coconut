import jwt from "jsonwebtoken";

export const login = (req, res) => {
  const { email, password } = req.body;

  const role = email.includes("company") ? "employer" : "worker";

  const token = jwt.sign({ email, role }, "SECRET", { expiresIn: "1h" });

  res.json({
    success: true,
    token,
    user: { email, role },
  });
};

export const signup = (req, res) => {
  res.json({ success: true });
};

export const logout = (req, res) => {
  res.json({ success: true });
};
