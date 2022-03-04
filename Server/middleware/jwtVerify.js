require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const { auth } = req.cookies;
    if (!auth) {
      return res.status(403).json({ msg: "Not Authorized" });
    } else {
      const data = jwt.verify(auth, process.env.JWT_SECRET);
      req.user = data.id;
      return next();
    }
  } catch (error) {
    return res.status(403).json({ msg: "Not Authorized" });
  }
  next();
};
