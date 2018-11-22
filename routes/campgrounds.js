var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var middleware=require("../middleware"); //como le puse index, no hace falta ponerlo

//INDEX ROUTE
 
router.get("/",function(req,res){
    
    Campground.find({},function(err,allCampgrounds){
        if (err) {
            console.log("error");
        }
        else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds/*,currentUser:req.user*/}); //ya no hace falta porque uso app.use
        }
        
    })
    
});

//NEW ROUTE

router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new");
});

//CREATE ROUTE

router.post("/",middleware.isLoggedIn,function(req,res){
   
   var name=req.body.name;
   var image=req.body.image;
   var desc=req.body.description;
   var author= {
        id:req.user._id,
        username:req.user.username
    }; //armo author y lo agrego a la variable newCampground
   var newCampground={name:name, image:image, description:desc, author:author}  //variable con propiedad de array
   
   Campground.create(newCampground,function(err,campground){
    if (err) {
        console.log("error");
    }
        else{
            res.redirect("/campgrounds");
        }
    });
});

//Show route

router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){ //no falta ningun parentesis.
       if (err) {
           console.log(err);
       } 
       else{
           console.log(foundCampground);
            res.render("campgrounds/show",{camping:foundCampground});
       }
    });
   
});

//Edit route
router.get("/:id/edit",middleware.checkCampground,function(req, res) {
    //está logueado el user?
    /*if (req.isAuthenticated()) {
                 Campground.findById(req.params.id,function(err,foundCampground){
                   if (err) {
                       res.redirect("/campgrounds");
                   } else{
                       //le pertenece el campground a editar?
                       if (foundCampground.author.id.equals(req.user._id)) { //está comparando el author del campground encontrado con el usuario logueado
                           res.render("campgrounds/edit",{campground:foundCampground});
                       }else{
                           res.send("no tenés permiso");
                       }
                 }
            });
        } else{
            console.log("necesitas estar logueado");
            res.send("no tenés permiso");
    }*/
    //como agregue el middleware, queda así:
    Campground.findById(req.params.id,function(err,foundCampground){
        res.render("campgrounds/edit",{campground:foundCampground});
    });
});

//update route
router.put("/:id",middleware.checkCampground,function(req,res){
/*    var data={
        name:req.body.name,
        image:req.body.image,
        description:req.body.description
    }; NO USARË DATA, USARE req.body.campground*/
    
   //find and update correct campground
   
   Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
      if (err) {
          res.redirect("/campgrounds");
      } else{   //redirect
          res.redirect("/campgrounds/"+req.params.id);
      }
   });
});

//Delete route

router.delete("/:id",middleware.checkCampground,function(req,res){
   Campground.findByIdAndRemove(req.params.id,function(err){
    if(err){
        res.redirect("/campgrounds");
    }else{
        res.redirect("/campgrounds");
        }
   });
});


module.exports=router;