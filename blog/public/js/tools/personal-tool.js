$.fn.extend({
    alert: function(message, targetSelector) {
        $('.alert-box').text(message).show(500);
        $(targetSelector).addClass('no-pointer');
        setTimeout(function() {
            $('.alert-box').text(message).hide(1000);
            $(targetSelector).removeClass('no-pointer');
        }, 2500);
    }
});

function getCurrentIp() {
    return returnCitySN["cip"] || '127.0.0.1';
}

function loadHtml(settings) {
    var callBack = settings.callBack,
        url = settings.url,
        loading = settings.loading || true,
        type = settings.type || 'get';
    if (loading) {
        $('.mask').show();
        $('.loading-box').show();
    }
    $.ajax({
        url: url,
        dataType: 'html'
    }).done(function(html) {
        if (loading) {
            setTimeout(function() {
                $('.mask').hide();
                $('.loading-box').hide();
            },1000);
        }
        $('#main-frame').html(html);
        if (callBack) {
            callBack();
        }
    });
}

function requestJson(settings) {
    var callBack = settings.callBack,
        url = settings.url,
        type = settings.type || 'post';
    $.ajax({
        url: url,
        dataType: 'json',
    }).done(function(data) {
        if (callBack) {
            callBack();
        }
    });
}

// js防止注入
function encodeHtml(str) {
    return $("<span>").text(str).html();
}
