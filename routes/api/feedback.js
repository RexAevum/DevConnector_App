// imports
const express = require('express');
// create router
const router = express.Router();
// imports
const {body, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Feedback = require('../../models/Feedback');


// @route   POST api/feedback
// @desc    Create a new feedback entry
// @access  Private
router.post('/',[auth, [
    body('text', 'Text field is empty').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

    try {
        // find the specific user account in db
        const user = await User.findById(req.user.id).select('-password');

        // get feedback info from the req and the user that makes the request
        const newFeedback = new Feedback({
            anonymous: req.body.anonymous,
            type: req.body.type,
            title: req.body.title,
            text: req.body.text, //in body
            name: req.body.anonymous ? 'Anonymous' : user.name, // in user account
            user: req.user.id, // in request header after auth
            status: req.body.status
        });

        // Save feedback to db
        const feedback = await newFeedback.save(); // will return the saved feedback
        res.json(feedback);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }

    res.status(500);
});

// @route   GET api/feedback
// @desc    Get all feedbacks
// @access  Private
router.get('/', auth, async(req, res) => {
    try {
        // Find all feedbacks and return them
        const feedbacks = await Feedback.find().sort({ date: -1}); // newest first
        res.json(feedbacks);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/feedback/like/:id
// @desc    Like a specific feedback based on id
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
    try {
        // get feedback
        const feedback = await Feedback.findById(req.params.id);
        if (!feedback){
            return res.status(401).json({msg : 'feedback not found'});
        }
        // chack if this feedback has already been liked by the current user
        // filter returns a new array, if this array is not empty, the user already liked the feedback
        const likesByUser = feedback.likes.filter(like => like.user.toString() === req.user.id);
        // .lenght returned undefined
        if (Object.keys(likesByUser).length > 0){
            return res.status(400).json({ msg : 'feedback already liked'});
        }
        // add user to likes list
        feedback.likes.unshift({ user: req.user.id});
        // save to db
        await feedback.save();
        // return all the user that liked this feedback
        res.json(feedback.likes);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error')
    }
});

// @route   PUT api/feedbacks/unlike/:id
// @desc    Unlike a specific feedback based on id
// @access  Private
router.put('/unlike/:id', auth, async(req, res) => {
    try {
        // get feedback
        const feedback = await Feedback.findById(req.params.id);
        if(!feedback){
            //feedback not found
            return res.status(401).json({ msg : 'feedback not found'});
        }
        // check if the user has liked the feedback before, if not they cannot unlike
        const likesByUser = feedback.likes.filter(like => like.user.toString() === req.user.id);
        //console.log(likesByUser);
        if (likesByUser.length === 0){
            return res.status(400).json({ msg: "User has not liked feedback yet" });
        }
        // remove the like using index
        const removeIndex = feedback.likes.map(like => like.user.toString()).indexOf(req.user.id);
        //console.log(likesByUser.lenght);
        feedback.likes.splice(removeIndex, 1);
        //save to db
        await feedback.save();
        res.json(feedback.likes); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;