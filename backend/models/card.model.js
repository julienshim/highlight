const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cardSchema = new Schema({
  book: {type: String},
  deck: {type: Number},
  korean: {type: String, required: true},
  english: {type: String, required: true},
  pronunciation: {type: String, required: true},
  hanja: {type: String},
  onMaster: {type: Boolean, default: false}
}, {
  timestamps: true,
})

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;