var express          = require("express"),
    expressSanitizer = require("express-sanitizer"),
    app              = express(),
    bodyParser       = require("body-parser"),
    mongoose         = require('mongoose'),
    flash            = require("connect-flash"),
    passport         = require("passport"),
    LocalStrategy    = require("passport-local"),
    methodOverride   = require("method-override"),
    Campground       = require("./models/campground"),
    Comment          = require("./models/comment"),
    User             = require("./models/user"),
    seedDB           = require("./seeds")

//requring routes   
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index")

// console.log(process.env.DATABASEURL);
    
// mongoose.Promise = global.Promise; //not Necessary, this just to avoid this error (node:3348) DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
// mongoose.connect('mongodb://localhost/yelp_camp_deployed', { useMongoClient: true, promiseLibrary: global.Promise });

var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_deployed"
mongoose.connect(url);

// mongoose.connect("mongodb://callmeihor:red@ds227565.mlab.com:27565/slackmap");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require('moment');
// seed the database
// seedDB();

//  PASSPORT CONFIGURATION

app.use(require("express-session")({
   secret: "Ihor is Ihor",
   resave: false,
   saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});


app.use(indexRoutes);
app.use("/slackspots", campgroundRoutes); // prefix campgrounds.js all routes starts with "/slackspots"
app.use(commentRoutes);

app.get("*", function(req, res) {
    res.send("error 404");
});

app.listen(process.env.PORT, process.env.IP, function () {
    console.log("server has started WOW");
});
// dfsg