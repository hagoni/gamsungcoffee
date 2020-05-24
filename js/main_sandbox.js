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

    window.FPMotion = function($container, motionItems, options) {

        if(this instanceof FPMotion === false) {
			return new FPMotion($container, motionItems, options);
		}

        var _this = this;

		var $container = typeof $container === 'object' ? $container : $('#' + $container),
			opt = {act: true, duration: 1000, selector: '.section'};

        for(var prop in options) {
			opt[prop] = options[prop];
		}

		var	$items = $container.children(opt.selector),
            length = $items.length,
            prevIndex = 0,
			index = 0,
        	assetsLoaded = false,
            sortTl = [],
            tempTl = [],
			queued = false,
			params = {};

        this.initialize = function() {
            if(typeof opt.onInit === 'function') opt.onInit();
            this.assetsPreload();
            if(opt.act === true) {
				this.setElements();
				this.setTimeline();
			}
			params = {
				duration: opt.duration,
				length: length
			};
			this.motion();
		};

        this.assetsPreload = function() {
			var $firstItem = $items.eq(index), bgRegExp = /(url)|[\(\)\'\"]/g, assets = [];
			if($firstItem.css('background-image') !== 'none') assets.push($firstItem.css('background-image').replace(bgRegExp, ''));
			$firstItem.find('*').each(function(i) {
				if($(this).css('background-image') !== 'none') assets.push($(this).css('background-image').replace(bgRegExp, ''));
				if($(this).prop('tagName') === 'IMG') assets.push($(this).attr('src'));
			});
			if(assets.length > 0) {
				new PreLoader(assets, function() {
					assetsLoaded = true;
				});
			} else {
				assetsLoaded = true;
			}
		};

        this.setElements = function() {
			for(var i=0; i<motionItems.length; i++) {
				for(var j=0, o; j<motionItems[i].length; j++) {
					o = motionItems[i][j];
                    if(typeof o.method === 'undefined') {
						if(typeof o.set === 'undefined' || o.el.length === 0) continue;
						TweenMax.set(o.el, o.set);
                    } else {
                        switch(o.method) {
                            case 'add':
								if(typeof o.items === 'object') {
	                                for(var k=0; k<o.items.length; k++) {
										if(typeof o.items[k].set === 'undefined' || o.items[k].el.length === 0) continue;
										TweenMax.set(o.items[k].el, o.items[k].set);
									}
								}
                                break;
                            default:
                                break;
                        }
                    }
				}
			}
			if(assetsLoaded === true) $('#initcloser').remove();
		};

		this.setTimeline = function() {
			for(var i=0; i<motionItems.length; i++) {
				tempTl[i] = new TimelineMax({paused: true});
				for(var j=0, o; j<motionItems[i].length; j++) {
                    o = motionItems[i][j];
					if(typeof o.method === 'undefined' && typeof o.to === 'undefined') continue;
                    if(typeof o.method === 'undefined') {
						if(o.el.length === 0) continue;
						typeof o.t === 'undefined' ? tempTl[i].to(o.el, o.d, o.to) : tempTl[i].to(o.el, o.d, o.to, o.t);
                    } else {
                        switch(o.method) {
							case 'addLabel':
								tempTl[i][o.method](o.label);
								break;
                            case 'add':
								var a = [];
								if(typeof o.items === 'object') {
									for(var k=0; k<o.items.length; k++) {
										if(o.items[k].el.length === 0) continue;
										a[k] = TweenMax.to(o.items[k].el, o.items[k].d, o.items[k].to);
									}
								}
								if(typeof o.tl === 'object') a.push(o.tl);
								typeof o.t === 'undefined' ? tempTl[i][o.method](a) : tempTl[i][o.method](a, o.t);
                                break;
							case 'call':
								typeof o.t === 'undefined' ? tempTl[i][o.method](o.fx) : tempTl[i][o.method](o.fx, null, null, o.t);
								break;
							case 'onPause':
                                tempTl[i][o.method] = o.fx;
								break;
                            default:
                                break;
                        }
                    }
				}
			}

            $items.each(function(i) {
				sortTl[i] = typeof $(this).data('index') === 'number' ? tempTl[$(this).data('index') - 1] : '움직이지 않을래';
			});
			if(typeof sortTl[0] === 'object') sortTl[0].delay(0.4);
		};

        this.motion = function() {
			$container.fullpage({
				css3: false,
				sectionSelector: opt.selector,
				scrollingSpeed: opt.duration,
				verticalCentered: false,
                scrollOverflow: true,
				afterRender: function() {
					if(typeof opt.onReady === 'function') opt.onReady(index, prevIndex, params);
				},
				onLeave: function(i, nextI, dir) {
					prevIndex = i.index;
					index = nextI.index;
					if(typeof opt.onBefore === 'function') opt.onBefore(index, prevIndex, params);
				},
				afterLoad: function(a, i) {
					if(index===4){
						$('.wrapper .fp-scrollable').on('scroll.i4', function(){
							var calcInqBar = ($('.fp-scroller').height()-$('.fp-scrollable').height()-$(this).attr('data-scroll_y')-$('.footer').height())*-1;
							if(calcInqBar>=0){
								$('.br_btns_wrap, .inquiry_bar').stop().css({'bottom':calcInqBar});
							}else{
								$('.br_btns_wrap, .inquiry_bar').stop().css({'bottom':0});
							}
						});
					}else{
						$('.br_btns_wrap, .inquiry_bar').stop().css({'bottom':0});
						$('.wrapper .fp-scrollable').off('scroll.i4');
					}
					if(opt.act === true) {
	                    if(typeof sortTl[prevIndex] === 'object') sortTl[prevIndex].pause(0);
	                    if(typeof sortTl[prevIndex] === 'object' && typeof sortTl[prevIndex]['onPause'] === 'function') sortTl[prevIndex]['onPause']();
	                    if(typeof sortTl[index] === 'object') sortTl[index].play();
	                }
					if(typeof opt.onAfter === 'function') opt.onAfter(index, prevIndex, params);
				}
			});
		};

        this.activate = function() {
			$('#initcloser').remove();
			if(queued === false) {
                if(typeof opt.onStart === 'function') opt.onStart(index, prevIndex, params);
                if(opt.act === true && typeof sortTl[0] === 'object') sortTl[0].play();
                queued = true;
            }
		};

        this.initialize();
    };

}(jQuery));

(function($) {
	$(document).ready(function() {
		// var myFullpage = new fullpage('#fullpage', {
	    //     anchors: ['firstPage', 'secondPage', '3rdPage', '4thPage', '5thPage'],
	    //     scrollOverflow: true
	    // });
        new FPMotion('fullpage', [
            [//main_visual
                {method: 'call', fx: function() {
                    if(typeof $('.main_visual .swiper-container')[0].swiper !== 'object'){
                        new Swiper('.main_visual .swiper-container', {
                            autoplay: false,
                		    setWrapperSize: true,
                		    speed: 500,
                		    //     autoplay: {
                		    //     delay: 5000,
                		    // },
                            navigation: {
                		        nextEl: '.mv_btns.mv_next',
                		        prevEl: '.mv_btns.mv_prev',
                		    },
                		});
                    }
                    if(typeof $('.main_visual .swiper-container')[0].swiper === 'object'){
                        $('.main_visual .swiper-container')[0].swiper.autoplay.start();
                    }
                }},
                {method: 'onPause', fx: function() {
                    if(typeof $('.main_visual .swiper-container')[0].swiper === 'object'){
                        $('.main_visual .swiper-container')[0].swiper.autoplay.stop();
                    }
                }},
                {el: $('.main_visual .num'), to: {text: {value: '-'}}, d: 0.001},
                {method: 'add', tl: [
                    TweenMax.to({number: 0}, 1.0, {number: $('.main_visual .num-1').data('number'), ease: Back.easeOut, onUpdate: function() {
                        $('.main_visual .num-1').text(parseInt((this.vars['number'] * this.progress()), 10).toLocaleString().split('.')[0]);
                    }, onComplete: function() {
                        $('.main_visual .num-1').text(parseInt(this.vars['number'], 10).toLocaleString().split('.')[0]);
                    }})
                ]},
                {el: $('.main_visual .num-2'), to: {text: {value: '-'}}, d: 0.001},
                {method: 'add', tl: [
                    TweenMax.to({number: 0}, 1.0, {number: $('.main_visual .num-2').data('number'), ease: Back.easeOut, onUpdate: function() {
                        $('.main_visual .num-2').text(parseInt((this.vars['number'] * this.progress()), 10).toLocaleString().split('.')[0]);
                    }, onComplete: function() {
                        $('.main_visual .num-2').text(parseInt(this.vars['number'], 10).toLocaleString().split('.')[0]);
                    }})
                ]},
                {el: $('.main_visual .num-3'), to: {text: {value: '-'}}, d: 0.001},
                {method: 'add', tl: [
                    TweenMax.to({number: 0}, 1.0, {number: $('.main_visual .num-3').data('number'), ease: Back.easeOut, onUpdate: function() {
                        $('.main_visual .num-3').text(parseInt((this.vars['number'] * this.progress()), 10).toLocaleString().split('.')[0]);
                    }, onComplete: function() {
                        $('.main_visual .num-3').text(parseInt(this.vars['number'], 10).toLocaleString().split('.')[0]);
                    }})
                ]},
                {el: $('.main_visual .num-4'), to: {text: {value: '-'}}, d: 0.001},
                {method: 'add', tl: [
                    TweenMax.to({number: 0}, 1.0, {number: $('.main_visual .num-4').data('number'), ease: Back.easeOut, onUpdate: function() {
                        $('.main_visual .num-4').text(parseInt((this.vars['number'] * this.progress()), 10).toLocaleString().split('.')[0]);
                    }, onComplete: function() {
                        $('.main_visual .num-4').text(parseInt(this.vars['number'], 10).toLocaleString().split('.')[0]);
                    }})
                ]},
            ],
            [//gamsung
                {method: 'call', fx: function() {
                    if(typeof $('.gamsung_slide .swiper-container')[0].swiper !== 'object'){
                		new Swiper('.gamsung_slide .swiper-container', {
                            autoplay: false,
                		    setWrapperSize: true,
                		    speed: 500,
                		        autoplay: {
                		        delay: 3000,
                		    },
                		    pagination: {
                		    	el: '.gamsung_paging',
                		    	type: 'bullets',
                		    	clickable: true,
                		    	renderBullet: function(index, className){
                		    		return '<li class="' + className + '"><a href="#none"></a></li>';
                		    	}
                		    },
                		});
                    }
                    if(typeof $('.gamsung_slide .swiper-container')[0].swiper === 'object'){
                        $('.gamsung_slide .swiper-container')[0].swiper.autoplay.start();
                    }
                }},
                {method: 'onPause', fx: function() {
                    if(typeof $('.gamsung_slide .swiper-container')[0].swiper === 'object'){
                        $('.gamsung_slide .swiper-container')[0].swiper.autoplay.stop();
                    }
                }},
                {el: $('<div></div>'), to: {}, d: 0.001},//call event 실행용
            ],
            [//collabo
                {method: 'call', fx: function() {
                    if(typeof $('.collabo_slide .swiper-container')[0].swiper !== 'object'){
                		new Swiper('.collabo_slide .swiper-container', {
                		    speed: 1,
                		        autoplay: {
                		        delay: 3000,
                		    },
                		});
                    }
                    if(typeof $('.collabo_slide .swiper-container')[0].swiper === 'object'){
                        $('.collabo_slide .swiper-container')[0].swiper.autoplay.start();
                    }
                }},
                {method: 'onPause', fx: function() {
                    if(typeof $('.collabo_slide .swiper-container')[0].swiper === 'object'){
                        $('.collabo_slide .swiper-container')[0].swiper.autoplay.stop();
                    }
                }},
                {el: $('<div></div>'), to: {}, d: 0.001},//call event 실행용
            ],
            [//trendy
                {method: 'call', fx: function() {
                    if(typeof $('.trendy_slide .swiper-container')[0].swiper !== 'object'){
                		var $swiperItems = $('.trendy_slide .swiper-slide'),
                			$progress,
                			interval = 3000,
                			diameter = 100,
                			radius = diameter / 2,
                			sw2 = 2,
                			cc = Math.floor((radius - sw2) * 2 * Math.PI);

                		var swiper1 = new Swiper('.trendy_slide .swiper-container', {
                			autoplay: {
                				delay: 3000,
                			},
                			speed: 1,
                			effect: 'fade',
                			fadeEffect: {
                				crossFade: true
                			},
                			setWrapperSize: true,
                			pagination: {
                				el: '.trendy_paging',
                				// clickable: true,
                				renderBullet: function(index, className) {
                					var html = '';
                					html += '<li class="swiper-slide ' + className + '">\n';
                					html += '   <svg width="'+ diameter +'" height="'+ diameter +'" viewBox="0 0 '+ diameter +' '+ diameter +'">\n';
                					html += '       <circle cx="'+ radius +'" cy="'+ radius +'" r="'+ (radius - sw2) +'" stroke="#fff" fill="none" stroke-width="'+ sw2 +'" stroke-dasharray="'+ cc +'" stroke-dashoffset="'+ cc +'" transform="rotate(-90 '+ radius +' '+ radius +')" class="progress-circle"></circle>\n';
                					html += '   </svg>\n';
                					html += '   <div class="circ">\n';
                					html += '   	<span class="ico">\n';
                					html += '      		<img src="../img/main/new/trendy_ico'+ $swiperItems.eq(index).data('index') +'.png" alt="">\n';
                					html += '       </span>\n';
                					html += '   </div>\n';
                					html += '   <p class="pg_text">'+ $swiperItems.eq(index).data('text') +'</p>\n';
                					html += '</li>\n';
                					return html;
                				}
                			},
                			on: {
                				slideChangeTransitionEnd: function() {
                					$progress = $('.trendy_paging').find('.progress-circle');
                					var prevI = swiper1.previousIndex, i = swiper1.activeIndex;
                					TweenMax.killTweensOf($progress.eq(prevI));
                					TweenMax.set($progress.eq(prevI), {strokeDashoffset: cc})
                					TweenMax.to($progress.eq(i), interval / 1000, {strokeDashoffset: 0, ease: Power0.easeNone});
                				}
                			}
                		});
                		$progress = $('.trendy_paging').find('.progress-circle');
                		TweenMax.to($progress.eq(0), interval / 1000, {strokeDashoffset: 0, ease: Power0.easeNone});

                		var swiper2 = new Swiper('.trendy_circ .swiper-container', {
                			speed: 1,
                			allowTouchMove: false,
                			effect: 'fade',
                			fadeEffect: {
                				crossFade: true
                			},
                			navigation: {
                				nextEl: '.trendy_circ li',
                			}
                		});
                		swiper1.controller.control = swiper2;
                		swiper2.controller.control = swiper1;
                    }
                    if(typeof $('.trendy_slide .swiper-container')[0].swiper === 'object'){
                        $('.trendy_slide .swiper-container')[0].swiper.autoplay.start();
                    }
                }},
                {method: 'onPause', fx: function() {
                    if(typeof $('.trendy_slide .swiper-container')[0].swiper === 'object'){
                        $('.trendy_slide .swiper-container')[0].swiper.autoplay.stop();
                    }
                }},
                {el: $('<div></div>'), to: {}, d: 0.001},//call event 실행용
            ],
            [//wrapper(brand)
                {el: $('.wrapper .li1 .li_bar span'), set: {width: '0%'}, to: {width:'100%'}, d:1.4},
                {el: $('.wrapper .li2 .li_bar span'), set: {width: '0%'}, to: {width:'100%'}, d:1.4},
                {el: $('.wrapper .li3 .li_bar span'), set: {width: '0%'}, to: {width:'100%'}, d:1.4},
                {el: $('.wrapper .li4 .li_bar span'), set: {width: '0%'}, to: {width:'100%'}, d:1.4},
            ]


        ], {

        });














		(function() {
            return;
            function scrollHandler() {
                var scrollTop = win.scrollTop(),
                    fixOffset = doc.innerHeight() - win.innerHeight() - $diffElems.height();

                if(scrollTop > fixOffset) $headElems.css({bottom: scrollTop - fixOffset + $headElems.bottom});
                else $headElems.css({bottom: $headElems.bottom});

                if(show === false && scrollTop >= showOffset) {
                    $headElems.addClass('scroll');
                    show = true;
                } else if(show === true && scrollTop < showOffset) {
                    $headElems.removeClass('scroll');
                    show = false;
                }
            }

            var $headElems = $('.br_btns_wrap'),
                $diffElems = $('.empty');

            $headElems.bottom = parseInt($headElems.css('bottom'), 10);

            var showOffset = doc.innerHeight() - win.innerHeight() >= 200 ? 200 : 0,
                show = false;

            win.scroll(scrollHandler).load(scrollHandler);
            scrollHandler();
        }());

		// 하단 가맹문의 고정
		(function() {
            function scrollHandler() {
                var scrollTop = win.scrollTop(),
                    fixOffset = doc.innerHeight() - win.innerHeight() - $diffElems.height();

                if(scrollTop > fixOffset) $headElems.css({bottom: scrollTop - fixOffset + $headElems.bottom});
                else $headElems.css({bottom: $headElems.bottom});
            }

            var $headElems = $('.inquiry_bar'),
                $diffElems = $('.empty');

            $headElems.heigth = parseInt($headElems.css('height'), 10);
            $headElems.bottom = parseInt($headElems.css('bottom'), 10);

            var showOffset = doc.innerHeight() - win.innerHeight() >= 200 ? 200 : 0,
                show = false;

            win.scroll(scrollHandler).load(scrollHandler);
            scrollHandler();
        }());

		// 하단 가맹문의 펼쳐짐
		(function() {
			function scrollHandler() {
                var scrollTop = win.scrollTop(),
                    fixOffset = doc.innerHeight() - win.innerHeight() - $diffElems.height();

				// 닫혀있는 상태에서 맨하단으로 갔을시 펼쳐짐
                if(scrollTop > fixOffset && !$('.br_btn_inq').hasClass('open')) {
					// _rsvContainer.css({bottom: scrollTop - fixOffset + _rsvContainer.bottom});
					openTl = new TimelineMax();
					openTl.to(_rsvContainer, 0.8, {left: 0, ease: Power2.easeInOut});
					$('.br_btn_inq').addClass('open');
					_rsvContainer.addClass('open');
				}
                // else _rsvContainer.css({bottom: _rsvContainer.bottom});

            }

            var _rsvContainer = $('.br_inquiry_bnr'),
				$diffElems = $('.empty');

			var showOffset = doc.innerHeight() - win.innerHeight() >= 200 ? 200 : 0,
                show = false;

            _rsvContainer.bottom = parseInt(_rsvContainer.css('bottom'), 10);

            win.scroll(scrollHandler).load(scrollHandler);
            scrollHandler();

			// 버튼으로 제어
			function rsvModuleToggle(e) {
				var $this = $(this);
				if($this.hasClass('open') === false) {
					if(typeof xTl === 'object' && xTl.isActive() === true) xTl.progress(1);
					openTl = new TimelineMax();
					openTl.to(_rsvContainer, 0.8, {left: 0, ease: Power2.easeInOut});
					$(this).addClass('open');
					_rsvContainer.addClass('open');
				} else {
					if(typeof openTl === 'object' && openTl.isActive() === true) openTl.progress(1);
					xTl = new TimelineMax();
					xTl.to(_rsvContainer, 0.8, {left: '100%', ease: Power2.easeInOut});
					$(this).removeClass('open');
					_rsvContainer.removeClass('open');
				}
				e.preventDefault();
			}

			var _opener = $('.br_btn_inq');

			var openTl, xTl;

			_opener.on('click', _opener, rsvModuleToggle);

		}());

		// var trendyPging = $('.trendy_paging li a');
		// new Swiper('.trendy_slide .swiper-container', {
		//     setWrapperSize: true,
		//     speed: 1,
		//         autoplay: {
		//         delay: 2000,
		//     },
		// 	effect: 'fade',
		// 	fadeEffect: {
		// 		crossFade: true
		// 	},
		//     pagination: {
		//     	el: '.trendy_paging',
		//     	type: 'bullets',
		//     	clickable: true,
		//     	renderBullet: function(index, className){
		//     		return '<li class="' + className + '"><a href="#none">'+ trendyPging.eq(index).html() +'</a></li>';
		//     	}
		//     },
		// });




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
		// var cf_hover = false;
		// var btn_hover = false;
		// function setBrBtnPosition(){
		// 	if(cf_hover===true && btn_hover===true){
		// 		$('.br_btns_wrap').stop().animate({'bottom':$('.footer_wrap').height()});
		// 	}else{
		// 		$('.br_btns_wrap').stop().animate({'bottom':0});
		// 	}
		// }
		// $('.cf').mouseenter(function(){
		//
		// }).mouseleave(function(e){
		// 	console.log(e.target);
		// 	if(e.target === $('.br_btns_wrap')[0] || $(e.target).closest('.br_btns_wrap').length > 0)return;
		//
		// });
	});
}(jQuery));