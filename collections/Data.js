const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');

const atlasUri = 'mongodb+srv://marcussalopaso1:zedmain1525@cluster0.m8fd2iw.mongodb.net/Clothing';

mongoose.connect(atlasUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB Atlas (Data)");
  })
  .catch((e) => {
    console.error("Error connecting to MongoDB Atlas:", e);
  });

const mySchema = new mongoose.Schema({
  Brand: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    required: true,
  },
  Color: {
    type: String,
    required: true,
  },
  Size: {
    type: String,
    required: true,
  },
  Date: {
    type: String,
    required: true,
  },
  Quantity: {
    type: String,
    required: true,
  },
   Username: {
    type: String,
    required: true,
  },
  Uid: {
    type: String,
    required: true,
  },
});

const DataDb = mongoose.model('Data', mySchema);

module.exports = DataDb;