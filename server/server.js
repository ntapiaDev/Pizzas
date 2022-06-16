const express = require('express');
var cors = require('cors');
// const path = require('path');
let db;

const { MongoClient } = require("mongodb");

const uri = 'mongodb+srv://ntapiaDev:dwwm2022@cluster0.tb4bpkf.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    db = client.db('pizza');
    console.log(db);
    // const movies = database.collection('pizza');
  } catch (err) {
    console.log(err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run();

// var mongo = require('mongodb');
// var monk = require('monk');
// var db = monk('127.0.0.1:27017/pizza', function(err, db){
//   if(err){
//      console.error("Db is not connected", err.message);
//   }
// });

var pizzaRouter = require('./routes/pizza');

const app = express();
app.use(cors());

// app.use(express.static(path.join(__dirname, 'build')));

app.use(function (req, res, next) {
  req.db = db;
  next();
})

app.use('/pizza', pizzaRouter);

app.listen(process.env.PORT || 8080);