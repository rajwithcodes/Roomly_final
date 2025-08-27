// =======================
// 📦 Required Modules Import
// =======================
if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}


const express = require('express');
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const Review = require('./models/review.js');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const port = 3000;
const { listingSchema , reviewSchema } = require('./schema.js'); // Joi schema for validation
//Routers
const listingRouter=require('./routes/listing.js'); // Import listing routes
const reviewRouter=require('./routes/review.js'); // Import review routes
const userRouter=require('./routes/user.js'); // Import user routes

const session = require('express-session'); // Session management
const mongoStore= require("connect-mongo");
const flash = require('connect-flash'); // Flash messages
const passport = require('passport'); // Authentication
const localStrategy = require('passport-local'); // Local strategy for passport
const User = require('./models/user.js'); // User model

// =======================
// 🌐 MongoDB Connection 
// =======================

const dbURL=process.env.ATLASDB_URL;
async function main() {
    try {
        await mongoose.connect(dbURL); 
        console.log('✅ Connected to MongoDB'); 
    } catch (err) {
        console.error('❌ Database connection error:', err); 
    }
}
main();
// =======================
// ⚙️ App Configuration
// =======================
app.set('view engine', 'ejs'); // Set view engine to EJS
app.set('views', path.join(__dirname, 'views')); // Views folder path
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(methodOverride('_method')); // For PUT & DELETE in forms
app.engine('ejs', ejsMate); // Use ejs-mate for layouts
// =======================
// 🛠 Utility Imports
// =======================
const wrapAsync = require('./utils/wrapAsync.js'); 
const ExpressError = require('./utils/expressError.js'); 
 
const store=mongoStore.create({
    mongoUrl:dbURL,
    crypto:{
        secret: process.env.SECRET
    },
    touchAfter:24*3600,
});

store.on("error",()=>{
    console.log("Error in mongo session store",err)
})
const sessionOptions = {
    store,
    secret: process.env.SECRET, // Secret key for session
    resave: false, // Don't resave session if unmodified
    saveUninitialized: true, // Save uninitialized sessions 
    cookie:{
        expires: Date.now() + 1000 * 60 * 60 * 24 *3,
        maxAge: 1000 * 60 * 60 * 24 * 3,
        httpOnly: true
    }
}

app.use(session(sessionOptions)); // Use session middleware
app.use(flash()); // Use flash middleware

app.use(passport.initialize()); // Initialize passport
app.use(passport.session()); // Use passport session
passport.use(new localStrategy(User.authenticate())); // Use local strategy

passport.serializeUser(User.serializeUser()); // Serialize user
passport.deserializeUser(User.deserializeUser()); // Deserialize user


app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user; // Make currentUser available in all templates
    
    if (res.locals.success.length > 0 || res.locals.error.length > 0) {
        console.log("Flash messages:", res.locals.success, res.locals.error);
    }
    
    next();
});

// app.get("/demoUser", async(req, res) => {
//     let fakeUser = new User({
//         username: "manav",
//         email: "123@gmail.com"
//     });

//     let registerUser=await User.register(fakeUser, 'chicken'); // Register user with password
//     res.send(registerUser);
// });

app.get('/', (req, res) => {
    res.render('listings/Home'); // Render homepage
});

app.use('/listings', listingRouter); // Use listing routes
app.use("/listings/:id/reviews", reviewRouter); // Use review routes
app.use('/', userRouter); // Use user routes

// ⚠️ 404 Page Not Found Middleware
// =======================
app.use((req, res, next) => {
    next(new ExpressError(404, 'Page Not Found'));
});
// =======================
// ⚠️ Global Error Handler
// =======================
app.use((err, req, res, next) => {
    let { statusCode = 500, message = 'Something went wrong' } = err;
    res.status(statusCode).render("error.ejs", { err }); // Render error page
    
});
// =======================
// 🚀 Start Server
// =======================
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
