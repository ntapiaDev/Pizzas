var express = require('express');
var router = express.Router();

//Hash password
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.use(express.json());

//Registration
router.post('/adduser', function (req, res) {

    var db = req.db;

    var email = req.body.email;
    var password = req.body.password;

    var collection = db.get('user');

    collection.find({ email: email }, {}, function (e, docs) {

        if(docs != '') {
            res.json({
                'code': 409,
                'message': 'This email address is already used.'
            });
            return;
        }

        bcrypt.hash(password, saltRounds, function(err, hashedPassword) {
            collection.insert({
                "email": email,
                "password": hashedPassword,
            }, function (err) {
                if (err) {
                    res.json({
                        'code': 400,
                        'message': 'There was a problem when creating this user.'
                    });
                }
                else {
                    res.json({
                        'code': 200,
                        'message': 'User created.'
                    });
                }
            });
        });
    });
});

//Login
router.post('/login', function (req, res) {

    var db = req.db;

    var email = req.body.email;
    var password = req.body.password;

    var collection = db.get('user');

    collection.find({ email: email }, {}, function (e, docs) {

        if(docs == '') {
            res.json({
                'code': 404,
                'message': 'This user does not exit.'
            });
            return;
        }

        const hashedPassword = docs[0].password
        bcrypt.compare(password, hashedPassword, function(err, result) {
            if(!result) {
                res.json({
                    'code': 403,
                    'message': 'Email or password incorrect.'
                });
            } else {
                res.json({
                    'code': 200,
                    'message': 'User connected.'
                });
            }
        });
    });
});

module.exports = router;
