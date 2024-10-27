document.getElementById('saveButton').addEventListener('click', () => {
  let apiKey = document.getElementById('apiKeyInput').value.trim();
  chrome.storage.local.set({ apiKey: apiKey }, () => {
    alert('API Key saved!');
  });
});

// Load existing API Key if it exists
chrome.storage.local.get('apiKey', (result) => {
  if (result.apiKey) {
    document.getElementById('apiKeyInput').value = result.apiKey;
  }
});