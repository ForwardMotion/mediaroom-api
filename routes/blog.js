var express = require('express');
var router = express.Router();

var nano = require('nano')('http://localhost:5984');

router.get('/list', function(req, res, next) {
    
    var results = {
        'status': 200,
        'data': [
            {
                'id': 'abcdef1',
                'title': 'Test 1 2 3..',
                'summary': 'Insert lorem ipsum here..',
                'text_ref': 'hashabcdef1',
            }
        ],
    };
    res.json(results);
});

router.get('/:id', function(req, res, next) {
    res.send('Hello world!');
});

router.get('/setup', function(req, res, next) {
    nano.db.destroy('mr_blog').then((response) => {
        return nano.db.create('mr_blog');
    }).then((response) => {
        const mr_blog = nano.db.use('mr_blog');
    });
});

module.exports = router;
