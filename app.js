const express = require('express');
const bodyParser = require('body-parser');
const mongoService = require('./services/mongoService');

const app = express();
const port = process.env.PORT || 3000; // http://localhost:3000

app.use(bodyParser.json());

// Connect to MongoDB
mongoService.connectMongoDB().then(() => {
    console.log('Connected to MongoDB');

    // CRUD Operations
    // Create
    app.post('/create_item', async (req, res) => {
        const { name } = req.body;
        try {
            const mewItem = await mongoService.createItem(name);
            console.log('CREATE item', mewItem);
            res.json(mewItem);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Get all
    app.get('/items', async (req, res) => {
        try {
            const items = await mongoService.getItems();
            console.log('GET items', items);
            res.json(items);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Update
    app.put('/items/:id', async (req, res) => {
        const { id } = req.params;
        const { name } = req.body;
        try {
            const result = await mongoService.updateItem(id, name);
            console.log('UPDATE item', result);
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Delete
    app.delete('/items/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const result = await mongoService.deleteItem(id);
            console.log('DELETE item', result);
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.use(function (req, res, next) {
        res.status(404).json({ error: 'Not Found' });
    });
    
    app.use(function (req, res, next) {
        res.status(500).json({ error: 'Internal Server Error' });
    });

    app.listen(port, function () {
        console.log(`Server is running on http://localhost:${port}`);
    });

}).catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
});
