$(function() {

    getProgressDelay();

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
