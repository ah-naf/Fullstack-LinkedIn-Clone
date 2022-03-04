const router = require("express").Router();
const pool = require("../db");
const verify = require("../middleware/jwtVerify");
const multer = require("multer");
const { storage } = require("../utility/cloudinaryConfig");
const upload = multer({ storage });

router.post("/upload", verify, upload.single("image"), async (req, res) => {
  const { path } = req.file;
  return res.status(203).json({ image: path });
});

router.post("/", verify, async (req, res) => {

  try {
    const create = await pool.query(
      `INSERT INTO company ("name", website, type, tagline, logo, cover_pic, location) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        req.body.name,
        req.body.website,
        req.body.type,
        req.body.tagline,
        req.body.company_logo,
        req.body.cover_pic,
        req.body.location
      ]
    );
    return res.status(203).json({msg: 'Company Page Created Successfully'})
  } catch (error) {
    return res.status(500).json({message: error})
  }
});

router.get('/', verify, async (req, res) => {
  try {
    const companyData = await pool.query('SELECT * FROM company');
    return res.status(200).json({company: companyData.rows})
  } catch (error) {
    return res.status(500).json({message: error})
  }
})

router.get('/:id', verify, async (req, res) => {
  try {
    const company = await pool.query('SELECT * FROM company WHERE id = $1', [req.params.id])
    return res.status(200).json(company.rows[0])
  } catch (error) {
    return res.status(500).json({message: error})
  }
})

module.exports = router;
