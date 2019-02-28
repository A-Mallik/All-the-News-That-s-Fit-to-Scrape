var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");
var result = {};
module.exports = app => {
  app.get("/", (req, res) => {
    res.render("index");
  });

  app.get("/scrape", function(req, res) {
    axios.get("https://www.nytimes.com/section/world").then(function(response) {
      var $ = cheerio.load(response.data);
      console.log($("p"));
      $("div.css-13mho3u ol li.css-ye6x8s").each(function(i, element) {
        //runs Cheerio on the data and retuns the elements as each
        result.title = $(this)
          .find("h2")
          .text();
        result.body = $(this)
          .find("p")
          .text();
        result.link = $(this)
          .find("a")
          .attr("href");
        // ----------------------------------
        db.Article.create(result)
          .then(function(dbArticle) {})
          .catch(function(err) {
            console.log(err);
          });
        // ----------------------------------
        // });
        // res.send("Scrape Complete");
      });
      // });
    });
  });

  app.get("/articles", function(req, res) {
    db.Article.find({})
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.post("/submit", function(req, res) {
    db.Comment.create(req.body).then(function(dbComment) {
      return db.Article.findOneAndUpdate(
        {},
        { $push: { notes: dbComment._id } },
        { new: true }
      );
    });
  });
};
