const express = require('express'),
    router = express.Router(),
    axios = require('axios'),
    config = require('config'),
    auth = require('../middleware/auth'),
    { check, validationResult } = require('express-validator'),
    Profile = require('../../models/Profile'),
    User = require('../../models/User');

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        // Find profile associated with currently logged in user
        const profile = await Profile.findOne({ user: req.user.id })
            .populate('user', ['name', 'avatar']); // Populate with specific user details
        // If no profile is found
        if (!profile) {
            return res.status(400).json({ msg: 'No profile found for this user'});
        }

        res.json(profile); // Return the profile as JSON                     
    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server error');
    }
}); 

// @route   POST api/profile
// @desc    Create/update profile 
// @access  Private
router.post('/', [ auth, [
    check('status', 'Status is required')
        .not()
        .isEmpty(),
    check('skills', 'Skills is required')
        .not()
        .isEmpty()
    ]
], 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json( { errors: errors.array() })
        }
        // Destructure the fields from req.body
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
            linkedin
        } = req.body;
        // Build profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if(company) profileFields.company = company;
        if(website) profileFields.website = website;
        if(location) profileFields.location = location;
        if(bio) profileFields.bio = bio;
        if(status) profileFields.status = status;
        if(githubusername) profileFields.githubusername = githubusername;
        if(skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim()); // Split the string by its delimiter
        }

        // Build social object
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (instagram) profileFields.social.instagram = instagram;

        try {
            let profile = await Profile.findOne({ user: req.user.id }); // Find profile with ID of current user (req.user)
            if (profile) {
                // Update profile
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id }, 
                    { $set: profileFields },
                    { new: true }); // Update profile to be filled with profileFields input
                
                return res.json(profile);
            };
            // Create new profile for user if user doesn't have one 
            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile);

        } catch (e) {
            console.error(e.message);
            res.status(500).send('Server Error');
        }
    })

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find()
            .populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }
})

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }) // Find profile specific to the user ID in our params
            .populate('user', ['name', 'avatar']);
            if (!profile) return res.status(400).json({ msg: 'There is no profile for this user' }); // Error if no profile found
        res.json(profile);
    } catch (e) {
        console.error(e.message);
        if (err.kind == 'ObjectId') return res.status(400).json({ msg: 'There is no profile for this user' }); // Error if no profile found
        res.status(500).send('Server Error'); 
    }
})
  
// @route   DELETE api/profile
// @desc    Delete profile, user & posts
// @access  Private
router.delete('/', auth, async (req, res) => {
    try {
        // @todo - remove users posts

        // Remove the profile
        await Profile.findOneAndRemove( {user: req.user.id } );
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: 'User deleted' });
    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }
})

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put('/experience', [auth, [
    check('title', 'Title is required')
        .not()
        .isEmpty(),
    check('company', 'Company is required')
        .not()
        .isEmpty(),
    check('from', 'From date is required')
        .not()
        .isEmpty(),
]], async (req, res) => {
    // Validate inputs and throw errors if invalid input
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    // Destructure experience fields
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    };

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.experience.unshift(newExp); // Add input exp to the exp array
        await profile.save(); // Save changes
        res.json(profile); // Return profile with updated experience
    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }
})

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from a profile
// @access  Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        // Retrieve the profile from which to delete exp from
        const profile = await Profile.findOne({ user: req.user.id });
        // Get index for the removal
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex, 1); // Remove 1 exp fm the exp array using the obtained index
        await profile.save(); // Save changes
        res.json(profile);

    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }
})

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put('/education', [auth, [
    check('school', 'School is required')
        .not()
        .isEmpty(),
    check('degree', 'Degree is required')
        .not()
        .isEmpty(),
    check('fieldofstudy', 'Field of study is required')
        .not()
        .isEmpty(),
    check('from', 'From date is required')
        .not()
        .isEmpty(),
]], async (req, res) => {
    // Validate inputs and throw errors if invalid input
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    // Destructure education fields
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    };

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.education.unshift(newEdu); // Add input edu to the edu array
        await profile.save(); // Save changes
        res.json(profile); // Return profile with updated education
    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }
})

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from a profile
// @access  Private
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        // Retrieve the profile from which to delete edu from
        const profile = await Profile.findOne({ user: req.user.id });
        // Get index for the removal
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
        profile.education.splice(removeIndex, 1); // Remove 1 exp fm the edu array using the obtained index
        await profile.save(); // Save changes
        res.json(profile);

    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }
})

// @route   GET api/profile/github/:username
// @desc    Get user repos from Github
// @access  Public
router.get('/github/:username', async (req, res) => {
    try {
        // Make request to Github API to retrieve user's repo details
        const uri = encodeURI(
        `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
        );
        const headers = {
        'user-agent': 'node.js',
        Authorization: `token ${config.get('githubToken')}`
        };
        
        const gitHubResponse = await axios.get(uri, { headers });
        return res.json(gitHubResponse.data);

    } catch (e) {
        console.error(e.message);
        res.status(404).json({ msg: 'No Github profile found' });
    }
})

module.exports = router;