var express = require('express');
var router = express.Router();

const users = require('./users.model');


router.get('/', function(req, res, next) {
    res.json(req.session);
});

router.get('/login', function(req, res, next) {
    // Can't use async/await when trying to get header information.
    // More importantly the set-cookie attribute.
    req.db.request({
        db: '_session',
        method: 'post',
        form: {username: 'test', password: 'test'},
    }, function(err, body, headers) {
        if (err) {
            console.log(err);
            res.json({'status': 403});
            return;
        }
        console.log(body, headers);
        res.cookie(headers['set-cookie']);
        res.json({'status': 200});
    });
});

router.get('/register', function(req, res, next) {
    const users_db = users(req.db);
    var results = users_db.create('test', 'test');
    res.json(results);
});

router.get('/get/:user_id', async function(req, res, next) {
    const users_db = users(req.db);
    var results = await users_db.get(req.params['user_id']);
    res.json(results);
});

module.exports = router;
