// imports
const { compareSync } = require('bcryptjs');
const express = require('express');

// create router
const router = express.Router();
//
const { body, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
        // check if profile found
        if (!profile){
            return res.status(400).json({errors : [{ msg: 'There is no profile for this user'}]})
        }
    } catch (error) {
        console.error(err.message);
        res.status(500).json({errors: [{ msg: `Server error`}]});
    }
});

// @route   GET api/profile
// @desc    Create or update user profile
// @access  Private
router.post('/', [auth, 
[
body('status', 'Status is required').not().isEmpty(),
body('skills', 'Skills is required').not().isEmpty()
]
], async (req, res) => {
     const err = validationResult(req); // pass req
     if (!err.isEmpty()){
         return res.status(400).json({ errors: err.array() });
     }

    // pull out the required fields from the
    const { 
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin,
        handshake
    } = req.body;

    //build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    // check if all info has been passed
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (handshake) profileFields.social.handshake = handshake;
    // Build skills list
    if (skills) {
        // need to make the skills an array, what we get is a seperated list
        profileFields.skills = skills.split(',').map(skill => skill.trim()); // trim is to ignore the spaces after the delimiter
    }
    //
    try {
        // find a profile using id
        // findById gives error
        let profile = await Profile.findOne( { user: req.user.id } );
        // check if profile found -> then update profile
        if (profile) {
            profile = await Profile.findOneAndUpdate( { user: req.user.id },
                { $set: profileFields},
                { new: false } // if set to true, will return profile after updating it, if false then before update
            );
            console.log('Profile found and updated ->' + profile);
            return res.json(profile);
        }else{
            // if profile not found -> create new profile
            profile = new Profile(profileFields);
            // save to db
            await profile.save();
            // return the profile
            console.log("Profile created")
            return res.json(profile);
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }


    console.log(profileFields.skills);
    res.send(`Got profile`);

});

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', async(req, res) =>{
    try {
        // get all profiles and display the name and avatar img
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', async(req, res) =>{
    try {
        // get all profiles and display the name and avatar img
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

        // check if there is a profile
        if (!profile){
            return res.status(400).json({msg : "There is no profile for this user"});
        }

        res.json(profile);
    } catch (err) {
        console.error(err);
        // if ID is not valid, will get caught without getting to return res.status(400).json({msg : "There is no profile for this user"});
        if (err.kind == 'ObjectId'){
            return res.status(400).json({msg : "There is no profile for this user"});
        }
        res.status(500).send('Server Error')
    }
});

// @route   DELETE api/profile
// @desc    Delete profile, user & posts
// @access  Private
router.delete('/', auth, async(req, res) => {
    try {
        // @todo - remove users posts 

        // remove profile
        await Profile.findOneAndRemove({ user: req.user.id});
        // remove user
        await User.findOneAndRemove( { _id: req.user.id });
        // return once done
        res.status(200).send("User Removed");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
})

module.exports = router;