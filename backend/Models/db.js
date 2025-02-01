const mongoose = require('mongoose');
const mongo_url  = process.env.MoNGO_CONN;

mongoose.connect(mongo_url)
           .then(()=>{
            console.log('Connected to MongoDB');
           }).catch((err)=>{
            console.log(`MongoDB connection err`,err); 
           })