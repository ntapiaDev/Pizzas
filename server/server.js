const express = require('express');
var cors = require('cors');
// const path = require('path');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('127.0.0.1:27017/pizza', function(err, db){
  if(err){
     console.error("Db is not connected", err.message);
  }
});

var pizzaRouter = require('./routes/pizza');

const app = express();
app.use(cors());

// app.use(express.static(path.join(__dirname, 'build')));

app.use(function(req, res, next) {
    req.db = db;
    next();
  })
  
app.use('/pizza', pizzaRouter);

app.listen(process.env.PORT || 8080);