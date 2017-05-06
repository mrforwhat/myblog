$(function() {
    // 页面加载函数
    sessionStorage.setItem('currentIp', getCurrentIp());

    loadHtml({
        url: 'loadindex'
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
            url: url
        });
    });
    $('.nav').on('click', 'li', function() {
        var $this = $(this);
        if (!$this.hasClass('active')) {
            $this.addClass('active');
            $this.siblings().removeClass('active');
        }
    });




    
});
