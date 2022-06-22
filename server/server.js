const express = require('express');
const cors = require('cors');
// const path = require('path');

let mongo = require('mongodb');
let monk = require('monk');
let db = monk('127.0.0.1:27017/pizza', function(err, db){
  if(err){
     console.error("Db is not connected", err.message);
  }
});

let userRouter = require('./routes/user');
let pizzaRouter = require('./routes/pizza');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// app.use(express.static(path.join(__dirname, 'build')));

app.use(function (req, res, next) {
  req.db = db;
  next();
})

app.use('/user', userRouter);
app.use('/pizza', pizzaRouter);

app.listen(process.env.PORT || 8080);