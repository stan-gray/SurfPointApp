var express  = require("express");
var router   = express.Router();
var passport = require("passport");
var User     = require("../models/user");

// root route
router.get("/", function (req, res) {
    res.render("landing"); //landing.ejs
});

// show register form
router.get("/register", function(req, res) {
    res.render("register");
});
// handle sign up logic
router.post("/register", function(req, res) {
    var newUser = new User ({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err) {
            req.flash("error", err.message);
            return res.redirect("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Surf Point " + user.username);
            res.redirect("/slackspots");
        });
    });
});
//show login form 
router.get("/login", function(req, res) {
    res.render("login");
})
// handling login logic
router.post("/login", passport.authenticate("local", 
    {
        
        successRedirect: "/slackspots",
        failureRedirect: "/login",
        failureFlash: true,
        successFlash: 'Welcome to Surf Point!'
    }), function(req, res){
        
});
// logout
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "See you later");
    res.redirect("/slackspots");
})



//====================================================================


module.exports = router;