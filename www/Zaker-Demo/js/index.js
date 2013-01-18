/*
 * author: fengjichuan
 * date: 2013-01-17
 */

// test date

var _test = [];

for(var i=0;i<10;i++) {
	_test.push(i);
}

(function($) {
	var F = {
		// 主页面wapper的对象
		wapper: null,
		// prev: 上一个页面
		prev: null,
		// next: 下一页面
		next: null,
		// current: 当前页面
		current: null,
		// direction: 滚动方向
		direction: 'left',
		// 当前页面页码
		currentIndex: 1,
		
		init: function() {
			this.wapper = $('.content-wrapper');
			this.current = this.wapper.find('.item').first();
			this.createPage('content...' + _test[this.currentIndex], this.direction);
			this.wapper.find('.item').addClass('anim');
		},
		initEvent: function() {
			$(document.body).bind('touchstart', function(e) {
				e.stopPropagation();
				e.preventDefault();
			}).bind('touchend', function(e) {
				e.stopPropagation();
				e.preventDefault();
			});
			var self = this;
			var hammer = new Hammer(document.getElementById("page-content"));
			hammer.onswipe = function(ev) {
				self.scrollEvent(ev);
			};
		},
		
		_index: 0,
		
		// 主页面新闻feed翻滚事件
		scrollEvent: function(ev) {
			if(ev.direction == 'left') {
				if(this.currentIndex > (_test.length - 1)) {
					return;
				}
				if(this.currentIndex < 0) {
					this.currentIndex == 1;
				}
				if(ev.direction != this.direction) {
					if(this.currentIndex < (_test.length - 2)) {
						(this.currentIndex += 2);
					} else {
						return;
					}
				}
				this.current.addClass('prev');
				this.next.removeClass('next');
			} else if(ev.direction == 'right') {
				if(this.currentIndex < 0) {
					return;
				}
				if(this.currentIndex > (_test.length - 1)) {
					this.currentIndex == (_test.length - 2);
				}
				if(ev.direction != this.direction) {
					if(this.currentIndex > 1) {
						(this.currentIndex -= 2);
					} else {
						return;
					}
				}
				this.current.addClass('next');
				this.prev.removeClass('prev');
			}
				
			this.direction = ev.direction;
			var self = this;
			this.current.bind('webkitTransitionEnd', function(e) {
				self.current.unbind('webkitTransitionEnd');
				if(self.direction == 'left') {
					self.currentIndex ++;
					self.prev && self.prev.remove();
					self.prev = self.current;
					self.current = self.next;
				} else {
					self.currentIndex --;
					self.next && self.next.remove();
					self.next = self.current;
					self.current = self.prev;
				}
				self.createPage(self.currentIndex);
			});
		},
		
		// 创建页面
		createPage: function(content) {
			var direction = this.direction;
			var sty = (direction == 'left') ? ' next' : ' prev';
			var testcolor = ['red', 'blue', 'green', 'grey', 'black', 'pink', 'purple'];
			var div = $('<div class="item anim'+ sty +'"></div>').css({
				'background-color': testcolor[parseInt(Math.random()*7)]
			}).html(content);
			
			if(direction == 'left') {
				this.wapper.append(div);
				this.next = div;
			} else if(direction == 'right') {
				this.wapper.prepend(div);
				this.prev = div;
			}
			return div;
		}
	};
	
	$(function($) {
		F.init();
		F.initEvent();
	});
})(Zepto);


