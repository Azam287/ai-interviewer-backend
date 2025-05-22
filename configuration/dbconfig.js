// const { MongoClient } = require('mongodb');

// const db = {};

// let client;
// let dbInstance;


const mongoose = require('mongoose');

const connectToMongo = async () => {
    await mongoose.connect(process.env.DB_URL, {
      dbName: process.env.DB_DATABASE,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 20,
    });
};

module.exports = {connectToMongo};

// const connectToMongo = async () => {
//     if (!client) {
//         const uri = process.env.DB_URL;
//         client = new MongoClient(uri, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             maxPoolSize: 20,
//         });

//         await client.connect();
//         dbInstance = client.db(process.env.DB_DATABASE);
//     }
//     return dbInstance;
// };

// // Run queries (e.g. find, findOne)
// db.query = async (collectionName, operation, ...args) => {
//     const database = await connectToMongo();
//     const collection = database.collection(collectionName);

//     switch (operation) {
//         case 'find':
//             return await collection.find(...args).toArray();
//         case 'findOne':
//             return await collection.findOne(...args);
//         case 'insertOne':
//             return await collection.insertOne(...args);
//         case 'updateOne':
//             return await collection.updateOne(...args);
//         case 'deleteOne':
//             return await collection.deleteOne(...args);
//         case 'insertMany':
//             return await collection.insertMany(...args);
//         case 'updateMany':
//             return await collection.updateMany(...args);
//         case 'deleteMany':
//             return await collection.deleteMany(...args);
//         case 'aggregate':
//             return await collection.aggregate(...args).toArray();
//         default:
//             throw new Error(`Unsupported query operation: ${operation}`);
//     }
// };

// db.aggregateRaw = async (collectionName, pipeline = []) => {
//     const db = await connectToMongo();
//     const collection = db.collection(collectionName);
//     return await collection.aggregate(pipeline).toArray();
// };

// db.getDb = async () => {
//     return await connectToMongo();
// };

// module.exports = db;