const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');

const atlasUri = 'mongodb+srv://danica123:danica123@cluster0.inhohxt.mongodb.net/systemDB';

mongoose.connect(atlasUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB Atlas (acc)");
  })
  .catch((e) => {
    console.error("Error connecting to MongoDB Atlas:", e);
  });

const mySchema = new mongoose.Schema({
  Email: {
    type: String,
    required: true,
  },
  Username: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Login: {
    type: String,
  },
  Logout: {
    type: String,
  },
  Uid: {
    type: String,
    required: true,
  },
});

const ACCcollection = mongoose.model('Account', mySchema);

module.exports = ACCcollection;