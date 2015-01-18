chrome.tabs.query(
  {
    active: true,
    currentWindow: true
  }, function(tabs) {
    chrome.tabs.sendMessage(tabs[ 0 ].id, {
      title: "linkCount"
    }, function(count) {
      document.getElementById("linkCount").innerText = count;
      document.getElementById("kloutMeter").value = 57; // Example values for progress meter
      document.getElementById("rtMeter").value = 85;
    });
  });