const express = require('express');
const mongoose = require('mongoose');
const mongoService = require('./services/mongoService');

const app = express();
const port = process.env.PORT || 3000; // http://localhost:3000

app.use(express.json());

const MONGO_URL = 'mongodb+srv://awandresto:kvqHzhryAkj95gkI@nodelearningcluster0.5nsha5e.mongodb.net/';
mongoose.connect(MONGO_URL, {
    dbName: 'NodeLearningCluster0'
});

// Connect to MongoDB
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connect to MongoDB:'));

// CRUD Operations
    // Create User
    app.post('/create-user', async (req, res) => {
        const { name, email } = req.body;
        try {
            const newUser = await mongoService.createUser(name, email);
            console.log('CREATE item', newUser);
            res.json(newUser);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Create Post
    app.post('/create-post', async (req, res) => {
        const { title, content, userId } = req.body;
        try {
            const userWithPost = await mongoService.createPost(title, content, userId);
            console.log('CREATE post', userWithPost);
            res.json(userWithPost);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Get all users
    app.get('/users', async (req, res) => {
        try {
            const users = await mongoService.getAllUsers();
            console.log('GET all users', users);
            res.json(users);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Get all users with post
    app.get('/users-with-posts', async (req, res) => {
        try {
            const usersWithMoreThanTwoPosts = await mongoService.getUsersWithTwoPosts();
            console.log('GET all users with more than two posts', usersWithMoreThanTwoPosts);
            res.json(usersWithMoreThanTwoPosts);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Delete user
    app.delete('/users/:id', async (req, res) => {
        const { id } = req.params;
        try {
            await mongoService.deleteUserAndPosts(id);
            res.status(200).json({ message: 'User and their posts deleted successfully.' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.use((req, res) => {
        res.status(400).json({ error: 'Bad request' });
    });

    app.use((req, res) => {
        res.status(404).json({ error: 'Not Found' });
    });
    
    app.use((req, res) => {
        res.status(500).json({ error: 'Internal Server Error' });
    });

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });