var express = require('express');
var router = express.Router();
var connection  = require('../public/javascripts/database.js');
const { getClients } = require('../public/javascripts/dbSetters.js');
 
 
/* GET home page. */
router.get('/', function(req, res, next) {
    getClients(res, req, next);  
});

module.exports = router;