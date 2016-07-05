/**
 *
 */
var MyLog = {
		printProperties:function(obj) {
		    var properties = '';
		    for (var prop in obj){
		        properties += prop + "=" + obj[prop] + "\n";
		    }
		    console.debug(properties);
		},
		printText:function(txt){
			console.text(txt);
		}
}