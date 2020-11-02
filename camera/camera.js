$(() => {
  var data = {
      pageId: ''
    , funcId: ''
  };

  $('#imagePicker').on('click', () => {
    data.funcId = 'imagePicker';
    window.ReactNativeWebView.postMessage(JSON.stringify(data));
  });

  $('#qrCodeScanner').on('click', () => {
    data.funcId = 'qrCodeScanner';
    window.ReactNativeWebView.postMessage(JSON.stringify(data));
  });

  $('#camera').on('click', () => {
    data.pageId = 'Camera';
    window.ReactNativeWebView.postMessage(JSON.stringify(data));
  });
});
