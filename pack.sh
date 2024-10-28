#!/bin/bash

# Define variables
EXTENSION_NAME="upload_to_imagekit"
CHROME_MANIFEST="manifest_chrome.json"
FIREFOX_MANIFEST="manifest_firefox.json"

# Package for Chrome
echo "Packaging extension for Chrome..."
mv "$CHROME_MANIFEST" manifest.json
zip -r "./${EXTENSION_NAME}_chrome.zip" . -x "*.DS_Store" -x "*.sh" -x "*.md" -x "*.zip" -x ".git/*" -x ".gitignore" -x "$FIREFOX_MANIFEST" -x "$CHROME_MANIFEST"
mv manifest.json "$CHROME_MANIFEST"

# Package for Firefox
echo "Packaging extension for Firefox..."
mv "$FIREFOX_MANIFEST" manifest.json
zip -r "./${EXTENSION_NAME}_firefox.zip" . -x "*.DS_Store" -x "*.sh" -x "*.md" -x "*.zip" -x ".git/*" -x ".gitignore" -x "$FIREFOX_MANIFEST" -x "$CHROME_MANIFEST"
mv manifest.json "$FIREFOX_MANIFEST"

echo "Packaging complete. Files created:"
echo "  - ${EXTENSION_NAME}_chrome.zip"
echo "  - ${EXTENSION_NAME}_firefox.zip"