const express = require("express");
const app = express();
const authRoute = require("./routes/auth");
const cors = require("cors")
const path = require('path')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 5000

require("dotenv").config();

app.use(cors(
  {
    credentials: true,
    origin: 'http://localhost:3000'
  }
))
app.use(express.json());
app.use(cookieParser())


app.use("/api/auth", authRoute);
app.use('/api/profile', require('./routes/profile'))
app.use('/api/post', require('./routes/post'))
app.use('/api/company', require('./routes/company'))
app.use('/api/job', require('./routes/job'))


app.listen(PORT, () => {
  console.log("Server is running");
});