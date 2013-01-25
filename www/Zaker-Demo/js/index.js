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
		// 初始化的坐标
		ogappos: [],
		// 存储首页面app icon的位置坐标
		appos: [],
		// 默认app icon坐标位置
		defpos: [],
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
		
		// 
		scrollFlag: false,
		
		init: function() {
			// 初始化启动页面的app icon
			this.initApp($('#main-page .box'));
			
			this.wapper = $('.content-wrapper');
			this.current = this.wapper.find('.item').first();
			this.createPage('content...' + _test[this.currentIndex], this.direction);
			this.wapper.find('.item').addClass('anim');
		},
		initEvent: function() {
			// 阻止事件的滚动
			$(document.body).bind('touchmove', function(e) {
				// if(self.scrollFlag) return;
				e.stopPropagation();
				e.preventDefault();
			});
			
			
			/**
			 * zepto.hammer.js的swipe事件无法将hammer.js类库中的 event.direction 等属性继承过来；
			 * 因此在绑定 swipe 事件的时候采用 hammer.js 原生的绑定方式；
			 * 目前还没有时间发现这个问题到底出在哪里。。。
			 */
			var self = this;
			
			// 内容页面元素对象
			var pagecontent = $('#page-content');
			// 启动对象元素对象
			var launchbox = $('.launch-anim');
			// 首页面元素对象
			var mainpage = $('#main-page');
			// 内容详情页面元素对象
			var infocontent = $('#info-content');
			// 二级内容详情页面元素
			var infocontent2 = $('#info-content2');
			// 设置页面的元素对象
			var setcontent = $('#set-content');
			// var _pagecontent = new Hammer(pagecontent[0]);
			
			// 内容页面 左滑动
			pagecontent.swipeLeft(function(e) {
				e['direction'] = 'left';
				self.scrollEvent(e);
			});
			// 内容页面 右滑动
			pagecontent.swipeRight(function(e) {
				e['direction'] = 'right';
				self.scrollEvent(e);
			});
			
			// 首页面启动动画 落下 事件
			mainpage.swipeDown(function(e) {
				self.launchAnim(launchbox[0]);
			});
			// 首页面启动动画收起事件
			launchbox.swipeUp(function(e) {
				launchbox.attr('style', '');
			});
			
			mainpage.on('longTap', '.box', function(e) {
				self.boxLongTap($(this));
				/*
				$(this).addClass('curt');
				$(this).bind('touchend', function(ev) {
					$(this).unbind('touchend').unbind('touchmove');
					$(this).removeClass('curt');
				}).bind('touchmove', function(ev) {
					
				});
				mainpage.find('.box').each(function(index, item) {
					$(item).addClass('longtap anim2');
				});
				*/
			});
			mainpage.on('tap', function(e) {
				/*
				mainpage.find('.box').each(function(index, item) {
					$(item).removeClass('longtap');
				});
				*/
				self.boxLongTapClear();
			});
			
			
			/*
			 * tap事件依然可以采用Zepto的语法方式绑定
			 */
			mainpage.on('tap', '.box-1', function(e) {
				self.anim(mainpage, function(el) {
					pagecontent.show();
					var _t = setTimeout(function() {
						clearTimeout(_t);
						_t = null;
						el.addClass('hide anim2');
						pagecontent.addClass('show anim2');
					}, 0);
				}, function(el) {
					el.hide();
				});
			});
			pagecontent.on('tap', '.bk', function(e) {
				self.anim($(this), function(el) {
					mainpage.show();
					var _t = setTimeout(function() {
						clearTimeout(_t);
						_t = null;
						mainpage.removeClass('hide');
						pagecontent.removeClass('show');
					}, 0);
				}, function(el) {
					el.hide();
					// self.visb(mainpage);
				});
			});
			
			/*
			 * 点击新闻标题查看新闻的事件
			 */
			pagecontent.on('tap', 'section > div', function(e) {
				self.anim(infocontent, function(el) {
					el.show();
					var _t = setTimeout(function() {
						clearTimeout(_t);
						_t = null;
						el.addClass('show anim');
					}, 0);
				}, function(el) {
					pagecontent.hide();
				});
			});
			
			
			// 当有页面模块的滚动事件发生时，不阻止body的滚动行为
			infocontent.on('touchmove', '.ct', function(e) {
				e.stopPropagation();
			});
			infocontent2.on('touchmove', '.ct', function(e) {
				e.stopPropagation();
			});
			
			
			
			infocontent.on('tap', '.bk', function(e) {
				self.anim(infocontent, function(el) {
					// self.visb(pagecontent);
					pagecontent.show();
					el.removeClass('show');
				}, function(el) {
					el.hide();
				});
			}).on('tap', '.cm', function(e) {
				self.anim(infocontent2, function(el) {
					el.show();
					var _t = setTimeout(function() {
						clearTimeout(_t);
						_t = null;
						el.addClass('show anim');
					}, 0);
				}, function(el) {
					// self.hide(infocontent);
					infocontent.hide();
				});
				
			});
			
			infocontent2.on('tap', '.bk', function(e) {
				self.anim(infocontent2, function(el) {
					infocontent.show();
					el.removeClass('show');
					// self.visb(infocontent);
				}, function(el) {
					el.hide();
				});
			});
			
			
			
			// 设置页面相关的事件
			mainpage.on('tap', '.set', function(e) {
				self.anim(setcontent, function(el) {
					el.show();
					var _t = setTimeout(function() {
						clearTimeout(_t);
						_t = null;
						el.addClass('show anim');
					}, 0);
				}, function(el) {
					mainpage.hide();
				});
			});
			
			setcontent.on('tap', '.done', function(e) {
				self.anim(setcontent, function(el) {
					mainpage.show();
					el.removeClass('show');
				}, function(el) {
					el.hide();
				});
			});
			
			// 设置页面元素对象
			var setinfo = $('.set-info');
			// 登录页面元素对象
			var loginpage = $('.login-page');
			// 注册页面元素对象
			var registpage = $('.regist-page');
			
			setcontent.on('tap', '.lg', function(e) {
				setinfo.removeClass('show').addClass('hide anim');
				loginpage.removeClass('hide').addClass('show anim');
			});
			loginpage.on('tap', '.bk', function(e) {
				setinfo.removeClass('hide').addClass('show anim');
				loginpage.removeClass('show').addClass('hide anim');
			}).on('tap', '.rg', function(e) {
				loginpage.removeClass('show').addClass('hide2 anim');
				registpage.removeClass('hide').addClass('show anim');
			});
			registpage.on('tap', '.bk', function(e) {
				loginpage.removeClass('hide2').addClass('show anim');
				registpage.removeClass('show').addClass('hide anim');
			});
			
			
			// this.launchAnim(launchbox[0]);
		},
		
		// 初始化app icon的位置
		initApp: function(el) {
			var xst = 20, yst = 20, itemw = 100, col = 0,
			_x = 0, _y = 0;
			var self = this;
			$(el).each(function(index, item) {
				col = parseInt(index/2);
				if(index%2 == 0) {
					_x = xst;
					_y = (itemw*col + yst*(col+1));
				} else {
					_x = (itemw*1 + xst*2);
					_y = (itemw*col + yst*(col+1));
				}
				self.appos.push({
					els: 'box-' + (index+1),
					x: _x,
					y: _y,
					w: itemw,
					inr: false
				});
				self.defpos.push({
					x: _x,
					y: _y,
					w: itemw,
					inr: false
				});
				$(item).css({
					'-webkit-transform': 'translate3d('+ _x +'px, '+ _y +'px, 0) scale3d(1,1,1) rotateY(0deg)'
				});
			});
		},
		
		_curt: 0,
		
		// 长按app
		boxLongTap: function(el) {
			var _x = 0, _y = 0;
			var _curt = 0;
			var self = this;
			$(this.appos).each(function(index, item) {
				if($(el).hasClass(item.els)) {
					_x = item.x;
					_y = item.y;
					$(el).css({
						'-webkit-transform': 'translate3d('+ item.x +'px, '+ item.y +'px, 0) scale3d(1.2,1.2,1.2) rotateY(0deg)',
						'opacity': 1
					}).addClass('anim3');
					self._curt = index;
				} else {
					$('.' + item.els).css({
						'-webkit-transform': 'translate3d('+ item.x +'px, '+ item.y +'px, 0) scale3d(1.1,1.1,1.1) rotateY(0deg)',
						'opacity': 0.7
					}).addClass('anim3');
				}
			});
			var _x1 = 0, _y1 = 0,
				_x2 = 0, _y2 = 0;
			$(el).on('touchmove', function(e) {
				if(_x1 == 0 && _y1 == 0) {
					_x1 = e.touches[0].clientX;
					_y1 = e.touches[0].clientY;
					return;
				}
				_x2 = e.touches[0].clientX - _x1;
				_y2 = e.touches[0].clientY - _y1;
				$(this).css({
					'-webkit-transform': 'translate3d('+ (_x + _x2) +'px, '+ (_y + _y2) +'px, 0) scale3d(1.2,1.2,1.2) rotateY(0deg)'
				});
				self.longTapMove($(this), _curt, e.touches[0].clientX, e.touches[0].clientY);
			}).on('touchend', function(e) {
				$(this).off();
				$(this).css({
					'-webkit-transform': 'translate3d('+ self.defpos[self._curt].x +'px, '+ self.defpos[self._curt].y +'px, 0) scale3d(1.1,1.1,1.1) rotateY(0deg)',
					'opacity': 0.7
				});
			});
		},
		
		// 长按拖动行为
		longTapMove: function(el, curt, x, y) {
			var self = this;
			var _e, _x, _y, _w;
			$(this.appos).each(function(index, item) {
				if(index == self._curt) return;
				_e = self.defpos[index];
				_x = _e.x;
				_y = _e.y;
				_w = _e.w;
				if((x>_x && y>_y) && (x<(_x+_w) && y<(_y+_w))) {
					if(!_e['inr']) {
						_e['inr'] = true;
						newpos(self._curt, index);
					}
				} else {
					_e['inr'] = false;
				}
			});
			// c: index	// 当前被拖动元素的索引；
			// d: index	// 目标元素的索引；
			function newpos(c, d) {
				var _c = self.appos.splice(c, 1);
				self.appos.splice(d, 0, _c[0]);
				self._curt = d;
				var _e;
				$(self.appos).each(function(index, item) {
					_e = self.defpos[index];
					item.x = _e.x;
					item.y = _e.y;
					$('.' + item.els).css({
						'-webkit-transform': 'translate3d('+ item.x +'px, '+ item.y +'px, 0) scale3d(1.1,1.1,1.1) rotateY(0deg)'
					});
				});
				
			}
		},
		
		// 取消长按事件
		boxLongTapClear: function() {
			$(this.appos).each(function(index, item) {
				$('.' + item.els).css({
					'-webkit-transform': 'translate3d('+ item.x +'px, '+ item.y +'px, 0) scale3d(1,1,1) rotateY(0deg)',
					'opacity': 1
				});
			});
		},
		
		// 页面切换的动画
		// el: element	// 操作动画的元素
		// exec: function(el){}		// 对元素进行的css操作
		// callback: function(el){}		// 切换页面的动画完成后的回调函数
		// 此函数调用方式：允许对单个或者多个元素进行操作，单个元素操作时，el传入元素对象，exec为元素动画执行操作，callback为元素动画执行完成的回调；
		// 当对多个元素操作时，el, exec, callback分别传入队列；
		anim: function(el, exec, callback) {
			if(!el) return;
			if($.isArray(el)) {
				$(el).each(function(index, item) {
					if(!$.isFunction(exec[index])) return;
					exec[index]($(item));
					if($.isFunction(callback[index])) {
						$(item).bind('webkitTransitionEnd', function(e) {
							$(this).unbind('webkitTransitionEnd');
							callback[index]($(this));
						});
					}
				});
			} else {
				if(typeof exec != 'function') return;
				exec(el);
				if(typeof callback == 'function') {
					el.bind('webkitTransitionEnd', function(e) {
						$(this).unbind('webkitTransitionEnd');
						callback($(this));
					});
				}	
			}
		},
		
		// 页面性能优化方法
		// 采用css的visibility方式，避免页面的 reflow 行为的触发，只产生 repaint 行为，这样将会节约更多的资源
		visb: function(el) {
			el.css({
				'visibility': 'visible'
			});
		},
		hide: function() {
			el.css({
				'visibility': 'hidden'
			});
		},
		
		// 启动画面动画行为
		launchAnim: function(el) {
			var height = $(document.body).height();
			Morf.transition(el, {
				'-webkit-transform': 'translate3d(0, '+ height +'px, 0) rotate(0deg)'
			}, {
				duration: '800ms',
				timingFunction: 'bounce'
			});
		},
		
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
				self.createPage(self.currentIndex + '<div class="bk">返回</div>');
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


