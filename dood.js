// v0.1.1
(function (window, undefined) {
	// ---
    var dood = window.dood = function (fn) {

    };

    // Get the hash for the current document
    dood.hash = function (h) {
		return h ? document.location.hash = h : document.location.hash;
    };

    // ==================================== //
    //  BLUEPRINT - SIMPLE TEMPLATE ENGINE  //
    // ==================================== //
	dood.blueprint = function (a /* (STRING) "set" or template name. If "set", must have b and c */, 
							   b /* (STRING) if a = "set" then b = template name. Otherwise, b = data */,
							   c /* (HTML Object || Jquery Element). If a = "set", c will be the template */,) {
							   
		// Shortcut to dood's prototype 
		var proto = dood.blueprint.prototype,
			returnData;

		if (a === "set" && b) {
			proto.templates = proto.templates || {};
			proto.templates[b] = (function () {
				if (typeof c === "String") {
					returnData = String(c);
				} else {
					returnData = c.innerHTML || c[0].innerHTML || c.toString() || null;
				}
			})();
		} else if (proto.templates[a]) {
				var temp = proto.templates[a];

				if (jQuery) {
					jQuery.each(b, function (d, e) {
						if (typeof e !== "Function") {
							temp = temp.replace("{{" + d + "}}", e);
						} else {
							temp = String(e()) || "";
						}
					});
				} else {
					// Does this actually work? o.O
					for (var i in b) {
						temp = temp.replace("{{" + b[i] + "}}", b[i][0]);
					}
				}

				returnData = temp;
			}
		}

		return returnData;
	}
	// End blueprint

	
	
	// ---
    return;
})(window);