var mongoose    =require("mongoose");
var Campground  =require("./models/campground");
var Comment     =require("./models/comment");

var data=[
    {
    name:"puente1",
    image:"https://images.unsplash.com/photo-1459666644539-a9755287d6b0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=279b60ab483a2610d1e7260dc213898c&auto=format&fit=crop&w=500&q=60",
    description:"plemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la impr"
    },
    {
    name:"puente2",
    image:"https://images.unsplash.com/photo-1420768255295-e871cbf6eb81?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fecaea6c506b84475edf1e4164944c38&auto=format&fit=crop&w=500&q=60",
    description:"plemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la impr"
    },
    {
    name:"puente3",
    image:"https://images.unsplash.com/photo-1484795819573-86ae049cb815?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3c2f1a5ca30bb23b6db35b356305d307&auto=format&fit=crop&w=500&q=60",
    description:"plemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la impr"
    }
];


function seedDB(){
    //remove campgrounds
    Campground.remove({},function(err){
        if (err) {
            console.log(err);
        }
        console.log("remove Campgrounds");
        Comment.remove({},function(err){
        if (err) {
          console.log(err);
        }    
        
        console.log("remove Comments");
            //add campgrounds   LOS AGREGO DENTRO, PARA QUE ESPERE QUE SE REMUEVAN PRIMERO,porque podría ejecutarse antes el agregado que el remove
            data.forEach(function(seed){
            Campground.create(seed,function(err,campground){
                if (err) {
                    console.log(err);
                }
                else{
                    console.log("añadido");
                        //ADD COMMENTS

                        
                        Comment.create(
                            {
                                text:"this is a great place",
                                author:"homer"
                                
                            },function(err,comment){
                                if (err) {
                                    console.log(err);
                                }else{
                                    campground.comments.push(comment); //añado al campground creado de la linea 33, en comments de su esquema, el comment nuevo
                                    campground.save();
                                    console.log("created new comment");
                                }
                            
                        });
                     }    
                 });
            });
        });
    });
}

  
module.exports=seedDB;