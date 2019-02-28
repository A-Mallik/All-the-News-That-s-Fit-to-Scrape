function SubForm (){
  $.ajax({
      url:'/submit',
      type:'post',
      data:$('#myForm').serialize(),
      success:function(){
          alert("worked");
      }
  });
}
     
     function myFunction(){
       document.getElementById("myForm").submit();
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
              titleCard.addClass("card");
              var newPostTitle = $("<h3>");
              var newPostBody = $("<h4>");
              var commentButton = $(
                '<br><form action="/submit" id="myForm" method="post"><textarea type="text" name="body" placeholder="Write Comment Here"></textarea><br><input class="inputStyle" value="Submit Comment" data="' + data[i]._id +'" type="submit"></form><hr>'
              );
              newPostTitle.html('<a href="https://www.nytimes.com' + data[i].link + '">' + data[i].title + '</a> ' );
              newPostBody.html('<br/>' + data[i].body);
              commentButton.addClass(" ");
              titleCard.append(newPostTitle);
              titleCard.append(newPostBody);
              titleCard.append(commentButton);
              result.push(titleCard);
              
         }
         for(var i = 0; i < result.length; i++){
            document.querySelector("#articles").append(result[i][0]);
         }
        });