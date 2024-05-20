const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.post('/submit', async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email
  });

  try {
    await newUser.save(); // Using async/await instead of callback
    res.send('Data saved to database');
  } catch (err) {
    console.error('Error saving to database:', err);
    res.status(500).send('Error saving to database');
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({}); // Using async/await instead of callback
    res.send(users);
  } catch (err) {
    console.error('Error retrieving data from database:', err);
    res.status(500).send('Error retrieving data from database');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
