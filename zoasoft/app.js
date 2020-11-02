$(() => {
  var data = {
    pageId: ''
  };

  $('#camera').on('click', () => {
    data.pageId = 'Camera';
    window.ReactNativeWebView.postMessage(JSON.stringify(data));
  });

  $('#imagePicker').on('click', () => {
    data.pageId = 'ImagePicker';
    window.ReactNativeWebView.postMessage(JSON.stringify(data));
  });

  $('#qrCodeScanner').on('click', () => {
    data.pageId = 'qrCodeScanner';
    window.ReactNativeWebView.postMessage(JSON.stringify(data));
  });

  $('#map').on('click', () => {
    data.pageId = 'Map';
    window.ReactNativeWebView.postMessage(JSON.stringify(data));
  });
});
