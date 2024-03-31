const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        mongoose.set('strictQuery', false)
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Database Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error('Connection error:', error.message);
    }
}

module.exports = connectDb


