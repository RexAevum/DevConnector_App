// imports
const express = require('express');

// create router
const router = express.Router();

// @route   GET api/auth
// @desc    Test rout
// @access  Public
router.get('/', (req, res) => {
    res.send(`Auth route`);
});

module.exports = router;