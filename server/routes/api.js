/**************************************************************************************
 * @file             : api.js
 * @author           : Pijush Singha
 * @version          : 1.0
 * @since            : 05-11-2018
 **************************************************************************************/

const express = require('express');
const router = express.Router();
const auth = require('../auth/isValid')
const noteAuth=require('../auth/isNoteValid')
const userController = require('../controller/userController');
const noteController = require('../controller/noteController');
// const User=require('../app/model/user');

// User.methods(['get','put','post','delete']);
// User.register(router,'/user');
/**
 * routing for register
 */
router.post('/register', auth.registrationValid, userController.registration);
/**
 * routing for login
 */
router.post('/login', auth.loginValid, userController.login);
/**
 * routing for token
 */
router.post('/token', auth.tokenValid, userController.tokenValid);
/**
 * routing for forgot
 */
router.post('/forgot', auth.forgotEmailValid, userController.forgotController)
/**
 * routing for reset
 */
router.post('/reset', auth.resetPassValid, userController.resetController)

/**
 * API ROUTES FOR NOTES----------------------------------------
 */

router.post('/createNote',noteAuth.tokenValid,noteController.createNote);

router.post('/deleteNote',noteAuth.tokenValid)
router.get('/getNotes',noteAuth.tokenValid,noteController.getNotes)
router.put('/updateColor', noteAuth.tokenValid,noteController.updateColor)


module.exports = router;