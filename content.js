(function() {

  var numLinks = 0,
    recurse = function(element) {
      if (element.nodeName === "A") {
        numLinks++;
      } else if (element.childNodes.length > 0) { // If a parent node
        for (var i = 0; i < element.childNodes.length; i++) {
          recurse(element.childNodes[ i ]);
        }
      }
    };

  recurse(document.documentElement); // Init

  chrome.runtime.onMessage.addListener(function(message, sender, response) {
    if (message.title === "linkCount") {
      response(numLinks);
    }
  });

}());