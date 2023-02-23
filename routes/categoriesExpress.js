var express = require('express');
var router = express.Router();
var connection  = require('../public/javascripts/database.js');
const { getCategories } = require('../public/javascripts/dbSetters.js');
 

router.get('/', function(req, res, next) {
  getCategories(res, req, next);  
});

module.exports = router;