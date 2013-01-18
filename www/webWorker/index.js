/*
 * test web worker
 * author: fengjichuan
 */

(function($) {
	var num = 99999;
	function count(d) {
		var total = 1;
		for(var i=0;i<num;i++) {
			total *= d;
		}
		return total;
	}
	
	var w = new Worker('lg.js');
	var el = $('.content');
	w.onmessage = function(e) {
		el.append('<div style="color: red">'+ e.data +'</div>');
		// w.terminate();
	};
	setInterval(function() {
		el.append('<div>'+ +new Date() +'</div>');
		w.postMessage(Math.random());
	}, 1000);
	// setTimeout(function() {
	//  	el.append('<div style="color: red">'+ count(Math.random()) +'</div>');
	// }, 3000);
	// w.postMessage(Math.random());
})(jQuery);


