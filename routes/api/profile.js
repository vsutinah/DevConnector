const express = require('express'),
    router = express.Router();

// @route   GET api/profile
// @desc    Test route
// @access  Public (accessed publicly)
router.get('/', (req, res) => res.send('Profile route')); 

module.exports = router;
