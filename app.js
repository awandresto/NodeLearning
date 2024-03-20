const express = require('express');

const app = express();
const port = 3000; // http://localhost:3000

app.use(express.json());

// CRUD
// Create
app.post('/create_item', (req, res) => {
    const { name } = req.body;
    console.log('CREATE item', name);
});

// Read
app.get('/read_items', (req, res) => {
    console.log('GET items');
});

// Update
app.put('/item/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    console.log('UPDATE item', id, name);
});

// Delete
app.delete('/item/:id', (req, res) => {
    const { id } = req.params;
    console.log('DELETE item', id);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;