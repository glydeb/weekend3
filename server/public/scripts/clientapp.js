// variable declarations
var operation = '';
var values = { num1: '', num2: '' };

$(document).ready(function () {

  // event listeners
  // operation buttons
  $('button.op').on('click', selectOp);

  // equals button
  $('#equals').on('click', postCalc);

  // clear button
  $('#clear').on('click', clearCalc);

  //number buttons
  $('.num').on('click', addNum);

  //decimal button
  $('#decimal').on('click', addDec);

});

function selectOp() {
  $('.op').removeClass('highlight');
  operation = $(this).attr('id');
  $('#' + operation).addClass('highlight');
  if (values.num1 !== '') {
    clearScreen();
  } else {
    values.num1 = clearScreen();
  }
}

function postCalc() {
  values.num2 = clearScreen();
  $.ajax({
    type: 'POST',
    url: '/operations/' + operation,
    data: values,
    success: function (response) {
      $('#screen').text(response.result);
    }
  });
}

function clearCalc() {
  console.log('clearCalc');
  $('input').val('');
  $('#result').find('p').text('0');
}

function addNum() {
  // Append number to screen
  var screenText = $('#screen').text() + $(this).attr('id');
  $('#screen').text(screenText);
}

function addDec() {
  var screenText = $('#screen').text();

  // check for decimal in current string
  var found = false;
  for (var i = 0; i < screenText.length; i++) {
    if (screenText[i] === ".") {
      found = true;
      break;
    }
  }

  // if no decimal present, add one - if not, alert
  if (!found) {
    $('#screen').text(screenText + '.');
  } else {
    alert('Only one decimal per number!');
  }
}

function clearScreen() {
  var screenText = $('#screen').text();
  $('#screen').text('');
  return screenText;
}
