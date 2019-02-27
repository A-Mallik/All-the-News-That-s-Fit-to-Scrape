var db = require("../models");
var axios = require('axios');
var cheerio = require('cheerio');
var result = {};
module.exports = (app) => {
    
    app.get("/", (req, res) => {
        res.render("index");
      });

    app.get("/scrape", function(req, res) {

        axios.get("https://www.nytimes.com/section/world").then(function(response) {

          var $ = cheerio.load(response.data);
          console.log($("p"))
         
          // $("p.e4e4i5l4").each(function(i, element) {   //runs Cheerio on the data and retuns the elements as each
          //        console.log("body: " + $(element).text());  // gets the P tag element which contains the summary
          //        result.body = $(element).text();
          //       });
          $("div.css-13mho3u ol h2").each(function(i, element) {   //runs Cheerio on the data and retuns the elements as each
          // $("ol").each(function(i, element) {   //runs Cheerio on the data and retuns the elements as each
                //  console.log("body: " + $(element).text());  // gets the P tag element which contains the summary
                //  result.body = $(element).text();
                // result.title = $(element).find("h2").text();
                // // result.link = $(element).find("h2").text();
                // result.body = $(element).find("p.e4e4i5l4").text();
                
                console.log($(this).text());
          //       $("article h2").each(function(i, elements) {  
          //   result.title = $(element).find("h2.css-1dq8tca").text();
          //  result.body = $(element).find("p.css-1echdzn").text();     
            
            
          // //         result.title = $(this)
          // //           .children("a")
          // //           .text();
          // //         result.link = $(this)
          // //           .children("a")
          // //           .attr("href");
                    
          //         // ----------------------------------
          //         db.Article.create(result)
          //           .then(function(dbArticle) {
      
          //           })
          //           .catch(function(err) {
        
          //             console.log(err);
          //           });
                  // ----------------------------------
                  
          // });
 
          res.send("Scrape Complete");
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

      


}
