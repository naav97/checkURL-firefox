// Function to check if a URL is malicious using Safe Browsing API
async function checkURL(url) {
  const apiKey = "AIzaSyDwUd1YfAGyX4Sk2e2OCSzq6CeN7YCrXA8";
  const apiEndpoint = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;

  const requestBody = {
    client: {
      clientId: "Firefox",
      clientVersion: "0.0.1"
    },
    threatInfo: {
      threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
      platformTypes: ["ANY_PLATFORM"],
      threatEntryTypes: ["URL"],
      threatEntries: [{ url }]
    }
  };

  const response = await fetch(apiEndpoint, {
    method: "POST",
    body: JSON.stringify(requestBody)
  });

  const data = await response.json();
  return JSON.stringify(data) === '{}' ? "Safe" : "Potentially malicious";
}

// Listen for messages from the popup and content scripts
browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "checkURL") {
    const result = await checkURL(message.url);
    browser.runtime.sendMessage({ action: "showResult", result });
  }
});
