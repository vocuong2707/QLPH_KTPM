const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const client = new MongoClient(process.env.MONGO_DB);
const DB = {
    /**
     * Connect database
     * @return {void}
     */
    connectDB: async () => {
        try {
            await client.connect();
            console.log('MongoDB connected');
        } catch (err) {
            console.log('Error:' + err);
        }
    },
    /**
     * Disconnect database
     * @return {void}
     */
    disconnectDB: () => {
        client && client.close();
    },
    /**
     * Return db collection base on collection config
     * @param {object} collectionCof
     * @return {string}
     */
    collection: (collectionCof) => {
        if (client) {
            return client.db(collectionCof.db).collection(collectionCof.collection);
        } else {
            module.exports.connectDB();
            throw Error('Service not available');
        }
    },
};
module.exports = DB;
