const router = require('express').Router();
const Card = require('../models/card.model');

router.route('/').get((req, res) => {
  Card.find()
    .then(cards => res.json(cards))
    .catch(err => res.status(400).json(`Error: ${err}`));
})

router.route('/add').post((req, res) => {
  const {book, deck, korean, english, pronunciation, hanja, onMaster} = req.body;

  const newCard = new Card({  
    book,
    deck: Number(deck),
    korean,
    english,
    pronunciation,
    hanja,
    onMaster: Boolean(deck),
  });

  newCard.save()
    .then(card => res.status(201).json(card))
    .catch(err => res.status(400).json(`Error: ${err}`));
})

module.exports = router;