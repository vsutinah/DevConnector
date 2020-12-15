const express = require('express'),
    router = express.Router();

// @route   GET api/posts
// @desc    Test route
// @access  Public (accessed publicly)
router.get('/', (req, res) => res.send('Post route')); 

module.exports = router;
