$(() => {
  var data = {
    func: ''
  };

  // 사진 업로드 클릭 이벤트
  $('#uploadImage').on('click', () => {
    data.func = 'uploadImage';
    window.ReactNativeWebView.postMessage(JSON.stringify(data));
  });

  // ReactNative 통신
  document.addEventListener('message', function(e){
    var data = JSON.parse(e.data);

    if(isNull(data)) return false;

    switch(data.func)
    {
      // img data 송신
      case 'updateImage':

      // 이미지 data 가져오기
      $('img').attr('src', data.data);

      // 이미지 높이 조절
      $('img').css({'height', data.height + 'px'});

      break;
    }
  });
});
