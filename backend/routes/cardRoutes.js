const express = require('express');
const router = express.Router();
const Card = require('../models/Card');

// Get all cards
router.get('/cards', async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cards' });
  }
});

// Create a new card
router.post('/cards', async (req, res) => {
  try {
    const { title, description } = req.body;
    const newCard = new Card({ title, description });
    await newCard.save();
    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ message: 'Error creating card' });
  }
});

// Get a specific card by title
router.get('/cards/:title', async (req, res) => {
  try {
    const card = await Card.findOne({ title: req.params.title });
    if (card) {
      res.json(card);
    } else {
      res.status(404).json({ message: 'Card not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching card' });
  }
});

module.exports = router;
