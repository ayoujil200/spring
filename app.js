var createError = require('http-errors');
var express = require('express');
var path = require('path');
//var sql = require('mssql');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require("./models/index.model.js");
var bcrypt = require("bcryptjs");
var flash = require('connect-flash');
var session = require('express-session');
var bodyParser = require('body-parser')
var fileUpload = require('express-fileupload');
var config = require("./configs/auth.config");
var port = 5000;

var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
var managerRouter = require('./routes/manager/manager.route');
var requesterRouter = require('./routes/demandeur/demandeur.route');
var apiAuthRouter = require('./routes/api/auth/auth.route');
var apiUserRouter = require('./routes/api/user.route');
var apiRequestRouter = require('./routes/api/request.route');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());
app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: true,
}));
app.use(flash());
app.use(function (req, res, next) {
  res.locals.message = req.flash();
  next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
  res.locals.loggedin = req.session.loggedin;
  res.locals.user = req.session.user;
  res.locals.roles = req.session.roles;
  next();
});

var moment = require('moment');
app.locals.moment = require('moment');

//app.use('/', indexRouter);
app.use('/', userRouter);
app.use('/manager/home', managerRouter);
app.use('/requester/home', requesterRouter);
app.use('/api/v1/requests', apiRequestRouter);
app.use('/api/v1/users', apiUserRouter);
app.use('/api/v1/auth', apiAuthRouter);

app.all('*', (req, res) => {
  res.status(404).send("<h1>Erreur => 404, cette page n'existe pas!</h1>");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

const Role = db.role;
const User = db.user;
const Request = db.request;

db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

function initial() {
  Role.create({
    name: "manager"
  });

  Role.create({
    name: "demandeur"
  });

  User.create({
    first_name: "ayoujil",
    last_name: "abdelali",
    username: "ayoujil",
    email: "ayoujil@gmail.com",
    password: bcrypt.hashSync("12345678", 8)
  }).then(user => {
    // user role = 1 (manager) && role = 2 (demandeur)
    user.setRoles([1, 2]).then(() => {
      Request.create({
        reason: "reason 1",
        transport: "car",
        start_date: "01/12/2022",
        end_date: "04/12/2022",
        destination_city: "marrakech",
        total_fees: 1412.25,
        status: "WAITED",
        userId: user.id
      })

      Request.create({
        reason: "reason 1",
        transport: "car",
        start_date: "01/12/2022",
        end_date: "04/12/2022",
        destination_city: "marrakech",
        total_fees: 1412.25,
        status: "WAITED",
        userId: user.id
      })
      Request.create({
        reason: "reason 1",
        transport: "car",
        start_date: "01/12/2022",
        end_date: "04/12/2022",
        destination_city: "marrakech",
        total_fees: 1412.25,
        status: "WAITED",
        userId: user.id
      })
      Request.create({
        reason: "reason 1",
        transport: "car",
        start_date: "01/12/2022",
        end_date: "04/12/2022",
        destination_city: "marrakech",
        total_fees: 1412.25,
        status: "WAITED",
        userId: user.id
      })
    });
  })

  User.create({
    first_name: "octoview",
    last_name: "octoview",
    username: "octoview",
    email: "octoview@gmail.com",
    password: bcrypt.hashSync("12345678", 8)
  }).then(user => {
    // user role = 1 (manager) && role = 2 (demandeur)
    user.setRoles([2]).then(() => {
      Request.create({
        reason: "reason 1",
        transport: "car",
        start_date: "01/12/2022",
        end_date: "04/12/2022",
        destination_city: "marrakech",
        total_fees: 1412.25,
        status: "WAITED",
        userId: user.id
      })

      Request.create({
        reason: "reason 1",
        transport: "car",
        start_date: "01/12/2022",
        end_date: "04/12/2022",
        destination_city: "marrakech",
        total_fees: 1412.25,
        status: "REFUSED",
        userId: user.id
      })
      Request.create({
        reason: "reason 1",
        transport: "car",
        start_date: "01/12/2022",
        end_date: "04/12/2022",
        destination_city: "marrakech",
        total_fees: 1412.25,
        status: "ACCEPTED",
        userId: user.id
      })
      Request.create({
        reason: "reason 1",
        transport: "car",
        start_date: "01/12/2022",
        end_date: "04/12/2022",
        destination_city: "marrakech",
        total_fees: 1412.25,
        status: "HISTORED",
        userId: user.id
      })
    });
  })

  User.create({
    first_name: "hanane",
    last_name: "kadmi",
    username: "hanane",
    email: "hanane@gmail.com",
    password: bcrypt.hashSync("12345678", 8)
  }).then(user => {
    // user role = 1 (manager) && role = 2 (demandeur)
    user.setRoles([2]).then(() => {
      Request.create({
        reason: "reason 1",
        transport: "car",
        start_date: "01/12/2022",
        end_date: "04/12/2022",
        destination_city: "marrakech",
        total_fees: 1412.25,
        status: "WAITED",
        userId: user.id
      })

      Request.create({
        reason: "reason 1",
        transport: "car",
        start_date: "01/12/2022",
        end_date: "04/12/2022",
        destination_city: "marrakech",
        total_fees: 1412.25,
        status: "WAITED",
        userId: user.id
      })
      Request.create({
        reason: "reason 1",
        transport: "car",
        start_date: "01/12/2022",
        end_date: "04/12/2022",
        destination_city: "marrakech",
        total_fees: 1412.25,
        status: "WAITED",
        userId: user.id
      })
      Request.create({
        reason: "reason 1",
        transport: "car",
        start_date: "01/12/2022",
        end_date: "04/12/2022",
        destination_city: "marrakech",
        total_fees: 1412.25,
        status: "WAITED",
        userId: user.id
      })
    });
  })
}

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
});

app.listen(port, function () {
  console.log('server listening on port ' + port + '!');
});

module.exports = app;
