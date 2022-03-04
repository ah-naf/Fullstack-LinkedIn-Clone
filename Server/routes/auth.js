const router = require("express").Router();
const pool = require("../db");
const verify = require("../middleware/jwtVerify");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

router.post("/register", async (req, res) => {
  const { fullName, username, email, password } = req.body;

  const emailExist = await pool.query(
    "SELECT * FROM users WHERE email = $1 OR username = $2",
    [email, username]
  );

  if (emailExist.rows.length !== 0) {
    return res.status(400).json({ message: "User already exists!" });
  }

  const hashedPass = await bcrypt.hash(password, 12);

  const newUser = await pool.query(
    "INSERT INTO users (username, email, password, full_name) VALUES ($1,$2,$3,$4) RETURNING *",
    [username, email, hashedPass, fullName]
  );

  const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET, {
    expiresIn: "1hr",
  });

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 3600,
      path: "/",
    })
  );
  res.status(200).json({ message: "User create successfully!" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if user exist
  const user = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  if (user.rows.length === 0) {
    return res.status(400).json({ message: "User doesn't exist" });
  }

  // Check password
  const passDidMatch = await bcrypt.compare(password, user.rows[0].password);
  if (!passDidMatch) {
    return res.status(400).json({ message: "Invalid password or email" });
  }

  // Generate token
  const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, {
    expiresIn: "1hr",
  });

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "strict",
      maxAge: 3600,
      path: "/",
    })
  );

  res.status(200).json({ message: "Logged In Successfully!" });
});

router.get("/logout", verify, async (req, res) => {
  res.removeHeader("Set-Cookie");
  res.clearCookie("auth");
  res.status(200).json({ message: "User logged out successfully" });
});

router.get("/", verify, async (req, res) => {
  const user = await pool.query("SELECT * FROM users WHERE id = $1", [
    req.user,
  ]);
  const { password, ...rest } = user.rows[0];
  const { username, email, avatar, full_name, ...details } = rest;

  return res.status(200).json({
    user: {
      id: user.rows[0].id,
      username,
      email,
      avatar,
      full_name,
    },
    details,
  });
});

router.get("/:id", verify, async (req, res) => {
  const user = await pool.query("SELECT * FROM users WHERE id = $1", [
    req.params.id,
  ]);
  const { password, ...rest } = user.rows[0];
  const { username, email, avatar, full_name, ...details } = rest;

  return res.status(200).json({
    user: {
      id: user.rows[0].id,
      username,
      email,
      avatar,
      full_name,
    },
    details,
  });
});

router.get('/people/get', verify, async (req, res) => {
  try {
    const pymk = await pool.query('SELECT * FROM users WHERE id != $1 LIMIT 3', [req.user])
    const temp = pymk.rows.map(item => ({
      id: item.id,
      full_name: item.full_name,
      bio: item.bio,
      username: item.username,
      avatar: item.avatar
    }))
    return res.status(200).json(temp)
  } catch (error) {
    return res.status(500).json({message: error})
  }
})

module.exports = router;
