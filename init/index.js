const mongoose = require('mongoose');
const initData = require('./data.js'); // ✅ Fixed path (./ instead of .)
const Listing = require('../models/listing.js'); // ✅ Fixed path (./ instead of .)  

const mongo_URL =  'mongodb://127.0.0.1:27017/Roomly';

main().then(()=>{
    console.log('✅ Connected to MongoDB');
}).catch((err)=>{
    console.error('❌ Database connection error:', err);
});

async function main(){
    await mongoose.connect(mongo_URL);
}

const seedDB = async () => {
    await Listing.deleteMany({});
    console.log('✅ All listings deleted');
    initData.data= initData.data.map((obj)=>({...obj, owner:"68ab34965f650d5180bb1acd"}))
    await Listing.insertMany(initData.data);
    console.log('Data seeded successfully');
}
seedDB();
