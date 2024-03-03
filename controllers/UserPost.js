const userModel = require("../models/user-model")
const PostModel = require("../models/post-model")
const cloudinary = require("../Utils/Cloudinry")
const userPost = async(req,res)=>{

 try {
  
  const user = await userModel.findById(
    req.id
      ).populate("posts")
   let cloudinaryResult
      try {
       cloudinaryResult = await cloudinary.uploader.upload(req.file.path,{secure:true})
        
      } catch (error) {
        
      }


      const post =  await PostModel.create({
        post: cloudinaryResult.secure_url,
        user: user._id,
        title:req.body.title,
        description:req.body.dis,
      })
      await post.save()
    user.posts.push(post._id)
    await user.save()


      res.status(200).json({
        message:"image is uploaded successfully"
      })

     

 } catch (error) {

 }
}
module.exports =userPost 