/*
 * sunny.js html5 lib
 * It's need Zepto or jquery
 * 
 * author: fengjichuan
 * date: 2012-06-27
 */

// 
(function($) {
	var sunny = {
		// 每一个page是父元素#sunny的子元素，并且page必须存在一个id，为了router的查询
		// 页面初始化时会根据class查找page元素，将非当前显示的page从DOM节点中删除放入内存中（It's just for android），优化android下的动画效果
		pages: {},
		// 当前正在显示页面的id
		current: '',
		// 当前动画的属性
		currnetAnimate: '',
		// 记录每一次动画的路由
		router: {
			from: '',
			to: ''
		},
		// 路由的hash
		routerHash: {},
		// 
		flag: false,
		// 不同效果的动画函数
		animate: {
			slideleft: {
				start: function(s, d) {
					sunny.animfunc.start(s, d, 'slideleft');
				},
				end: function(s, d) {
					sunny.animfunc.end(s, d, 'slideleft');
				},
				back: 'slideright'
			},
			slideright: {
				start: function(s, d) {
					sunny.animfunc.start(s, d, 'slideright');
				},
				end: function(s, d) {
					sunny.animfunc.end(s, d, 'slideright');
				},
				back: 'slideleft'
			},
			slideup: {
				start: function(s, d) {
					sunny.animfunc.start(s, d, 'slideup');
				},
				end: function(s, d) {
					sunny.animfunc.end(s, d, 'slideup');
				},
				back: 'slidedown'
			},
			slidedown: {
				start: function(s, d) {
					sunny.animfunc.start(s, d, 'slidedown');
				},
				end: function(s, d) {
					sunny.animfunc.end(s, d, 'slidedown');
				},
				back: 'slideup'
			},
			fadein: {
				start: function(s, d) {
					sunny.animfunc.start(s, d, 'fadein');
				},
				end: function(s, d) {
					sunny.animfunc.end(s, d, 'fadein');
				},
				back: 'fadeout'
			},
			fadeout: {
				start: function(s, d) {
					sunny.animfunc.start(s, d, 'fadeout');
				},
				end: function(s, d) {
					sunny.animfunc.end(s, d, 'fadeout');
				},
				back: 'fadein'
			}
		},
		// 动画函数
		animfunc: {
			start: function(s, d, anim) {
				$(sunny.pages[d]).appendTo($('#sunny')).addClass(anim + '-in current');
				$('#' + s).addClass(anim + '-out').removeClass('current');
				// .removeClass('current');
				// $('#' + s).removeClass('current');
				$('#sunny-inner').addClass('page slideleft-out')
				sunny.flag = false;
			},
			end: function(s, d, anim) {
				if(sunny.flag) return;
				$('#' + d).removeClass(anim + '-in');
				sunny.pages[s] = $('#' + s).remove().removeClass(anim + '-out');
				sunny.current = d;
				sunny.flag = true;
			}
		},
		init: function() {
			var self = this;
			$('#sunny div').each(function(index, item) {
				var id = $(item).attr('id');
				if(!id || id == '') return;
				if(!$(item).hasClass('current')) {
					self.pages[id] = $(item).remove();
				} else {
					self.current = id;
					window.location.hash = '#' + id;
				}
			});
			// 动画结束的callback事件
			$('#sunny').unbind().bind('webkitAnimationEnd', function(e) {
				var r = self.router;
            	self.animate[self.routerHash[self.router.from + self.router.to]].end(r.from, r.to);
            });
            // url的hash发生变化的callback
			$(window).bind('hashchange', function(e) {
				// return;
				var hash = window.location.hash.slice(1);
				self.router = {
					from: self.current,
					to: hash
				};
				if(self.current == hash) return;
				self.current = hash;
				var _anim = self.routerHash[self.router.from + self.router.to];
				if(!_anim) return;
				
				self.animate[_anim].start(self.router.from, self.router.to);
			});
			// 用户触发的行为
			// 用户触发事件时，只改变url的hash，page repaint的响应通过location.hash事件的change行为触发
			// $(document.body).delegate('#sunny a', 'click', function(e) {
			$('#sunny').bind('click', function(e) {
				e.preventDefault();
				var tg = e.target;
				if(!$(tg).attr('anim')) return;
				var el = $(tg);
				// e.stopPropagation();
				var s = self.current,
					d = el.attr('href').slice(1);
				if(!self.pages[d]) return;
				var anim = el.attr('anim');
				self.currentAnimate = anim ? anim : 'slideleft';
				self.routerHash[s+d] = self.currentAnimate;
				self.routerHash[d+s] = self.animate[self.currentAnimate]['back'];
				
				window.location.hash = '#' + d;
				/*
				return;
				
				var hash = '#' + d;
				self.router = {
					from: self.current,
					to: hash
				};
				console.log(self.current, hash);
				if(self.current == hash) return;
				self.current = hash;
				var _anim = self.routerHash[self.router.from + self.router.to];
				if(!_anim) return;
				self.animate[_anim].start(self.router.from, self.router.to);
				*/
			});
		}
	};
	sunny.init();
})(Zepto);

