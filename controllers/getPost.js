const  postModel = require("../models/post-model")

const getPost =async (req,res)=>{
const Allpost = await postModel.find().populate("user","-posts -password")
res.status(200).json({message :"All Post" ,Allpost})
}
module.exports = getPost 