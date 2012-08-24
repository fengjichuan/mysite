(function($) {
	// 模版数据（for test）
	var tmpl = {
		module1: ['<li class="widget color-white" mod="module1" id="intro" style="display:none;">',
                '<div class="widget-head">',
                '<span>生活搜索</span>',
                '</div>',
                '<div class="widget-content">',
                	'<div style="padding-top:10px;">',
                		'<input type="text" style="width:180px;border: 1px solid #cdcdcd;height:24px;line-height:24px;padding:0;font-size:14px;margin-right:10px;" value="" />',
                		'<input type="button" style="border:1px solid #cdcdcd;background-color:#efefef;width:80px;height:26px;line-height:26px;font-size:14px;padding:0;color:#777;" value="搜 索" />',	
                	'</div>',
                	'<div>',
                		'<span style="color:#9a9a9a;height:30px;line-height:30px;">搜索社区周边商户、公共服务</span>',
                	'</div>',
                '</div>',
            '</li>'].join(''),
    	module2: ['<li class="widget color-white" mod="module2" style="display:none;">',
               '<div class="widget-head">',
                    '<span>生活应用</span>',
                '</div>',
                '<div class="widget-content">',
                	'<div style="height: 100px;">',
                	'<div class="app-icon">',
                		'<img src="./img/icon.png" />',
                		'<dt> 送 水 </dt>',
                	'</div>',
                	'<div class="app-icon">',
                		'<img src="./img/food@57.png" />',
                		'<dt> 送 餐 </dt>',
                	'</div>',
                	'<div class="app-icon">',
                		'<img src="./img/supermarket@57.png" />',
                		'<dt> 超 市 </dt>',
                	'</div>',
                	'<div class="app-icon">',
                		'<img src="./img/vfood@57.png" />',
                		'<dt> 蔬 菜 </dt>',
                	'</div>',
                	'</div>',
                '</div>',
            '</li>'].join(''),
    	module3: ['<li class="widget color-white" mod="module3" style="display:none;">',
                '<div class="widget-head">',
                	'<span>社区频道</span>',
                '</div>',
                '<div class="widget-content">',
                	'<div>',
                		'<div style="float:left;height:60px;"><img src="./img/face/a.jpeg" style="width: 50px;" /></div>',
                		'<div style="float:left;width:230px;padding-left:10px;">',
                			'<div style="line-height: 18px;font-size:12px;color:#333;"><a href="#">Sarah: </a><span>我来报个到</span> </div>',
                			'<div style="font-size:10px;line-height:20px;color:#999;">8月10日9:00:28</div>',
                		'</div>',
                		'<div style="clear:both;font-size:1px;height:3px;border-top:1px dotted #acacac;"> </div>',
                	'</div>',
                	'<div>',
                		'<div style="float:left;height:60px;"><img src="./img/face/2.jpeg" style="width: 50px;" /></div>',
                		'<div style="float:left;width:230px;padding-left:10px;">',
                			'<div style="line-height: 18px;font-size:12px;color:#333;"><a href="#">真心男孩: </a><span>求女朋友，征婚啊，岁数在23到28之间，单身的女性啊。玩感情的别来找我，加我的QQ聊聊936043598</span> </div>',
                			'<div style="font-size:10px;line-height:20px;color:#999;">8月8日21:43:19</div>',
                		'</div>',
                		'<div style="clear:both;font-size:1px;height:3px;border-top:1px dotted #acacac;"> </div>',
                	'</div>',
                	'<div>',
                		'<div style="float:left;height:60px;"><img src="./img/face/3.gif" style="width: 50px;" /></div>',
                		'<div style="float:left;width:230px;padding-left:10px;">',
                			'<div style="line-height: 18px;font-size:12px;color:#333;"><a href="#">AkayiMenou: </a><span>有没有人的亲朋好友有哈士奇可以卖或者赠送的阿？？我和我男朋友想养一只哈士奇~~</span> </div>',
                			'<div style="font-size:10px;line-height:20px;color:#999;">8月8日16:09:41</div>',
                		'</div>',
                		'<div style="clear:both;font-size:1px;height:3px;border-top:1px dotted #acacac;"> </div>',
                	'</div>',
                '</div>',
            '</li>'].join(''),
    	module4: ['<li class="widget color-white" mod="module4" style="display:none;">',
                '<div class="widget-head">',
                    '<span>我的邻居</span>',
                '</div>',
                '<div class="widget-content">',
                	'<div style="text-align: center;">',
                		'<div style="width:138px;float:left;">',
                			'<div style="height:110px;text-align:center;">',
                				'<img src="./img/f1.jpeg" style="margin:5px auto 0 auto;float:none;" />',
                			'</div>',
                			'<div style="line-height:18px;">',
                				'<div style="height:20px;">',
                					'<span style="float:left;">慕容复</span>',
                					'<span style="float:right;">30 天蝎男</span>',
                				'</div>',
                				'<div style="text-align:left;">',
                					'<span style="color:#777;">自学钢琴不得要领，求老师一枚</span>',
                				'</div>',
                				'<div style="text-align:right;">',
                					'<span style="color:#CD85C5;font-size:10px;">天通苑 | 10分钟前</span>',
                				'</div>',
                			'</div>',
                		'</div>',
                		'<div style="width:138px;float:right;">',
                			'<div style="height:110px;text-align:center;">',
                				'<img src="./img/f2.jpeg" style="margin:5px auto 0 auto;float:none;" />',
                			'</div>',
                			'<div style="line-height:18px;">',
                				'<div style="height:20px;">',
                					'<span style="float:left;">萧峰</span>',
                					'<span style="float:right;">28 水瓶男</span>',
                				'</div>',
                				'<div style="text-align:left;margin:2px auto;">',
                					'<span style="color:#777;">我这一生只喜欢过一个女子，那就是你姊姊</span>',
                				'</div>',
                				'<div style="text-align:right;">',
                					'<span style="color:#CD85C5;font-size:10px;">天通苑 | 10分钟前</span>',
                				'</div>',
                			'</div>',
                		'</div>',
                		'<div style="clear:both;border-top:1px dotted #cdcdcd;"></div>',
                	'</div>',
                	'<div style="text-align: center;">',
                		'<div style="width:138px;float:left;">',
                			'<div style="height:110px;text-align:center;">',
                				'<img src="./img/f3.jpeg" style="margin:5px auto 0 auto;float:none;" />',
                			'</div>',
                			'<div style="line-height:18px;">',
                				'<div style="height:20px;">',
                					'<span style="float:left;">杨过</span>',
                					'<span style="float:right;">20 双鱼男</span>',
                				'</div>',
                				'<div style="text-align:left;margin:2px auto;">',
                					'<span style="color:#777;">相思无用，唯别而已。别期若有定，千般煎熬又何如。莫道黯然销魂，何处柳暗花明。</span>',
                				'</div>',
                				'<div style="text-align:right;">',
                					'<span style="color:#CD85C5;font-size:10px;">天通苑 | 10分钟前</span>',
                				'</div>',
                			'</div>',
                		'</div>',
                		'<div style="width:138px;float:right;">',
                			'<div style="height:110px;text-align:center;">',
                				'<img src="./img/f4.jpeg" style="margin:5px auto 0 auto;float:none;" />',
                			'</div>',
                			'<div style="line-height:18px;">',
                				'<div style="height:20px;">',
                					'<span style="float:left;">韦小宝</span>',
                					'<span style="float:right;">28 射手男</span>',
                				'</div>',
                				'<div style="text-align:left;margin:2px auto;">',
                					'<span style="color:#777;">地镇高岗一派溪山千古秀,门朝大海王合河水万年流!</span>',
                				'</div>',
                				'<div style="text-align:right;">',
                					'<span style="color:#CD85C5;font-size:10px;">天通苑 | 10分钟前</span>',
                				'</div>',
                			'</div>',
                		'</div>',
                		'<div style="clear:both;border-top:1px dotted #cdcdcd;"></div>',
                	'</div>',
               '</div>',
            '</li>'].join(''),
    	module5: ['<li class="widget color-white" mod="module5" style="display:none;">',  
                '<div class="widget-head">',
                    '<span>小组和活动</span>',
                '</div>',
                '<div class="widget-content">',
                	'<div style="clear:both;padding: 8px 0;">',
                		'<div style="height:80px;width:100px;float:left;text-align:center;">',
                			'<img src="./img/h1.png" style="margin:auto;float:none;" />',
                		'</div>',
                		'<div style="float:left;">',
                			'<div style="width:180px;line-height:100%;">',
                				'<p style="padding:3px 0;"><span style="font-size:12px;font-weight:bold;color:#006600;">一起来游泳</span><span style="float:right;color:#9a9a9a;">10个成员 2个活动</span></p>',
                				'<p style="color:#666;line-height:120%;padding:5px 0;">天通苑立水桥附近游泳爱好者的俱乐部。欢迎爱游泳的和想学游泳的童鞋加入。不定期组织游泳活动。</p>',
                			'</div>',
                		'</div>',
                	'</div>',
                	'<div style="clear:both;padding: 8px 0;">',
                		'<div style="height:80px;width:100px;float:left;text-align:center;">',
                			'<img src="./img/h2.png" style="margin:auto;float:none;" />',
                		'</div>',
                		'<div style="float:left;">',
                			'<div style="width:180px;line-height:100%;">',
                				'<p style="padding:3px 0;"><span style="font-size:12px;font-weight:bold;color:#006600;">天通苑骑行者</span><span style="float:right;color:#9a9a9a;">10个成员 2个活动</span></p>',
                				'<p style="color:#666;line-height:120%;padding:5px 0;">天通苑立水桥附近骑行者的聚集地。 欢迎自发组织骑行活动。</p>',
                			'</div>',
                		'</div>',
                	'</div>',
                	'<div style="clear:both;height:10px;"></div>',
                '</div>',
            '</li>'].join(''),
    	module6: ['<li class="widget color-white" mod="module6" style="display:none;">',
                '<div class="widget-head">',
                    '<span>周边商家</span>',
                '</div>',
                '<div class="widget-content">',
					'<div style="text-align:center;">',
						'<div style="width:193px;margin: 0px auto;border-bottom: 1px dotted #cdcdcd;padding: 5px 0px;">',
							'<div><img src="./img/s1.jpeg" /></div>',
							'<div style="height:20px;line-height:20px;"><span style="color:#006600;float:left;">东尼造型（奥北北区）</span><span style="text-align:right;float:right;"><img style="margin-top:4px;" src="./img/start.png" /></span></div>',
							'<div style="color:#999;text-align:left;"><span>2点评</span> | <span>1去过</span> | <span>0想去</span></div>',
						'</div>',
						'<div style="width:193px;margin: 5px auto;border-bottom: 1px dotted #cdcdcd;padding: 5px 0px;">',
							'<div><img src="./img/s2.jpeg" /></div>',
							'<div style="height:20px;line-height:20px;"><span style="color:#006600;float:left;">美道面馆</span><span style="text-align:right;float:right;"><img style="margin-top:4px;" src="./img/start.png" /></span></div>',
							'<div style="color:#999;text-align:left;"><span>2点评</span> | <span>1去过</span> | <span>0想去</span></div>',
						'</div>',
						'<div style="width:193px;margin: 5px auto;border-bottom: 1px dotted #cdcdcd;padding: 5px 0px;">',
							'<div><img src="./img/s3.jpeg" /></div>',
							'<div style="height:20px;line-height:20px;"><span style="color:#006600;float:left;">老家味道</span><span style="text-align:right;float:right;"><img style="margin-top:4px;" src="./img/start.png" /></span></div>',
							'<div style="color:#999;text-align:left;"><span>2点评</span> | <span>1去过</span> | <span>0想去</span></div>',
						'</div>',
						'<div style="width:193px;margin: 0px auto;border-bottom: 1px dotted #cdcdcd;padding: 5px 0px;">',
							'<div><img src="./img/s4.jpeg" /></div>',
							'<div style="height:20px;line-height:20px;"><span style="color:#006600;float:left;">彩云飞便利店</span><span style="text-align:right;float:right;"><img style="margin-top:4px;" src="./img/start.png" /></span></div>',
							'<div style="color:#999;text-align:left;"><span>2点评</span> | <span>1去过</span> | <span>0想去</span></div>',
						'</div>',
					'</div>',
                '</div>',
            '</li>'].join(''),
    	module7: ['<li class="widget color-white" mod="module7" style="display:none;">',
                '<div class="widget-head">',
                    '<span>周边点评</span>',
                '</div>',
                '<div class="widget-content">',
         			'<div style="padding-top:5px;">',
                		'<div style="float:left;height:60px;"><img src="./img/face/a.jpeg" style="width: 50px;" /></div>',
                		'<div style="float:left;width:230px;padding-left:10px;">',
                			'<div style="line-height: 18px;font-size:12px;color:#333;"><a href="#">Sarah</a>@<a href="#">天通苑审美</a> </div>',
                			'<div><img style="margin:2px 0;" src="./img/start.png" /></div>',
                			'<div><span style="line-height:18px;color:#666;">不错的球馆，更衣室有很多储物柜，还可以淋浴，最重要的是侧灯照明，光线不刺眼，就像球馆宣传的那样，硬件设施是天通苑周边最好的，遗憾的是位置有点偏</span></div>',
                			'<div style="font-size:10px;line-height:20px;color:#999;">8月10日9:00:28</div>',
                		'</div>',
                		'<div style="clear:both;height:1px;font-size:1px;border-top:1px dotted #cdcdcd;"></div>',
                	'</div>',
                	'<div style="padding-top:5px;">',
                		'<div style="float:left;height:60px;"><img src="./img/face/a.jpeg" style="width: 50px;" /></div>',
                		'<div style="float:left;width:230px;padding-left:10px;">',
                			'<div style="line-height: 18px;font-size:12px;color:#333;"><a href="#">Sarah</a>@<a href="#">天通苑审美</a> </div>',
                			'<div><img style="margin:2px 0;" src="./img/start.png" /></div>',
                			'<div><span style="line-height:18px;color:#666;">不错的球馆，更衣室有很多储物柜，还可以淋浴，最重要的是侧灯照明，光线不刺眼，就像球馆宣传的那样，硬件设施是天通苑周边最好的，遗憾的是位置有点偏</span></div>',
                			'<div style="font-size:10px;line-height:20px;color:#999;">8月10日9:00:28</div>',
                		'</div>',
                		'<div style="clear:both;height:1px;font-size:1px;border-top:1px dotted #cdcdcd;"></div>',
                	'</div>',
                	'<div style="padding-top:5px;">',
                		'<div style="float:left;height:60px;"><img src="./img/face/a.jpeg" style="width: 50px;" /></div>',
                		'<div style="float:left;width:230px;padding-left:10px;">',
                			'<div style="line-height: 18px;font-size:12px;color:#333;"><a href="#">Sarah</a>@<a href="#">天通苑审美</a> </div>',
                			'<div><img style="margin:2px 0;" src="./img/start.png" /></div>',
                			'<div><span style="line-height:18px;color:#666;">不错的球馆，更衣室有很多储物柜，还可以淋浴，最重要的是侧灯照明，光线不刺眼，就像球馆宣传的那样，硬件设施是天通苑周边最好的，遗憾的是位置有点偏</span></div>',
                			'<div style="font-size:10px;line-height:20px;color:#999;">8月10日9:00:28</div>',
                		'</div>',
                		'<div style="clear:both;height:1px;font-size:1px;border-top:1px dotted #cdcdcd;"></div>',
                	'</div>',
                '</div>',
            '</li>'].join(''),
    	module8: ['<li class="widget color-white" mod="module8" style="display:none;">',
                '<div class="widget-head">',
                    '<span>优惠劵</span>',
                '</div>',
                '<div class="widget-content">',
         			'<div>',
         				'<div style="height:20px;line-height:20px;">[竹港人家]周一到周五20元抵金卷午餐晚餐全场通用</div>',
         				'<div style="text-align:right;height:20px;line-height:20px;color:#9a9a9a;">有效期至 2013-03-03</div>',
         			'</div>',
                '</div>',
            '</li>'].join('')
	};
	
	// 默认列表
	var defaultlist = [{
		mod: 'module1',
		name:'生活搜索'}, {
		mod: 'module2',
		name: '生活应用'}, {
		mod: 'module3',
		name:'社区频道'}, {
		mod: 'module4',
		name:'我的邻居'}, {
		mod: 'module5',
		name:'小组和活动'}, {
		mod: 'module6',
		name:'周边商家'}, {
		mod: 'module7',
		name:'周边点评'}, {
		mod: 'module8',
		name: '优惠劵'}];
	
	// list列表最终会以cookie的形式存取
	var list = [['module1','module2','module3'], ['module4','module5'], ['module6','module7','module8']];
	
	var if7f = {
		// 根据list的队列顺序 初始化模块
		init: function() {
			var ck = $.cookie('if7f');
			if(ck) {
				list = this.cookie2arr(ck);
			}
			this.initHTML();
			this.initCacheList();
		},
		initEvent: function() {
			var self = this;
			$('.if7f-set').bind('click', function(e) {
				self.setPage();
			});
			$(document).delegate('.option-close', 'click', function(e) {
				e.stopPropagation();
				e.preventDefault();
				self.closeSetPage();
			}).delegate('.option-set', 'click', function(e) {
				self.set();
				self.closeSetPage();
			})
		},
		initHTML: function() {
			var html = [], self = this;
			$(list).each(function(index, item) {
				var t = ['<ul id="column'+ (index+1) +'" class="column">','</ul>'];
				var h = [];
				$(item).each(function(_index, _item) {
					h.push(tmpl[_item]);
				});
				html.push(t.join(h.join('')));
			});
			$('#columns').html(html.join(''));
			var timer = 0;
			$('.widget').each(function(index, item) {
				var t = setTimeout(function() {
					clearTimeout(t);
					t = null;
					$(item).fadeIn(function() {
						if(index + 1 == $('.widget').length) {
							self.setColumnH();
						}
					});
				}, timer);
				timer += 100;
			});
		},
		initCacheList: function() {
			var c = $.cookie('if7f');
			if(!c) {
				$.cookie('if7f', this.arr2cookie(list));
			}
		},
		arr2cookie: function(arr) {
			var s = [];
			$(arr).each(function(index, item) {
				s.push(item.join(','));
			});
			return s.join('|');
		},
		cookie2arr: function(cookie) {
			var a = [];
			$(cookie.split('|')).each(function(index, item) {
				a.push(item.split(','));
			});
			return a;
		},
		// 重置cookie
		resetList: function() {
			var s = [];
			function _s(el) {
				var t = [];
				el.each(function(index, item) {
					t.push($(item).attr('mod'));
				});
				return t.join(',')
			}
			var ck = [_s($('#column1 .widget')), _s($('#column2 .widget')), _s($('#column3 .widget'))].join('|');
			$.cookie('if7f', ck);
			this.setColumnH();
		},
		
		// 
		setColumnH: function() {
			var _h = Math.max($('#column1').css('height','auto').height(), $('#column2').css('height','auto').height(), $('#column3').css('height','auto').height());
			$('#columns .column').each(function(index, item) {
				$(item).css({
					'height': _h + 'px'
				});
			});
		},
		
		
		// 打开设置层
		setPage: function() {
			this.createS();
			this.createO();
		},
		// 关闭设置页面
		closeSetPage: function() {
			$('#if7f_option_layer').animate({
				'opacity': 0,
				'top': '120px'
			}, function() {
				$(this).hide();
				$('#if7f_shadow_layer').hide();
			});
		},
		// 创建遮罩层
		createS: function() {
			var _s = $('#if7f_shadow_layer');
			if(_s.length == 0) {
				_s = $('<div id="if7f_shadow_layer" class="if7f-shadow-layer"></div>').css({
					'height': $(document.body).height() + 'px',
					'opacity': 0.3
				});
				$(document.body).append(_s);
			}
			_s.show();
		},
		// 创建操作层
		createO: function() {
			var _o = $('#if7f_option_layer');
			if(_o.length == 0) {
				_o = $('<div id="if7f_option_layer" class="if7f-option-layer"></div>').html('<div class="option-area">'+
					'<div class="option-title">'+
					'<span class="">设置</span>'+
					'<a href="#" class="option-close">X</a>'+
					'</div>'+
					'<div class="option-checkbox"></div>'+
					'<div class="option-button"><input class="option-set" type="button" value=" 确 定 " /><input class="option-close" type="button" value=" 取 消 " /></div>'+
					'</div>');
				$(document.body).append(_o);
			}
			_o.show().css({
				'opacity': 0,
				'top': '120px'
			}).animate({
				'top': '160px',
				'opacity': 1
			}, '300');
			var _h = [];
			var ck = $.cookie('if7f');
			$(defaultlist).each(function(index, item) {
				var c = ck.indexOf(item['mod']) != -1 ? 'checked="checked"' : '';
				_h.push('<div class="option-checkbox-item"><input mod="'+ item['mod'] +'" '+ c +' type="checkbox" /> &nbsp;'+ item['name'] +'</div>');
			});
			_h.push('<div style="clear:both;"></div>');
			$('.option-checkbox').html(_h.join(''));
		},
		// 设置成功
		set: function() {
			var self = this;
			var ck = $.cookie('if7f');
			$('.option-checkbox-item input').each(function(index, item) {
				var _mod = $(item).attr('mod');
				if(ck.indexOf(_mod) == -1 && item.checked) {
					ck += ',' + _mod;
					var el = $(tmpl[_mod]);
					$('#column3').append(el);
					el.fadeIn(function() {
						self.init();
						iNettuts.init();
					});
					$.cookie('if7f', ck);
				}
				if(ck.indexOf(_mod) != -1 && !item.checked) {
					ck = ck.replace(_mod, '');
					$('#columns li.widget').each(function(_i, _item) {
						if($(_item).attr('mod') == _mod) {
							$(_item).fadeOut(function() {
								$(this).remove();
							});
						}
					});
					$.cookie('if7f', ck);
				}
			});
			
			
		}
	};
	if7f.init();
	if7f.initEvent();
	window['if7f_option'] = function() {
		return if7f.resetList();
	};
})(jQuery);


