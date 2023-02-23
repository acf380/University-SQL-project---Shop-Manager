var express = require('express');
var router = express.Router();
var connection  = require('../public/javascripts/database.js');
const { getOrders } = require('../public/javascripts/dbSetters.js');
 
 
/* GET home page. */
router.get('/', function(req, res, next) {
  getOrders(res, req, next);  
});

module.exports = router;