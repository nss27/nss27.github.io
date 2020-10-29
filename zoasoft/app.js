$(() => {
  var json = {
    'pageId': ''
  };

  $('#camera').on('click', () => {
    json.pageId = 'camera';
    window.ReactNativeWebView.postMessage(JSON.stringify(json));
  });

  $('#map').on('click', () => {
    json.pageId = 'map';
    window.ReactNativeWebView.postMessage(JSON.stringify(json));
  });
});
