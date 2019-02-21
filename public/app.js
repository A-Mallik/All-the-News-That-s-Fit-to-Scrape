
      $.ajax({
        method: "GET",
        url: "/articles/" 
      })
        // With that done, add the note information to the page
        .then(function(data) {
        var result = [];
        var divEl = document.createElement("div");
          console.log(data);
         for(var i = 0; i < data.length; i++){
            //  result.push(divEl + "Title:" + data[i].title);
            var titleCard = $(
                "<div style='height:120px;border-radius: 10px; border:0.5px solid; padding:10px' >"
              );
              titleCard.addClass("card");
           
            //   var commentButton = $("<button>");
            //   titleCard.append(commentButton);
            //   commentButton.text("Comment");
            //   
              var newPostTitle = $("<h2>");
              var commentButton = $("<button>");
              newPostTitle.html('<a href="' + data[i].link + '">' + data[i].title + '</a> ');
              commentButton.text("Comment");
              commentButton.addClass(" btn btn-info offset ");
              titleCard.append(newPostTitle);
              titleCard.append(commentButton);
         
            result.push(titleCard);
            // document.querySelector("#articles").append(data[i].title + "<br >")  ;
            // console.log(data[i].link);
         }
         for(var i = 0; i < result.length; i++){
            document.querySelector("#articles").append(result[i][0]);
            // console.log(result[i][0]);
         }
        });