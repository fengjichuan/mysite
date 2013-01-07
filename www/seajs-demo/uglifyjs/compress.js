// var _path = '/var/www/webmail/htdocs/';

/*
 configure
 */

// var _path = '/home/fengjichuan/webmail/htdocs/';
var min_par = [
	/*
	{
		input: [
						// _path + 'img/ajax/jquery/jquery-1.4.2.min.js'
						// ,
						_path + 'img/ajax/js/jquery.event.drag.js'
						,_path + 'img/ajax/js/class.js'
						,_path + 'img/ajax/jquery/extensions/jquery.history.js'
						,_path + 'layout/red/src/js/extensions/jquery.suggest.js'
						,_path + 'layout/red/src/js/extensions/jquery.form.js'
						,_path + 'layout/red/src/js/mail/mailsys.js'
						,_path + 'img/ajax/js/maildialog.js'
						,_path + 'layout/red/src/js/mail/mailtitle.js'
					 ],
		output: 'code/mail-home.js'
	},
	{
		input: [
					 	_path + 'img/ajax/jquery/extensions/autocomplete/jquery.autocomplete.js'
					 	,_path + 'img/ajax/jquery/extensions/jquery.validateFormat.js'
					 	,_path + 'img/ajax/jquery/extensions/treeview/jquery.treeview.js'
					 	,_path + 'img/ajax/jquery/extensions/treeview/jquery.treeview.edit.js'
					 	,_path + 'img/ajax/jquery/extensions/treeview/jquery.treeview.async.js'
					 	,_path + 'img/ajax/swfupload/swfupload/swfupload.js'
					 	,_path + 'img/ajax/swfupload/swfupload/swfupload.queue.js'
					 	,_path + 'img/ajax/swfupload/js/jquery.swfupload.js'
					 ],
		output: 'code/mail-compose.js'
	},
	{
		input: [
						_path + 'img/ajax/jquery/feditor/editor.js'
					 ],
		output: 'code/editor-min.js'
	}
	*/
	{
		input: [
			'../a.js',
			'../b.js'
		],
		output: '../a.js,b.js'
	}
];

(function(par) {
	global.sys = require("sys");
	var fs = require("fs"),
		uglify = require('./uglify-js.js'),
		jsp = uglify.parser,
		pro = uglify.uglify,
		index = 0;		
	(function() {
		var item = par[index];
		if(!item) return false;
		var fns = item.input,
			min = item.output,
			codes = [],
			_index = 0,
			sf = arguments.callee;
		(function() {
			var f = fns[_index];
			if(!f) return false;
			var _sf = arguments.callee;
			sys.debug(f);
			fs.readFile(f, "utf8", function(err, text){
  			try {
    			var ast = time_it("parse", function(){ return jsp.parse(text); });
    			
      			ast = time_it("mangle", function(){ return pro.ast_mangle(ast, {
      				except: ['require']
      			}); });
      			
      			ast = time_it("squeeze", function(){ return pro.ast_squeeze(ast); });
      			var gen = time_it("generate", function(){ return pro.gen_code(ast, false); });
      			codes.push(gen + ';');
      			if(_index == (fns.length - 1)) {
      				fs.writeFile(min, codes.join(''), function(err) {
  						if(err) {
  							sys.debug(err);
  							return false;
  						}
  						sf();
  					});
      			}
      			_index++;
      			_sf();
    		} catch(ex) {
    			sys.debug(ex.stack);
      			sys.debug(sys.inspect(ex));
      			sys.debug(JSON.stringify(ex));
    		}
			});
		})();
		index++;
	})();

	function time_it(name, cont) {
    	var t1 = new Date().getTime();
    	try { 
    		return cont(); 
    	} finally { sys.debug("// " + name + ": " + ((new Date().getTime() - t1) / 1000).toFixed(3) + " sec."); }
	};
})(min_par);