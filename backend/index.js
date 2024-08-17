const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cardRoutes = require('./routes/cardRoutes');

const app = express();
const PORT = 3000; 
const MONGO_URI = 'mongodb://localhost:27017/helpcenter'; 

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

// Use routes
app.use('/api', cardRoutes);

// Basic route to check if the server is running
app.get('/ping', (req, res) => {
  res.send('Server is up and running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on Port`,PORT);
});
