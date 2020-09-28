const pool = require("../config/keys");

const router = require("express").Router();

router.post("/add", async (req, res) => {
  try {
    const {book, deck, korean, english, pronunciation, hanja, onMaster} = req.body;
    const newCard = await pool.query("INSERT INTO cards (book, deck, korean, english, pronunciation, hanja, onMaster) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *", 
      [book, deck, korean, english, pronunciation, hanja, onMaster])
    res.send(newCard.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

router.get("/", async(req, res) => {
  try {
    const allCards = await pool.query("SELECT * FROM cards");
    res.json(allCards.rows)
  } catch (err) {
    console.error(err.message);
  }
})

module.exports = router;
