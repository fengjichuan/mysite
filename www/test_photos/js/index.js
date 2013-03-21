/*
 * author: fengjichuan 
 * date: 2013-03-06
 * 
 * 为了敏捷开发，采用了jquery类库
 */

(function($) {
	var photo = {
		// 容器对象
		content: null,
		// 下一页的标记
		next: '',
		// 标记当前列表的最后日期
		lastday: '',
		// 初始化
		init: function() {
			this.content = $('.content');
			this.loadData();
		},
		// 初始化事件
		initEvent: function() {
			var self = this;
			$(window).on('scroll', function() {
				self.scrollMore();
			});
		},
		
		// 载入数据
		flag: false,
		loadData: function(callback) {
			if(this.flag) return;
			this.flag = true;
			var self = this;
			var url = this.next ? this.next : 'http://photo-sync.herokuapp.com/photos';
			$.ajax({
				url: url,
				dataType: 'JSONP',
				success: function(data) {
					self.next = data['nextURL'];
					var obj = self.group(data['photos']);
					self.showImage(obj);
					self.flag = false;
					if(typeof callback == 'function') {
						callback(data);
					}
				},
				error: function() {
					self.flag = false;
				}
			});
		},
		
		
		// 根据时间格式化数据
		group: function(photos) {
			var p = {}, key, d;
			$(photos).each(function(index, item) {
				d = _date(item.time);
				key = d.year + '-' + d.month + '-' + d.date;
				if(!p[key]) {
					p[key] = [];
				}
				p[key].push(item);
			});
			// 格式化时间
			function _date(time) {
				var d = new Date(time);
				var y = d.getFullYear(),
					m = (d.getMonth() + 1),
					t = d.getDate();
				return {
					year: y,
					month: m,
					date: t
				};
			}
			return p;
		},
		
		// 将图片显示在页面上
		showImage: function(data) {
			var _html = '';
			for(var key in data) {
				// 如果新列表的 第一天 数据和上次列表 最后一天 数据重合，将元素放在上次列表 最后一天 的DOM中显示 
				if(key == this.lastday) {
					this.content.find('ul:last').append(this.tmpl(data[key]));
				} else {
					_html += '<div><h1>'+ key +'</h1><ul>' + this.tmpl(data[key]) + '</ul></div>';
				}
				this.lastday = key;
			}
			this.content.append(_html);
		},
		// html 模板
		tmpl: function(item) {
			var self = this, t = '';
			$(item).each(function(index, m) {
				var img = self.imgsize(m),
					w = img.width,
					h = img.height,
					p = img.p;
				t += '<li><img style="width:'+ w +'px;height:'+ h +'px;margin-top:'+ p +'px;" src="'+ m['imageURL'] +'" /></li>';
			});
			return t;
		},
		// 按比例格式化图片大小
		imgsize: function(item) {
			var w = item.width,
				h = item.height,
				_w, _h, _p;
			if(w > h) {
				_w = 160;
				_h = h/w*160;
				_p = (_w-_h)/2;
			} else {
				_h = 160;
				_w = w/h*160;
				_p = 0;
			}
			return {
				width: _w,
				height: _h,
				p: _p
			}
		},
		
		// 滚动到底部载入更多。。。
		scrollMore: function() {
			var wh = $(window).height(),
				bh = $(document.body).height(),
				st = $(window).scrollTop();
			var more = $('.more');
			if((st + wh) > (bh - 100)) {
				more.show();
				this.loadData(function() {
					more.hide();
				});
			}
		}
	};
	photo.init();
	photo.initEvent();
})(jQuery);

