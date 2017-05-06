$(function() {
    new Vue({
        el: '#editor',
        data: {
            input: '# hello'
        },
        computed: {
            compiledMarkdown: function() {
                return marked(this.input, { sanitize: true })
            }
        },
        methods: {
            update: function(e) {
            	debugger
                this.input = e.target.value
            }
        }
    });
    $('#flex-left-btn').on('click',function(){
    	var $rightContainer = $('#flex-right-btn').closest('.col-md-9');
    	$(this).closest('.col-md-3').removeClass('slide-right').addClass('slide-left');
    	$('#flex-right-btn').show();
    	$('#flex-left-btn').hide();
    	$rightContainer.animate({
    		width: '100%',
    		},
    		1000, function() {
    	});
    });
     $('#flex-right-btn').on('click',function(){
     	var $leftContainer = $('#flex-left-btn').closest('.col-md-3');
     	var $rightContainer = $(this).closest('.col-md-9');
    	$leftContainer.removeClass('slide-left').addClass('slide-right');
    	$rightContainer.css('width','75%');
    	$('#flex-left-btn').show();
    	$('#flex-right-btn').hide();
    });
})
