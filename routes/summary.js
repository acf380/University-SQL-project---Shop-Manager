var express = require('express');
var router = express.Router();
var connection  = require('../public/javascripts/database.js');
let getError = require('../public/javascripts/errorHandler.js')
 
 
router.post('/', function(req, res, next) {
    data = JSON.parse(JSON.stringify(req.body));
    key = Object.keys(data)[0]; 
    switch(key)
    {
        case 'raport':
            let call = `CALL WARTOŚĆ_ZAMÓWIEŃ('${data[key]}');`;
            connection.query(call, function(err, rows){
                if(err){
                    req.flash('message', getError.getNiceError(err.message));
                    res.redirect('/orders'); 
                } else {
                    req.flash('summary', rows);
                    res.redirect('/orders');
                }
            });

            break
        default:
            res.redirect('/orders');
            break;
    }

});

module.exports = router;