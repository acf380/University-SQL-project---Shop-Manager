var express = require('express');
var router = express.Router();
var connection  = require('../public/javascripts/database.js');
const { getCarriers } = require('../public/javascripts/dbSetters.js');
 
 
/* GET home page. */
router.get('/', function(req, res, next) {
    getCarriers(res, req, next);  
});

module.exports = router;