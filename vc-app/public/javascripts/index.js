var QRCode = require('qrcode');
var $form = $("#trial-form");
var $modalContainer = $(".modal-container");

$(document).on('keypress',function(e) {
  if (e.which == 13) {
    $form.find('input[type=submit]').click();
  }
});

function showModal(type) {
  $modalContainer.show();
  $modalContainer.find(`.${type}-modal`).show();
}

function hideModals() {
  $modalContainer.hide();
  $modalContainer.find('.modal').hide();
}

$form.find('input[type=submit]').click(function(e) {
  e.preventDefault();

  const email = $form.find('input[name=email]').val();

  $.ajax({
    url: '/issue',
    type: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({ email }),
    success: function(result) {
      if (result.deepLink) {
        showModal('success');

        var $canvas = document.getElementById('qr-canvas');
        QRCode.toCanvas($canvas, result.deepLink);
      } else {
        showModal('error');
      }
    },
    error: function(XMLHttpRequest, textStatus, error) {
      showModal('error');
    }             
  });
});

$modalContainer.find('.close').click(function(e) {
  hideModals();
})

