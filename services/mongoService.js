const User = require('../models/User');
const Post = require('../models/Post');

const createUser = async (name, email) => {
    const newUser = new User({ name, email });
    return await newUser.save();
};

const getAllUsers = async () => {
    return await User.find().populate('posts');
};

const getUsersWithTwoPosts = async () => {
    try {
        //
    } catch (err) {
        console.error('Error in getUsersWithTwoPosts', err);
        throw err;
    }
};

const createPost = async (title, content, userId) => {
    const newPost = new Post({ title, content, user: userId });
    await newPost.save();
    return await User.findByIdAndUpdate(userId, { $push: { posts: newPost._id } }, { new: true });
};

const deleteUserAndPosts = async (userId) => {
    try {
        await User.findByIdAndDelete(userId);
        await Post.deleteMany({ user: userId });
    } catch (err) {
        throw new Error('Failed to delete user and posts.');
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUsersWithTwoPosts,
    createPost,
    deleteUserAndPosts,
}