// file for mongoDB connection
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');


// connect to db
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true}); // additional parameters as per documentation due to deprecation
        console.log(`MongoDB is connected...`)
    } catch (error) {
        console.log(error.message);
        // exit process with faliure
        process.exit(1)
    }
}

module.exports = connectDB;