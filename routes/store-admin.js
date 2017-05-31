var express = require('express');
var router = express.Router();

var Store = require('../model/store');

router.post('/save-store', function(req, res, next) {
    console.log(req);
    var store = new Store({
        storeName: req.body.storeName,
        storeCode: req.body.storeCode,
        equipment: req.body.equipment
    });
    store.save(function(err, result){
        if(err){
            return res.status(500).json({
                title: 'An error occurred, couldnt save, check the format of the response',
                error: err
            });
        }
        res.status(201).json({
            message: 'New store saved!',
            obj: result
        });
    });
});

router.get('/get-stores', function(req, res, next) {
    Store.find({}, function (err, docs) {
        if(err){
            return res.status(500).json({
                title: 'Something went wrong',
                error: err 
            });
        }
        if(!docs){
            return res.status(500).json({
                title: 'No stores found!',
                error: {message: 'Stores not found!'}
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: docs
        });
    })
});

module.exports = router;
