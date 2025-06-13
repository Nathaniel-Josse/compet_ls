const express = require('express');
const Post = require('../models/Post'); // Import the Post model

const router = express.Router();

// Create a new blog post
router.post('/', async (req, res) => {
    try {
        const { title, content, author, picture_link, created_at, tags } = req.body;
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required.' });
        }
        // Parse tags: split by comma, trim whitespace, filter out empty strings
        const tagsArray = tags
            ? tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
            : [];
        console.log('Creating post with data:', req.body);
        const post = new Post({
            title,
            content,
            author: author || 'Anonymous',
            pictureLink: picture_link || '',
            createdAt: created_at ? new Date(created_at) : new Date(),
            tags: tagsArray
        });
        await post.save();
        res.redirect('/post-page');
    } catch (err) {
        res.status(500).json({ error: 'Failed to create post.' });
    }
});

// Get all blog posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find({});
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch posts.' });
    }
});

// Get a single blog post by ID
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found.' });
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch post.' });
    }
});

// Update a blog post by ID
router.put('/:id', async (req, res) => {
    try {
        const { title, content, author, picture } = req.body;
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found.' });

        if (title) post.title = title;
        if (content) post.content = content;
        if (author) post.author = author;
        if (picture) post.picture = picture;

        await post.save();
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update post.' });
    }
});

// Delete a blog post by ID
router.post('/delete/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found.' });
        res.redirect('/post-page');
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete post.' });
    }
});

module.exports = router;