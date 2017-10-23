var express = require("express");
var router  = express.Router({mergeParams: true}); //mergeparams when comments looking for id from campgrounds because we use shortcuts in app.js
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// comments new
router.get("/slackspots/:id/comments/new", middleware.isLoggedIn, function(req, res) {
    //find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground}); //route inside c9 ~/workspace/YelpCamp/v4
        }
    });
});
// comments create
router.post("/slackspots/:id/comments", middleware.isLoggedIn, function(req, res){
   //lookup campground usind ID
   Campground.findById(req.params.id, function(err, campground) {
       if(err) {
           console.log(err);
           res.redirect("/slackspots");
       } else {
           Comment.create(req.body.comment, function(err, comment) {
               if (err) {
                   req.flash("error", "Something went wrong");
                   console.log(err);
               } else {
                   //add username id to comment
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   //save comment
                   comment.save();
                   campground.comments.push(comment);
                   campground.save();
                   res.redirect('/slackspots/' + campground._id);
               }
           });
       }
   });
   //create new comment
   //connect new comment to campground
   //redirect campground show page
});
// EDIT COMMENTS
router.get("/slackspots/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment}) ;
        }
    });
});
// COMMENT UPDATE
router.put("/slackspots/:id/comments/:comment_id", middleware.checkCommentOwnership, function (req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){ //req.body.comment from edit.ejs "comment[text]"
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/slackspots/" + req.params.id);
        }
    }) 
})
// DESTROY COMMENT
router.delete("/slackspots/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
      if(err) {
          res.redirect("back");
      } else {
          req.flash("success", "Comment deleted");
          res.redirect("/slackspots/" + req.params.id);
      }
  });
});




module.exports = router;