var express = require('express');
var router = express.Router();

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

module.exports = router;
