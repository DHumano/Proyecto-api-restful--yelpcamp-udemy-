var Campground=require("../models/campground");
var Comment=require("../models/comment");
var middlewareObj={}; //meto las funciones dentro luego.

middlewareObj.checkCampground = function(req,res,next){
        if (req.isAuthenticated()) {
                 Campground.findById(req.params.id,function(err,foundCampground){
                   if (err) {
                       res.redirect("back");
                   } else{
                       //le pertenece el campground a editar?
                       if (foundCampground.author.id.equals(req.user._id)) { //está comparando el author del campground encontrado con el usuario logueado
                           //res.render("campgrounds/edit",{campground:foundCampground}); COMO MIDDLEWARE; NO USO ESTO
                           next();
                       }else{
                           res.redirect("back");
                       }
                  }    
            });     
        } else{
            res.redirect("back");
    }
};



middlewareObj.checkComment=function(req,res,next){
        if (req.isAuthenticated()) {
                 Comment.findById(req.params.comment_id,function(err,foundComment){
                   if (err) {
                       res.redirect("back");
                   } else{
                       //le pertenece el comment a editar?
                       if (foundComment.author.id.equals(req.user._id)) { //está comparando el author del Comment encontrado con el usuario logueado
                           //res.render("campgrounds/edit",{campground:foundCampground}); COMO el MIDDLEWARE esta en una funcion aparte, NO USO ESTO
                           next();
                       }else{
                           res.redirect("back");
                       }
                 }
            });     
        } else{
            res.redirect("back");
    }
};



middlewareObj.isLoggedIn=function(req,res,next){
    if (req.isAuthenticated()) {
        return next(); //NO OLVIDAR PARENTESIS ACA
    }//no necesito else porque tengo el return arriba
    req.flash("error","please log in first");
    res.redirect("/login");
};


module.exports=middlewareObj;