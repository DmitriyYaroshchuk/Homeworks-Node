const Post = require('../models/Post');

const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: 'Please provide title and content' });
        }
        const newPost = await new Post({ title, content, owner: req.userId });
        await newPost.save();
        return res.status(201).json(newPost);
    } catch (error) {
        return res.status(400).json({ message: 'Server error' });
    }
}

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({ owner: req.userId });
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({ message: 'Server error' })
    }
}

const getPostById = async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id, owner: req.userId })
        if (!post) {
            return res.status(404).json({ message: 'Post is not founded' });
        }
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
}

const updatePost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = await Post.findOneAndUpdate(
            { _id: req.params.id, owner: req.userId },
            { title, content },
            { new: true }
        )
        if(!post) {
            return res.status(404).json({ message: 'Post was not founded' })
        }
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ message : 'Server error'})
    }
}

const deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findOneAndDelete({ _id: req.params.id, owner: req.userId });
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post was not founded' })
        }
        return res.status(200).json({ message: 'Post was deleted successfully' })

    } catch (error) {
        return res.status(500).json({ message: 'Server error: ', error });
    }
}
module.exports = { createPost, getPosts, getPostById, updatePost, deletePost };