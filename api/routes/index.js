var UserCtrl = require('../controllers/ApiUserController');
var AuthCtrl = require('../controllers/ApiAuthController');
var auth = require('../auth/auth');
var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

//Add user to database
router.post('/addUser', AuthCtrl.addUser);

//login User
router.post('/login', AuthCtrl.loginUser);


//Get criteria specific users
router.post('/match', UserCtrl.findMatchedUsers);


//Post image
router.post('/saveSettings/:id', multipartMiddleware,UserCtrl.uploadImage);

//Initilize Profile Data
router.get('/profile/:id', UserCtrl.getProfile);


//Updates Profile
router.post('/updateProfile/:id', UserCtrl.updateProfile);


//Update profile info
router.put('/update/:id', UserCtrl.updateProfile);

//Get Get all Users
router.get('/:id', UserCtrl.seeAllUsers);


module.exports = router;