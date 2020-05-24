/**************************************************************************************************
 * DimensionFix | container를 기준으로 레이어의 보여지는 영역을 조정합니다.
 *
 * @class DimensionFix
 * @constructor
 * @version 1.0
 *
 * @param {Object} container 기준이 되는 요소
 * @param {Object} options 옵션 객체
 *
 **************************************************************************************************/
(function($) {

	'use strict';

	window.DimensionFix = function($container, options) {

		var $this = this;

		var opt = {fixElem: undefined, w: 2000, h: 1000, hAlign: 'center', vAlign: 'center'};

		for(var prop in options) {
			opt[prop] = options[prop];
		}

		this.setDimension = function() {
			var dim = $this.compute();
			if(typeof opt.fixElem === 'object') opt.fixElem.css({width: dim.w, height: dim.h, marginLeft: dim.l, marginTop: dim.t});
		};

		this.getDimension = function() {
			return {w: $container.width(), h: $container.height()};
		};

		this.compute = function() {
			var dimension = $this.getDimension(),
				containerW = dimension.w,
				containerH = dimension.h,
				containerRatio = containerH / containerW,
				fixRatio = opt.h / opt.w,
				w, h, l, t;
			if(fixRatio >= containerRatio) {
				w = containerW;
				h = Math.ceil(opt.h * (containerW / opt.w));
				l = 0;
                if(opt.vAlign.indexOf('%') === -1) {
    				switch(opt.vAlign) {
    					case 'top':
    						t = 0;
    						break;
    					case 'bottom':
    						t = Math.ceil(-(h - containerH));
    						break;
    					default:
                            t = Math.ceil(-(h - containerH) / 2);
                            break;
    				}
                } else {
                    t = Math.ceil(-(h - containerH)) * (parseFloat(opt.vAlign, 10) / 100);
                }
			} else {
				h = containerH;
				w = Math.ceil(opt.w * (containerH / opt.h));
                if(opt.hAlign.indexOf('%') === -1) {
    				switch(opt.hAlign) {
    					case 'left':
    						l = 0;
    						break;
    					case 'right':
    						l = Math.ceil(-(w - containerW));
    						break;
    					default:
                            l = Math.ceil(-(w - containerW) / 2);
                            break;
    				}
                } else {
                    l = Math.ceil(-(w - containerW)) * (parseFloat(opt.hAlign, 10) / 100);
                }
				t = 0;
			}
			return {w: w, h: h, l: l, t: t};
		};

		this.setHandler = function() {
			$(window).resize(this.setDimension);
		};

		this.fix = function() {
			this.setDimension();
			this.setHandler();
		};
	};

}(jQuery));

(function($) {
    doc.ready(function() {

        (function() {
            new DimensionFix($('.sub_visual'), {
    			fixElem: $('.sub_visual .dimension-fix'),
    			w: 1920,
    			h: 1080
    		}).fix();
        }());
		(function() {
		   if(typeof Promise !== 'function') return false;

		   function setPlayOffset() {
		       for(var i=0; i<$headElems.length; i++) {
		           playOffset[i] = $headElems[i].dataOffset.top - window.innerHeight;
		       }
		   }
		   function scrollHandler() {
		       var scrollTop = win.scrollTop();
		       for(var i=0; i<length; i++) {
		           if(play[i] === false && scrollTop >= playOffset[i] && scrollTop < stopOffset[i]) {
		               player[i].play();
		               play[i] = true;
		           } else if(play[i] === true && (scrollTop < playOffset[i] || scrollTop >= stopOffset[i])) {
		               player[i].pause();
		               play[i] = false;
		           }
		           // player[i].getPaused().then(function(p) {
		           // 	console.log(p);
		           // });
		       }
		   }
		   function resizeHandler() {
		       clearTimeout(resizeTimer);
		       resizeTimer = setTimeout(function() {
		           setPlayOffset();
		           scrollHandler();
		       }, 100);
		   }

		   var $headElems = [$('.video_wrap > iframe')],
		       player = [],
		       playOffset = [],
		       stopOffset = [],
		       play = [],
		       length = $headElems.length,
		       resizeTimer = null;

		   for(var i=0; i<length; i++) {
		       if($headElems[i].length === 0) continue;
		       $headElems[i].dataHeight = parseInt($headElems[i].css('height'), 10);
		       $headElems[i].dataOffset = $headElems[i].offset();
		       stopOffset[i] = $headElems[i].dataOffset.top + $headElems[i].dataHeight;
		       player[i] = new Vimeo.Player($headElems[i][0]);
		       // player[i].on('ended', function() {
		       // 	console.log('end');
		       // });
		       play[i] = false;
		   }

		   setPlayOffset();

		   win.scroll(scrollHandler);
		   win.resize(resizeHandler);
		   scrollHandler();
		}());

		(function() {
            function scrollHandler() {
                scroll(win.scrollTop());
            }

			function scroll(s) {
				if(tween === false) {
                    tween = true;
                    prevScrollTop = scrollTop;
                    scrollTop = s;
                    diff = scrollTop - prevScrollTop;
                    winH = win.innerHeight();
                    if(diff > 0 && scrollTop > 0 && scrollTop < winH - $header.cssHeight) {
                        TweenLite.to('html, body', 0.7, {scrollTop: winH - $header.cssHeight, ease: Power2.easeOut, onComplete: function() {
                            $header.addClass('fixed');
                            scrollTop = winH - $header.cssHeight;
                            win.scrollTop(scrollTop);
                            tween = false;
                        }});
                    } else if(diff < 0 && scrollTop < winH - $header.cssHeight) {
                        $header.removeClass('fixed');
                        TweenLite.to('html, body', 0.7, {scrollTop: 0, ease: Power2.easeOut, onComplete: function() {
                            win.scrollTop(0);
                            scrollTop = 0;
                            tween = false;
                        }});
                    } else {
                        tween = false;
                    }
                }
			}

            var prevScrollTop = win.scrollTop(),
                scrollTop = prevScrollTop,
                winH,
                diff,
                tween = false;

            var $header = $('.empty');
            $header.cssHeight = parseInt($header.css('height'), 10);

            win.scroll(scrollHandler).load(scrollHandler);
			scrollHandler();
        }());

		new YMotion([
			[
				{method: 'add', t:'-=1.0', tl: [
					TweenMax.to($('.el1_1'), 1.5, {opacity: 1, repeat: -1, yoyo: true, repeatDelay: 0.8, ease: Bounce.easeOut})
				]},
			],
			[
			],
			[
				{el: '.el3_1', set: {opacity: 0}, to: {opacity: 1}, d: 0.4},
				{el: '.el3_2', set: {opacity: 0}, to: {opacity: 1}, d: 0.4},
				{el: '.el3_3', set: {opacity: 0}, to: {opacity: 1}, d: 0.4},
			],
			[
				{el: '.el4_1', to: {scale: 1.15}, d: 5.0}
			]
		]).activate();
    });
}(jQuery));