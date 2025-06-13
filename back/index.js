require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const feedbackRoutes = require('./routes/feedback');
const statRoutes = require('./routes/stats'); // Uncomment if you have a stats route
const {router: subRoutes} = require('./routes/subscribe');

const app = express();
const port = 5000;
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/stats', statRoutes); // Uncomment if you have a stats route
app.use('/api', subRoutes);
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});