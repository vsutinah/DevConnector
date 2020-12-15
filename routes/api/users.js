const bcrypt = require('bcryptjs'),
    express = require('express'),
    jwt = require('jsonwebtoken'),
    gravatar = require('gravatar'),
    router = express.Router(),
    { check, validationResult } = require('express-validator'), // For body content validation
    User = require('../../models/User'),
    config = require('config');

// @route   POST api/users
// @desc    Register user
// @access  Public (accessed publicly)
router.post('/', [
    // Middleware that validates req body content
    check('name', 'Name is required') 
        .not()
        .isEmpty(),
    check('email', 'Please include valid email').isEmail(),
    check('password', 'Please include valid password').isLength({ min: 6 })
], 
 async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }) // Return bad request code if there's an error
    }
    
    try {
        //  See if user exists
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) { 
            return res
                .status(400)
                .json( { errors: [ { msg: 'User already exists' } ] });
        }
        // Get users gravatar
        const avatar = gravatar.url(email, {
            s: '200', // Default avatar size
            r: 'pg', // Keep avatar rating PG
            d: 'mm' // Set default user image of code 'mm'
        })
        // Encrypt password with bcrypt
        user = new User({ // Create new User
            name, 
            email,
            avatar,
            password
        }); 
        
        const salt = await bcrypt.genSalt(10); // Generate salt for our pwd
        
        user.password = await bcrypt.hash(password, salt); // Hash input pwd with generated salt fm bcrypt
        
        await user.save(); // Save
        
        // Return JWT

        const payload = { // Create payload w/ our user ID
            user: {
                id: user.id
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
        console.log(e.message);
        return res.status(500).send('Server Error');
    }

}); 

module.exports = router;

