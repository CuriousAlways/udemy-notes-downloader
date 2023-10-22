'use strict';

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

// DECLARE html selectors
const ENCLOSING_ELEMENT_SELECTOR = '.lecture-bookmark-v2--content-container--2f_Tg';

// Listen for message from popup.html and pass download request to background job/service worker
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  if (request.type === 'Download') {
    let enclosing_tags = document.querySelectorAll(ENCLOSING_ELEMENT_SELECTOR);

    /* Notes not found */
    if (enclosing_tags.length === 0) {
      alert('No notes found!!');
      return;
    }
    let newParentNode = document.createElement('div');

    enclosing_tags.forEach((tag) => {
      newParentNode.appendChild(tag.children[0]);
    });

    let notes_html = newParentNode.outerHTML;

    let message = { type: 'Download', payload: notes_html };
    console.log(message);

    chrome.runtime.sendMessage(message);
  }

  // Send an empty response
  // See https://github.com/mozilla/webextension-polyfill/issues/130#issuecomment-531531890
  sendResponse({});
});
