const router = require("express").Router();
const pool = require("../db");
const verify = require("../middleware/jwtVerify");

router.post("/", verify, async (req, res) => {
  const { job } = req.body;
  try {
    const jobDB = await pool.query(
      `INSERT INTO jobs (user_id, position, company, type, location, workplace_type, "desc") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        req.user,
        job.position,
        job.company,
        job.type,
        job.location,
        job.workplace_type,
        job.desc,
      ]
    );
    return res.status(203).json({ message: "Job posted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.get("/", verify, async (req, res) => {
  try {
    const jobData = await pool.query(
      "SELECT jobs.id, users.avatar, users.full_name, users.bio, jobs.position, jobs.company, jobs.user_id, jobs.type, jobs.location, jobs.workplace_type, jobs.desc FROM jobs JOIN users ON users.id = jobs.user_id"
    );
    return res.status(200).json(jobData.rows);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.get("/:id", verify, async (req, res) => {
  const { id } = req.params;
  try {
    const jobDB = await pool.query(
      "SELECT jobs.id, users.avatar, users.full_name, users.bio, jobs.position, jobs.company, jobs.user_id, jobs.type, jobs.location, jobs.workplace_type, jobs.desc FROM jobs JOIN users ON users.id = jobs.user_id WHERE jobs.id = $1",
      [id]
    );
    return res.status(200).json(jobDB.rows[0])
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = router;
