//
const jwt = require('jsonwebtoken');
const config = require('config');

// function to verify token
module.exports = function(req, res, next) {
    // Get token from the header
    const token = req.header('x-auth-token');
    
    // Check if no token 
    if (!token){
        return res.status(401).json({ msg : `No token, authorisation denied` });
    }

    // Verify token
    try {
        // decode the token
        const decode = jwt.verify(token, config.get('jwtSecret'));
        // request the user that was referenced in the token
        req.user = decode.user;
        // all middleware needs the next() to move to the next
        next();
    } catch (error) {
        res.status(401).json( {msg: `Token is not valid` });
    }
}