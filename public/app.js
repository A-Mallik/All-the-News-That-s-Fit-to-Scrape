
      $.ajax({
        method: "GET",
        url: "/articles/" 
      })
        .then(function(data) {
        var result = [];
        var divEl = document.createElement("div");
          console.log(data);
         for(var i = 0; i < data.length; i++){
            var titleCard = $(
                "<div>"
              );
              var commentSpace = $(
                "<div>"
              );
              titleCard.addClass("card");
             
              commentSpace.addClass("comment");
              var newPostTitle = $("<h3>");
              var newPostBody = $("<h3>");
              var commentButton = $("<button>");
              newPostTitle.html('<a href="' + data[i].link + '">' + data[i].title + '</a> ' + data[i].body);
              commentButton.text("Comment");
              commentButton.addClass(" btn btn-info offset ");
              titleCard.append(newPostTitle);
              titleCard.append(newPostBody);
              titleCard.append(commentButton);
              titleCard.append(commentSpace);
              commentSpace.addClass("comment");
              result.push(titleCard);
         }
         for(var i = 0; i < result.length; i++){
            document.querySelector("#articles").append(result[i][0]);
         }
        });