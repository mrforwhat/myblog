$(function() {
    // 页面加载函数
    sessionStorage.setItem('currentIp', getCurrentIp());

    loadHtml({
        url: 'loadindex',
        callBack: function() {
            getProgressDelay();
        }
    });
    // 点击导航栏
    $('#nav-panel-collapse').on('click', '[data-url]', function() {
        var $this = $(this);
        var url = $this.data('url');
        if (url === 'not-open') {
            $.fn.alert('主人仍在编写中，暂未开放！');
            return;
        }
        loadHtml({
            url: url,
            callBack: function() {
                getProgressDelay();
            }
        });
    });
    $('.nav').on('click', 'li', function() {
        var $this = $(this);
        if (!$this.hasClass('active')) {
            $this.addClass('active');
            $this.siblings().removeClass('active');
        }
    });




    function getProgressDelay() {
        $('#progress-html5').animate({
            width: '75%'
        }, 1000, 'swing');
        $('#progress-css3').animate({
            width: '60%'
        }, 1000, 'linear');
        $('#progress-boot').animate({
            width: '50%'
        }, 1000, 'swing');
        $('#progress-jq').animate({
            width: '75%'
        }, 1000, 'linear');
        $('#progress-vue').animate({
            width: '30%'
        }, 1000, 'swing');
        $('#progress-node').animate({
            width: '30%'
        }, 1000, 'linear');
    }
});
