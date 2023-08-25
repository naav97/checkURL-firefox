// Get the current tab's URL and send it to the background script
browser.tabs.query({ active: true, currentWindow: true }, tabs => {
  const url = tabs[0].url;
  browser.runtime.sendMessage({ action: "checkURL", url });
});

// Listen for messages from the background script
browser.runtime.onMessage.addListener(message => {
  if (message.action === "showResult") {
    const resultElement = document.getElementById("result");
    resultElement.textContent = message.result;
  }
});
