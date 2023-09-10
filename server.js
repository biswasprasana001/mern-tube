// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const videoRoutes = require('./backend/routes/videoRoutes');

const app = express();
app.use(cors());

mongoose.connect('mongodb+srv://biswasprasana004:8UCNznXjFB36fIZY@cluster0.huekuwu.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("Connected to MongoDB")).catch((error) => console.error("Error connecting to MongoDB:", error));;

app.use(express.json());
app.use('/videos', videoRoutes);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});