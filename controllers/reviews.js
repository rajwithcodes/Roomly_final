const Listing = require('../models/listing.js');
const Review = require('../models/review.js');

module.exports.postReview=async (req, res) => {
    let listing = await Listing.findById(req.params.id); // Find listing
    let newReview = new Review(req.body.review); // Create new review
    newReview.author = req.user._id; 

    listing.reviews.push(newReview); // Add review to listing
    await newReview.save(); // Save review
    await listing.save(); // Save listing with updated reviews
    req.flash('success', 'Review added successfully!'); // Flash success message
    res.redirect(`/listings/${listing._id}`); // Redirect to listing detail
    console.log(`New review added to listing with ID ${listing._id}:`, newReview);
};

module.exports.deleteReview=async (req, res) => {
    let { id, reviewId } = req.params; // Get listing and review IDs
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); // Remove review from listing
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Review deleted successfully!'); // Flash success message
    res.redirect(`/listings/${id}`) 
    console.log(`Review with ID ${reviewId} deleted from listing with ID ${id}`);
}