const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: process.env.CLOUND_NAME,
    api_key:process.env.CLOUNDINRY_API_KEY,
    api_secret:process.env.CLOUNDINRY_SECRET_KEY
})
module.exports = cloudinary