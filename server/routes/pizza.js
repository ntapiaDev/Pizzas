var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const SECRET = 'mykey';

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

router.post('/order', function (req, res, next) {

    let order = req.body.order;
    let price = req.body.price;

    //Vérif de l'user
    jwt.verify(req.body.userToken, SECRET, (err, decodedToken) => {
        if (err) {
            res.status(401).json({ message: 'Error. Bad token' })
        } else {
            id = decodedToken.id;
            email = decodedToken.email;

            var db = req.db;
            var collection = db.get('user');

            collection.find({ email: email, _id: id }, {}, function (e, docs) {
                if (docs != '') {
                    console.log(docs);
                    let user = [docs[0].email, docs[0]._id];

                    //Création du nouvel order
                    orderCollection = db.get('order');
                    orderCollection.insert({
                        "order": order,
                        "price": price,
                        "user": user
                    }, function (err) {
                        if (err) {
                            res.json({
                                'code': 400,
                                'message': 'There was a problem when creating this order.'
                            });
                        }
                        else {
                            res.json({
                                'code': 200,
                                'message': 'Order created.'
                            });
                        }
                    });
                }
            });
        }
    })
    
});

module.exports = router;
