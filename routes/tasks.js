var express = require('express');
var router = express.Router();

const task = require('../controllers/task');

router.get('/', function(req, res, next) {
    task.getAllTask().then((data)=> {
        res.status(200).send(data);
    },(error)=> {
        res.status(400).send(error);
    }).catch((error)=> {
        res.status(500).send(error);
    });
});

router.get('/:id', function(req, res, next) {
    task.getTaskById(req.params.id).then((data)=> {
        if(!data) res.send(404);
        res.status(200).send(data);
    },(error)=> {
        res.status(400).send(error);
    }).catch((error)=> {
        res.status(500).send(error);
    });
});

router.put('/:id', function(req, res, next) {
    //there will be request to DB
    task.getTaskById(req.params.id).then((data)=> {
        if(!data) res.send(404);
        res.status(200).send(data);
    },(error)=> {
        res.status(400).send(error);
    }).catch((error)=> {
        res.status(500).send(error);
    });
});

module.exports = router;