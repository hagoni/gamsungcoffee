(function($) {

	'use strict';

	window.YMotion = function(motionItems, options) {

		var _this = this;

        var opt = {oElems: 'motion-offset', rewind: false, oFixed: false, singly: false, half: false, divide: 2};

        for(var prop in options) {
            opt[prop] = options[prop];
        }

		var motionOffsetElems = [],
			motionOffset = [],
			rewindOffset = [],
			limitOffset,
			tempTl = [],
            sortTl = [],
			motionEnded = [],
			prevScrollTop = win.scrollTop(),
			scrollTop = prevScrollTop,
			winH,
			prevDocH,
			docH = doc.height(),
			docDiff = 0,
			queued = false,
			active = false;

		var	LENGTH = motionItems.length;

		this.initialize = function() {
			this.setMotionOffset();
			this.setElements();
			this.setTimeline();
		};

		this.setMotionOffset = function() {
			$('[data-' + opt.oElems + ']').each(function(i) {
				motionOffsetElems[i] = $(this);
				motionOffsetElems[i].data({offset: motionOffsetElems[i].offset().top, height: parseFloat(motionOffsetElems[i].css('height'), 10)});
			});

			prevDocH = docH;
			docH = doc.height();
			docDiff = docH - prevDocH;
			winH = win.height();
			limitOffset = docH - winH;
			for(var i=0, j=0, tempH; i<motionOffsetElems.length; i++) {
				tempH = opt.half === false ? motionOffsetElems[i].data('height') : motionOffsetElems[i].data('height') / 2;
				motionOffset[i] = tempH > winH / opt.divide ? (motionOffsetElems[i].data('offset') + docDiff) - winH + (winH / opt.divide) : (motionOffsetElems[i].data('offset') + docDiff) - winH + tempH;
				if(typeof motionOffsetElems[i].data('diff') === 'number') motionOffset[i] -= motionOffsetElems[i].data('diff');
				if(motionOffset[i] > limitOffset) {
					motionOffset[i] = limitOffset - motionOffsetElems.length + j;
					j++;
				}
				if(opt.oFixed === true && motionOffset[i] < 0) motionOffset[i] = 0;
				rewindOffset[i] = motionOffset[i];
			}
			motionOffset[motionOffsetElems.length] = limitOffset + 1;
			rewindOffset[motionOffsetElems.length] = limitOffset + 1;
		};

		this.setElements = function() {
			for(var i=0; i<LENGTH; i++) {
				for(var j=0, o; j<motionItems[i].length; j++) {
					o = motionItems[i][j];
                    if(typeof o.method === 'undefined') {
						if(o.el.length === 0) continue;
						if(o.effect === 'text') {
							$(o.el).each(function(k) {
								var _text = $(this).html();
								var html = '';
								var text = _text.replace(/\<br(\s?\/?)\>/g, '^').replace('&amp;', '&');
								for(var l=0; l<text.length; l++) {
									if(text[l] !== '^') html += '<i>'+ text[l] +'</i>';
									else html += '<br>';
								}
								$(this).html(html);
							});
						}
						if(typeof o.set === 'undefined') continue;
                        TweenMax.set(o.el, o.set);
                    } else {
                        switch(o.method) {
                            case 'add':
								if(typeof o.items === 'object') {
	                                for(var k=0; k<o.items.length; k++) {
										if(typeof o.items[k].set === 'undefined' || o.items[k] instanceof TimelineMax === true || o.items[k].el.length === 0) continue;
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
		};

		this.setTimeline = function() {
			for(var i=0; i<LENGTH; i++) {
				tempTl[i] = new TimelineMax({paused: true, onComplete: function() {
					if(opt.singly === true) {
						queued = false;
						_this.handler.scroll();
					}
				}, onReverseComplete: function() {
					if(opt.singly === true) {
						queued = false;
						if(opt.oFixed === false) _this.handler.scroll();
						else {
							if(scrollTop <= 0 && scrollTop - prevScrollTop <= 0) {
								prevScrollTop = 0.5;
								_this.scroll();
							}
						}
					} else {
						if(opt.oFixed === true && scrollTop <= 0 && scrollTop - prevScrollTop <= 0) {
							prevScrollTop = 0.5;
							_this.scroll();
						}
					}
				}});
				motionEnded[i] = false;
				for(var j=0, o; j<motionItems[i].length; j++) {
                    o = motionItems[i][j];
					if(typeof o.method === 'undefined' && typeof o.to === 'undefined') continue;
                    if(typeof o.method === 'undefined') {
						if(o.el.length === 0) continue;
						if(o.effect !== 'text') {
							typeof o.t === 'undefined' ? tempTl[i].to(o.el, o.d, o.to) : tempTl[i].to(o.el, o.d, o.to, o.t);
						} else {
							$(o.el).each(function(k) {
								$(this).find('i').each(function(l) {
									if($.trim($(this).text()) !== '') typeof o.t === 'undefined' ? tempTl[i].to($(this), o.d, o.to) : tempTl[i].to($(this), o.d, o.to, l > 0 ? o.t : '+=0');
								});
							});
						}
                    } else {
                        switch(o.method) {
							case 'addLabel':
								tempTl[i][o.method](o.label);
								break;
                            case 'add':
								var a = [];
								if(typeof o.items === 'object') {
									for(var k=0; k<o.items.length; k++) {
										if(o.items[k] instanceof TimelineMax === true || o.items[k].el.length === 0) continue;
										a[k] = TweenMax.to(o.items[k].el, o.items[k].d, o.items[k].to);
									}
								}
								if(typeof o.tl === 'object') a.push(o.tl);
								typeof o.t === 'undefined' ? tempTl[i][o.method](a) : tempTl[i][o.method](a, o.t);
                                break;
							case 'call':
								typeof o.t === 'undefined' ? tempTl[i][o.method](o.fx) : tempTl[i][o.method](o.fx, null, null, o.t);
                            default:
                                break;
                        }
                    }
				}
			}
            for(var i=0; i<motionOffsetElems.length; i++) {
				sortTl[i] = typeof +motionOffsetElems[i].data(opt.oElems) === 'number' ? tempTl[+motionOffsetElems[i].data(opt.oElems) - 1] : '움직이지 않을래';
			}
		};

		this.setHandler = function() {
			win.scroll(this.handler.scroll).resize(this.handler.resize);
		};

        this.handler = {
            scroll: function() {
				prevScrollTop = scrollTop;
				_this.scroll();
            },
            resizeTimer: null,
            resize: function() {
                clearTimeout(_this.handler.resizeTimer);
				_this.handler.resizeTimer = setTimeout(function() {
					_this.setMotionOffset();
					_this.handler.scroll();
				}, 100);
            }
        };

		this.scroll = function() {
			scrollTop = win.scrollTop() >= 0 ? (win.scrollTop() <= limitOffset ? win.scrollTop() : limitOffset) : 0;
			opt.rewind === false ? _this.motion() : scrollTop - prevScrollTop >= 0 ? _this.motion() : _this.rewind();
		};

		this.motion = function() {
			for(var i=0; i<LENGTH; i++) {
				if(scrollTop >= motionOffset[i] && motionEnded[i] === false && typeof sortTl[i] === 'object') {
					if(opt.singly === false) {
						sortTl[i].timeScale(1).play();
						motionEnded[i] = true;
					} else {
						if(i === 0 || sortTl[i - 1].isActive() === false && queued === false) {
							sortTl[i].timeScale(1).play();
							motionEnded[i] = true;
						} else if(i > 0 && sortTl[i - 1].isActive() === true) {
							queued = true;
						}
					}
				}
			}
		};

		this.rewind = function() {
			for(var i=LENGTH - 1; i>-1; i--) {
				if(scrollTop <= rewindOffset[i] && motionEnded[i] === true && typeof sortTl[i] === 'object') {
					if(opt.singly === false) {
						sortTl[i].timeScale(2).reverse();
						motionEnded[i] = false;
					} else {
						if(i === LENGTH - 1 || sortTl[i + 1].isActive() === false && queued === false) {
							sortTl[i].timeScale(2).reverse();
							motionEnded[i] = false;
						} else if(i < LENGTH - 1 && sortTl[i + 1].isActive() === true) {
							queued = true;
						}
					}
				}
			}
		};

		this.activate = function() {
            if(active === false) {
                this.setHandler();
                this.handler.scroll();
                active = true;
            }
		};

		this.disable = function() {
			for(var i=0; i<LENGTH; i++) {
				if(typeof sortTl[i] === 'object') sortTl[i].progress(1);
				motionEnded[i] = true;
			}
		};

		this.reset = function() {
			$('[data-' + opt.oElems + ']').each(function(i) {
				motionOffsetElems[i] = $(this);
				motionOffsetElems[i].data({offset: motionOffsetElems[i].offset().top, height: parseFloat(motionOffsetElems[i].css('height'), 10)});
			});
			for(var i=0; i<LENGTH; i++) {
				if(typeof sortTl[i] === 'object') sortTl[i].pause(0);
				motionEnded[i] = false;
				queued = false;
			}
			this.setMotionOffset();
			this.handler.scroll();
		};

		this.initialize();
	};

}(jQuery));

(function($) {
	$(document).ready(function() {
		(function() {
            function scrollHandler() {
                var scrollTop = win.scrollTop();
                if(fixed === false && scrollTop >= offset) {
                    $topElement.addClass('fixed');
                    fixed = true;
                } else if(fixed === true && scrollTop < offset) {
                    $topElement.removeClass('fixed');
                    fixed = false;
                }
            }

            var $topElement = $('.lnb_wrap'),
                offset = $('.lnb_wrap').offset().top,
                fixed = false;

            win.scroll(scrollHandler);
            scrollHandler();
        }());


		var file_name = document.URL.substring(document.URL.lastIndexOf("/") + 1, document.URL.length);
		if (file_name == 'fran.html') {
			function check_reload() {
				(function() {
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
		                $diffElems = $('.bottom_area');


		            $headElems.bottom = parseInt($headElems.css('bottom'), 10);

		            var showOffset = doc.innerHeight() - win.innerHeight() >= 200 ? 200 : 0,
		                show = false;

		            win.scroll(scrollHandler).load(scrollHandler);
		            scrollHandler();

		        }());

				// 탑버튼
				(function() {
		            function scrollHandler() {
		                var scrollTop = win.scrollTop();

		                if(show === false && scrollTop >= showOffset) {
		                    $topElems.addClass('btn_scroll');
		                    show = true;
		                } else if(show === true && scrollTop < showOffset) {
		                    $topElems.removeClass('btn_scroll');
		                    show = false;
		                }
		            }

		            var $topElems = $('.br_btn_top'),
		                $diffElems = $('.bottom_area');

		            var showOffset = doc.innerHeight() - win.innerHeight() >= 600 ? 600 : 0,
		                show = false;

					$topElems.click(function(e) {
						$('html, body').stop().animate({scrollTop: 0}, 200);
						e.preventDefault();
					});

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
		                $diffElems = $('.bottom_area');

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

						// 열려있는 상태에서 맨위로 갔을시 닫힘
						if($('.br_btn_inq').hasClass('open') === true && scrollTop < showOffset) {
							openTl = new TimelineMax();
							openTl.to(_rsvContainer, 0.8, {left: '100%', ease: Power2.easeInOut});
							$('.br_btn_inq').removeClass('open');
		                    show = false;
		                }
		            }

		            var _rsvContainer = $('.br_inquiry_bnr'),
						$diffElems = $('.bottom_area');

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
			}

			(function() {
	            function scrollHandler() {
	                var scrollTop = win.scrollTop(),
	                    fixOffset = doc.innerHeight() - win.innerHeight() - $diffElems.height();

	                if(scrollTop > fixOffset) $headElems.css({bottom: scrollTop - fixOffset + $headElems.bottom});
	                else $headElems.css({bottom: $headElems.bottom});
	            }

	            var $headElems = $('.br_btns_wrap'),
	                $diffElems = $('.bottom_area');

	            $headElems.bottom = parseInt($headElems.css('bottom'), 10);

	            var showOffset = doc.innerHeight() - win.innerHeight() >= 200 ? 200 : 0;

	            win.scroll(scrollHandler).load(scrollHandler);
	            scrollHandler();

				$headElems.addClass('scroll');
	        }());



			// 탑버튼
			(function() {
	            function scrollHandler() {
	                var scrollTop = win.scrollTop();

	                if(show === false && scrollTop >= showOffset) {
	                    $topElems.addClass('btn_scroll');
	                    show = true;
	                } else if(show === true && scrollTop < showOffset) {
	                    $topElems.removeClass('btn_scroll');
	                    show = false;
	                }
	            }

	            var $topElems = $('.br_btn_top'),
	                $diffElems = $('.bottom_area');

	            var showOffset = doc.innerHeight() - win.innerHeight() >= 600 ? 600 : 0,
	                show = false;

				$topElems.click(function(e) {
					$('html, body').stop().animate({scrollTop: 0}, 200);
					e.preventDefault();
				});

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
	                $diffElems = $('.bottom_area');

	            $headElems.heigth = parseInt($headElems.css('height'), 10);
	            $headElems.bottom = parseInt($headElems.css('bottom'), 10);

	            var showOffset = doc.innerHeight() - win.innerHeight() >= 200 ? 200 : 0,
	                show = false;

	            win.scroll(scrollHandler).load(scrollHandler);
	            scrollHandler();
	        }());

			// 버튼으로 제어
			function rsvModuleToggle(e) {
				check_load = true;
				var $this = $(this);
				if(typeof openTl === 'object' && openTl.isActive() === true) openTl.progress(1);
				xTl = new TimelineMax();
				xTl.to($('.br_inquiry_bnr'), 0.8, {left: '100%', ease: Power2.easeInOut});
				$(this).removeClass('open');
				$('.br_inquiry_bnr').removeClass('open');

				check_reload();

				e.preventDefault();
			}

			openTl = new TimelineMax();
			openTl.to($('.br_inquiry_bnr'), 0.8, {left: 0, ease: Power2.easeInOut});
			$('.br_inquiry_bnr').addClass('open');
			$('.br_btn_inq').addClass('open');

			$('.br_btn_inq').on('click', $('.br_btn_inq'), rsvModuleToggle);
		} else {
			(function() {
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
	                $diffElems = $('.bottom_area');


	            $headElems.bottom = parseInt($headElems.css('bottom'), 10);

	            var showOffset = doc.innerHeight() - win.innerHeight() >= 200 ? 200 : 0,
	                show = false;

	            win.scroll(scrollHandler).load(scrollHandler);
	            scrollHandler();

				if (file_name == 'fran.html') {
					$headElems.addClass('scroll');
					show = true;
				}
	        }());

			// 탑버튼
			(function() {
	            function scrollHandler() {
	                var scrollTop = win.scrollTop();

	                if(show === false && scrollTop >= showOffset) {
	                    $topElems.addClass('btn_scroll');
	                    show = true;
	                } else if(show === true && scrollTop < showOffset) {
	                    $topElems.removeClass('btn_scroll');
	                    show = false;
	                }
	            }

	            var $topElems = $('.br_btn_top'),
	                $diffElems = $('.bottom_area');

	            var showOffset = doc.innerHeight() - win.innerHeight() >= 600 ? 600 : 0,
	                show = false;
				var file_name = document.URL.substring(document.URL.lastIndexOf("/") + 1, document.URL.length);

				$topElems.click(function(e) {
					$('html, body').stop().animate({scrollTop: 0}, 200);
					e.preventDefault();
				});

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
	                $diffElems = $('.bottom_area');

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

					// 열려있는 상태에서 맨위로 갔을시 닫힘
					if($('.br_btn_inq').hasClass('open') === true && scrollTop < showOffset) {
						openTl = new TimelineMax();
						openTl.to(_rsvContainer, 0.8, {left: '100%', ease: Power2.easeInOut});
						$('.br_btn_inq').removeClass('open');
	                    show = false;
	                }
	            }

	            var _rsvContainer = $('.br_inquiry_bnr'),
					$diffElems = $('.bottom_area');

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
				var file_name = document.URL.substring(document.URL.lastIndexOf("/") + 1, document.URL.length);

				var openTl, xTl;

				_opener.on('click', _opener, rsvModuleToggle);

			}());
		}



		(function() {
			if($('.chapters').length === 0) return false;

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
                diff = $('.lnb_wrap.fixed').height(),
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

        (function() {
            function scrollHandler() {
                var scrollTop = win.scrollTop(),
                    fixOffset = doc.innerHeight() - win.innerHeight() - $diffElems.height();

                if(scrollTop > fixOffset) $headElems.css({bottom: scrollTop - fixOffset + $headElems.bottom});
                else $headElems.css({bottom: $headElems.bottom});
            }

            var $headElems = $('.btn_inquiry'),
                $diffElems = $('.bottom_area');

            $headElems.heigth = parseInt($headElems.css('height'), 10);
            $headElems.bottom = parseInt($headElems.css('bottom'), 10);

            var showOffset = doc.innerHeight() - win.innerHeight() >= 200 ? 200 : 0,
                show = false;

            win.scroll(scrollHandler).load(scrollHandler);
            scrollHandler();
        }());
		(function() {
            var bnrMotion = [
                [
                    {el: '.sub_visual_bg', to: {scale: 1.05}, d: 5.0}
                ]
            ];
            new YMotion(bnrMotion, {oElems: 'sub-offset'}).activate();
        }());
	});
}(jQuery));
