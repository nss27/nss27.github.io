$(() => {
    $('.front').on('click', function(){
        var checkId = '#' + $(this).data('for');
        $(checkId).trigger('click');
    });
    
    $('button').on('click', function(){
        var buttonId = $(this).data('for');
        console.log(buttonId, '현재 위치 정보 호출');
        return false;
    });
});