(function($) {
	var f7f_subject = {
		init: function() {
			this.autoRoll();
		},
		initEvent: function() {
			var self = this;
			$('.roll-option a').bind('click', function(e) {
				e.stopPropagation();
				e.preventDefault();
				clearInterval(self.timer);
				self.timer = null;
				self.roll($(this), function() {
					self.autoRoll();
				});
			});
		},
		scroll: function(tg) {
			var t = $(tg).offset().top;
			var pel = document.body.scrollTop > 0 ? document.body : document.documentElement;
			$(pel).animate({
				scrollTop: t
			});
		},
		flag: false,
		timer: null,
		roll: function(el, callback, fade) {
			$($(el).parent().find('a')).each(function(index, item) {
				$(item).removeClass('focus');
			});
			$(el).addClass('focus');
			var _index = $(el).html();
			if(fade) {
				$('.roll-img-wrapper').css({
					'margin-left': -468*(_index-1),
					'display': 'none'
				}).fadeIn();
				return;
			}
			$('.roll-img-wrapper').animate({
				'margin-left': -468*(_index-1)
			}, 300, function() {
				if(typeof callback == 'function') callback();
			});
		},
		autoRoll: function() {
			var self = this;
			this.timer = setInterval(function() {
				if($('.roll-option').length == 0) return;
				var el = $('.roll-option .focus').next();
				if(el.length == 0) {
					el = $('.roll-option a')[0];
					self.roll(el, null, true);
				} else {
					self.roll(el);
				}
			}, 3000);
		}
	};
	f7f_subject.init();
	f7f_subject.initEvent();
	bkToTop.init(document.body);
})(jQuery);


