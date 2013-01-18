/*
 * test Worker thread
 * author: fengjichuan
 */

(function() {
	var n = 'Worker Thread...';
	var num = 9999;
	function count(d) {
		var total = 1;
		for(var i=0;i<num;i++) {
			total *= d;
		}
		return total;
	}
	onmessage = function(event) {
		setTimeout(function() {
			postMessage('Worker: ' + count(event.data));
		}, 3000);
	}
})();


