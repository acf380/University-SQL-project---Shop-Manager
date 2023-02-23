var express = require('express');
var router = express.Router();
var connection  = require('../public/javascripts/database.js');
let getError = require('../public/javascripts/errorHandler.js')
 
 
router.post('/', function(req, res, next) {
    data = JSON.parse(JSON.stringify(req.body));
    key = Object.keys(data)[0]; 
    console.log(data);

    switch(key)
    {
        case 'produkt':
            var productFeatures = [
                {"MARKA": false},
                {"MODEL": false},
                {"CENA": true},
                {"WAGA": true},
                {"PROCESOR": false},
                {"MOC": true},
                {"PRZEKĄTNA_EKRANU": true},
                {"ROZDZIELCZOŚĆ": false},
                {"KARTA_GRAFICZNA": false},
                {"ILOŚĆ_PAMIĘCI_RAM": true},
                {"KATEGORIE_KATEGORIA_ID": true}
              ];
            
            var chk = false;
            var sqlString = `INSERT INTO PRODUKT(`;
            for (var i=0; i<productFeatures.length; i++) 
            {
                if (data[key][i] === "") continue;
                chk = true;
                sqlString += `${Object.keys(productFeatures[i])[0]},`;
            }
            if (chk == false) 
            {
                res.redirect('/');
                return;
            }
            sqlString = sqlString.substring(0,sqlString.length-1);
            sqlString += `) VALUES(`;
            for (var i=0; i<productFeatures.length-1; i++) 
            {
                if (data[key][i] === "") continue;
                if (productFeatures[i][Object.keys(productFeatures[i])[0]] == true) sqlString += `${data[key][i]},`;
                else sqlString += `'${data[key][i]}',`;
            }
            sqlString += `(SELECT KATEGORIA_ID FROM KATEGORIE WHERE KATEGORIA = '${data[key][productFeatures.length-1]}')`;
            sqlString += `)`;

            connection.query(sqlString, function(err, rows){
              if(err){
                req.flash('message', getError.getNiceError(err.message));
                res.redirect('/products');
              }else{   
                console.log("SUCCESS: MAGAZYN UPDATED!"); 
                res.redirect('/products');
              }
            });
            break; 
        case 'magazyn':
            var sqlString = `INSERT INTO MAGAZYN(ILOŚĆ, PRODUKT_PRODUKT_ID) VALUES(${data[key][1]}, ${data[key][0]})`;
            connection.query(sqlString, function(err, rows){
                if(err){
                  req.flash('message', getError.getNiceError(err.message));
                  res.redirect('/');
                }else{   
                  console.log("SUCCESS: MAGAZYN UPDATED!"); 
                  res.redirect('/');
                }
              });
            break;
        case 'kategoria':
            var sqlString = `INSERT INTO KATEGORIE(KATEGORIA) VALUES('${data[key]}')`;
            connection.query(sqlString, function(err, rows){
                if(err){
                  req.flash('message', getError.getNiceError(err.message));
                  res.redirect('/categories');
                }else{   
                  console.log("SUCCESS: KATEGORIA DODANA!"); 
                  res.redirect('/categories');
                }
              });
            break;
        case 'zamowienie':
            let orderFeatures = [
                {"DATA_ZAMÓWIENIA": false},
                {"STANY_STAN_ID": true},
                {"PRZEWOŹNIK_PRZEWoŹNIK_ID": true},
                {"KLIENT_KLIENT_ID": true}
              ];

            let fElements = [
              {false: false},
              {"STANY": ["STAN_ID", "NAZWA_STANU"]},
              {"PRZEWOŹNIK": ["PRZEWOŹNIK_ID", "NAZWA_PRZEWOŹNIKA"]},
              {false: false}
            ];
            
            var sqlString = `INSERT INTO ZAMÓWIENIA(`;
            for (var i=0; i<orderFeatures.length; i++) 
            {
                if (data[key][i] === "") continue;
                sqlString += `${Object.keys(orderFeatures[i])[0]},`;
            }

            sqlString = sqlString.substring(0,sqlString.length-1);
            sqlString += `) VALUES(`;
            for (var i=0; i<orderFeatures.length; i++) 
            {
                if (data[key][i] === "") continue;
                if (orderFeatures[i][Object.keys(orderFeatures[i])[0]] == true) {
                  if (fElements[i][Object.keys(fElements[i])[0]] == false) sqlString += `${data[key][i]},`;
                  else sqlString += `(SELECT ${fElements[i][Object.keys(fElements[i])[0]][0]} FROM ${Object.keys(fElements[i])[0]} WHERE ${fElements[i][Object.keys(fElements[i])[0]][1]} = '${data[key][i]}'),`;
                }
                else sqlString += `STR_TO_DATE("${data[key][i]}", "%Y-%m-%d"),`;
            }
            sqlString = sqlString.substring(0,sqlString.length-1);
            sqlString += `)`;
            connection.query(sqlString, function(err, rows){
              if(err){
                req.flash('message', getError.getNiceError(err.message));
                res.redirect('/orders');
              }else{   
                console.log("SUCCESS!"); 
                res.redirect('/orders');
              }
            });
            break;
        case 'zwrot':
            var sqlString = `INSERT INTO ZWROTY(ZAMÓWIENIA_ZAMÓWIENIE_ID, PRODUKT_PRODUKT_ID, STANY_STAN_ID) VALUES(
              ${data[key][0]}, 
              (SELECT PRODUKT_PRODUKT_ID FROM ZAWARTOŚĆ_ZAMÓWIEŃ WHERE 
                PRODUKT_PRODUKT_ID = ${data[key][1]} AND
                ZAMÓWIENIA_ZAMÓWIENIE_ID = ${data[key][0]}),
              (SELECT STAN_ID FROM STANY WHERE NAZWA_STANU = '${data[key][2]}'))`;
            connection.query(sqlString, function(err, rows){
                if(err){
                  req.flash('message', getError.getNiceError(err.message));
                  res.redirect('/returns');
                }else{   
                  console.log("SUCCESS!"); 
                  res.redirect('/returns');
                }
              });
            break;
        case 'zawartosc_zamowienia':
            var sqlString = `INSERT INTO ZAWARTOŚĆ_ZAMÓWIEŃ(ZAMÓWIENIA_ZAMÓWIENIE_ID, PRODUKT_PRODUKT_ID, ILOŚĆ) VALUES(
              ${data[key][0]}, 
              ${data[key][1]},
              ${data[key][2]})`;
            connection.query(sqlString, function(err, rows){
                if(err){
                  req.flash('message', getError.getNiceError(err.message));
                  res.redirect('/ordersContents');
                }else{   
                  console.log("SUCCESS!"); 
                  res.redirect('/ordersContents');
                }
              });
            break;
        case 'przewoznik':
            var sqlString = `INSERT INTO PRZEWOŹNIK(NAZWA_PRZEWOŹNIKA) VALUES(
              '${data[key]}')`;
            connection.query(sqlString, function(err, rows){
                if(err){
                  req.flash('message', getError.getNiceError(err.message));
                  res.redirect('/carriers');
                }else{   
                  console.log("SUCCESS!"); 
                  res.redirect('/carriers');
                }
              });
            break;
        case 'stan':
            var sqlString = `INSERT INTO STANY(NAZWA_STANU) VALUES(
              '${data[key]}')`;
            connection.query(sqlString, function(err, rows){
                if(err){
                  req.flash('message', getError.getNiceError(err.message));
                  res.redirect('/states');
                }else{   
                  console.log("SUCCESS!"); 
                  res.redirect('/states');
                }
              });
            break;
        case 'klient':
            var sqlString = `INSERT INTO KLIENT(IMIĘ,NAZWISKO,LOGIN,HASŁO) VALUES(
              '${data[key][0]}','${data[key][1]}','${data[key][2]}','${data[key][3]}')`;
            connection.query(sqlString, function(err, rows){
                if(err){
                  req.flash('message', getError.getNiceError(err.message));
                  res.redirect('/clients');
                }else{   
                  console.log("SUCCESS!"); 
                  res.redirect('/clients');
                }
              });
            break;
        case 'reklamacja':
          var sqlString = `INSERT INTO REKLAMACJE(ZAMÓWIENIA_ZAMÓWIENIE_ID,STANY_STAN_ID) VALUES(
            ${data[key][0]},
            (SELECT STAN_ID FROM STANY WHERE NAZWA_STANU = '${data[key][1]}'))`;
          connection.query(sqlString, function(err, rows){
              if(err){
                req.flash('message', getError.getNiceError(err.message));
                res.redirect('/complaints');
              }else{   
                console.log("SUCCESS!"); 
                res.redirect('/complaints');
              }
            });
          break;
        default:
            req.flash('message', 'WRONG ADD KEY!');
            res.redirect('/categories');
            break;
    }

});

module.exports = router;