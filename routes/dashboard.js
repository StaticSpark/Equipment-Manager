var express = require('express');
var router = express.Router();

var Equipment = require('../model/equipment');
/*
router.post('/save-equipment', function(req, res, next) {
      console.log(req);
      var equipment = new Equipment({
            storeName: "Clonmel",
            storeID: '038',
            equipment: req.body
      });

      equipment.save(function(err, result){
        if(err){
            return res.status(500).json({
              title: 'An error occurred, couldnt save',
              error: err
            });
        }
        res.status(201).json({
            message: 'Equipment saved!',
            obj: result
        });
    });
});
*/
module.exports = router;
