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
const collabControler=require('../controller/collabController')
const cache = require('express-redis-cache')();

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

router.post('/deleteNote',noteAuth.tokenValid,noteController.deleteNote)

router.get('/getNotes',noteAuth.tokenValid,
cache.route({ expire : 600 }),
noteController.getNotes);

router.put('/updateColor', noteAuth.tokenValid,noteController.updateColor);
router.put('/updateImage', noteAuth.tokenValid,noteController.updateImage);
router.put('/isPinned', noteAuth.tokenValid,noteController.isPinned);
router.put('/isArchived',noteAuth.tokenValid,noteController.isArchived);
router.put('/setReminder',noteAuth.tokenValid,noteController.setReminder);
router.put('/isTrashed',noteAuth.tokenValid,noteController.isTrashed);
router.put('/editTitle',noteAuth.tokenValid,noteController.editTitle)
router.put('/editDescription',noteAuth.tokenValid,noteController.editDescription)
/**
 * API ROUTES FOR LABELS---------------------------------------------------------------------
 */

// router.post('/addLabel',labelController.addLabel)
/**
 * API ROUTES FOR COLLABORATOR----------------------------------------
 */
router.post('/saveCollab',noteAuth.tokenValid, collabControler.saveCollab);
router.get('/getCollabDetails',noteAuth.tokenValid,collabControler.getCollabDetails)


module.exports = router;