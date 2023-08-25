// Get the current page's URL and send it to the background script
const url = window.location.href;
browser.runtime.sendMessage({ action: "checkURL", url });
