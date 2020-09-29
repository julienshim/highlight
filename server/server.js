const express = require("express");
const cors = require("cors");
const keys = require("./config/keys");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// routes
const cardsRouter = require("./routes/cards")
app.use('/cards', cardsRouter)

app.listen(PORT, () => {
  console.log(`App is now listening for request on http://localhost:${PORT}`);
});
