var express=require("express");
var router=express.Router({mergeParams:true});
var Campground=require("../models/campground");
var Comment=require("../models/comment");
var middleware=require("../middleware");

//COMMENTS ROUTE
//====================================

router.get("/new",middleware.isLoggedIn,function(req,res){   //request,response
    Campground.findById(req.params.id,function(err,campground){
        if (err) {
            console.log(err);
        }else{
            res.render("comments/new",{campground:campground});
        }
    });
});     


router.post("/",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,camp){
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment,function(err,comment){
              if (err) {
            console.log(err);
             }else  {
                //add username and id to comment
                //comment.author.id=req.user._id;
                //comment.author.username=req.user.username;
                
                //otra forma de hacerlo
                 var author= {
                id:req.user._id,
                username:req.user.username
                };
                comment.author=author;
                    //save comment
                comment.save();
                camp.comments.push(comment);
                camp.save();
                res.redirect("/campgrounds/"+ camp._id);
                }  
            });
        }
    });
});

//edit route
router.get("/:comment_id/edit",middleware.checkComment,function(req,res){
    Comment.findById(req.params.comment_id,function(err, foundComment) {
       if (err) {
           res.redirect("back");
       } else{
           res.render("comments/edit",{campground_id:req.params.id,comment:foundComment}) ;
       } //req.params.id se refiere al id de campground, no al de comment, el de comment req.params.comment_id o foundcomment
    });
});

//update route
router.put("/:comment_id",middleware.checkComment,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,opdatedComment){
        if (err) {
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

//delete route
router.delete("/:comment_id",middleware.checkComment,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if (err) {
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/" + req.params.id )
        }
    })
});


module.exports=router;