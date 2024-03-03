var express = require('express');
var router = express.Router();

var {Login, LoginAuth, UpdateUser} = require("../controllers/User-controller")
var Logout = require("../middlewares/LogoutToken")
var upload =  require("../middlewares/Multer");
const Protected = require('../middlewares/JsonwebToken');
const  getUser = require('../controllers/GetUser');
const userPost = require('../controllers/UserPost');
const getPost= require("../controllers/getPost")
const cors = require("cors")
const corsOptions = {
  origin: 'https://pinterst-clone-qox1.vercel.app',
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

router.post('/', cors(corsOptions),function(req, res, next) {
  Login(req,res)
});
router.post('/login', cors(corsOptions),function(req, res, next) {

  LoginAuth(req,res)
});
router.get('/login',cors(corsOptions), Protected,getUser);
router.post('/Update', cors(corsOptions), upload.single('pic'), function(req, res, next) {
 UpdateUser(req,res)
});
router.post('/logout', cors(corsOptions),Logout);
router.post('/userPost',  Protected, upload.single('post'), userPost);

router.get('/getPost', cors(corsOptions),getPost);
module.exports = router;
