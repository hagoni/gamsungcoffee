/**************************************************************************************************
 * PreLoader | 프리로더입니다.
 *
 * @class PreLoader
 * @constructor
 * @version 1.0
 *
 * @param {Array} assets 불러올 자원 배열
 * @param {Function} callback 콜백 함수
 *
 **************************************************************************************************/
window.PreLoader = function(assets, callback) {

	'use strict';

	if(this instanceof PreLoader === false) {
		return new PreLoader(assets, callback);
	}

	if(typeof assets !== 'object') return false;

	var _this = this;

	var LENGTH = assets.length;

	var	unit = 100 / LENGTH,
		progress = 0,
		loaded = false,
		imgs = [];

	this.initialize = function() {
		for(var i=0; i<assets.length; i++) {
			imgs[i] = new Image();
			this.setHandler(imgs[i]);
			imgs[i].src = assets[i];
		}
	};

	this.setHandler = function(img) {
		img.onload = this.calculate;
		img.onerror = this.report;
	};

	this.calculate = function() {
		progress += unit;
		if(Math.ceil(progress) >= 100) {
			if(loaded === false) _this.load();
			loaded = true;
		}
	};

	this.report = function() {
		if(typeof console === 'object') console.log(this.src + ' 이미지를 불러올 수 없습니다.');
		_this.calculate();
	}

	this.load = function() {
		if(typeof callback === 'function') callback();
	};

	this.initialize();
};

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

/**************************************************************************************************
 * FlowSlider | 흐르는 슬라이더입니다.
 *
 * @class FlowSlider
 * @constructor
 * @version 1.0
 *
 * @param {Object} container jQuery 객체
 * @param {Object} options 옵션 객체
 *
 **************************************************************************************************/
(function($) {

	'use strict';

	window.FlowSlider = function(container, options) {

		if(this instanceof FlowSlider === false) {
			return new FlowSlider(container, options);
		}

		var _this = this;

		var container = typeof container === 'object' ? container : $('#' + container),
			opt = {autoPlay: true, axis: 'x', pps: 60, unit: 'px', itemsPerView: 4, reverse: false, stopOver: true};

		for(var prop in options) {
			opt[prop] = options[prop];
		}

		var wrapper = container.children(':first-child'),
			items = wrapper.children(),
			initLength = items.length,
			length = initLength;

		if(items.length === 0) return false;

		var	containerDim,
			itemDim,
			scrollMax,
			animProp,
            init = true;

		var tl;

		var assetsLoaded = false,
			preLoadTimer = null,
			playTryCount = 0;

		var resizeTimer = null;

		this.initialize = function() {
			animProp = opt.axis === 'x' ? 'scrollLeft' : 'scrollTop';
			this.assetsPreload(function() {
				assetsLoaded = true;
				_this.setSliderProps();
				_this.setTimeline();
				_this.setHandler();
				_this.flow();
			});
		};

		this.assetsPreload = function(callback) {
			var assets = [];
			container.find('*').each(function(i) {
				if($(this).prop('tagName') === 'IMG') assets.push($(this).attr('src'));
			});
			if(assets.length > 0) new PreLoader(assets, callback);
			else callback();
		};

		this.setSliderProps = function() {
			containerDim = opt.axis === 'x' ? container.width() : container.height();
			itemDim = opt.unit === 'px' ? opt.axis === 'x' ? items.eq(0).outerWidth(true) : items.eq(0).outerHeight(true) : containerDim / opt.itemsPerView;
            if(init === true) {
                var appendCount = itemDim * initLength > containerDim ? 1 : Math.ceil(containerDim / (itemDim * initLength));
				if(appendCount === Infinity) return false;
                for(var i=0; i<appendCount; i++) {
                    items.clone().addClass('flow-items-clone').appendTo(wrapper);
                }
                scrollMax = itemDim * initLength;
            } else {
				if(opt.unit !== 'px') scrollMax = itemDim * initLength;
                if(itemDim * length < containerDim + scrollMax) {
                    var appendCount = Math.ceil(((containerDim + scrollMax) - (itemDim * length)) / scrollMax);
					if(appendCount === Infinity) return false;
                    for(var i=0; i<appendCount; i++) {
                        items.not('.flow-items-clone').clone().addClass('flow-items-clone').appendTo(wrapper);
                    }
                }
            }
            items = wrapper.children();
            length = items.length;
			opt.axis === 'x' ? wrapper.width(itemDim * length) : wrapper.height(itemDim * length);
            if(opt.unit !== 'px') opt.axis === 'x' ? items.width(itemDim) : items.height(itemDim);
            init = false;
		};

		this.setTimeline = function() {
			tl = new TimelineMax({paused: true, repeat: -1});
			var from = {}, to = {ease: Power0.easeNone};
			from[animProp] = opt.reverse === false ? 0 : scrollMax;
			to[animProp] = opt.reverse === false ? scrollMax : 0;
			tl.fromTo(container, scrollMax / opt.pps, from, to);
		};

		this.setHandler = function() {
			$(window).resize(this.handler.resize);
			if(opt.stopOver === true) {
				container.mouseenter(function() {
					if(opt.autoPlay === true) tl.pause();
				}).mouseleave(function() {
					if(opt.autoPlay === true) tl.play();
				});
			}
		};

		this.handler = {
			resize: function() {
				clearTimeout(resizeTimer);
				resizeTimer = setTimeout(function() {
					if(assetsLoaded === true) {
						_this.setSliderProps();
						_this.tlReset();
					}
				}, 100);
			}
		};

		this.tlReset = function() {
			tl.recent().vars.startAt[animProp] = opt.reverse === false ? 0 : scrollMax;
			tl.recent().vars[animProp] = opt.reverse === false ? scrollMax : 0;
			tl.duration(scrollMax / opt.pps);
			tl.invalidate();
		};

		this.flow = function() {
			if(opt.autoPlay === true) tl.play();
		};

		this.play = function() {
			clearTimeout(preLoadTimer);
			if(assetsLoaded === false) {
				if(playTryCount > 50) throw new Error('이미지 로딩이 끝나지 않아 play method를 호출할 수 없습니다.');
				preLoadTimer = setTimeout(function() {
					playTryCount++;
					_this.play();
				}, 100);
				return false;
			}
			if(tl.paused() === true) tl.play();
			opt.autoPlay = true;
		};

		this.stop = function() {
			if(tl.paused() === false) tl.pause();
			opt.autoPlay = false;
		};

		// FlowSlider class 초기화 함수를 호출합니다.
		this.initialize();
	};

}(jQuery));

(function($) {
    doc.ready(function() {
		new YMotion([
			[
				{el: '.el1_0', set: {backgroundPositionX: "0"}, to: {backgroundPositionX: "843", ease: Back.Power0}, d: 2.6},
				{el: '.el1_1', set: {width: "0%"}, to: {width: "100%"}, d: 0.6, t: '-=1.0'},
				{el: '.el1_2', set: {width: "0%"}, to: {width: "100%"}, d: 0.6, t: '-=0.4'},
			],
			[
				{el: '.el2_4', set: {backgroundPositionX: "0"}, to: {backgroundPositionX: "884", ease: Back.Power0}, d: 2.6},
				{el: '.el2_0', set: {width: "0%"}, to: {width: "100%"}, d: 0.6, t: '-=1.6'},
			],
			[
				{el: $('.el2_1'), to: {text: {value: ''}}, d: 0.001},
	            {method: 'add', tl: [
	                TweenMax.to({number: 0}, 0.3, {number: $('.el2_1').data('number'), ease: Back.easeOut, onUpdate: function() {
	                    $('.el2_1').text(parseInt((this.vars['number'] * this.progress()), 10).toLocaleString().split('.')[0]);
	                }, onComplete: function() {
	                    $('.el2_1').text(parseInt(this.vars['number'], 10).toLocaleString().split('.')[0]);
	                }})
	            ]},
				{el: '.el2_1_img', set: {opacity: 0, x: -100}, to: {opacity: 1, x: 0}, d: 0.3},
				{el: $('.el2_2'), to: {text: {value: ''}}, d: 0.001},
	            {method: 'add', tl: [
	                TweenMax.to({number: 0}, 0.4, {number: $('.el2_2').data('number'), ease: Back.easeOut, onUpdate: function() {
	                    $('.el2_2').text(parseInt((this.vars['number'] * this.progress()), 10).toLocaleString().split('.')[0]);
	                }, onComplete: function() {
	                    $('.el2_2').text(parseInt(this.vars['number'], 10).toLocaleString().split('.')[0]);
	                }})
	            ]},
				{el: '.el2_2_img', set: {opacity: 0, x: -100}, to: {opacity: 1, x: 0}, d: 0.3},
				{el: $('.el2_3'), to: {text: {value: ''}}, d: 0.001},
	            {method: 'add', tl: [
	                TweenMax.to({number: 0}, 0.5, {number: $('.el2_3').data('number'), ease: Back.easeOut, onUpdate: function() {
	                    $('.el2_3').text(parseInt((this.vars['number'] * this.progress()), 10).toLocaleString().split('.')[0]);
	                }, onComplete: function() {
	                    $('.el2_3').text(parseInt(this.vars['number'], 10).toLocaleString().split('.')[0]);
	                }})
	            ]},
				{el: '.el2_3_img', set: {opacity: 0, x: -100}, to: {opacity: 1, x: 0}, d: 0.3},
			],
			[
				{el: '.el4_1', to: {scale: 1.15}, d: 5.0}
			]
		]).activate();

        new FlowSlider($('.lyr1_list1.swiper-container'), {
            pps: 40,
            stopOver: false,
        });
        new FlowSlider($('.lyr1_list2.swiper-container'), {
            pps: 40,
            stopOver: false,
        });
        $('.pop_btn').on('click', function(e) {
            e.preventDefault();
            $('#popContainer').show(0);
        });
        $('body').on('click', '.pop_close', function(e) {
            $('#popContainer').hide(0);
            e.preventDefault();
        });
    });
}(jQuery));