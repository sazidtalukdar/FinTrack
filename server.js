const express = require('express');
const mongoose = require('mongoose');
const Entry = require('./entry');
const path = require('path');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());   


const url = 'mongodb+srv://smt:sajid3024@profit-loss.xnd0xat.mongodb.net/profit-loss?retryWrites=true&w=majority';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(" Connected to MongoDB"))
.catch(err => console.error(" MongoDB connection failed:", err));


app.get('/api/entries', async (req, res) => {
  try {
    const entries = await Entry.find().sort({ createdAt: 1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch entries' });
  }
});

app.post('/api/entries', async (req, res) => {
  try {
    const { date, deposit, profit, loss } = req.body;
    const newEntry = new Entry({ date, deposit, profit, loss });
    await newEntry.save();
    res.status(201).json({ message: "Entry saved" });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save entry' });
  }
});

app.delete('/api/entries', async (req, res) => {
  try {
    await Entry.deleteMany({});
    res.json({ message: "All entries deleted" });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete entries' });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
