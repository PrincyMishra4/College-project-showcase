const mongoose = require('mongoose');

const url = "mongodb+srv://princymshr002:princy8090@cluster0.ivvch1t.mongodb.net/majorproject?retryWrites=true&w=majority&appName=Cluster0"

// connect to the database

// asynchronous  - returns a promise
mongoose.connect(url)
.then((result) => {
    console.log('connected to database');
    
    
}).catch((err) => {
    console.log(err);
    
    
});

module.exports = mongoose;