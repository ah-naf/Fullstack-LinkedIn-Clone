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
  const { post } = req.body;
  if (post.id !== req.user) {
    return res.status(403).json({ msg: "Not Authorized" });
  }

  try {
    const postDB = await pool.query(
      "INSERT INTO posts (user_id, post, img, post_time) VALUES ($1, $2, $3, $4)",
      [post.id, post.desc, post.image, post.post_time]
    );
    return res.status(203).json({ msg: "Post Shared Successfully." });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
});

router.get("/", verify, async (req, res) => {
  const posts = await pool.query(
    "SELECT posts.post_time, posts.id AS post_id, posts.post, posts.img, posts.comments, users.username, users.avatar, users.full_name, users.bio, posts.total_likes, posts.user_id FROM posts JOIN users ON users.id = posts.user_id"
  );
  const newPost = posts.rows.map((item) => {
    return {
      user_id: posts.user_id,
      post_id: item.post_id,
      post: item.post,
      post_img: item.img,
      post_time: item.post_time,
      comments: item.comments,
      username: item.username,
      avatar: item.avatar,
      full_name: item.full_name,
      bio: item.bio,
      total_likes: item.total_likes,
    };
  });
  res.send(posts.rows);
});

router.get("/:id", verify, async (req, res) => {
  const posts = await pool.query(
    "SELECT posts.post_time, posts.id AS post_id, posts.post, posts.img, posts.comments, users.username, users.avatar, users.full_name, users.bio, posts.total_likes, posts.user_id FROM posts JOIN users ON users.id = posts.user_id WHERE users.id = $1",
    [req.params.id]
  );
  const newPost = posts.rows.map((item) => {
    return {
      user_id: posts.user_id,
      post_id: item.post_id,
      post: item.post,
      post_img: item.img,
      post_time: item.post_time,
      comments: item.comments,
      username: item.username,
      avatar: item.avatar,
      full_name: item.full_name,
      bio: item.bio,
      total_likes: item.total_likes,
    };
  });
  res.send(posts.rows);
});

router.put("/like", verify, async (req, res) => {
  const { post_id, likes } = req.body;
  try {
    const update = await pool.query(
      "UPDATE posts SET total_likes = $1 WHERE id = $2 RETURNING *",
      [likes, post_id]
    );
    return res.status(203).json({ msg: "Post liked Successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
});

router.put("/comment", verify, async (req, res) => {
  const { currentComment, comment } = req.body;
  try {
    const update = await pool.query(
      "UPDATE posts SET comments = $1 WHERE id = $2",
      [JSON.stringify(comment), currentComment.post_id]
    );
    return res.status(203).json({ msg: "Successful" });
  } catch (error) {
    
    return res.status(500).json({ msg: error });
  }
});

router.delete("/comment", verify, async (req, res) => {
  const { post_id } = req.body;
  try {
    const deletePost = await pool.query("DELETE FROM posts WHERE id = $1", [
      post_id,
    ]);
    return res.status(204).json({ msg: "Message Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
});

module.exports = router;
