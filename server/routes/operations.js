
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

router.post('/', function (req, res) {

  // process calculation request
  var x = parseFloat(req.body.op1);
  var y = parseFloat(req.body.op2);
  var result = ops[req.body.operation](x, y);
  console.log({ result: result });
  res.send({ result: result });

});

module.exports = router;
