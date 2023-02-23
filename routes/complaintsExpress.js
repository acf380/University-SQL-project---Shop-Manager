var express = require('express');
var router = express.Router();
var connection  = require('../public/javascripts/database.js');
const { getComplaints } = require('../public/javascripts/dbSetters.js');
 
 
/* GET home page. */
router.get('/', function(req, res, next) {
  getComplaints(res, req, next);  
});

module.exports = router;