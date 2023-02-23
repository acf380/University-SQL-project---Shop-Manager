var express = require('express');
var router = express.Router();
var connection  = require('../public/javascripts/database.js');
const { getWarehouse } = require('../public/javascripts/dbSetters.js');
 
 
/* GET home page. */
router.get('/', function(req, res, next) {
  getWarehouse(res, req, next);  
});

module.exports = router;