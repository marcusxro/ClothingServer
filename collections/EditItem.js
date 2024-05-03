const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');

const atlasUri = 'mongodb+srv://danica123:danica123@cluster0.inhohxt.mongodb.net/systemDB';

mongoose.connect(atlasUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB Atlas (EditedItem)");
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
  Status: {
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

const EditedItem = mongoose.model('EditedItem', mySchema);

module.exports = EditedItem;