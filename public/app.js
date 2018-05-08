$( document ).ready(function() {
    populateArticles();
 });
 
 function populateArticles(){
     $.get( "/showAll", function( data ) {
 
         if(data.length>0){
             $("#noarticle").hide();
             $("#articleslist").show();
             $("#articleslist").empty();
             for(i=0; i<data.length; i++){
             $("#articleslist").append("<tr><td>"+ data[i].Headline+"</td><td><a class=\"btn right\" href=\"/save/"+data[i]._id+"\">Save Article</a></td></tr>"); 
             }
         }else{
             $("#noarticle").show();
             $("#articleslist").hide();
         }
     
       });
     
 
 
 
 }