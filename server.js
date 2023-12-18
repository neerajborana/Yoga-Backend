require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;
app.use(cors());

const db = "mongodb+srv://vishnukumarit24:VaymV8r2k6wSL6eA@cluster0.q6pihp1.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

const formDataSchema = new mongoose.Schema({
  email: String,
  password: String,
  rememberMe: Boolean,
  batch: String,
});

const FormData = mongoose.model('FormData', formDataSchema);

app.post('/api/formdata', async (req, res) => {
  const { email, password, rememberMe, batch } = req.body;

  const formData = new FormData({
    email,
    password,
    rememberMe,
    batch,
  });

  try {
    await formData.save();
    console.log('Data saved to MongoDB');
    res.status(200).send('Data saved to MongoDB');
  } catch (err) {
    console.error('Error saving data to MongoDB:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/displaydata', async (req, res) => {
  try {
    const allFormData = await FormData.find();
    res.json(allFormData);
  } catch (err) {
    console.error('Error fetching data from MongoDB:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
