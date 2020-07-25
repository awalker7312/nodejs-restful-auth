const express = require("express");
const { Router } = require("express");
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require("mongoose");

// set the view engine to ejs
app.set('view engine', 'ejs');

// index page 
app.get('/', function(req, res) {
  res.render('pages/index');
});

// about page 
app.get('/about', function(req, res) {
  res.render('pages/about');
});

//IMPORT ROUTES
const authRoute = require("./routes/auth");
const postRoute = require('./routes/posts');

//CONNECT TO DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB")
);

//MIDDLEWARE
app.use(express.json());

//ROUTE MIDDLEWARE
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);

app.listen(3000, () => console.log("Server Up and Running"));
