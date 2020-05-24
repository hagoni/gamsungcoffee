(function($) {
    (function() {
        function scrollHandler() {
            var scrollTop = win.scrollTop();
            if(fixed === false && scrollTop >= offset) {
                $topElement.addClass('scroll');
                fixed = true;
            } else if(fixed === true && scrollTop < offset) {
                $topElement.removeClass('scroll');
                fixed = false;
            }
        }

        var $topElement = $('.lnb_wrap'),
            offset = $('.lnb_wrap').offset().top,
            fixed = false;

        win.scroll(scrollHandler);
        scrollHandler();
    }());

    (function() {
        if($('.chapters').length === 0) return false;

        var lnbSwiper = new Swiper('.lnb_wrap.swiper-container', {
            initialSlide: $('.lnb li.on').index(),
            slidesPerView: 'auto',
            freeMode: true
        });

        function setAnchorsOffset() {
            var limit = doc.innerHeight() - win.innerHeight();
            for(var i=0, j=0; i<length; i++) {
                if($chapters.eq(i).length > 0) offsets[i] = $chapters.eq(i).offset().top - diff;
                else offsets[i] = i > 0 ? offsets[i - 1] : 0;
                if(offsets[i] > limit) {
                    offsets[i] = limit - length + j;
                    j++;
                }
                offsets[i] = Math.floor(offsets[i]);
            }
            offsets[length] = limit + 1;
        }

        function scrollHandler() {
            var scrollTop = win.scrollTop();
            if(scrollTop < offsets[0]) {
                $anchors.parent('li').filter('.on').removeClass('on');
                index = -1;
                return false;
            }
            for(var i=0; i<length; i++) {
                if((i !== index) && (scrollTop >= offsets[i] && scrollTop < offsets[i + 1])) {
                    $anchors.parent('li').filter('.on').removeClass('on');
                    $anchors.parent('li').eq(i).addClass('on');
                    lnbSwiper.slideTo(i);
                    index = i;
                    break;
                }
            }
        }

        function hashHandler() {
            if(location.hash) {
                var hash = parseInt(location.hash.split('#')[1], 10);
                if(isNaN(hash) === true) return false;
                if($anchors.eq(hash - 1).length > 0) {
                    if($('#sitemapWrap').is(':visible') === true) $('.bindSitemapSpread').trigger('click');
                    $anchors.eq(hash - 1).trigger('click');
                }
            }
        }

        function scrollAnim(e) {
            TweenLite.to('html, body', 0.5, {scrollTop: offsets[$(this).parent('li').index()], ease: Expo.easeOut});
            e.preventDefault();
        }

        var $chapters = $('.chapters'),
            $anchors = $('.lnb a');

        var length = $anchors.length,
            offsets = [],
            index = 0,
            diff = $('.lnb_wrap').height() + $('.header_wrap').height(),
            resizeTimer = null;

        $anchors.click(scrollAnim);
        win.scroll(scrollHandler);
        win.resize(function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                setAnchorsOffset();
                scrollHandler();
            }, 100);
        });
        win.on('hashchange load', function() {
            hashHandler();
        });
        win.on('load', function() {
            setAnchorsOffset();
            scrollHandler();
        });

        setAnchorsOffset();
        scrollHandler();
    }());
    // new Swiper('.lyr1_slide_img .swiper-container', {
    //     speed: 500,
    //     autoplay: {
    //         delay: 4000,
    //     },
    //     pagination: {
    //     	el: '.lyr1_paging',
    //     	type: 'bullets',
    //     	clickable: true,
    //     	renderBullet: function(index, className){
    //     		return '<li class="' + className + '"><a href="#none"></a></li>';
    //     	}
    //     },
    // });
    // new Swiper('.lyr1_slide_text .swiper-container', {
    //     speed: 500,
    //     autoplay: {
    //         delay: 4000,
    //     },
    //     pagination: {
    //     	el: '.lyr1_paging',
    //     	type: 'bullets',
    //     	clickable: true,
    //     	renderBullet: function(index, className){
    //     		return '<li class="' + className + '"><a href="#none"></a></li>';
    //     	}
    //     },
    // });
    var imgSwiper = new Swiper($('.lyr1_slide_text .swiper-container'), {
        speed: 500,
        autoplay: {
            delay: 4000,
        },
        pagination: {
        	el: '.lyr1_paging',
        	type: 'bullets',
        	clickable: true,
        	renderBullet: function(index, className){
        		return '<li class="' + className + '"><a href="#none"></a></li>';
        	}
        },
    });
	var textSwiper = new Swiper($('.lyr1_slide_img .swiper-container'), {
        allowTouchMove: false
    });
	imgSwiper.controller.control = textSwiper;
	textSwiper.controller.control = imgSwiper;


    new Swiper('.lyr4_slide .swiper-container', {
        loop:true,
        speed: 500,
        autoplay: {
            delay: 4000,
        },
    });
    new Swiper('.lyr6_slide .swiper-container', {
        slidesPerView: 'auto',
        speed: 500,
        autoplay: {
            delay: 4000,
        },
    });
    new Swiper('.lyr8_slide .swiper-container', {
        speed: 500,
        autoplay: {
            delay: 4000,
        },
        pagination: {
        	el: '.lyr8_paging',
        	type: 'bullets',
        	clickable: true,
        	renderBullet: function(index, className){
        		return '<li class="' + className + '"><a href="#none"></a></li>';
        	}
        },
    });
    new Swiper('.lyr9_slide .swiper-container', {
        slidesPerView: 'auto',
        speed: 500,
        autoplay: {
            delay: 4000,
        },
        pagination: {
        	el: '.lyr9_paging',
        	type: 'bullets',
        	clickable: true,
        	renderBullet: function(index, className){
        		return '<li class="' + className + '"><a href="#none"></a></li>';
        	}
        },
    });
    new Tabbing($('.layer10 .tabmenu'), $('.layer10 .tab_conts'));
}(jQuery))
