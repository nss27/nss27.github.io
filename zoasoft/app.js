$(() => {
  var data = {
    pageId: ''
  };

  $('#camera').on('click', () => {
    window.location.href = '../camera/camera.html';
  });

  $('#map').on('click', () => {
    data.pageId = 'Map';
    window.ReactNativeWebView.postMessage(JSON.stringify(data));
  });
});
