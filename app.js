// =======================
// 📦 Required Modules
// =======================
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const { listingSchema, reviewSchema } = require("./schema.js");

// Routers
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// Auth + Session
const session = require("express-session");
const mongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");

// =======================
// 🌐 MongoDB Connection
// =======================
const dbURL = process.env.ATLASDB_URL;

async function main() {
    try {
        await mongoose.connect(dbURL);
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ Database connection error:", err);
    }
}
main();

// =======================
// ⚙️ App Config
// =======================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

// =======================
// 🛠 Mongo Store (Session)
// =======================
const store = mongoStore.create({
    mongoUrl: dbURL,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", () => {
    console.log("Error in mongo session store", err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
        maxAge: 1000 * 60 * 60 * 24 * 3,
        httpOnly: true,
    },
};

app.use(session(sessionOptions));
app.use(flash());

// =======================
// 🔐 Passport Setup
// =======================
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// =======================
// 🌍 Global Middleware
// =======================
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user || null; // 🔥 FIXED!

    next();
});

// =======================
// 🏠 Routes
// =======================
app.get("/", (req, res) => {
    res.render("listings/Home");
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// =======================
// ⚠️ 404 Handler
// =======================
const ExpressError = require("./utils/expressError.js");

app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// =======================
// ⚠️ Global Error Handler
// =======================
app.use((err, req, res, next) => {
    let { statusCode = 500 } = err;
    res.status(statusCode).render("error.ejs", { err });
});

// =======================
// 🚀 Start Server
// =======================
const port = 3000;
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
