const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors')
const accDatabase = require('./collections/Account')
const bodyParser = require('body-parser'); // Import body-parse
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(cors())
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const EditedItem = require('./collections/EditItem')
const AlertDB = require('./collections/Alert')

app.get('/', async (req, res) => {
  res.send("connected")
})


const DataDb = require('./collections/Data')


app.post('/GetAcc', async (req, res) => {
  const { Email, Username, Password, Uid, Login, Logout } = req.body;

  try {
    const AccountInfo = new accDatabase({
      Email: Email,
      Username: Username,
      Password: Password,
      Login: Login,
      Logout: Logout,
      Uid: Uid,
    });

    await AccountInfo.save();
    res.status(201).json({ message: 'Activity saved successfully' });
  } catch (error) {
    console.error('Error saving activity:', error);
    res.status(500).json({ error: 'Error saving activity' });
  }
});

app.put('/edit/:item', async (req, res) => {
  const itemId = req.params.item

  const {
    Login,
    Logout,
  } = req.body;

  console.log(itemId)
  console.log(Login)
  try {

    const result = await accDatabase.findOneAndUpdate({ Uid: itemId }, {
      $set: {
        Login: Login,
        Logout: Logout,
      }
    });
    if (!result) {
      return res.status(404).json({ error: "Item not found" });
    } res.status(200).json({ message: 'Updated successfully' });
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ error: 'Error creating report' });
  }
});



app.get('/accInfos', (req, res) => {
  accDatabase.find()
    .then((acc) => {
      res.json(acc)
    }).catch((err) => {
      console.log(err)
    })
})





//data methdd endpoints

app.post('/Post', async (req, res) => {
  const { Brand, Type, Color, Size, Quantity, Username, Uid } = req.body;


  try {
    const AccountInfo = new DataDb({
      Brand: Brand,
      Type: Type,
      Color: Color,
      Size: Size,
      Quantity: Quantity,
      Date: Date.now(),
      Username: Username,
      Uid: Uid,
    });

    await AccountInfo.save();
    res.status(201).json({ message: 'Activity saved successfully' });
  } catch (error) {
    console.error('Error saving activity:', error);
    res.status(500).json({ error: 'Error saving activity' });
  }
});

app.put('/editItem/:item', async (req, res) => {
  const itemId = req.params.item

  const { Brand, Type, Color, Size, Quantity} = req.body;

  try {

    const result = await DataDb.findByIdAndUpdate(itemId, {
      $set: {
        Brand: Brand,
        Type: Type,
        Color: Color,
        Size: Size,
        Quantity: Quantity,
      }
    });
    if (!result) {
      return res.status(404).json({ error: "Item not found" });
    } res.status(200).json({ message: 'Updated successfully' });
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ error: 'Error creating report' });
  }
});



app.get('/getData', (req, res) => {
  DataDb.find()
    .then((acc) => {
      res.json(acc)
    }).catch((err) => {
      console.log(err)
    })
})






//edit item endpoint

app.post('/editItem', async (req, res) => {
  const { Brand, Type, Color, Size, Quantity, Username, Status, Uid } = req.body;


  try {
    const AccountInfo = new EditedItem({
      Brand: Brand,
      Type: Type,
      Color: Color,
      Size: Size,
      Status: Status,
      Quantity: Quantity,
      Date: Date.now(),
      Username: Username,
      Uid: Uid,
    });

    await AccountInfo.save();
    res.status(201).json({ message: 'Activity saved successfully' });
  } catch (error) {
    console.error('Error saving activity:', error);
    res.status(500).json({ error: 'Error saving activity' });
  }
});


app.get('/getEdited', (req, res) => {
  EditedItem.find()
    .then((acc) => {
      res.json(acc)
    }).catch((err) => {
      console.log(err)
    })
})

app.delete("/itemEdit/:id", async (req, res) => {
  const itemId = req.params.id;
  console.log(itemId);

  try {
      const result = await DataDb.deleteOne({ _id: new ObjectId(itemId) });
      if (result.deletedCount === 1) {
          res.send("Document deleted successfully");
      } else {
          res.status(404).send("Document not found");
      }
  } catch (error) {
      console.error("Error deleting document:", error);
      res.status(500).send("Error deleting document");
  }
});











//ALert endpoints

app.post('/Alert', async (req, res) => {
  const { Email, Username, Product, Quantity, OldQuan, Date, Uid, } = req.body;

  try {
    const AccountInfo = new AlertDB({
      Email: Email,
      Product: Product,
      Username: Username,
      Quantity: Quantity,
      OldQuan: OldQuan,
      Date:Date,
      Uid: Uid,
    });

    await AccountInfo.save();
    res.status(201).json({ message: 'Activity saved successfully' });
  } catch (error) {
    console.error('Error saving activity:', error);
    res.status(500).json({ error: 'Error saving activity' });
  }
});

app.get('/getAlerts', (req, res) => {
  AlertDB.find()
    .then((acc) => {
      res.json(acc)
    }).catch((err) => {
      console.log(err)
    })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});