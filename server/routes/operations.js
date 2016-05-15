
var express = require('express');
var router = express.Router();
var path = require('path');

// define methods
var ops = {
  addition: function (x, y) { return x + y; },
  subtraction: function (x, y) { return x - y; },
  multiplication: function (x, y) { return x * y; },
  division: function (x, y) { return x / y; }
};

router.post('/*', function (req, res) {

  var operation = req.params[0];
  // process calculation request
  var x = parseFloat(req.body.num1);
  var y = parseFloat(req.body.num2);
  var result = ops[operation](x, y);
  res.send({ result: result });

});

module.exports = router;
