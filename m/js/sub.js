(function($) {
    $(document).ready(function() {
        new Swiper('.lnb_wrap.swiper-container', {
            initialSlide: $('.lnb li.on').index(),
            slidesPerView: 'auto',
            freeMode: true
        });
    });
}(jQuery))
