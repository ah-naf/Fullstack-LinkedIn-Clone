const router = require("express").Router();
const pool = require("../db");
const verify = require("../middleware/jwtVerify");
const multer = require("multer");
const { storage } = require("../utility/cloudinaryConfig");
const upload = multer({ storage });

router.put("/:id", verify, async (req, res) => {
  if (req.user !== req.params.id) {
    return res.status(403).json({ msg: "You are not authorized" });
  }

  try {
    // SUMMARY
    if (req.query.summary === "1") {
      const { summary } = req.body;

      const change = await pool.query(
        "UPDATE users SET summary = $1 WHERE id = $2",
        [summary, req.user]
      );
      return res.status(203).json({ msg: "Summary Updated Successfully" });
    }

    // EXPERIENCE
    if (req.query.experience === "1") {
      const { experience } = req.body;
      const change = await pool.query(
        "UPDATE users SET experience = $1 WHERE id = $2",
        [JSON.stringify(experience), req.user]
      );
      return res.status(203).json({ msg: "Experience Updated Successfully" });
    }

    // EDUCATION
    if (req.query.education === "1") {
      const { education } = req.body;
      const change = await pool.query(
        "UPDATE users SET education = $1 WHERE id = $2",
        [JSON.stringify(education), req.user]
      );
      return res.status(203).json({ msg: "Education Updated Successfully" });
    }

    // SKILL
    if (req.query.skill === "1") {
      const { skill } = req.body;
      const change = await pool.query(
        "UPDATE users SET skill = $1 WHERE id = $2",
        [JSON.stringify(skill), req.user]
      );
      return res.status(203).json({ msg: "Skill Updated Successfully" });
    }

    // SKILL
    if (req.query.name === "1") {
      const { name } = req.body;
      const change = await pool.query(
        "UPDATE users SET full_name = $1 WHERE id = $2",
        [name, req.user]
      );
      return res.status(203).json({ msg: "Name Updated Successfully" });
    }

    // BIO
    if (req.query.bio === "1") {
      const { bio } = req.body;
      const change = await pool.query(
        "UPDATE users SET bio = $1 WHERE id = $2",
        [bio, req.user]
      );
      return res.status(203).json({ msg: "Bio Updated Successfully" });
    }
  } catch (error) {
      return res.status(500).json({msg: error})
  }
});

router.post("/upload", verify, upload.single("image"), async (req, res) => {
  const { path } = req.file;
  try {
    const update = await pool.query(
      "UPDATE users SET avatar = $1 WHERE id = $2",
      [path, req.user]
    );
    return res.status(203).json({ avatar: path });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
});


module.exports = router;
