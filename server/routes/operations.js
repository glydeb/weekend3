
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

  var operation = req.params[0].substr(10);
  console.log(operation);
  // process calculation request
  var x = parseFloat(req.body.op1);
  var y = parseFloat(req.body.op2);
  //var result = ops[operation](x, y);
  //res.send({ result: result });
  res.send(operation);

});

module.exports = router;
