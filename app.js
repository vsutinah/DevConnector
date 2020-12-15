const express = require('express'),
    connectDB = require('./config/db')
    app = express();

const port = process.env.PORT || 3000

// Connect DB
connectDB()

// Init middleware
app.use(express.json({ extended: false })); // Body parser for req.body

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));

app.get('/', (req, res) => {
    res.send('API RUNNING');
})

app.listen(port, () => console.log(`Server started on ${port}`))


