var express = require('express');
var exphbs = require("express-handlebars");
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var axios = require('axios');
var logger = require('morgan');
var app = express();
var PORT = process.env.PORT || 3000 ;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
var db = require("./models");
mongoose.connect(MONGODB_URI);

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine(
    "handlebars",
    exphbs({
      defaultLayout: "main"
    })
  );
  app.set("view engine", "handlebars");
  
 
require("./routes/api-routes.js")(app);

// app.get("/api/comment", function(req, res){
//   db.Comment.create(req.body).then(function(dbComment) {
//     res.json(dbComment);
//   });
// });

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  