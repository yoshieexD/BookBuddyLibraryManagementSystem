require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const borrowRoutes = require('./routes/borrowRoutes');
const returnRoutes = require('./routes/returnRoutes');



app.use('/api', authRoutes);
app.use('/api/book', bookRoutes);
app.use('/api/borrow', borrowRoutes);
app.use('/api/return',returnRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
