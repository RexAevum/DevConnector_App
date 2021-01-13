// Imports
const express = require('express');

// init app 
const app = express();

//test 
app.get('/', (req, res) => res.send(`API running`))

// get the port from host or run on 5000
const PORT = process.env.PORT || 5000;

// listen
app.listen(PORT, () => console.log(`Starting server on port ${PORT}`));