var express = require('express');
var router = express.Router();
var connection  = require('../public/javascripts/database.js');
let getError = require('../public/javascripts/errorHandler.js')
 
 
router.post('/', function(req, res, next) {
    data = JSON.parse(JSON.stringify(req.body));
    key = Object.keys(data)[0]; 

    switch(key)
    {
        case 'magazyn':
            var sqlString = `DELETE FROM MAGAZYN WHERE PRODUKT_PRODUKT_ID = ${data[key]}`;
            connection.query(sqlString, function(err, rows){
                if(err){
                  req.flash('message', getError.getNiceError(err.message));
                  res.redirect('/');
                }else{   
                  console.log("SUCCESS"); 
                  res.redirect('/');
                }
              });
            break;
        case 'produkt':
            var sqlString = `DELETE FROM PRODUKT WHERE PRODUKT_ID = ${data[key]}`;
            connection.query(sqlString, function(err, rows){
                if(err){
                    req.flash('message', getError.getNiceError(err.message));
                    res.redirect('/products');
                }else{   
                    console.log("SUCCESS"); 
                    res.redirect('/products');
                }
                });
            break;
        case 'kategoria':
            var sqlString = `DELETE FROM KATEGORIE WHERE KATEGORIA_ID = ${data[key]}`;
            connection.query(sqlString, function(err, rows){
                if(err){
                    req.flash('message', getError.getNiceError(err.message));
                    res.redirect('/categories');
                }else{   
                    console.log("SUCCESS"); 
                    res.redirect('/categories');
                }
                });
            break;
        case 'zamowienie':
            var sqlString = `DELETE FROM ZAMÓWIENIA WHERE ZAMÓWIENIE_ID = ${data[key]}`;
            connection.query(sqlString, function(err, rows){
                if(err){
                    req.flash('message', getError.getNiceError(err.message));
                    res.redirect('/orders');
                }else{   
                    console.log("SUCCESS"); 
                    res.redirect('/orders');
                }
                });
            break;
        case 'zwrot':
            var sqlString = `DELETE FROM ZWROTY WHERE ZWROTY_ID = ${data[key]}`;
            connection.query(sqlString, function(err, rows){
                if(err){
                    req.flash('message', getError.getNiceError(err.message));
                    res.redirect('/returns');
                }else{   
                    console.log("SUCCESS"); 
                    res.redirect('/returns');
                }
                });
            break;
        case 'zawartosc_zamowienia':
            var sqlString = `DELETE FROM ZAWARTOŚĆ_ZAMÓWIEŃ WHERE ZAWARTOŚĆ_ZAMÓWIEŃ_ID = ${data[key]}`;
            connection.query(sqlString, function(err, rows){
                if(err){
                    req.flash('message', getError.getNiceError(err.message));
                    res.redirect('/ordersContents');
                }else{   
                    console.log("SUCCESS"); 
                    res.redirect('/ordersContents');
                }
                });
            break;
        case 'przewoznik':
            var sqlString = `DELETE FROM PRZEWOŹNIK WHERE PRZEWOŹNIK_ID = ${data[key]}`;
            connection.query(sqlString, function(err, rows){
                if(err){
                    req.flash('message', getError.getNiceError(err.message));
                    res.redirect('/carriers');
                }else{   
                    console.log("SUCCESS"); 
                    res.redirect('/carriers');
                }
                });
            break;
        case 'stan':
            var sqlString = `DELETE FROM STANY WHERE STAN_ID = ${data[key]}`;
            connection.query(sqlString, function(err, rows){
                if(err){
                    req.flash('message', getError.getNiceError(err.message));
                    res.redirect('/states');
                }else{   
                    console.log("SUCCESS"); 
                    res.redirect('/states');
                }
                });
            break;
        case 'klient':
            var sqlString = `DELETE FROM KLIENT WHERE KLIENT_ID = ${data[key]}`;
            connection.query(sqlString, function(err, rows){
                if(err){
                    req.flash('message', getError.getNiceError(err.message));
                    res.redirect('/clients');
                }else{   
                    console.log("SUCCESS"); 
                    res.redirect('/clients');
                }
                });
            break;
        case 'reklamacja':
            var sqlString = `DELETE FROM REKLAMACJE WHERE REKLAMACJE_ID = ${data[key]}`;
            connection.query(sqlString, function(err, rows){
                if(err){
                    req.flash('message', getError.getNiceError(err.message));
                    res.redirect('/complaints');
                }else{   
                    console.log("SUCCESS"); 
                    res.redirect('/complaints');
                }
                });
            break;
        default:
            req.flash('message', 'WRONG DEL KEY!');
            res.redirect('/');
            break;
    }

});

module.exports = router;