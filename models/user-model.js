const mongoose = require("mongoose")
const {isEmail} = require("validator")
const userSchema = new mongoose.Schema({
name:{
type:String,
require:true,

},
username:{
    type:String,
    required:true,
    unique:true  
},
email:{
    type:String,
    required:true,
    unique:true,  
    validate:isEmail
},
password:{
    type:String,
    required:true,
  required:true
   
},
about:{
    type:String
},
image:{
    type:String
},

posts:
    
    [
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"post"
    }
    ]


})

module.exports = mongoose.model("user",userSchema)