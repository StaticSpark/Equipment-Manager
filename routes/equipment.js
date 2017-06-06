var express = require('express');
var router = express.Router();

var Equipment = require('../model/equipment');

router.post('/save-equipment', function(req, res, next) {
    console.log(req);
    var equipment = new Equipment({
        name: req.body.name,
        color: req.body.color,
        width: req.body.width,
        length: req.body.length
    });
    equipment.save(function(err, result){
        if(err){
            return res.status(500).json({
                title: 'An error occurred, couldnt save, check the format of the response',
                error: err
            });
        }
        res.status(201).json({
            message: 'New equipment type created and saved!',
            obj: result
        });
    });
});

router.get('/get-equipment', function(req, res, next) {
    Equipment.find({}, function (err, docs) {
        if(err){
            return res.status(500).json({
                title: 'Something went wrong',
                error: err 
            });
        }
        if(!docs){
            return res.status(500).json({
                title: 'No equipment found!',
                error: {message: 'Equipment not found!'}
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: docs
        });
    })
});
module.exports = router;
