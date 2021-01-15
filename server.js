// Imports
const express = require('express');
const connectDB = require('./config/db');

// init app 
const app = express();

// connect db
connectDB();

// init middleware
app.use(express.json({ extended: false})); // to parse the req.body

//test 
app.get('/', (req, res) => res.send(`API running`))

// define route for users
app.use('/api/users', require(`./routes/api/users`));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profiles'));
app.use('/api/posts', require('./routes/api/posts'));

// get the port from host or run on 5000
const PORT = process.env.PORT || 5000;

// listen
app.listen(PORT, () => console.log(`Starting server on port ${PORT}`));