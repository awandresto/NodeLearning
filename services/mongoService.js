const { MongoClient, ObjectId } = require('mongodb');

const MONGO_URL = 'mongodb+srv://awandresto:kvqHzhryAkj95gkI@nodelearningcluster0.5nsha5e.mongodb.net/';
const DB_NAME = 'NodeLearningCluster0';
const COLLECTION_NAME = 'users';

const client = new MongoClient(MONGO_URL);
let collection;

async function connectMongoDB() {
    await client.connect();
    const db = client.db(DB_NAME);
    collection = db.collection(COLLECTION_NAME);
}

async function disconnectMongoDB() {
    if (client) {
        await client.close();
    }
}

// Create
async function createItem(name) {
    try {
        const result = await collection.insertOne({ name });
        if (result) {
            const insertedId = result.insertedId;
            const createdItem = await collection.findOne({ _id: insertedId });
            return createdItem;
        } else {
            throw new Error('Failed to insert item');
        }
    } catch (error) {
        console.error('Error in createItem', error.message);
        return { error: error.message };
    }
}

// Update
async function updateItem(id, name) {
    try {
        if (!ObjectId.isValid(id)) {
            throw new Error('Invalid ObjectId');
        }
        const result = await collection.updateOne(
            { _id: new ObjectId(id) }, 
            { $set: { name } }
        );
        return result;
    } catch (error) {
        console.error('Error in updateItem', error.message);
        return { error: error.message };
    }
}

// Delete
async function deleteItem(id) {
    try {
        if (!ObjectId.isValid(id)) {
            throw new Error('Invalid ObjectId');
        }
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        return result;
    } catch (error) {
        console.error('Error in deleteItem', error.message);
        return { error: error.message };
    }
}

// Get all the items
async function getItems() {
    console.log('Getting all items');
    const items = await collection.find({}).toArray();
    return items;
}

module.exports = {
    connectMongoDB,
    disconnectMongoDB,
    createItem,
    getItems,
    updateItem,
    deleteItem
}