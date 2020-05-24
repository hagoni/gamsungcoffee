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
            new DimensionFix($('.main_visual'), {
    			fixElem: $('.main_visual .dimension-fix'),
    			w: 2000,
    			h: 1000
    		}).fix();
        }());

		(function() {
            function scrollHandler() {
                var scrollTop = win.scrollTop(),
                    fixOffset = doc.innerHeight() - win.innerHeight() - $diffElems.height();

                if(scrollTop > fixOffset) $headElems.css({bottom: scrollTop - fixOffset + $headElems.bottom});
                else $headElems.css({bottom: $headElems.bottom});
            }

            var $headElems = $('.btn_inquiry'),
                $diffElems = $('.footer_wrap');

            $headElems.heigth = parseInt($headElems.css('height'), 10);
            $headElems.bottom = parseInt($headElems.css('bottom'), 10);

            var showOffset = doc.innerHeight() - win.innerHeight() >= 200 ? 200 : 0,
                show = false;

            win.scroll(scrollHandler).load(scrollHandler);
            scrollHandler();
        }());

    });
}(jQuery));