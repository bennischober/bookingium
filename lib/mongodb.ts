import mongoose, { MongooseError } from 'mongoose';

const mongoUrl = process.env.MONGODB_URI as string;
const mongoOptions: mongoose.ConnectOptions = {
    dbName: process.env.MONGODB_DB as string,
};

// caching connection state
const connection: { isConnected: mongoose.ConnectionStates } = { isConnected: mongoose.ConnectionStates.disconnected };

export async function connect() {
    if(!process.env.MONGODB_URI || !process.env.MONGODB_DB) {
        throw new Error('Please add your Mongo _URI and _DB data to .env.local')
    }

    if (connection.isConnected === mongoose.ConnectionStates.connected) {
        return;
    }

    try {
        const db = await mongoose.connect(mongoUrl, mongoOptions);
        connection.isConnected = db.connections[0].readyState;
    } catch (error) {
        // this might need a rework!
        throw new MongooseError(error as string);
    }
}
