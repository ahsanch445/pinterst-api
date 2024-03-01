const jwt = require("jsonwebtoken");

const Protected = (req, res,next) => {
    let header = req.headers.cookie
    console.log(header )
    if (header) {
        const token =header.split("; ")[1].split("=")[1]; // Extract the token part (assuming it is in the format "Bearer YOUR_JWT_TOKEN")
   
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ message: 'Token expired' });
                } else {
                    return res.status(401).json({ message: 'Token not valid' });
                }
            }

             // Decoded payload of the token

            // Continue with your logic for an authorized request
           if(decoded){
            
            req.id = decoded.userid
            console.log("useid ", decoded.userid)
           }
    
        });
    } else {
        // Handle case where authorization header is not present
      return  res.status(401).json({ error: "Unauthorized" });
    }
    next()
};

module.exports = Protected;
