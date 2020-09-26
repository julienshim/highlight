const router = require("express").Router();
const Card = require("../models/card.model");

router.route("/").get((req, res) => {
  Card.find()
    .then((cards) => res.json(cards))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route("/add").post((req, res) => {
  const {
    book,
    deck,
    korean,
    english,
    pronunciation,
    hanja,
    onMaster,
  } = req.body;

  const newCard = new Card({
    book,
    deck: Number(deck),
    korean,
    english,
    pronunciation,
    hanja,
    onMaster: Boolean(onMaster),
  });

  newCard
    .save()
    .then(() => res.status(201).json("Card created."))
    .catch((err) => res.status(400).json(err));
});

router.route("/:id").get((req, res) => {
  Card.findById(req.params.id)
    .then((card) => res.status(200).json(card))
    .catch((err) => res.status(400).json(err));
});

router.route("/:id").delete((req, res) => {
  Card.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json("Card deleted"))
    .catch((err) => res.status(400).json(err));
});

router.route("/update/:id").post((req, res) => {
  const {
    book,
    deck,
    korean,
    english,
    pronunciation,
    hanja,
    onMaster,
  } = req.body;
  Card.findById(req.params.id)
    .then((card) => {
      card.book = book;
      card.deck = Number(deck);
      card.korean = korean;
      card.english = english;
      card.pronunciation = pronunciation;
      card.hanja = hanja;
      card.onMaster = Boolean(onMaster);

      card
        .save()
        .then(() => res.status(200).json("Card updated."))
        .catch((err) => res.status(400).json(err));
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
11;
