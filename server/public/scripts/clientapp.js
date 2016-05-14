$(document).ready(function () {
  // event listeners
  $('button').on('click', function (event) {
    event.preventDefault();
    var values = {};
    $.each($('#inputForm').serializeArray(), function (i, field) {
      values[field.name] = field.value;
    });

    values.operation = $(this).attr('id');

    $.ajax({
      type: 'POST',
      url: '/operations',
      data: values,
      success: function (response) {
        $('#result').empty();
        $('#result').append('<p>' + response.result + '</p>');
      }
    });
  });
});
