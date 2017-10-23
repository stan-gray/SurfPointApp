var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
        {
            name: "Cloud's Rest",
            image: "http://img1.sunset.timeinc.net/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/2016/10/main/best-camping-in-the-west-tuolumne-meadows-yosemite-0512.jpg?itok=-V6oDkU9",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            name: "Just park",
            image: "https://blog.zent.com/wp-content/uploads/2016/06/d1.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            name: "Just campground",
            image: "https://c1.staticflickr.com/3/2848/9357989775_f698928e41_b.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }
    ]

function seedDB() {
    //Remove all campgrounds
  Campground.remove({}, function(err) {
    if (err) {
      console.log(err);
    }       
    console.log('Removed campgrounds!');
    // add a few 
      data.forEach(function(seed){
          Campground.create(seed, function(err, campground){
              if (err) {
                  console.log(err);
              } else {
                  console.log("added a camp");
                  //create a comment
                  Comment.create(
                      {
                          author: "Homer",
                          text: "This place is great, but I wish there was internet"
                      }, function(err, comment){
                          if(err){
                              console.log(err);
                          } else {
                             campground.comments.push(comment);
                             campground.save();
                             console.log("created new comment");
                          }
                      });
              }
          });
      });
  });
  

  
  //add a few comments
    
}

module.exports = seedDB; 