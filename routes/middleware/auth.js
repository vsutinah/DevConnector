const jwt = require('jsonwebtoken'),
    config = require('config');

// Auth middleware function
module.exports = function(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' }); // Error if no token is found
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret')); 
        req.user = decoded.user; // Set req.user as the user ID in our JWT payload
        next(); 
    } catch (e) {
        console.log(e.message);
        res.status(401).json({ msg: 'Token is not valid '}); // Error for invalid token
    }
} 