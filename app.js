const express = require('express'),
    connectDB = require('./config/db'),
    app = express(),
    path = require('path');

const port = process.env.PORT || 5000;

// Connect DB
connectDB()

// Init middleware
app.use(express.json({ extended: false })); // Body parser for req.body

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    // Serve index page
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Server started on ${port}`))


