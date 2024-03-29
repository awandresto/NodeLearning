const express = require('express');
const databaseService = require('./services/databaseService');

const app = express();
const port = process.env.PORT || 3000; // http://localhost:3000

app.use(express.json());

// CRUD
// Create
app.post('/create_item', function (req, res) {
    const { name } = req.body;
    console.log('CREATE item', name);
    databaseService.createItem(name, function (err, result) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
});

// Get all
app.get('/items', function (req, res) {
    console.log('GET items');
    databaseService.getItems(function (err, result) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
});

// Get by ID
app.get('/item/:id', function (req, res) {
    const { id } = req.params;
    console.log('GET item by id');
    databaseService.getItemById(id, function (err, result) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
});

// Update
app.put('/items/:id', function (req, res) {
    const { id } = req.params;
    const { name } = req.body;
    console.log('UPDATE item', id, name);
    databaseService.updateItem(id, name, function (err, result) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
});

// Delete
app.delete('/items/:id', function (req, res) {
    const { id } = req.params;
    console.log('DELETE item', id);
    databaseService.deleteItem(id, function (err, result) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
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

module.exports = app;