

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://bashakhadar332:khadar@cluster0.mxrva.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'); 
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
};
connectDB();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  mobile: String,
});

const Person = mongoose.model('Person', personSchema);

// GET /person
app.get('/person', async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.get('/', (req, res) => {

    res.send("hello server is running");

});

// POST /person
app.post('/person', async (req, res) => {
  try {
    const person = new Person(req.body);
    await person.save();
    res.json(person);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT /person/:id
app.put('/person/:id', async (req, res) => {
  try {
    const person = await Person.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json(person);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE /person/:id
app.delete('/person/:id', async (req, res) => {
  try {
    const person = await Person.findByIdAndDelete(req.params.id);
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json({ message: 'Person deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

