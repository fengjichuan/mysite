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
	onmessage = function(data) {
		var email = data.data.email;
    var passwd = data.data.passwd;
    var auth,sid;
    var auth_params = "email="+email+"&pwd="+passwd+"&flag=0";
    var http = new XMLHttpRequest();
    http.open("POST", "http://www.f7f.com/users/login");
    // http.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    // http.setRequestHeader("Content-Length", auth_params.length);
    http.send( auth_params );
    http.onreadystatechange = function() {
    	
        if (http.readyState == XMLHttpRequest.DONE) {
        	if(http.status == 0) {
        		postMessage('Worker: callback...' + http.responseText);
        	}
            if(http.status==200){
            	postMessage('Worker200: ' + http.responseText);
                var arrs = http.responseText.split('\n')
                for(var idx in arrs){
                    var arr = arrs[idx]
                    //console.log(arr+"\n\n");
                    var tmp = arr.split('=');
                    if(tmp[0]=="Auth"){
                        auth = tmp[1];
                    }else if(tmp[0]=="SID"){
                        sid = tmp[1];
                    }
                }
            }
        }
    }
	}
})();


