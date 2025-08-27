const Listing = require('./models/listing.js');
const Review = require('./models/review.js');
const { listingSchema , reviewSchema } = require('./schema.js'); // Joi schema for validation
const ExpressError = require('./utils/expressError.js'); 

module.exports.isLoggedIn = (req, res, next) => {
    // console.log("REQ.USER...", req.user); // Log the user object for debugging
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl; // Store the original URL
        req.flash('error', 'You must be signed in to create a new listing!'); // Flash error message
        return res.redirect('/login'); // Redirect to login if not authenticated
    }
    next(); // Proceed if authenticated
    
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.returnTo){
        res.locals.returnTo = req.session.returnTo; // Make returnTo available in templates
    }  
    next(); 
}

module.exports.isOwner= async(req,res,next)=>{
    let { id } = req.params;
    let listing =await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currentUser._id)){
        req.flash("error","Are you the onwer???chlll chllll");
        return res.redirect(`/listings/${id}`);
    }
    next();
};
module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body); 
    console.log(error); // Log validation error if any
    if (error) {
        let errmessage = error.details.map((el) => el.message).join(', '); 
        throw  new ExpressError(400, errmessage); // Throw custom error
    } else {
        next(); 
    }
};
module.exports.validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    console.log(error); // Log validation error if any
    if (error) {
        let errmessage = error.details.map((el) => el.message).join(', ');
        throw new ExpressError(400, errmessage); // Throw custom error
    }else{
        next();
    }
};

module.exports.isAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author._id.equals(res.locals.currentUser._id)) {
        req.flash("error", "Are you the author??? chlll chllll");
        return res.redirect(`/listings/${id}`);
    }
    next();
};
