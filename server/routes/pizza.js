var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {

    var db = req.db;

    var collection = db.get('pizza');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

router.get('/:id', function (req, res, next) {

    var db = req.db;
    let pizzaToFind = req.params.id;

    var collection = db.get('pizza');
    collection.findOne({ "_id": pizzaToFind }, {}, function (e, docs) {
        res.json(docs);
    });
});

module.exports = router;
