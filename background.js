// Create context menu item
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "upload-to-imagekit",
    title: "Upload to ImageKit",
    contexts: ["image"]
  });
});

// Listener for context menu click
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "upload-to-imagekit") {
    let imageUrl = info.srcUrl;
    let result = await chrome.storage.local.get('apiKey');
    let apiKey = result.apiKey;

    if (!apiKey) {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon48.png',
        title: 'API Key Missing',
        message: 'Please set your API key in the extension popup.'
      });
      return;
    }

    const uploadEndpoint = 'https://upload.imagekit.io/api/v1/files/upload';
    const form = new FormData();
    form.append('file', imageUrl);
    form.append('fileName', imageUrl.split('/').pop());
    form.append('useUniqueFileName', false);

    const options = {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        'Authorization': 'Basic ' + btoa(apiKey + ':')
      },
      body: form
    }

    // Perform the POST request to ImageKit
    fetch(uploadEndpoint, options)
    .then(response => response.json())
    .then(data => {
      chrome.notifications.create({
        type: 'basic',
        // iconUrl: 'icon48.png',
        title: 'Upload Successful',
        message: 'Image uploaded to ImageKit.'
      });
    })
    .catch(error => {
      chrome.notifications.create({
        type: 'basic',
        // iconUrl: 'icon48.png',
        title: 'Upload Failed',
        message: 'Failed to upload image.'
      });
    });
  }
});