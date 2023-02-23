var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');
var session = require('express-session');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

var container;
app.use(session({ 
  secret: '123456cat',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));
app.use(flash());
app.disable('etag');

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

var warehouseExpressRouter = require('./routes/warehouseExpress.js');
var productsExpressRouter = require('./routes/productsExpress.js');
var categoriesExpressRouter = require('./routes/categoriesExpress.js');
var ordersExpressRouter = require('./routes/ordersExpress.js');
var returnsExpressRouter = require('./routes/returnsExpress.js');
var complaintsExpressRouter = require('./routes/complaintsExpress.js');
var ordersContentsExpressRouter = require('./routes/ordersContentsExpress.js');
var carriersExpressRouter = require('./routes/carriersExpress.js');
var clientsExpressRouter = require('./routes/clientsExpress.js');
var statesExpressRouter = require('./routes/statesExpress.js');
var updateRouter = require('./routes/update.js');
var addRouter = require('./routes/add.js');
var delRouter = require('./routes/delete.js');
var sortRouter = require('./routes/sort.js');
var summaryRouter = require('./routes/summary.js');
var searchRouter = require('./routes/search.js');
var sumRouter = require('./routes/sumAll.js');

app.use('/', warehouseExpressRouter);
app.use('/products', productsExpressRouter);
app.use('/categories', categoriesExpressRouter);
app.use('/orders', ordersExpressRouter);
app.use('/returns', returnsExpressRouter);
app.use('/complaints', complaintsExpressRouter);
app.use('/ordersContents', ordersContentsExpressRouter);
app.use('/carriers', carriersExpressRouter);
app.use('/clients', clientsExpressRouter);
app.use('/states', statesExpressRouter);
app.use('/update', updateRouter);
app.use('/add', addRouter);
app.use('/delete', delRouter);
app.use('/sort', sortRouter);
app.use('/summary', summaryRouter);
app.use('/search', searchRouter);
app.use('/sumAll', sumRouter);

// catch 404 and forward to error handler
app.use(function(err, req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
