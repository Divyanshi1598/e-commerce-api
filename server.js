const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth'); //signup and /login logic
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/order');
const cartRoutes = require('./routes/cart');
const paymentRoutes = require('./routes/payment');

dotenv.config();
const MONGO_URI = process.env.MONGODB_URI;

const app = express();

app.use(cors());
app.use(express.json());

// Add CORS headers for static uploads
app.use('/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
}, express.static('uploads'));

// routes 
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/payment', paymentRoutes);


app.use((req, res) => {
  res.status(404).json({ message: 'Route not found', path: req.path, method: req.method });
});

// Connect MongoDB using MONGO_URI from .env
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch(err => console.log(err));


