const mongoose = require("mongoose")

const postSchema =  new mongoose.Schema({
title:{
    type:String,

},
description:String,
post:String,
user:{
 type:mongoose.Schema.Types.ObjectId,
 ref:"user"
}
})

 module.exports= mongoose.model("post",postSchema)