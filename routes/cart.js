const express = require('express');
const Cart = require('../models/cart');
const router = express.Router();

// GET cart for a user
router.get('/', async (req, res) => {
  const { userId } = req.query;
  try {
    if (!userId) return res.status(400).json({ message: 'userId is required' });
    const cart = await Cart.findOne({ userId });
    res.json(cart || { userId, items: [] });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cart' });
  }
});

// POST add/update cart for a user
// POST add/update cart for a user
router.post('/', async (req, res) => {
  const { userId, items } = req.body;

  try {
    if (!userId || !items) {
      return res.status(400).json({ message: 'userId and items are required' });
    }

    // You can use $push with $each to add multiple items
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $push: { items: { $each: items } } }, // appends multiple items to the array
      { new: true, upsert: true }
    );

    res.status(201).json(cart);
  } catch (err) {
    console.error('Error updating cart:', err);
    res.status(500).json({ message: 'Error updating cart' });
  }
});


module.exports = router; 