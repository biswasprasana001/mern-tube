// backend\server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/users', require('./routes/userRoutes'));

mongoose.connect('mongodb://localhost:27017/video-sharing-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/videos', require('./routes/videoRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 