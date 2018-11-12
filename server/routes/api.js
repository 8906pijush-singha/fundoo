const express=require('express');
const router=express.Router();
const auth=require('../auth/isValid')
const userController = require('../controller/userController');

// const User=require('../app/model/user');

// User.methods(['get','put','post','delete']);
// User.register(router,'/user');

router.post('/register', userController.registration);
router.post('/login',auth.loginValid,userController.login);

module.exports=router;