(function() {

  /**
   * Counts the number of appearances of a given element within the DOM
   *
   * @param {Object} element    The current DOM node
   * @param {String} type       The type of element we're looking for
   * @param {Number} count      The number of appearances so far
   */

  var recurse = function(element, type, count) {
    var matches = count || 0,
      childMatches = 0;

    // Return early if it's a match
    if (element.nodeName === type) {
      return ++matches;
    }

    // Otherwise, count matches among the node's children
    for (var i = 0; i < element.childNodes.length; i++) {
      childMatches += recurse(element.childNodes[ i ], type, matches);
    }
    return childMatches;
  };

  chrome.runtime.onMessage.addListener(function(message, sender, callback) {
    if (message.title === "count") {
      callback(recurse(document.documentElement, message.element));
    }
  });

}());