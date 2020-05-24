(function($) {

    'use strict';

	window.Counting = function(elems, options) {

		var _this = this;

        var opt = {type: 'text', unit: 'px', duration: 100, delay: 1000, interval: 5000, repeat: 0, loop: 1, diff: 100, min: 0, max: 10, slowFx: false, slowV: 10, anim: false};

		for(var prop in options) {
			opt[prop] = options[prop];
		}

		var	numbers = [], repeatTimer = null, slotTimer = [], repeat = 0, distance = opt.max - opt.min, slowlyI = 0, animTl = [];

		var LENGTH = elems.length,
            LIMIT = distance * opt.loop * LENGTH - 1;

		this.initialize = function() {
			for(var i=0, start; i<LENGTH; i++) {
                numbers[i] = [];
				start = elems.eq(i).data('number') + 1;
				for(var j=0; j<distance * opt.loop; j++) {
					if(opt.anim === false && start === distance) start = opt.min;
					numbers[i][j] = start;
					start++;
				}
			}
            if(opt.type === 'img' && opt.anim === true) {
                this.setTimeline();
            }
		};

        this.action = function() {
            if(opt.type === 'img' && opt.anim === true) {
                for(var i=0; i<LENGTH; i++) {
                    animTl[i].restart(true, false);
                }
            } else {
                for(var i=0; i<LENGTH; i++) {
                    for(var j=0; j<distance * opt.loop; j++) {
                        this.queue(i, j);
                    }
                }
            }
        };

        this.queue = function(i, j) {
            if(opt.slowFx === true) j - (distance * (opt.loop - 1)) >= 0 ? slowlyI++ : slowlyI = 0;
            var t = (j * opt.duration) + (i * opt.delay) + (Math.pow(slowlyI, 2) * opt.slowV);
            var k = distance * opt.loop * i + j;
            slotTimer[k] = setTimeout(function() {
                if(opt.type === 'text') {
                    elems.eq(i).text(numbers[i][j]);
                } else {
                    opt.unit === 'px' ? elems.eq(i).css({backgroundPositionY: -(opt.diff * numbers[i][j])}) : elems.eq(i).css({top: -(numbers[i][j] * 100) + '%'});
                }
                if(k === LIMIT) {
                    if(opt.repeat === 1 || repeat < opt.repeat - 1) {
                        _this.setTimer();
                        repeat++;
                    } else {
                        typeof opt.callback === 'function' ? opt.callback() : null;
                    }
                }
            }, t);
		};

		this.setTimer = function() {
			clearTimeout(repeatTimer);
			repeatTimer = setTimeout(function() {
				_this.action();
			}, opt.interval);
		};

        this.setTimeline = function(i, j) {
            for(var i=0; i<LENGTH; i++) {
                animTl[i] = new TimelineLite({paused: true, delay: i * (opt.delay / 1000), onComplete: function() {
                    if(opt.repeat === 1 || repeat < opt.repeat - 1) {
                        _this.setTimer();
                        repeat++;
                    } else {
                        typeof opt.callback === 'function' ? opt.callback() : null;
                    }
                }});
                for(var j=0; j<distance * opt.loop; j++) {
                    if(opt.slowFx === true) j - (distance * (opt.loop - 1)) >= 0 ? slowlyI++ : slowlyI = 0;
                    if(opt.unit === 'px') {
                        animTl[i].to(elems.eq(i), (opt.duration / 1000) + (Math.pow(slowlyI, 2) * (opt.slowV / 1000)), {backgroundPositionY: -(opt.diff * numbers[i][j])});
                    } else {
                        animTl[i].to(elems.eq(i), (opt.duration / 1000) + (Math.pow(slowlyI, 2) * (opt.slowV / 1000)), {top: -(numbers[i][j] * 100) + '%'});
                    }
                }
            }
        };

		this.initialize();
	};

}(jQuery));


var swiper2 = new Swiper('.story_img_slide  > .swiper-container', {
    setWrapperSize: true,
    allowTouchMove: false
});
var swiper_collabo = new Swiper('.collabo  > .swiper-container', {
    setWrapperSize: true,
    allowTouchMove: true,
    loop: true,
    autoplay: {
        duration: 3000
    }
});
swiper_collabo.autoplay.stop();

var swiper1 = new Swiper('.story_text_slide > .swiper-container', {
    autoplay: {
        duration: 3000
    },
    setWrapperSize: true,
    slidesPerView: 'auto',
    spaceBetween: 55,
    loop: true,
    navigation: {
        prevEl: '.story_btns.story_prev',
        nextEl: '.story_btns.story_next'
    },
    on: {
        slideChangeTransitionStart: function() {
            if(typeof swiper1 === 'object') swiper2.slideTo(swiper1.realIndex);
        },
        init: function() {

        }
    }
});

var custPging = $('.drink_paging li a');
new Swiper('.drink_slide .swiper-container', {
    setWrapperSize: true,
    speed: 1,
        autoplay: {
        delay: 2000,
    },
    pagination: {
    	el: '.drink_paging',
    	type: 'bullets',
    	clickable: true,
    	renderBullet: function(index, className){
    		return '<li class="' + className + '"><a href="#none">'+ custPging.eq(index).html() +'</a></li>';
    	}
    },
});
$('.drink_paging li').hover(function() {
    $( this ).trigger( "click" );
});

new Swiper('.gs_slide .swiper-container', {
    setWrapperSize: true,
    speed: 500,
        autoplay: {
        delay: 3000,
    },
    slidesPerView: 'auto',
    loop: true,
    pagination: {
    	el: '.gs_paging',
    	type: 'bullets',
    	clickable: true,
    	renderBullet: function(index, className){
    		return '<li class="' + className + '"><a href="#none"></a></li>';
    	}
    },
});

function boxloop(index) {
	$('.bg_texts li').each(function(i) {
		var box = $(this);
		// var $elements = $('.section3 .box');
		setTimeout(function() {
			box.addClass('active');
			box.siblings().removeClass('active');
			// boxloop((index + 1) % $elements.length);
		}, 500 * i);
	});
}
new YMotion([
    [
		{method: 'call', fx: function() {
			boxloop(0);
			setInterval(function() {
		        boxloop(0);
		    }, 8000);
		}}
    ],
    [
		{method: 'call', fx: function() {
			counter1.action();
		}}
    ],
    [
		{method: 'call', fx: function() {
			swiper_collabo.autoplay.start();
		}}
    ],
    [
        {el: '.el3_0', set: {backgroundPositionX: "0"}, to: {backgroundPositionX: "697", ease: Back.Power0}, d: 2.0},
        {el: '.el3_1', set: {width: "0%"}, to: {width: "100%"}, d: 0.6, t: '-=0.6'},
		{method: 'call', fx: function() {
			counter2.action();
		}}
    ],
    [
        {el: '.el4_0', set: {backgroundPositionX: "0"}, to: {backgroundPositionX: "1037", ease: Back.Power0}, d: 2.0},
        {el: '.el4_1', set: {width: "0%"}, to: {width: "100%"}, d: 0.6, t: '-=0.4'},
		{method: 'call', fx: function() {
			counter3.action();
		}},
        {method: 'call', fx: function() {
			counter4.action();
		}}
    ],
    [
        {el: '.el5_0', set: {backgroundPositionX: "0"}, to: {backgroundPositionX: "795", ease: Back.Power0}, d: 2.0},
    ],
    [
        {el: '.el6_1', to: {scale: 1.15}, d: 5.0}
    ]
]).activate();

var counter1 = new Counting($('.numbers > span'), {
	duration: 50,
	delay: 300,
	interval: 4000,
	repeat: 0
});
var counter2 = new Counting($('.ratio_numbers > .num'), {
	duration: 50,
	delay: 300,
	interval: 4000,
	repeat: 0
});
var counter3 = new Counting($('.sig_numbers1 > .num'), {
	duration: 50,
	delay: 300,
	interval: 4000,
	repeat: 0
});
var counter4 = new Counting($('.sig_numbers2 > .num'), {
	duration: 50,
	delay: 300,
	interval: 4000,
	repeat: 0
});

new Tabbing($('.safe_tab'), $('.safe_tabconts'));
new Tabbing($('.fran .tabmenu'), $('.fran_tabconts'));
new Swiper('.safe_slide1 .swiper-container', {
    setWrapperSize: true,
    speed: 500,
        autoplay: {
        delay: 3000,
    },
    pagination: {
    	el: '.sf_slide1_pg',
    	type: 'bullets',
    	clickable: true,
    	renderBullet: function(index, className){
    		return '<li class="' + className + '"><a href="#none"></a></li>';
    	}
    },
    observer: true,
    observeParents: true
});
new Swiper('.safe_slide2 .swiper-container', {
    setWrapperSize: true,
    speed: 500,
        autoplay: {
        delay: 3000,
    },
    pagination: {
    	el: '.sf_slide2_pg',
    	type: 'bullets',
    	clickable: true,
    	renderBullet: function(index, className){
    		return '<li class="' + className + '"><a href="#none"></a></li>';
    	}
    },
    observer: true,
    observeParents: true
});
new Swiper('.safe_slide3 .swiper-container', {
    setWrapperSize: true,
    speed: 500,
        autoplay: {
        delay: 3000,
    },
    pagination: {
    	el: '.sf_slide3_pg',
    	type: 'bullets',
    	clickable: true,
    	renderBullet: function(index, className){
    		return '<li class="' + className + '"><a href="#none"></a></li>';
    	}
    },
    observer: true,
    observeParents: true
});

new Swiper('.popular_slide .swiper-container', {
    slidesPerView: 'auto',
    loop:true,
    freeMode: true,
    speed: 500,
        autoplay: {
        delay: 3000,
    },
    navigation: {
        nextEl: '.pp_btns.pp_next',
        prevEl: '.pp_btns.pp_prev',
    }
});
