const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  date: { type: String, required: true },
  deposit: { type: Number, default: 0 },
  profit: { type: Number, default: 0 },
  loss: { type: Number, default: 0 },
}, {
  timestamps: true
});

module.exports = mongoose.model('Entry', entrySchema);
