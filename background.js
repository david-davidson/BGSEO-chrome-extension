var defaultResponse = "Please reopen once page has loaded",
  nodesToCount = {
    "A": 0,
    "H1": 0,
    "BUTTON": 0
  };

chrome.tabs.query({
  active: true,
  currentWindow: true
}, function(tabs) {
  chrome.tabs.sendMessage(tabs[ 0 ].id, {
    from: "BGSEO",
    type: "count",
    nodes: nodesToCount
  }, function(count) {
    document.getElementById("linkCount").innerText = (count.A || defaultResponse);
    document.getElementById("kloutMeter").value = 57; // Example values for progress meter
    document.getElementById("rtMeter").value = 85;  
  });
});

