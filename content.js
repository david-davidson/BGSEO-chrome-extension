(function() {

  /**
   * Counts the number of appearances of elements within the DOM
   *
   * @param {Object} selectors  A hash of the elements (and their counts) we care about
   * @param {Object} element    The current DOM node
   */

  var countInstancesOf = function(selectors, element) {
    var nodeName = element.nodeName;

    if (selectors.hasOwnProperty(nodeName)) {
      selectors[ nodeName ]++;
    }

    for (var i = 0; i < element.childNodes.length; i++) {
      countInstancesOf(selectors, element.childNodes[ i ]);
    }

    return selectors;
  };

  chrome.runtime.onMessage.addListener(function(message, sender, callback) {
    if (message.from === "BGSEO" && message.type === "count") {
      var occurences = countInstancesOf(message.nodes, document.documentElement);
      callback(occurences);
    }
  });

}());