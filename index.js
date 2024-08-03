const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb+srv://kamleshksks456:LtnGz4tLIcrsYj0j@cluster0.shgns95.mongodb.net/Trai-DATA');

const mySchema = new mongoose.Schema({
  mobile: String,
  email: String,
  password: String
});
const MyModel = mongoose.model('MyModel', mySchema);


const app = express();
app.use(express.json());
app.use(cors());

app.post('/user/login', async (req, res) => {
    const body = await req.body;
    const myDocument = new MyModel(body);
    try {
      const result = await myDocument.save();
      console.log(`Document saved: ${result}`);
      res.send({ message: 'User created successfully' });
    } catch (error) {
      console.error(`Error saving document: ${error}`);
      res.status(500).send({ message: 'Error creating user' });
    }
  });



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});