// imports express
const express = require('express');
// create router
const router = express.Router();
// express-validator - to validate user input
const {  body, validationResult } = require('express-validator');
// import User
const User = require('../../models/User');
// import gravatar - for getting user profile image
const gravatar = require('gravatar');
//import bcrypt for encrypting password
const bcrypt = require('bcryptjs');
// import the config for token
const jwt = require('jsonwebtoken');
const config = require('config');


// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', 
    // check if user entered name
    body('name', 'Name is needed').not().isEmpty(),
    // check if a valid email has been entered
    body('email', 'Please include a valid email').isEmail(),
    // check if password is atleast 6 char long
    body('password', 'Please use a password with 6 or more chararcters').isLength({ min: 6}),
    async (req, res) => {
        // check if there are any input errors 
        const err = validationResult(req);
        if (!err.isEmpty()){
            // return a status of 400 - bad request and the generated error
            return res.status(400).json({errors: err.array()});
        }

        const {name, email, password} = req.body;

        try {
            let user = await User.findOne({ email });
            // See if user exists
            if(user){
                // if user already exists return an error code and an error message that is the same format as
                // express-validator so we can display it with react
                return res.status(400).json({ errors: [{ msg : 'User already exists' }] }); // add return to a res unless its the last one
            }
            // Get users gravitar
            const avatar = gravatar.url(email, {
                s: '200', // string lenght
                r: 'pg', // rating of image (no pg)
                d: 'mm' // default image
            });
            
            user = new User({
                name: name,
                email: email,
                password,
                avatar: avatar
            });

            // Encrypt the password using bcrypt
            const salt = await bcrypt.genSalt(10); //
            // Encrypt the password
            user.password = await bcrypt.hash(password, salt);
            // Save the user to the db
            await user.save();

            // Create a payload which is the  user id on the db for token
            const payload = {
                user: {
                    id: user.id
                }
            }
            // Sighn a toke for user to be auto logged in
            await jwt.sign(payload, // data to be passed
                config.get('jwtSecret'), // signature
                { expiresIn: 360000}, //3600 default
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }); 

            // return json webtoken so the user gets logged in right away
            //res.send(`User added...`);
        } catch (error) {
            console.error(error.message);
            res.status(500).send(`Server error`);
        }

})

module.exports = router;