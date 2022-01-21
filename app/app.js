var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cors=require('cors');
const mongoose=require('mongoose');


mongoose.connect('mongodb+srv://Usuario:12345@cluster0.aw6la.mongodb.net/bd3?retryWrites=true&w=majority'); 
const usuarioSchema=require('./models/model_usuario');
require('./models/model_producto');
require('./models/model_venta');
require('./models/model_mecenazgo');
require('./models/model_voto');
mongoose.model('Usuario', usuarioSchema, 'Usuario');


var venta = require('./routes/routeVenta');
var usuario = require('./routes/routeUsuario');
var mecenazgo = require('./routes/routeMecenazgo'); 
var producto = require('./routes/routeProducto');
var transaccion= require('./routes/routeTransaccion');
const voto= require('./routes/routeVoto');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use('/', indexRouter);
app.use('/ventas', venta);
app.use('/users', usersRouter);
app.use('/productos', producto);
app.use('/usuarios', usuario);
app.use('/mecenazgo', mecenazgo);
app.use('/voto',voto);
app.use('/transaccion',transaccion);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
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


module.exports =app;

