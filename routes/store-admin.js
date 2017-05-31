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

module.exports = router;
