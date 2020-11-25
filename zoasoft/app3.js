$(()=>{
    // 부모창에서 받아온 수신
    window.addEventListener('message', function(e){
        console.log(e.data);

        // 수신용 함수
        switch (e.data.func) {
            // GPS (NO LIVE)
            case 'gps1Callback':
                gps1Callback(e);
                break;
        
            // GPS (LIVE)
            case 'gps2Callback':
                gps2Callback(e);
                break;
            
            // Camera (SYSTEM)
            case 'camera1Callback':
                camera1Callback(e);
                break;
            
            // Camera Preview
            case 'camera2Callback':
                camera2Callback(e);
                break;

            default:
                break;
        }
    });

    $('#gps1').on('click', gps1);
    $('#gps2').on('click', gps2);
    $('#camera1').on('click', camera1);
    $('#camera2').on('click', camera2);
});

var gps1 = function()
{
    var data = {
        func: 'getCurrentPosition'
    }

    // 부모창에 데이터 송신
    window.parent.postMessage(data, '*');
}

var gps1Callback = function(e)
{
    var html = '위도: ' + e.data.result.lat;
    html += '<br>';
    html += '경도: ' + e.data.result.long;

    $('#gps1Result').html(html);
}

var gpsFlug = false;

var gps2 = function()
{
    var data = {
        func: gpsFlug ? 'clearWatch' : 'watchPosition'
    }

    // 부모창에 데이터 송신
    window.parent.postMessage(data, '*');

    // flug change
    gpsFlug = !gpsFlug;

    // button css change
    $('#gps2').css({
        color: gpsFlug ? 'blue' : 'black'
    });
}

var gps2Callback = function(e)
{
    var html = '위도: ' + e.data.result.lat;
    html += '<br>';
    html += '경도: ' + e.data.result.long;

    $('#gps2Result').html(html);
}

var camera1 = function()
{
    var data = {
        func: 'takePicture'
    }

    // 부모창에 데이터 송신
    window.parent.postMessage(data, '*');
}

var camera1Callback = function(e)
{
    $('img').attr({
        'src': e.data.result.imageData
    });
}

var camera2 = function()
{
    var data = {
        func: 'openCamera'
    }

    // 부모창에 데이터 송신
    window.parent.postMessage(data, '*');
}

var camera2Callback = function(e)
{
    
}