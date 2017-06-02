var express = require('express');
var router = express.Router();

var Equipment = require('../model/equipment');

router.post('/save-equipment', function(req, res, next) {
    console.log(req);
    var equipment = new Equipment({
        name: req.body.name,
        equipmentClass: req.body.equipmentClass,
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

module.exports = router;
