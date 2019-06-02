var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var paypal = require('paypal-rest-sdk');
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./swagger.json');

require('./controllers/passport')(passport);

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/users', {useNewUrlParser: true})
  .then(() => console.log('Connection successful'))
  .catch((err) => console.error(err));

  paypal.configure({
    'mode' : 'sandbox',
    'client_id': '',
    'client_secret': ''
  });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var campaignRouter = require('./routes/campaign');
var authenticationRouter = require('./routes/authentication')(passport);
var donationRouter = require('./routes/donation');
var campanhaRouter = require('./api/routes/campanha');
var donateRouter = require('./api/routes/donation');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret',
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/campaign', campaignRouter);
app.use('/auth', authenticationRouter);
app.use('/donation', donationRouter);
app.use('/api/campanhas', campanhaRouter);
app.use('/api/donate', campanhaRouter);

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

module.exports = app;
