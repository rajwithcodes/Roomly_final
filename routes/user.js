const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const router = express.Router(); // Enable mergeParams to access listing ID in review routes
const User = require('../models/user');
const passport = require('passport');
const { isLoggedIn, saveRedirectUrl } = require('../middleware');
const controllerUser = require('../controllers/users')

router.get('/signup', controllerUser.signUpForm);

router.post("/signup", wrapAsync(controllerUser.signUp));

router.get("/login",controllerUser.loginForm);

router.post("/login",saveRedirectUrl,passport.authenticate("local",
        {failureRedirect: '/login', failureFlash: true}), controllerUser.login);
// Logout Route usnging req.logout
router.get("/logout",controllerUser.logout);

module.exports = router; // Export the router

