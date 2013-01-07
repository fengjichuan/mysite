var xxxxxx = '';

define('./b', function(require) {
	require.async(['./c'], function(c) {
		console.log(c);
	});
	
	return {
		fun11: function() {
			var testabc = 'abc';
		},
		fun22: function() {
			
		},
		fun33: function() {
			
		}
	};
});





