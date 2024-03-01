const Protected = (req, res, next) => {
    let header = req.headers.cookie;
  
    if (header) {
      const cookies = header.split("; ").reduce((acc, cookie) => {
        const [name, value] = cookie.split("=");
        acc[name] = value;
        return acc;
      }, {});
  
      const token = cookies.token; // Assuming your token has the name "token"
  
      if (token) {
        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
          if (err) {
            if (err.name === 'TokenExpiredError') {
              return res.status(401).json({ message: 'Token expired' });
            } else {
              return res.status(401).json({ message: 'Token not valid' });
            }
          }
  
          if (decoded) {
            req.id = decoded.userid;
            console.log("userid", decoded.userid);
          }
        });
      } else {
        return res.status(401).json({ error: "Token not found in cookies" });
      }
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  
    next();
  };
  
  module.exports = Protected;
  