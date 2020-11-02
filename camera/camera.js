$(() => {
  var data = {
      pageId: ''
    , fucId: ''
  };

  $('#imagePicker').on('click', () => {
    data.fucId = 'imagePicker';
    window.ReactNativeWebView.postMessage(JSON.stringify(data));
  });

  $('#qrCodeScanner').on('click', () => {
    data.fucId = 'qrCodeScanner';
    window.ReactNativeWebView.postMessage(JSON.stringify(data));
  });

  $('#camera').on('click', () => {
    data.pageId = 'Camera';
    window.ReactNativeWebView.postMessage(JSON.stringify(data));
  });
});
