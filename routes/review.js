const express = require('express');
const router = express.Router({mergeParams: true}); // Enable mergeParams to access listing ID in review routes
const wrapAsync = require('../utils/wrapAsync.js'); 
const ExpressError = require('../utils/expressError.js'); 
const Listing = require('../models/listing.js');
const Review = require('../models/review.js');
const controllerReview=require('../controllers/reviews.js')
const { listingSchema , reviewSchema } = require('../schema.js'); // Joi schema for validation
const { isLoggedIn, isOwner, validateListing,validateReview,isAuthor} = require('../middleware.js');
// =======================
// 📝 Post a Review for Listing
// =======================
router.post('/',isLoggedIn,validateReview ,wrapAsync(controllerReview.postReview));
// =======================
// 🗑️ Delete a Review Route
// =======================
router.delete('/:reviewId',isLoggedIn,isAuthor, wrapAsync(controllerReview.deleteReview));

module.exports = router; // Export the router
