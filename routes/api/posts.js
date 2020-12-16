const express = require('express'),
    router = express.Router(),
    { check, validationResult } = require('express-validator'),
    auth = require('../../middleware/auth'),
    Post = require('../../models/Post'),
    User = require('../../models/User'),
    Profile = require('../../models/Profile');

// @route   POST api/posts
// @desc    Add a new post
// @access  Private 
router.post('/', [auth, [
    check('text', 'Text is required')
        .not()
        .isEmpty()
]], async (req, res) => {
    // Validate inputs and throw errors for invalid input
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json( { errors: errors.array() });
    
    try {
        // Find logged in user's details
        const user = await User.findById(req.user.id).select('-password'); // Return user without the password att
        // Create new post using input and user details
        const newPost = new Post ({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id 
        })

        const post = await newPost.save(); // Save newly created post

        res.json(post);

    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }

});

// @route   GET api/posts
// @desc    Get all posts
// @access  Private 
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 }); // Find all posts and sort by most recent one
        res.json(posts);
    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }
})

// @route   GET api/posts/:id
// @desc    Get specific post
// @access  Private 
router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id); // Find post using the ID from params
        if (!post) return res.status(404).json({ msg: 'Post not found' });
        res.json(post);
    } catch (e) {
        console.error(e.message);
        if (e.kind === 'ObjectId') return res.status(404).json({ msg: 'Post not found' });
        res.status(500).send('Server Error');
    }
})

// @route   DELETE api/posts
// @desc    Delete post
// @access  Private 
router.delete('/:id', auth, async (req, res) => {
    try {
        // Delete post using the ID from params
        const post = await Post.findById(req.params.id); 
        if (!post) return res.status(404).json({ msg: 'Post not found' });
        // Throw error if current user is not the user who wrote the post
        if (post.user.toString() !== req.user.id) return res.status(401).json({ msg: 'User not authorized' })        
        await post.remove();
        res.json({ msg: 'Post removed' })
    } catch (e) {
        console.error(e.message);
        if (e.kind === 'ObjectId') return res.status(404).json({ msg: 'Post not found' });
        res.status(500).send('Server Error');
    }
})

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private 
router.put('/like/:id', auth, async(req, res) => {
    try {
        // Find post to like
        const post = await Post.findById(req.params.id);
        // Check if post has already been liked by user
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already liked '});
        }
        // Else, add the like
        post.likes.unshift( { user: req.user.id });
        await post.save();
        res.json(post.likes);

    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server error');
    }
})

// @route   PUT api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private 
router.put('/unlike/:id', auth, async(req, res) => {
    try {
        // Find liked post
        const post = await Post.findById(req.params.id);
        // Check if post has already been liked by user
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'Post is not liked yet'});
        }
        // Else, remove the like
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex, 1); // Remove like using the obtained index
        await post.save(); // Save changes
        res.json(post.likes);
        
    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server error');
    }
})

// @route   POST api/posts/comment/:id
// @desc    Comment on a post
// @access  Private 
router.post('/comment/:id', [auth, [
    check('text', 'Text is required')
        .not()
        .isEmpty()
]], async (req, res) => {
    // Validate inputs and throw errors for invalid input
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json( { errors: errors.array() });
    
    try {
        // Find logged in user's details
        const user = await User.findById(req.user.id).select('-password'); // Return user without the password att
        // Find post that user wants to comment on
        const post = await Post.findById(req.params.id); 
        // Create new comment on post using input and user details
        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id 
        };

        post.comments.unshift(newComment);

        await post.save(); // Save newly created post

        res.json(post.comments);

    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }

});

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete comment from a post
// @access  Private 
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id); 
        // Pull comment from post
        const comment = post.comments.find(comment => comment.id === req.params.comment_id); // Find the comment that is listed in our params 
        // Make sure comment exists
        if (!comment) return res.status(404).json({ msg: 'Comment does not exist' });
        // Check user
        if (comment.user.toString() !== req.user.id) return res.status(401).json({ msg: 'User not authorized '});
        // If all validation and auth passes, start removing comment
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
        post.comments.splice(removeIndex, 1); // Remove comment using the obtained index
        await post.save(); // Save changes
        res.json(post.comments);
    } catch (e) {
        console.error(e.message);
        if (e.kind === 'ObjectId') return res.status(404).json({ msg: 'Comment not found' });
        res.status(500).send('Server Error');
    }
})

module.exports = router;
