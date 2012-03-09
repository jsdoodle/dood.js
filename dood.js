(function (window, undefined) {
		window.dood = new Function();
		
		// Easier understanding of "extending" the dood prototype
		dood.prototype.extend = function (name, fn) {
			dood.prototype[name] = fn;
		};
		
		// ==================================== //
		//  BLUEPRINT - SIMPLE TEMPLATE ENGINE  //
		// ==================================== //
		dood.extend("blueprint", function(a, b, c) {
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
		});
		
		
		return;
})(window);