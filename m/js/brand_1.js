(function() {
    function scrollHandler() {
        var scrollTop = win.scrollTop();
        if(fixed === false && scrollTop >= offset) {
            $topElement.addClass('wt_bg');
            fixed = true;
        } else if(fixed === true && scrollTop < offset) {
            $topElement.removeClass('wt_bg');
            fixed = false;
        }
    }

    var $topElement = $('.header_wrap'),
        offset = $('.scroll_temp').offset().top,
        fixed = false;

    win.scroll(scrollHandler);
    scrollHandler();
}());