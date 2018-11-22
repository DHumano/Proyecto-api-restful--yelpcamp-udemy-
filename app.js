var express     =require("express"),
    app         =express(),
    bodyParser  =require("body-parser"),
    mongoose    =require("mongoose"),
    flash       =require("connect-flash"),
    passport    =require("passport"),
    localStrategy=require("passport-local"),
    methodOverride=require("method-override"),
    Campground  =require("./models/campground"),
    seedDB      =require("./seeds"),
    Comment     =require("./models/comment"),
    User=require("./models/user");
    
    //========================================= REQUIRING ROUTES
var commentRoutes=require("./routes/comments"),
    campgroundRoutes=require("./routes/campgrounds"),
    indexRoutes=require("./routes/index");
    //========================================= 
mongoose.connect("mongodb://localhost/yelpcamp3");

app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(flash()); //tiene que ir antes de la passport configuration
//seedDB();

//PASSPORT CONFIGURATION

app.use(require("express-session")({
    secret:"dario es un capo",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){ //middleware IMPORTANTE
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});
  //========================================= Con esto puedo usar las rutas.
app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("server started");
    
});


// npm install --save express ejs request body-parser mongoose method-override express-sanitizer  
//npm install --save express ejs body-parser mongoose passport passport-local passport-local-mongoose express-session

//npm install --save express-session passport passport-local passport-local-mongoose