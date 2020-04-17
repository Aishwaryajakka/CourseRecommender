var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next) {
  res.json('respond with a resource');
});

router.get("/course", function (request, response) {
  const connection = request.app.locals.connection;
  connection.query('select * from course', function (error, result) {
      response.json(result);
      
  });
});


module.exports = router;
