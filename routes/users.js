var express = require('express');
var router = express.Router();

var {Login, LoginAuth, UpdateUser} = require("../controllers/User-controller")
var Logout = require("../middlewares/LogoutToken")
var upload =  require("../middlewares/Multer");
const Protected = require('../middlewares/JsonwebToken');
const  getUser = require('../controllers/GetUser');
const userPost = require('../controllers/UserPost');
const getPost= require("../controllers/getPost")
router.post('/', function(req, res, next) {
  Login(req,res)
});
router.post('/login', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'https://pinterst-kappa.vercel.app');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  LoginAuth(req,res)
});
router.get('/login', Protected,getUser);
router.post('/Update',  upload.single('pic'), function(req, res, next) {
 UpdateUser(req,res)
});
router.post('/logout',Logout);
router.post('/userPost',  Protected, upload.single('post'), userPost);

router.get('/getPost',getPost);
module.exports = router;
