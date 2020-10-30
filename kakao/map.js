$(() => {
  // ReactNative 통신
  $(window).on('message', (e) => {
    var data = JSON.parse(e.originalEvent.data);
    alert(data.lat + ', ' + data.lng);
  });

  // document.addEventListener('message', function(){
  //   var data = JSON.parse(e.originalEvent.data);
  //   alert(data.lat + ', ' + data.lng);
  // });

  //지도를 담을 영역의 DOM 레퍼런스
  // var container = document.getElementById('map');
  const container = $('#map')[0];

  //지도를 생성할 때 필요한 기본 옵션
  var options = {
    // center: new kakao.maps.LatLng($('#x').val(), $('#y').val()), //지도의 중심좌표.
    center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
    level: 3 //지도의 레벨(확대, 축소 정도)
  };

  const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

  // 지도를 클릭한 위치에 표출할 마커입니다
  const marker = new kakao.maps.Marker({
      // 지도 중심좌표에 마커를 생성합니다
      position: map.getCenter()
  });

  // 지도에 마커를 표시합니다
  marker.setMap(map);

  // 버튼 이벤트 등록
  $('#move').on('click',() => {
    // 이동할 위도 경도 위치를 생성합니다
    var moveLatLon = new kakao.maps.LatLng($('#x').val(), $('#y').val());

    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.panTo(moveLatLon);
  });

  // 지도에 클릭 이벤트를 등록합니다
  // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
  kakao.maps.event.addListener(map, 'click', function(mouseEvent) {

      // 클릭한 위도, 경도 정보를 가져옵니다
      var latlng = mouseEvent.latLng;

      // 마커 위치를 클릭한 위치로 옮깁니다
      marker.setPosition(latlng);

      // lat: 위도, lng: 경도
      var data = {
          lat: latlng.getLat()
        , lng: latlng.getLng()
      };

      window.ReactNativeWebView.postMessage(JSON.stringify(data));
  });
});
