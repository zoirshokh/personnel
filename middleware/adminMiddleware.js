module.exports = (req, res, next) => {
  const key = req.headers["adminkey"];

  if (key !== "superadmin123") {
    return res.status(403).json({ message: "Faqat admin kira oladi" });
  }

  next();
};
