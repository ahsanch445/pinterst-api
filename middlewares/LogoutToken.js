const jwt = require("jsonwebtoken")
const Logout = (req,res)=>{
let cookie = req.headers["authorization"];
console.log(cookie)
if(cookie){
    const token = cookie.split(" ")[1]
    

if(!token){
return res.status(404).json({message:"token is invild"})
}
jwt.verify(token,process.env.JWT_SECRET,function(err,decoded){
    if(err){
        return res.status(201).json({message:"cookie is not found"})
    }
    res.clearCookie(decoded.userid)
    return res.status(200).json({message:"user is logout success fully"})
})

}
else{
   return res.status(404).json({message:"cookie is not found"})
}

}
module.exports = Logout