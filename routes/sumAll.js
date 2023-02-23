var express = require('express');
var router = express.Router();
var connection  = require('../public/javascripts/database.js');
let getError = require('../public/javascripts/errorHandler.js')
 
 
router.post('/', function(req, res, next) {
    var call = `CALL WARTOŚĆ_MAGAZYNU(@MAGAZYN)`;
    connection.query(call, function(err, rows){
        if(err){
            req.flash('message', getError.getNiceError(err.message));
            res.redirect('/'); 
        } else {
            call = `SELECT @MAGAZYN AS MAGAZYN`
            connection.query(call, function(err, rows){
                if(err){
                    req.flash('message', getError.getNiceError(err.message));
                    res.redirect('/'); 
                } else {
                    req.flash('sumAll', rows);
                    res.redirect('/');
                }
            });
        }
    });

});

module.exports = router;