/**
 * 
 */

const express=require('express');
const router=express.Router();
const auth=require('../auth/isValid')
const userController = require('../controller/userController');

// const User=require('../app/model/user');

// User.methods(['get','put','post','delete']);
// User.register(router,'/user');

router.post('/register',auth.registrationValid, userController.registration);
router.post('/login',auth.loginValid,userController.login);
router.post('/token',auth.tokenValid,userController.tokenValid);
router.post('/forgot',auth.forgotEmailValid,userController.forgotController)
router.post('/reset',auth.resetPassValid,userController.resetController)

module.exports=router;