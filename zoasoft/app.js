$(() => {
  var json = {
    'pageId': ''
  };

  $('#camera').on('click', () => {
    json.pageId = 'Camera';
    window.ReactNativeWebView.postMessage(JSON.stringify(json));
  });

  $('#map').on('click', () => {
    json.pageId = 'Map';
    window.ReactNativeWebView.postMessage(JSON.stringify(json));
  });
});
