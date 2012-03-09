var dood = dood || {};

// dood.blueprint - A simple template engine
/*
	To create and set a default template, do:
	dood.blueprint("set", [name of template], [html template]);
	
	To use the template, do:
	dood.blueprint([name of template], [data])
	
	Define:
	[name of template] - (String) The name of the template. Can be anything but "set".
	[html template]    - (String || HTML Object) Can either be an HTML object or String.
	[data]             - (Object) The data object.
	
	-----------------------------------------------------------------------------------
	Example:
	-----------------------------------------------------------------------------------
	
	var myData = {
		"title": "Welcome",
		"description": "Please take a seat"
	};
	
	dood.blueprint("set", "template1", '<b>{{title}}!</b> {{description}}.');
	
	var myResult = dood.blueprint("template1", myData); 
	document.body.innerHTML = myResult;
*/
dood.blueprint = function (a, b, c) {
	var proto = dood.blueprint.prototype;

	if (a === "set" && b) {
		proto.templates = proto.templates || {};
		proto.templates[b] = (function() {
			if (typeof c === "string") {
				return String(c);
			} else {
				return c.innerHTML || c[0].innerHTML || c.toString() || null;
			}
		})();
	} else {
		if (proto.templates[a]) {
			var temp = proto.templates[a];
			
			if (jQuery) {
				jQuery.each(b, function(d, e) {
					temp = temp.replace("{{" + d + "}}", e);
				});
			} else {
				for (var i in b) {
					// ??
					temp = temp.replace("{{" + b[i] + "}}", b[i][0]);
				}
			}
			
			return temp;
		}
	}
	
	return "Error calling dood.blueprint";
}