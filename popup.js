document.addEventListener('DOMContentLoaded', () => {
  const uploadToSelect = document.getElementById('uploadTo');
  const stageApiKeyInput = document.getElementById('stageApiKey');
  const productionApiKeyInput = document.getElementById('productionApiKey');

  // Load existing settings
  chrome.storage.local.get(['uploadTo', 'stageApiKey', 'productionApiKey'], (result) => {
    if (result.uploadTo) {
      uploadToSelect.value = result.uploadTo;
    }
    if (result.stageApiKey) {
      stageApiKeyInput.value = result.stageApiKey;
    }
    if (result.productionApiKey) {
      productionApiKeyInput.value = result.productionApiKey;
    }
  });

  // Function to save settings
  function saveSettings() {
    const uploadTo = uploadToSelect.value;
    const stageApiKey = stageApiKeyInput.value.trim();
    const productionApiKey = productionApiKeyInput.value.trim();

    chrome.storage.local.set({
      uploadTo: uploadTo,
      stageApiKey: stageApiKey,
      productionApiKey: productionApiKey
    });
  }

  // Add event listeners to save settings when any input changes
  uploadToSelect.addEventListener('change', saveSettings);
  stageApiKeyInput.addEventListener('input', saveSettings);
  productionApiKeyInput.addEventListener('input', saveSettings);
});