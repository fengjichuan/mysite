define("./a",function(a){return{fun1:function(){},fun2:function(){},fun3:function(){}}});define("./b",function(a){a.async(["./c"],function(a){console.log(a)});return{fun11:function(){},fun22:function(){},fun33:function(){}}});