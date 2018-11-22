var mongoose=require("mongoose");

var CampgroundSchema= new mongoose.Schema({
    name:String,
    image:String,
    description:String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"},
        username:String
    },
    comments:[
        {   type:mongoose.Schema.Types.ObjectId,
        ref:"Comment" //Comment es el nombre del modelo
        }]
    
});

module.exports=mongoose.model("Campground",CampgroundSchema); //se compila el esquiema en un modelo