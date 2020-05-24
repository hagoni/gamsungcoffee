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

(function($) {
    doc.ready(function() {
        new YMotion([
            [
                {el: '.el1_0', set: {backgroundPositionX: "0"}, to: {backgroundPositionX: "786", ease: Back.Power0}, d: 2.6},
                {el: '.el1_1', set: {width: "0%"}, to: {width: "100%"}, d: 0.6, t: '-=1.0'},
            ],
            [
                {el: $('.el2_1'), to: {text: {value: ''}}, d: 0.001},
                {method: 'add', tl: [
                    TweenMax.to({number: 0}, 3, {number: $('.el2_1').data('number'), ease: Back.easeOut, onUpdate: function() {
                        $('.el2_1').text(parseInt((this.vars['number'] * this.progress()), 10).toLocaleString().split('.')[0]);
                    }, onComplete: function() {
                        $('.el2_1').text(parseInt(this.vars['number'], 10).toLocaleString().split('.')[0]);
                    }})
                ]},
                {el: '.el2_0', to: {scale: 1.15}, d: 5.0, t: '-=3.0'},
            ],
        ]).activate();

        var lyr1Pging = $('.lyr1_paging li');
        new Swiper('.lyr1_slide .swiper-container', {
            setWrapperSize: true,
            speed: 500,
                autoplay: {
                delay: 5000,
            },
            effect: 'fade',
            fadeEffect: {
            	crossFade: true
            },
            pagination: {
            	el: '.lyr1_paging',
            	type: 'bullets',
            	clickable: true,
            	renderBullet: function(index, className){
            		return '<li class="' + className + '">'+ lyr1Pging.eq(index).html() +'</li>';
            	}
            },
        });
        new Swiper('.lyr3_slide .swiper-container', {
            loop:true,
            speed: 1,
                autoplay: {
                delay: 1000,
            },
            effect: 'fade',
            fadeEffect: {
            	crossFade: true
            }
        });
        var lyr4_slide = new Swiper('.lyr4_slide .swiper-container', {
            loop:true,
            speed: 1,
                autoplay: {
                delay: 2000,
            },
            effect: 'fade',
            fadeEffect: {
            	crossFade: true
            },
            on: {
                slideChangeTransitionStart : function(){
                    var prevI = this.previousIndex, i = this.activeIndex;
                    var slides = $('.lyr4_slide .swiper-slide');
                    if(slides.eq(prevI).attr('data-bg')!=slides.eq(i).attr('data-bg'))TweenMax.to($('.line_title img'), 2, {backgroundColor:slides.eq(i).attr('data-bg')});
                    if(slides.eq(prevI).attr('data-bg')!=slides.eq(i).attr('data-bg'))TweenMax.to($('.layer4'), 2, {backgroundColor:slides.eq(i).attr('data-bg')});
                    $('.lyr4_ttl img').attr('src', $('.lyr4_ttl img').attr('data-src').replace('(collabo)',slides.eq(i).attr('data-collabo')));
                    $('.lyr4_logo img').attr('src', $('.lyr4_logo img').attr('data-src').replace('(collabo)',slides.eq(i).attr('data-collabo')));
                }
            }
        });
        // window.a = lyr4_slide;
        // lyr4_slide.on('slideChange', function () {
        //     var slide = $(lyr4_slide.slides[lyr4_slide.activeIndex]);
        //
        //
        // });
});
}(jQuery));