(function($) {
    new Swiper('.main_visual .swiper-container', {
        speed: 500,
        autoplay: {
            delay: 3000,
        }
    });
    new Swiper('.unique_slide .swiper-container', {
        loop: true,
        speed: 500,
        autoplay: {
            delay: 3000,
        }
    });
    // new Swiper('.col_slide .swiper-container', {
    //     effect: 'fade',
    //     fadeEffect: {
    //     	crossFade: true
    //     },
    //     speed: 500,
    //     autoplay: {
    //         delay: 2000,
    //     }
    // });
    new Swiper('.tre_slide .swiper-container', {
        effect: 'fade',
        fadeEffect: {
        	crossFade: true
        },
        speed: 500,
        autoplay: {
            delay: 2000,
        }
    });
    new Swiper('.slider_slide .swiper-container', {
        speed: 500,
        autoplay: {
            delay: 3000,
        },
        pagination: {
        	el: '.slider_paging',
        	type: 'bullets',
        	clickable: true,
        	renderBullet: function(index, className){
        		return '<li class="' + className + '"><a href="#none"></a></li>';
        	}
        },
    });
}(jQuery))
