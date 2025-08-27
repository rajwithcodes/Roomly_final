const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const router = express.Router(); // Enable mergeParams to access listing ID in review routes
const User = require('../models/user');
const passport = require('passport');
const { isLoggedIn, saveRedirectUrl } = require('../middleware');

module.exports.signUpForm=(req, res) => {
    res.render("users/signup.ejs"); // Render signup form
};

module.exports.signUp=async (req, res) => {
    try{

        let { username, email, password } = req.body; // Destructure form data
        const newUser = new User({ username, email }); // Create new user instance
        const registeredUser = await User.register(newUser, password); // Register user with password
        
        console.log(registeredUser);
        req.login(registeredUser, (err) =>{
            if(err) return next(err);
            req.flash('success', 'Welcome to Roomly!'); // Flash success message
            res.redirect('/listings'); // Redirect to listings page
        })        
    }
    catch(e){
        req.flash('error', e.message); // Flash error message
        res.redirect('/signup'); // Redirect back to signup form
    }
};
module.exports.loginForm=(req,res)=>{
    res.render("users/login.ejs"); // Render login form
};
module.exports.login=async(req,res)=>{
        req.flash("success","Logged In Successfully!"); // Send success message
        let redirectUrl = res.locals.returnTo || '/listings';

        res.redirect(redirectUrl); // Redirect to original URL or listings page


};
module.exports.logout=(req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Logged Out Successfully!"); // Send success message
        res.redirect("/listings"); // Redirect to listings page
    })
};