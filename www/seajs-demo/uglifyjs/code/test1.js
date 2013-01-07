(function() {
	var cache = {};
	var demo = {
		init: function() {
		},
		initEvent: function() {
		
		},
		get: function(id) {
			return cache[id];
		},
		set: function(key, value) {
			cache[key] = value;
		}
	};
})();
