$(() => {
  var data = {
    pageId: ''
  };

  $('#camera').on('click', () => {
    data.pageId = 'Camera';
    window.ReactNativeWebView.postMessage(JSON.stringify(data));
  });

  $('#map').on('click', () => {
    data.pageId = 'Map';
    window.ReactNativeWebView.postMessage(JSON.stringify(data));
  });
});
