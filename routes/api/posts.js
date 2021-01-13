// imports
const express = require('express');

// create router
const router = express.Router();

// @route   GET api/posts
// @desc    Test rout
// @access  Public
router.get('/', (req, res) => {
    res.send(`Posts route`);
});

module.exports = router;