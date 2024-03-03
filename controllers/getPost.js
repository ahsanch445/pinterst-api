const  postModel = require("../models/post-model")

const getPost =async (req,res)=>{
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', 'https://pinterst-clone-qox1.vercel.app');
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
      });
const Allpost = await postModel.find().populate("user","-posts -password")
res.status(200).json({message :"All Post" ,Allpost})
}
module.exports = getPost 