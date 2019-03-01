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
              var newButton = $("<button class='getCommentsBtn' value='Get Comments' data='" + data[i]._id +
              "' data-toggle='modal' data-target='#exampleModalCenter'>Get Comments</button>");
              var newPostTitle = $("<h3>");
              var newPostBody = $("<h4>");
              var commentButton = $(
                `<br><form action="/submit/${data[i]._id}" id="myForm" method="post"><textarea type="text" name="body" placeholder="Write Comment Here"></textarea><br><input class="inputStyle" value="Submit Comment" data="${data[i]._id}" type="submit"></form><hr>`
              );
              newPostTitle.html('<a href="https://www.nytimes.com' + data[i].link + '">' + data[i].title + '</a> ' );
              newPostBody.html('<br/>' + data[i].body);
              newButton.addClass("getCommentsBtn");

              titleCard.append(newPostTitle);
            
              titleCard.append(newPostBody);
              titleCard.append(newButton);
              titleCard.append(commentButton);
              
              result.push(titleCard);
                  
             
                
         }
         for(var i = 0; i < result.length; i++){
            document.querySelector("#articles").append(result[i][0]);
         }
         $(".getCommentsBtn").on('click',function(){
                  // alert($(this).attr('data'));
                 var data2 = $(this).attr('data');
                  $.ajax({
                    method: "GET",
                    url: `/populatedArticles/${data2}`
                  })
                    .then(function(data) {

                      // for(var i = 0; i < data.length; i++){
                            // if(data[i]._id === data)
                            // if( data2 === data[i]._id){

                              // $(".modal-body").empty();
                              // for(var j = 0; j < data[i].comment.length; j++){
                              //   if(data[i].comment[j].body && data2 === data[i]._id)
                              //   {
                                  console.log(data[0].comment);
                                  data[0].comments.forEach(comment => {
                                    $(".modal-body").append("<br>" + comment.body);
                                  })
                                 
                                // }
                                // else{
                                //   $(".modal-body").empty();
                                // }
                              // }
                              // $(".modal-body").text(data[i].comment[0]);
                            
                            // console.log(data2)
                      // }
            
                        
                        
                   
                    });


     })

     
     
        });
