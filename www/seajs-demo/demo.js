seajs.config({
	base: './',
	comboSyntax: ['', '+'],
	alias: {
	}
})

define('demo', [], function(require) {
	require.async(['a', 'b'], function(a, b) {
		console.log(a);
		console.log(b);
	});
});



