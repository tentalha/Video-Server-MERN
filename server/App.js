const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const checkAuth = require('./middleware/check-auth');

try {
  mongoose.connect('mongodb://localhost:27017/videoOnDemand', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("MongoDB connected!");
} catch (error) {
  console.log("Error");
}

mongoose.Promise = global.Promise;
app.use(cors());
app.use(express.json());

app.use('/api/videos', express.static('media/uploads'));

// Routes
app.use('/api/signIn', require('./routes/signIn'));
app.use('/api/signUp', require('./routes/signUp'));
app.use('/api/upload', checkAuth, require('./routes/upload'));
app.use('/api/videoList', checkAuth, require('./routes/videoList'));

module.exports = app;
