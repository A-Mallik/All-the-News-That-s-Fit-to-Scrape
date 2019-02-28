


     
     function myFunction(data){
      // $.post("/api/comment", data, function() {

      // });
      alert(data);
      }
      
      $.ajax({
        method: "GET",
        url: "/articles/" 
      })
        .then(function(data) {
        var result = [];
        var divEl = document.createElement("div");
          
         for(var i = 0; i < data.length; i++){
           console.log(data[i]._id);
            var titleCard = $(
                "<div>"
              );
              var commentSpace = $(
                "<br/><input class='commentSpace'>"
              );
              titleCard.addClass("card");
             var val = "hello";
              commentSpace.addClass("comment");
              var newPostTitle = $("<h3>");
              var newPostBody = $("<h4>");
              var commentButton = $(
               "<form action='/submit' method='post' id='myForm' ><input type='button' data=" + data[i]._id + "  onclick='myFunction(" + val + ")' value='Submit form'></form>" 
              );
              newPostTitle.html('<a href="https://www.nytimes.com' + data[i].link + '">' + data[i].title + '</a> ' );
              newPostBody.html('<br/>' + data[i].body);
              // commentButton.text("Comment");
              commentButton.addClass(" ");
              titleCard.append(newPostTitle);
              titleCard.append(newPostBody);
              titleCard.append(commentSpace);
              titleCard.append(commentButton);
              commentSpace.addClass("comment");
              result.push(titleCard);
              
         }
         for(var i = 0; i < result.length; i++){
            document.querySelector("#articles").append(result[i][0]);
         }
        });