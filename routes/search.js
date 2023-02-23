var express = require('express');
var router = express.Router();
 
 
router.post('/', function(req, res, next) {
    data = JSON.parse(JSON.stringify(req.body));
    key = Object.keys(data)[0]; 

    switch(key)
    {
        case 'produkt':
            var productFeatures = [
                {"PRODUKT_ID": true},
                {"KATEGORIE_KATEGORIA_ID": true},
                {"MARKA": false},
                {"MODEL": false},
                {"CENA": true},
                {"WAGA": true},
                {"PROCESOR": false},
                {"MOC": true},
                {"PRZEKĄTNA_EKRANU": true},
                {"ROZDZIELCZOŚĆ": false},
                {"KARTA_GRAFICZNA": false},
                {"ILOŚĆ_PAMIĘCI_RAM": true}
              ];

            if (data[key][1] != "") data[key][1] = `(SELECT KATEGORIA_ID FROM KATEGORIE WHERE KATEGORIA = '${data[key][1]}')`; 
            var prod = `WHERE `;
            for (var i=0; i<data[key].length; i++)
            {
                if (data[key][i] != "") {
                    if (productFeatures[i][Object.keys(productFeatures[i])[0]] == true) prod += `(${Object.keys(productFeatures[i])[0]} = ${data[key][i]} OR ${Object.keys(productFeatures[i])[0]} IS NULL) AND `;
                    else prod += `(${Object.keys(productFeatures[i])[0]} LIKE "%${data[key][i]}%" OR ${Object.keys(productFeatures[i])[0]} IS NULL) AND `;
                } else {
                    if (productFeatures[i][Object.keys(productFeatures[i])[0]] == false) prod += `(${Object.keys(productFeatures[i])[0]} LIKE "%" OR ${Object.keys(productFeatures[i])[0]} IS NULL) AND `;
                }
            }
            prod = prod.substring(0,prod.length-4);
            req.flash('search', prod);
            res.redirect('/products');
            break
        default:
            res.redirect('/products');
            break;
    }

});

module.exports = router;