function(properties, context) {
  if(window.self != window.top) {
      	top.window.postMessage({"coalias": {"url_change": properties.destination}}, "*")
    	window.onbeforeunload = function() {}
    	window.onunload = function() {}
    	top.window.location.href = properties.destination;
    } else {
    	window.onbeforeunload = function() {}
    	window.onunload = function() {}
    	document.location = properties.destination;
    }
}