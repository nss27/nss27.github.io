$(() => {
  $('#camera').on('click', () => {
    window.ReactNativeWebView.postMessage('카메라호출');
  });

  $('#map').on('click', () => {
    window.ReactNativeWebView.postMessage('지도호출');
  });
});
