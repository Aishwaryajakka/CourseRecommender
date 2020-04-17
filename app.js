var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mysql = require('mysql');

var app = express();
const port = 4000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
 app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use('/', indexRouter);
app.use('/user', usersRouter);

/* SQL Database Connection*/

var con = mysql.createConnection({
  host: "localhost",
  port: "8888",
  user: "root",
  password: "root",
  database : "course_rec"
});

con.connect(function (err) {
  if (err) throw "Connection to SQL failed";
  console.log("Connected to SQL");
  app.locals.con = con;
});





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



app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;
