// imports
const express = require('express');
// create router
const router = express.Router();
// imports
const {body, validationResult} = require('express-validator');
const Post = require('../../models/Post');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   POST api/posts
// @desc    Create a new post
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

        // get post info from the req and the user that makes the request
        const newPost = new Post({
            text: req.body.text, //in body
            name: user.name, // in user account
            avatar: user.avatar, // in user account
            user: req.user.id // in request header after auth
        });

        // Save post to db
        const post = await newPost.save(); // will return the saved post
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }

    res.send();
});

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get('/', auth, async(req, res) => {
    try {
        // Find all posts and return them
        const posts = await Post.find().sort({ date: -1}); // newest first
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(400).send('Server Error');
    }
});

// @route   GET api/posts/:id
// @desc    Get posts by id
// @access  Private
router.get('/:id', auth, async(req, res) => {
    try {
        // get the post using the id param
        const post = await Post.findById(req.params.id);
        // check if post exists
        if (!post){
            return res.status(404).json({ msg : 'Post not found'});
        }
        // send back result
        res.json(post);
    } catch (error) {
        console.error(error);
        // check if post is not found
        if (error.kind == 'ObjectId'){
            return res.status(404).json({ msg : 'Post not found'});
        }
        res.status(500).send('Server Error');
    }
    
});

// @route   DELETE api/posts/:id
// @desc    Delete posts by id
// @access  Private
router.delete('/:id', auth, async(req, res) => {
    try {
        // find the post to delete
        const post = await Post.findById(req.params.id);
        // check if post is not found
        if (!post){
            return res.status(404).json({ msg : 'Post not found'});
        }

        // check if the user requesting to delete is the user that owns the post
        if (req.user.id !== post.user.toString()){
            return res.status(401).json({ msg : 'User is not authorised to delete this post'});
        }
        // delete post from posts
        await post.remove();
        res.json({ msg: `Post ${post.id} has been removed`});
    } catch (error) {
        console.error(error);
        // check if post is not found
        if (error.kind == 'ObjectId'){
            return res.status(404).json({ msg : 'Post not found'});
        }
        res.status(500).send('Server Error');

    }
    //

});

// @route   PUT api/posts/like/:id
// @desc    Like a specific post based on id
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
    try {
        // get post
        const post = await Post.findById(req.params.id);
        if (!post){
            return res.status(401).json({msg : 'Post not found'});
        }
        // chack if this post has already been liked by the current user
        // filter returns a new array, if this array is not empty, the user already liked the post
        const likesByUser = post.likes.filter(like => like.user.toString() === req.user.id);
        // .lenght reutned undefined
        if (Object.keys(likesByUser).length > 0){
            return res.status(400).json({ msg : 'Post already liked'});
        }
        // add user to likes list
        post.likes.unshift({ user: req.user.id});
        // save to db
        await post.save();
        // return all the user that liked this post
        res.json(post.likes);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error')
    }
});

// @route   PUT api/posts/unlike/:id
// @desc    Unlike a specific post based on id
// @access  Private
router.put('/unlike/:id', auth, async(req, res) => {
    try {
        // get post
        const post = await Post.findById(req.params.id);
        if(!post){
            //post not found
            return res.status(401).json({ msg : 'Post not found'});
        }
        // check if the user has liked the post before, if not they cannot unlike
        const likesByUser = post.likes.filter(like => like.user.toString() === req.user.id);
        //console.log(likesByUser);
        if (likesByUser.length === 0){
            return res.status(400).json({ msg: "User has not liked post yet" });
        }
        // remove the like using index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        //console.log(likesByUser.lenght);
        post.likes.splice(removeIndex, 1);
        //save to db
        await post.save();
        res.json(post.likes); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

module.exports = router;