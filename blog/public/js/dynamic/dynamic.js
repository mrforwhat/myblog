$(function() {
    loadEssayList();

    // 点赞
    $('#essay-container').off('click').on('click', '.support', function() {
        var $this = $(this);
        var $parent = $this.closest('.tip-action');
        var $counts = $this.find('.count');
        var supportCount = $counts.text();
        $this.toggleClass('active');
        if ($this.hasClass('active')) {
            $counts.text(++supportCount);
            $.fn.alert('点赞成功!', $parent);
        } else {
            $counts.text(--supportCount);
            $.fn.alert('已取消点赞!', $parent);
        }
        // 关注
    }).on('click', '.like', function() {
        var $this = $(this);
        var $parent = $this.closest('.tip-action');
        var $counts = $this.find('.count');
        var likeCount = $counts.text();
        $this.toggleClass('active');
        if ($this.hasClass('active')) {
            $counts.text(++likeCount);
            $.fn.alert('关注成功!', $parent);
        } else {
            $counts.text(--likeCount);
            $.fn.alert('已取消关注!', $parent);
        }
        // 评论
    }).on('click', '.message', function() {
        var $this = $(this);
        var $parent = $this.closest('.tip-action');
        var $otherArticle = $this.closest('article').siblings('article');
        var $commentContainer = $parent.siblings('.commentContainer');
        $otherArticle.find('.commentContainer').removeClass('active');
        $otherArticle.find('.commentContainer').slideUp();
        $commentContainer.toggleClass('active');
        if ($commentContainer.hasClass('active')) {
            $commentContainer.slideDown();
        } else {
            $commentContainer.slideUp();
        }
        //发表
    }).on('click', '.publishBtn', function() {
        var $this = $(this);
        var $article = $this.closest('article');
        var currentText = $this.siblings('textarea').val();
        var $commentText = $article.find('.comment-text');
        // $commentText.append("<br>" + encodeHtml(currentText));
        publishComment($article, $commentText, currentText);
    });
    
    // 加载文章列表
    function loadEssayList() {
        $.ajax({
            'url': 'loadEssayList',
            data: '',
            dataType: 'json',
            type: 'post',
            success: function(data) {
                var essayList = data.essayList.essay;
                var essayListModel = new Vue({
                    el: '#article-container',
                    data: {
                        essayList: essayList
                    }
                });
            },
            error: function(data) {

            }
        });
    }

    /**
     * @param  {[dom] $article 文章对象}
     * @param  {[dom] $commentText 评论内容容器}
     * @param  {[string] currentText 评论内容}
     */
    function publishComment($article, $commentText, currentText) {
        var $area = $article.find('.comment-area');
        var $tipAction = $article.find('.tip-action');
        var targetUser = $commentText.data('target-user');
        var id = $article.find('.panel').data('id');
        $.ajax({
            'url': 'publishComment',
            data: {
                ip: sessionStorage.getItem('currentIp'),
                id: id,
                nickname: '',
                targetUser: targetUser || '',
                content: currentText,
                messageTime: moment().format('YYYY-MM-DD HH:mm:ss')
            },
            dataType: 'json',
            type: 'post',
            success: function(data) {
                var reviewers = data;
                if (reviewers) {
                    var tpl = `<div class="comment-area">
                                    <div class="avatar">
                                         <img class="img-circle" width="25px" height="25px" src="/images/default.jpeg" alt="">
                                     </div>
                                    <div class="comment-text">
                                        <span class="nickname">${reviewers.nickname} : ${reviewers.targetUser}</span>
                                     ${reviewers.content}
                                        <div class="message-time">${reviewers.messageTime}</div>
                                    </div>
                                </div>`;
                    $tipAction.after(tpl);
                }
            },
            error: function(data) {}
        });
    }
});
