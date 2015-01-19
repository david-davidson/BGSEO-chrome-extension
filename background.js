(function() {
  "use strict";

  var defaultResponse = "0",
    nodes = {
      "A": 0,
      "H1": 0,
      "STRONG": 0,
      "B": 0,
      "EM": 0,
      "I": 0,
      "LI": 0,
      "IMG": 0
    },
    goal = 10;

  document.getElementById("showMoar").onclick = function(e) {
    var moarDiv = document.getElementById("moar");
    if (moarDiv.style.display === "block" || moarDiv.style.display === "") {
      moarDiv.style.display = "none";
    } else {
      moarDiv.style.display = "block";
    }
  };

  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    chrome.tabs.sendMessage(tabs[ 0 ].id, {
      from: "BGSEO",
      type: "count",
      nodes: nodes
    }, function(counts) {

      /**
       *******************************
       * Begin PROPRIETARY ALGORITHM *
       *******************************
       */

      // Cache DOM counts in local vars
      var bold = (counts.STRONG + counts.B) || defaultResponse,
        italics = (counts.EM + counts.I) || defaultResponse,
        links = counts.A || defaultResponse,
        images = counts.IMG || defaultResponse,
        listItems = counts.LI || defaultResponse,
        h1s = counts.H1 || defaultResponse,
        _calculateScore,
        kloutScore,
        rtScore;

      /**
       * Accepts an array of objects with `goal` and `value` attributes,
       * and returns an averaged score out of 100
       *
       * @param {Array} elements    All the scores to calculate
       * @returns {Number}          The averaged score
       */

      _calculateScore = function(elements) {
        var totalScores = 0,
          totalElements = 0,
          i;

        for (i = 0; i < elements.length; i++) {
          totalScores += (elements[ i ].value > elements[ i ].goal ?
            100 :
            (elements[ i ].value / elements[ i ].goal) * 100);
          totalElements++;
        }
        return totalScores / totalElements;
      };

      kloutScore = _calculateScore([
        {
          goal: goal,
          value: links
        },
        {
          goal: goal,
          value: listItems
        },
        {
          goal: goal,
          value: images
        }
      ]);

      rtScore = _calculateScore([
        {
          goal: goal,
          value: bold
        },
        {
          goal: goal,
          value: italics
        },
        {
          goal: goal,
          value: h1s
        }
      ]);

      // Set BGSEO scores
      document.getElementById("kloutMeter").value = kloutScore; // Example values for progress meter
      document.getElementById("rtMeter").value = rtScore;

      // Set element counts
      document.getElementById("linkCount").innerText = links + "/" + goal;
      document.getElementById("liCount").innerText = listItems + "/" + goal;
      document.getElementById("imgCount").innerText = images + "/" + goal;
      document.getElementById("boldCount").innerText = bold + "/" + goal;
      document.getElementById("italicsCount").innerText = italics + "/" + goal;
      document.getElementById("h1Count").innerText = h1s + "/" + goal;
    });
  });

}());