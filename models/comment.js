var mongoose=require("mongoose");

var CommentSchema= new mongoose.Schema({
    text:String,
    author:{
        id:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"User" //modelo que usa
        },
        username: String
    }
});

module.exports=mongoose.model("Comment",CommentSchema); //se compila el esquiema en un modelo
//Comment es el nombre del modelo