$(() => {
  var json = {
    'text': ''
  };

  $('#camera').on('click', () => {
    json.text = '카메라호출';
    window.ReactNativeWebView.postMessage(JSON.stringify(json));
  });

  $('#map').on('click', () => {
    json.text = '지도호출';
    window.ReactNativeWebView.postMessage(JSON.stringify(json));
  });
});
