
$(document).ready(function()
{
  console.log("hello World");
})





$(document).on("click", ".comments", function() {


  console.log("button comments clicked");

  var thisId = $(this).attr("data-id");
  var idArticle= $(this).attr('id');
  console.log("id is :",idArticle);

  $("#notes").empty();
  
  var thisId = $(this).attr("id");
  console.log(thisId);

  
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })

    .then(function(data) {
      console.log("new data is",data);
      
      $("#notes").append("<h2>" + data.title + "</h2>");

      $("#notes").append("<input id='titleinput' name='title' >");
    
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
      $("#notes").append("<button data-id='" + data.note._id + "' id='deletenote'>delete Note</button>");

      console.log("note id is ",data.note._id)

      
      if (data.note) {
        
        $("#titleinput").val(data.note.title);
       
        $("#bodyinput").val(data.note.body);
      }
    });
});


$(document).on("click", "#savenote", function() {

  var thisId = $(this).attr("data-id");



  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      
      title: $("#titleinput").val(),
     
      body: $("#bodyinput").val()
    }
  })
    
    .then(function(data) {
      
      console.log(data);
      
      $("#notes").empty();
    });

 
  $("#titleinput").val("");
  $("#bodyinput").val("");
});


$(document).on("click", ".deleted", function(e) {
  e.preventDefault();
  console.log("clicked from deleted button");
  let id=$(this).attr("id");
  console.log(id);

  $.ajax({
    url:'/deleteArticle/'+id,
    type: 'DELETE',
    success: function(response){
      window.location.href='/savedArticles';
    },
    error : function (error) {
      console.log(error);
    }
  });


}) 

$(document).on("click", "#deletenote", function(e) {
  e.preventDefault();
  console.log("clicked from deleted note button");
  let id=$(this).data("id");
  console.log("inside event",id);

  $.ajax({
    url:'/deleteNote/'+id,
    type: 'DELETE',
    success: function(response){
      window.location.href='/savedArticles';
    },
    error : function (error) {
      console.log(error);
    }
  });
});