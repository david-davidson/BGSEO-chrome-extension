var defaultResponse = "Please reopen once page has loaded";

chrome.tabs.query({
  active: true,
  currentWindow: true
}, function(tabs) {
  chrome.tabs.sendMessage(tabs[ 0 ].id, {
    title: "count",
    element: "A"
  }, function(count) {
    document.getElementById("linkCount").innerText = (count || defaultResponse);
  });
});