var express = require('express');
var router = express.Router();
var connection  = require('../public/javascripts/database.js');
let getError = require('../public/javascripts/errorHandler.js')

router.post('/', function(req, res, next){
  data = JSON.parse(JSON.stringify(req.body))['json'];
  data = JSON.parse(data);
  key = Object.keys(data)[0];

  console.log(data);

  switch(key)
  {
    case 'magazyn':
      var sqlString = `UPDATE MAGAZYN SET ILOŚĆ = ${data[key][1]["val"]} WHERE PRODUKT_PRODUKT_ID = ${data[key][0]["val"]}`;
      connection.query(sqlString, function(err, rows){
        if(err){;
          req.flash('message', getError.getNiceError(err.message));
          res.redirect('/');
        }else{   
          console.log("SUCCESS: MAGAZYN UPDATED!"); 
          res.redirect('/');  
        }
      });
      break;
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
        ];
      
      var sqlString = `UPDATE PRODUKT SET `;
      for (var i=0; i<productFeatures.length; i++) 
      {
        if (data[key][i+2]['val'] === "") continue;
        if (productFeatures[i][Object.keys(productFeatures[i])[0]] == true) sqlString += `${Object.keys(productFeatures[i])[0]} = ${data[key][i+2]['val']},`;
        else sqlString += `${Object.keys(productFeatures[i])[0]} = '${data[key][i+2]['val']}',`;
      }
      sqlString += `KATEGORIE_KATEGORIA_ID = (SELECT KATEGORIA_ID FROM KATEGORIE WHERE KATEGORIA = '${data[key][1]['val']}') `;
      sqlString += ` WHERE PRODUKT_ID = ${data[key][0]['val']}`

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
    case 'kategorie':
      var sqlString = `UPDATE KATEGORIE SET KATEGORIA = '${data[key][1]["val"]}' WHERE KATEGORIA_ID = ${data[key][0]["val"]}`;
      connection.query(sqlString, function(err, rows){
        if(err){;
          req.flash('message', getError.getNiceError(err.message));
          res.redirect('/categories');
        }else{   
          console.log("SUCCESS: KATEGORIA UPDATED!"); 
          res.redirect('/categories');  
        }
      });
      break; 
    case 'zamowienie':
      var sqlString = `UPDATE ZAMÓWIENIA SET 
      STANY_STAN_ID = (SELECT STAN_ID FROM STANY WHERE NAZWA_STANU = '${data[key][1]["val"]}'),
      PRZEWOŹNIK_PRZEWOŹNIK_ID = (SELECT PRZEWOŹNIK_ID FROM PRZEWOŹNIK WHERE NAZWA_PRZEWOŹNIKA = '${data[key][2]["val"]}') 
      WHERE ZAMÓWIENIE_ID = ${data[key][0]["val"]}`;
      console.log(sqlString);
      connection.query(sqlString, function(err, rows){
        if(err){;
          req.flash('message', getError.getNiceError(err.message));
          res.redirect('/orders');
        }else{   
          console.log("SUCCESS!"); 
          res.redirect('/orders');  
        }
      });
      break; 
    case 'zwrot':
      var sqlString = `UPDATE ZWROTY SET 
      ZAMÓWIENIA_ZAMÓWIENIE_ID = ${data[key][1]["val"]},
      PRODUKT_PRODUKT_ID = ${data[key][2]["val"]}, 
      STANY_STAN_ID = (SELECT STAN_ID FROM STANY WHERE NAZWA_STANU = '${data[key][3]["val"]}') 
      WHERE ZWROTY_ID = ${data[key][0]["val"]}`;
      console.log(sqlString);
      connection.query(sqlString, function(err, rows){
        if(err){;
          req.flash('message', getError.getNiceError(err.message));
          res.redirect('/returns');
        }else{   
          console.log("SUCCESS!"); 
          res.redirect('/returns');  
        }
      });
      break;
    case 'zawartosc_zamowienia':
      var sqlString = `UPDATE ZAWARTOŚć_ZAMÓWIEŃ SET 
      ZAMÓWIENIA_ZAMÓWIENIE_ID = ${data[key][1]["val"]},
      PRODUKT_PRODUKT_ID = ${data[key][2]["val"]}, 
      ILOŚĆ = ${data[key][3]["val"]}
      WHERE ZAWARTOŚĆ_ZAMÓWIEŃ_ID = ${data[key][0]["val"]}`;
      connection.query(sqlString, function(err, rows){
        if(err){;
          req.flash('message', getError.getNiceError(err.message));
          res.redirect('/ordersContents');
        }else{   
          console.log("SUCCESS!"); 
          res.redirect('/ordersContents');  
        }
      });
      break;
    case 'przewoznik':
      var sqlString = `UPDATE PRZEWOŹNIK SET 
      NAZWA_PRZEWOŹNIKA = '${data[key][1]["val"]}'
      WHERE PRZEWOŹNIK_ID = ${data[key][0]["val"]}`;
      connection.query(sqlString, function(err, rows){
        if(err){;
          req.flash('message', getError.getNiceError(err.message));
          res.redirect('/carriers');
        }else{   
          console.log("SUCCESS!"); 
          res.redirect('/carriers');  
        }
      });
      break;
    case 'stan':
      var sqlString = `UPDATE STANY SET 
      NAZWA_STANU = '${data[key][1]["val"]}'
      WHERE STAN_ID = ${data[key][0]["val"]}`;
      connection.query(sqlString, function(err, rows){
        if(err){;
          req.flash('message', getError.getNiceError(err.message));
          res.redirect('/states');
        }else{   
          console.log("SUCCESS!"); 
          res.redirect('/states');  
        }
      });
      break;
    case 'klient':
      var sqlString = `UPDATE KLIENT SET 
      IMIĘ = '${data[key][1]["val"]}',
      NAZWISKO = '${data[key][2]["val"]}',
      LOGIN = '${data[key][3]["val"]}',
      HASŁO = '${data[key][4]["val"]}'
      WHERE KLIENT_ID = ${data[key][0]["val"]}`;
      connection.query(sqlString, function(err, rows){
        if(err){;
          req.flash('message', getError.getNiceError(err.message));
          res.redirect('/clients');
        }else{   
          console.log("SUCCESS!"); 
          res.redirect('/clients');  
        }
      });
      break;
    case 'reklamacja':
      var sqlString = `UPDATE REKLAMACJE SET 
      ZAMÓWIENIA_ZAMÓWIENIE_ID = ${data[key][1]["val"]},
      STANY_STAN_ID = (SELECT STAN_ID FROM STANY WHERE NAZWA_STANU = '${data[key][2]['val']}')
      WHERE REKLAMACJE_ID = ${data[key][0]["val"]}`;
      connection.query(sqlString, function(err, rows){
        if(err){;
          req.flash('message', getError.getNiceError(err.message));
          res.redirect('/complaints');
        }else{   
          console.log("SUCCESS!"); 
          res.redirect('/complaints');  
        }
      });
      break;
    default:
      req.flash('message', 'WRONG KEY!');
      res.redirect('/');
  }
});


 
 
module.exports = router;