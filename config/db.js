const mongoose = require('mongoose'),
    config = require('config'),
    db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
        console.log('MongoDB connected');
    } catch (e) {
        console.log(e.message);
        // Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;