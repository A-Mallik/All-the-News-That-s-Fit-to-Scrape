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

  app.get("/comments", function(req, res) {
    db.Comment.find({})
      .then(function(dbComment) {
        res.json(dbComment);
      })
      .catch(function(err) {
        res.json(err);
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

//---------------------------------------


app.post("/submit", function(req, res) {
  db.Comment.create(req.body)
    .then(function(dbComment) {
      return db.Article.findOneAndUpdate({}, { $push: { comment: dbComment._id } }, { new: true });
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});


app.get("/populatedArticles", function(req, res) {
  // Find all articles
  db.Article.find({})
    // Specify the retrieved articles with any associated coments
    .populate("comment")
    .then(function(dbArticle) {
      // send them back once found
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});




  // ------------------------------------
};
