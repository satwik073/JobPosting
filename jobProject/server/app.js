const dotenv = require("dotenv");
const express = require("express");
const app = express();
dotenv.config({ path: "./config.env" });
const cookieParser = require('cookie-parser')
require("./db/conn");

app.use(express.json());
app.use(cookieParser());
app.use(require("./router/auth"));
//const User = require("./model/userSchema");

const PORT = process.env.PORT;

// middleware
// const middleware = (req, res, next) => {
//   console.log("Hello My Middleware");
//   next();
// };

app.get("/",  (req, res) => {
  res.send(`Hi There`);
});


app.get("/contact", (req, res) => {
  res.cookie("abc","satwik");
  res.send(`Contact`);
});

// app.get("/signin", (req, res) => {
//   res.send(`Sign In`);
// });

app.get("/about", (req, res) => {
  res.send(`About section`);
});

// app.get("/register", (req, res) => {
//   res.send(`Register`);
// });

app.listen(PORT, () => {
  console.log(`Running successfully on port ${PORT}`);
});
