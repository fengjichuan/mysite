/*
 * excellent demo;
 */

(function($) {
	var exl = {
		// 如果支持将会载入css3特效文件，文件载入的回调函数会将 css3Available 属性设置为 true
		css3Available: false,
		// 通用
		// 检测浏览器对css3属性的支持情况
		css3: (function() {
   			var div = document.createElement('div'),
      			vendors = 'Khtml Ms O Moz Webkit'.split(' '),
      			len = vendors.length;
   			return function(prop) {
      			if ( prop in div.style ) return true;
      			prop = prop.replace(/^[a-z]/, function(val) {
         			return val.toUpperCase();
      			});
      			while(len--) {
         			if ( vendors[len] + prop in div.style ) {
            			return true;
         			}
      			}
      			return false;
   			};
		})(),
		
		// 通用
		// 判断浏览器是否支持css3，如果支持，页面中的动画将采用css3的方式呈现
		getCss3File: function(callback) {
			var self = this;
			// 目前暂时在支持webkit内核的浏览器上使用
			// if(this.css3('border-radius')) {
			if($.browser.webkit) {
				$.getScript('../../lib/jquery.transit.js', function() {
					self.css3Available = true;
					if(callback && typeof callback  == 'function') {
						callback();
					}
				}, function() {
					
				});
			}
		},
		
		myScroll: null,
		
		// 
		getIScroll: function(callback) {
			var self = this;
			// 目前暂时在支持webkit内核的浏览器上使用
			if(this.css3('transition')) {
				$.getScript('../../src/iscroll.js', function() {
					self.bindCarousel();
					if(callback && typeof callback  == 'function') {
						callback();
					}
				}, function() {
					
				});
			}
		},
		
		_x: 0,
		
		_page: 0,
		
		// 绑定carousel行为
		bindCarousel: function(start) {
			var self = this;
			this._x = 0;
			start = start ? start : 0;
			this.myScroll && this.myScroll.destroy();
			this.myScroll = new iScroll('wrapper', {
				x: start,
				snap: true,
				momentum: false,
				hScrollbar: false,
				easing: 'cubic-bezier(0,0,0.25,1)',
				onScrollEnd: function () {
					// console.log(this.x);
					if(this.x == self._x) return;
					var pos = this.x < self._x ? '-' : '';
					var _pos = this.x < self._x ? '+' : '-';
					self._x = this.x;
					var fn = self.css3Available ? 'transition' : 'animate';
					var __x = self.css3Available ? 'x' : 'left';
					self._page = this.currPageX;
					$('#indicator > li.active').removeClass('active');
					$('#indicator > li:nth-child(' + (this.currPageX*1+1) + ')').addClass('active');
				
					// console.log($('#indicator > li.active'));
				
					$('#scroller li p').removeAttr('style');
					// console.log(fn);
					
					var ele = $('#scroller li.s-'+ (this.currPageX*1+1)).find('p'),
						l = ele.attr('_x'),
						t = ele.attr('_y');
					ele.css({
						left: _pos + '=' + l,
						top: _pos + '=' + t
					})[fn]({
						x: pos + l,
						y: pos + t,
						opacity: 1
					}, 600, 'snap');
					/*
					$('#scroller li.s-'+ (this.currPageX*1+1)).find('p')[fn]({
						x: pos + '100',
						opacity: 1
					}, 600, 'snap');
					*/
				}
	 		});
	 		// this.myScroll.scrollToPage(this._page, 0);
		},
		
		// 初始化
		init: function() {
			this.getIScroll();
			this.getCss3File();
			$('.s-1 p').css({
				opacity: 1
			});
		},
		// 初始化事件
		ievent: function() {
			var self = this;
			$(document).delegate('.content', 'mouseenter', function(e) {
				$('#prev, #next').show();
			}).delegate('.content', 'mouseleave', function(e) {
				$('#prev, #next').hide();
			}).delegate('#prev', 'click touchstart', function(e) {
				e.stopPropagation();
				e.preventDefault();
				self.myScroll.scrollToPage('prev', 0);
			}).delegate('#next', 'click touchstart', function(e) {
				e.stopPropagation();
				e.preventDefault();
				self.myScroll.scrollToPage('next', 0);
			}).delegate('#indicator li', 'click touchstart', function(e) {
				e.stopPropagation();
				e.preventDefault();
				self.myScroll.scrollToPage($(this).attr('index'), 0);
			}).bind('touchstart', function(e) {
				$('#prev').remove();
				$('#next').remove();
			});
			$(window).bind('orientationchange', function() {
				// self.bindCarousel('-' + w*self._page);
				var w = $(window).width();
				// $('.content').width(w);
				/*
				$('#scroller li').width(w);
				*/
				/*
				if(w < 1000) {
					$('#scroller li .img-1').addClass('img-or');
				} else {
					$('#scroller li .img-1').removeClass('img-or');
				}
				*/
			});
		}
	};
	exl.init();
	exl.ievent();
	window['exl'] = exl;
})(jQuery);

