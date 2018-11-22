var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/user");

//ROUTES

router.get("/",function(req,res){
    res.render("landing");
});

//====================================
//AUTH ROUTES

//show register form

router.get("/register",function(req,res){
   res.render("register"); 
});

//handle sign up logic

router.post("/register",function(req,res){
    var newUser=new User({username:req.body.username});
   User.register(newUser,req.body.password,function(err,user){
       if (err) {
            console.log(err);
            return res.render("register"); //return para salir de aca si o sí.
        }
        //else{ //y no haría falta el else en este caso.
        passport.authenticate("local")(req,res,function(){
            res.redirect("/campgrounds");
        });
   });
});

//show login form
router.get("/login",function(req,res){
   // res.render("login",{message:req.flash("error")});
   res.render("login");
});

//handle login logic
router.post("/login",passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}),function(req,res){
    
});

//add logout route

router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","hasta luego");
    res.redirect("/campgrounds");
})




//====================================

function isLoggedIn(req,res,next){
    if (req.isAuthenticated()) {
        return next(); //NO OLVIDAR PARENTESIS ACA
    }//no necesito else porque tengo el return arriba
    res.redirect("/login");
    
}


module.exports=router;