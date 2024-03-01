const userModel = require("../models/user-model");

const getUser = async (req, res) => {
  
    let userid = req.id;

    
        const user = await userModel.findById(userid, "-password").populate("posts");

        if (user) {
            return res.status(200).json({ user: user });
        }
    
};

module.exports = getUser;
