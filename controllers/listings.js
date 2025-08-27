const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({}); // Fetch all listings
    res.render('listings/index', { allListings }); // Render listings page
};

module.exports.renderNewForm = (req, res) => {
    res.render('listings/new'); // Render new listing form
};

module.exports.showListings = async (req, res) => {
    let { id } = req.params; 
    const listing = await Listing.findById(id)
    .populate({
        path:"reviews",
        populate:{path:"author",
        },
    })
    .populate("owner"); // Find listing by ID
    if (!listing) {
        req.flash('error', 'Listing not found!'); // Flash error if listing not found
        return res.redirect('/listings'); // Redirect to all listings
    }
    console.log(listing);
    res.render('listings/show', { listing }); // Render single listing page
};

module.exports.createListing=async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing); // Create new listing
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
    await newListing.save(); // Save to DB
    req.flash('success', 'Listing created successfully!'); // Flash success message
    res.redirect('/listings'); // Redirect to all listings
};

module.exports.edit=async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id); // Find listing to edit
    if (!listing) {
        req.flash('error', 'Listing not found!');
        return res.redirect('/listings'); // Redirect if not found
    };
    res.render('listings/edit', { listing }); // Render edit form
};
module.exports.update=async (req, res) => {
    let { id } = req.params;
    let listing=await Listing.findByIdAndUpdate(id, { ...req.body.listing }); // Update listing
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image={url,filename};
        await listing.save();
    }
    
    req.flash('success', 'Listing updated successfully!'); // Flash success message
    res.redirect(`/listings/${id}`); // Redirect to updated listing
};
module.exports.delete=async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id); // Delete listing
    req.flash('success', 'Listing deleted successfully!'); // Flash success message
    console.log(`Listing with ID ${id} deleted:`, deletedListing); 
    res.redirect('/listings');
}