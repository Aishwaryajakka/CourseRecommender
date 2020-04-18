var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, ) {
  res.render('index');
});

router.get('/login', function(req, res, ) {
  res.render('login');
});

router.post('/auth', function(request, response) {
	var username = request.body.username;
  var password = request.body.password;
  const connection = request.app.locals.connection;
	if (username && password) {
		connection.query('SELECT * FROM student WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

router.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

module.exports = router;
