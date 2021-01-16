// import express;
const express = require('express');
// create router
const router = express.Router();
// imports
const { body, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const request = require('request');
const config = require('config');

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
                { new: true } // if set to true, will return profile after updating it, if false then before update
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
});

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put('/experience', [auth, [
    body('title', 'Title is required').not().isEmpty(),
    body('company', 'Company name is required').not().isEmpty(),
    body('from', 'Start date is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return res.status(400).json({ errors: errors.array()});
    }
    // pull out needed info
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    // create a new experience obj
    const newExp = {
        title: title,
        company: company,
        location: location,
        from: from,
        to: to,
        current: current,
        description: description
    };

    // use mongoDb
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        //Add the updated experiences
        profile.experience.unshift(newExp);//push all items at the top of the list
        // save to db
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }

});

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete profile experience
// @access  Private
router.delete('/experience/:exp_id', auth, async(req, res) => {
    try{  
        const profile = await Profile.findOne({ user: req.user.id });
        if(!profile){
            console.log("Experience id not found");
            return res.status(400).send("Experience id not found");
        }
        // get remove index
        const removeIndex = profile.experience.map(item => item._id).indexOf(req.params.exp_id);
        console.log(removeIndex);
        // remove experience index from profile
        profile.experience.splice(removeIndex, 1); // remove 1 item from experience
        // save to db
        await profile.save();
        res.json(profile);
    }catch(err){
        console.error(err);
        res.status(500).send("Server Error");
    }

});

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put('/education', [auth, [
    body('school', 'School is required').not().isEmpty(),
    body('degree', 'Degree is required').not().isEmpty(),
    body('fieldofstudy', 'Field of study is required').not().isEmail(),
    body('from', 'Start date is required').not().isEmail(),
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return res.status(400).json({errors : errors.array()});
    }
    try {
        // get profile
        const profile = await Profile.findOne({ user : req.user.id });
        if (!profile){
            return res.status(400).send({errors : [{ msg : 'No profile found'}]});
        }

        // pull out needed fields
        const {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        } = req.body;

        // create new education entry
        const newEdu = {
            school : school,
            degree : degree,
            fieldofstudy : fieldofstudy,
            from : from,
            to : to,
            current : current,
            description : description
        };

        // add education to profile.education
        profile.education.unshift(newEdu);

        // save to db and send response
        await profile.save(); 
        res.json(profile);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete profile education
// @access  Private
router.delete('/education/:edu_id', auth, async(req, res) => {

    try {
        // get profile
        const profile = await Profile.findOne({ user: req.user.id });
        //get index of the item we want to delete from the id
        if (!profile){
            return res.status(400).send({errors : [{ msg: 'No profile found' }]});
        };
        // find index
        const index = profile.education.map(item => item._id).indexOf(req.params.edu_id);
        // remove the found index
        profile.education.splice(index, 1);
        // save to db
        await profile.save();
        res.json(profile);

    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }

});

// @route   GET api/profile/github/:username
// @desc    Get user repo from github
// @access  Public
router.get('/github/:username', async(req, res) => {
    try {
        const options = {
            // create uri for github using the passed user name
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=20&sort=created:asc&cliente_id=${config.get('githubClientId')}
            &client_secret=${config.get('githubSecret')}`,
            // method of request
            method: 'GET',
            // set headers
            headers: {'user-agent' : 'node.js'}
        };
        // make a request using the above defined request
        request(options, (error, response, body) =>{
            if (error) console.error(error);
            // Check if user is found
            if (response.statusCode !== 200){
                return res.status(404).json({errors : [{msg : 'No Github Profile Found'}]})
            }
            // return the request body
            res.json(JSON.parse(body));
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
})
// @route   DELETE api/profile/education/:edu_id
// @desc    Delete profile education
// @access  Private

module.exports = router;