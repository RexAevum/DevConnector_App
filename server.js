// Imports
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

// init app 
const app = express();

// connect db
connectDB();

// init middleware
app.use(express.json({ extended: false})); // to parse the req.body


// define route for users
app.use('/api/users', require(`./routes/api/users`));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profiles'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/feedback', require('./routes/api/feedback'));

// Serve static assets in production (has to be after routs)
if (process.env.NODE_ENV === 'production'){
    // set static folder
    app.use(express.static('client/build'));

    // serve
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

// get the port from host or run on 5000
const PORT = process.env.PORT || 5000;

// listen
app.listen(PORT, () => console.log(`Starting server on port ${PORT}`));