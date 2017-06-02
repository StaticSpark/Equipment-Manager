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

router.patch('/update-equipment/:id', function(req,res,next){
    Store.findById(req.params.id, function(err, store){
        if(err){
            return res.status(500).json({
                title: 'Something went wrong',
                error: err 
            });
        }
        if(!store){
            return res.status(500).json({
                title: 'No such store found!',
                error: {message: 'Store not found!'}
            });
        }
        console.log("The length of equipment is: " + req.body.equipment.length);
        store.equipment = [];
        for(let i = 0; i < req.body.equipment.length; i++){
            store.equipment.push(req.body.equipment[i]);
            console.log("pushed");
        }
        //store.equipment = req.body.equipment;
        store.save(function(err, result){
                if(err){
                    return res.status(500).json({
                    title: 'An error occurred, couldnt save',
                    error: err
                    });
                }              
                res.status(200).json({
                    message: 'Equipment updated!',
                    obj: result
                });
            });
    });
});

module.exports = router;
