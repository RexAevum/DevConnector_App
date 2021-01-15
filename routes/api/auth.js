// imports express
const express = require('express');
// create router
const router = express.Router();
// import files
const auth = require('../../middleware/auth');
const User = require('../../models/User');
// express-validator - to validate user input
const {  body, validationResult } = require('express-validator');
// import the config for token
const jwt = require('jsonwebtoken');
const config = require('config');
// import bcrypt for encrypting and decrypting
const bcrypt = require('bcryptjs');

// @route   GET api/auth
// @desc    Get user
// @access  Public
router.get('/', auth, async (req, res) => { // by adding the auth function, it will automaticaly be authorised
    try {
        // find user using the the id
        // in the middleware, we set the decoded user to req.user, so we can call .findById(req.user.id)
        const user = await User.findById(req.user.id).select('-password'); // .select('-password') - will not show password
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send(`Server error with authentification`)
    }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post('/', 
    // check if a valid email has been entered
    body('email', 'Please include a valid email').isEmail(),
    // check if password is atleast 6 char long
    body('password', 'Password is required').not().isEmpty(),
    async (req, res) => {
        // check if there are any input errors 
        const err = validationResult(req);
        if (!err.isEmpty()){
            // return a status of 400 - bad request and the generated error
            return res.status(400).json({errors: err.array()});
        }

        const {email, password} = req.body;

        try {
            let user = await User.findOne({ email });
            // See if user exists
            if(!user){
                // if user already exists return an error code and an error message that is the same format as
                // express-validator so we can display it with react
                return res.status(400).json({ errors: [{ msg : 'Invalid User' }] }); // add return to a res unless its the last one
            }

            // Create a payload which is the  user id on the db for token
            const payload = {
                user: {
                    id: user.id
                }
            }

            // Check if user password is correct
            // take a string password and compares it to a encrypted info
            const isMatch = await bcrypt.compare(password, user.password);

            // check if the passwords match
            if(!isMatch){
                // return error that password is wrong
                res.status(400).json([{ msg : 'Invalid Credentials'}]);
            }

            // Sign a toke for user to be auto logged in
            await jwt.sign(payload, // data to be passed
                config.get('jwtSecret'), // signature
                { expiresIn: 360000},
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }); //3600 default

            // return json webtoken so the user gets logged in right away
            //res.send(`User added...`);
        } catch (error) {
            console.error(error.message);
            res.status(500).send(`Server error`);
        }

})

module.exports = router;