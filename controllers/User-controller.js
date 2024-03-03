const userModel = require("../models/user-model")
var validator = require("email-validator");
const bcrypt = require("bcryptjs")
const cloudinary = require('../Utils/Cloudinry')
const upload = require("../middlewares/Multer")
const jwt = require("jsonwebtoken")
const Login = async (req, res) => {
    try {
     
        const { username, fullname, email, password } = req.body

        const exits = await userModel.findOne({
            email: email
        })
        if (exits) {
            res.status(201).json({ message: "email is already exists" })
        } else {
            if (username && fullname && email && password) {
                const salt = await bcrypt.genSalt(10)
                const hashPassword = await bcrypt.hash(password, salt)

                if (validator.validate(email)) {
                    if (fullname.length < 6 || username.length < 6 || password.length < 6 || email.length < 6) {
                      
                        return res.status(400).json({ message: "Maximum field length is 6 characters required for all fields." });

                    }

                    const newUser = await new userModel({
                        username: username,
                        name: fullname,
                        email: email,
                        password: hashPassword
                    });
                    await newUser.save();
                    return res.status(200).json(newUser);
                } else {
                    res.status(201).json({ message: "Please add vaild email" })
                }



            } else {
                return res.status(400).json({ message: "All filed are required" })
            }


        }

    } catch (error) {
        return res.status(500).json({ message: "server error" })
    }
}


const LoginAuth = async (req, res) => {
    const { email, password } = req.body


    const isemail = await userModel.findOne({
        email: email,

    })
    if (isemail) {
        const debcrypt = await bcrypt.compare(password, isemail.password)
     
        if (!debcrypt) {


            return res.status(400).json({ message: "email or password wrong" })


        }

        else {
            const token = jwt.sign({ userid: isemail._id }, process.env.JWT_SECRET)
            res.cookie(String(isemail.id), token, { httpOnly: true, secure: true, sameSite: 'strict' });
            return res.status(200).json({ massage: "user is login" ,token })

        }
       


    } else {
        return res.status(400).json({ message: "email or password wrong" })
    }

}



const UpdateUser = async (req, res) => {
    const usernameToUpdate = req.body.email;
    var cloudinaryResult = null
    const { fullname, username, about } = req.body
    let updatedUser;
    let file = req.file;


    if (file) {
        try {
            cloudinaryResult = await cloudinary.uploader.upload(req.file.path,{secure:true});

            updatedUser = await userModel.findOneAndUpdate(
                { email: usernameToUpdate },
                {
                    $set: {

                        image: cloudinaryResult.url,

                    },

                },
                { upsert: true, new: true }

            );
           

        } catch (error) {
            return res.status(404).json({ massage: "file not found" })
        }
    }
    try {

        if (username.length > 6 || fullname.length > 6 || about.length >= 1) {
            let updatedInfo
            if (fullname) {
                updatedInfo = {

                    name: req.body.fullname,

                };
            }
            if (username) {
                updatedInfo = {
                    username: req.body.username,

                };
            }
            if (about) {
                updatedInfo = {

                    about: req.body.about,



                };
            }
            else if (fullname && username && about) {
                updatedInfo = {

                    name: req.body.fullname,

                    username: req.body.username,
                    about: req.body.about,

                };
            }
            if (fullname && username) {
               
                updatedInfo = {

                    name: req.body.fullname,

                    username: req.body.username,


                };

            }
            if (req.body.about && req.body.username) {
            
                updatedInfo = {


                    about: req.body.about,
                    username: req.body.username,


                };


            }
            if (about && fullname) {
                updatedInfo = {

                    name: req.body.fullname,
                    about: req.body.about,



                };


            }
            else {
               
                updatedInfo = {

                    ...updatedInfo,



                };
            }


       
            updatedUser = await userModel.findOneAndUpdate(
                { email: usernameToUpdate },
                {
                    $set: {
                        name: updatedInfo.name,
                        username: updatedInfo.username,
         
                        about: updatedInfo.about,
                    },

                },
                { upsert: true, new: true }
            );

           
            res.status(200).json({ message: 'User updated/created successfully', user: updatedUser });
        }
        else {
            res.status(201).json({ massage: " 6 character must required" })
        }
    }

    catch (error) {
        console.error('Error updating/creating user:', error);
        res.status(500).json({ message: 'Error updating/creating user', error: error.message });
    }
};





module.exports = {
    Login,
    LoginAuth,
    UpdateUser
}