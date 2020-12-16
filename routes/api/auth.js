const bcrypt = require('bcryptjs'),
    express = require('express'),
    router = express.Router(),
    jwt = require('jsonwebtoken'),
    { check, validationResult } = require('express-validator'), // For body content validation
    auth = require('../../middleware/auth'),
    User = require('../../models/User'),
    config = require('config');

// @route   GET api/auth
// @desc    Test route
// @access  Public 
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id); // Remember that we set req.user as our user in auth middleware  
        res.json(user); // Return our user details in JSON format
    } catch(e) {
        console.error(e.message);
        res.status(500).send('Server error');
    }
}); 

// @route   POST api/auth
// @desc    Login user w/ JWT token
// @access  Public
router.post('/', [
    // Middleware that validates req body content
    check('email', 'Please include valid email').isEmail(),
    check('password', 'Password is required').exists()
], 
 async (req, res) => {
    const errors = validationResult(req); 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }) // Return bad request code if invalid input is given
    }
    
    try {
        //  See if user exists
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) { // If no user is found for login
            return res
                .status(400)
                .json( { errors: [ { msg: 'Invalid credentials' } ] });
        }

        // Compare input password with the hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .json( { errors: [ { msg: 'Invalid credentials' } ] });
        }

        // Return JWT

        const payload = { // Create payload
            user: {
                id: user.id // Sign JWT w/ payload containing our user.id
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            { expiresIn: 3600000 }, // Optional; sets token time to expire in x secs
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
            ) // Sign our JWT with the payload and secret 
        // We will use the JWT's ID to access protected routes (auth)
        
    } catch (e) {
        console.error(e.message);
        return res.status(500).send('Server Error');
    }

}); 

module.exports = router;
