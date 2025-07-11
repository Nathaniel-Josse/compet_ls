require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const feedbackRoutes = require('./routes/feedback');
const statRoutes = require('./routes/stats');
const postRoutes = require('./routes/post');

const cron = require('node-cron');
const axios = require('axios');

const postModel = require('./models/Post'); // Make sure this path is correct

const app = express();
const port = 5000;
app.use(cors());

// Middleware to parse JSON
app.use(express.json());
// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/pages');

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/stats', statRoutes);
app.use('/api/posts', postRoutes);

app.get('/post-page', async (req, res) => {
    try {
        const posts = await postModel.find({});
        res.render('PostPage', { posts, frontend_link: process.env.PUBLIC_FRONTEND_PATH });
    } catch (err) {
        res.status(500).send('Error loading posts');
    }
});

app.get('/signup-page', (req, res) => {
    try {
        res.render('SignUpPage');
    } catch (err) {
        res.status(500).send('Error loading signup page');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on ${process.env.PUBLIC_BACKEND_PATH}`);
});

cron.schedule('0 * * * *', async () => {
    try {
        console.log('Cron job: mise à jour des statistiques...');
        await axios.put(`${process.env.PUBLIC_BACKEND_PATH}/api/stats/updateall`);
        console.log('Mise à jour terminée.');
    } catch (error) {
        console.error('Erreur lors de la mise à jour automatique :', error.message);
    }
});