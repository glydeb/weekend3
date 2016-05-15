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
  $('#clear').on('click', clearCalc('0'));

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
  } else if (firstScreenChar() === '=') {
    values.num1 = clearScreen().substr(1);
  } else {
    values.num1 = clearScreen();
  }
}

function postCalc() {
  // store screen contents in num2
  values.num2 = clearScreen();
  if (operation !== '') {
    $.ajax({
      type: 'POST',
      url: '/operations/' + operation,
      data: values,
      success: function (response) {
        clearCalc('=' + response.result);
      }
    });
  } else {
    alert('Not a valid calculation - input cleared.');
    clearCalc('0');
  }
}

function clearCalc(result) {
  $('#screen').text(result);
  values.num1 = '';
  values.num2 = '';
  operation = '';
  $('.op').removeClass('highlight');
}

function addNum() {
  // local variable to handle text to display
  var screenText = '';

  // Append number to screen, removing leading zero and
  // handle case where screen shows result
  var firstChar = firstScreenChar();
  if (firstChar === '0' || firstChar === '=') {
    screenText = $(this).attr('id');
  } else {
    screenText = $('#screen').text() + $(this).attr('id');
  }

  $('#screen').text(screenText);
}

function addDec() {
  // local variable to handle text to display
  var screenText = $('#screen').text();

  // check for decimal in current string
  var found = false;
  for (var i = 0; i < screenText.length; i++) {
    if (screenText[i] === '.') {
      found = true;
      break;
    }
  }

  // if no decimal present, add one - if not, alert
  if (firstScreenChar() === '=') {
    $('#screen').text('0.');
  } else if (!found) {
    $('#screen').text(screenText + '.');
  } else {
    alert('Only one decimal per number!');
  }
}

function clearScreen() {
  var screenText = $('#screen').text();
  $('#screen').text('0');
  return screenText;
}

function firstScreenChar() {
  return $('#screen').text().substr(0, 1);
}
