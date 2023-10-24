'use strict';

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

import formatcode from './helpers/format_code';

// DECLARE html selectors
const ENCLOSING_ELEMENT_SELECTOR = '.lecture-bookmark-v2--content-container--2f_Tg';

// Listen for message from popup.html and pass download request to background job/service worker
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'Download') {
    let enclosing_tags = document.querySelectorAll(ENCLOSING_ELEMENT_SELECTOR);

    /* Notes not found */
    if (enclosing_tags.length === 0) {
      let alert_message = `No notes found!!! plz ensure your are on udemy course notes tab.`;
      alert(alert_message);
      return;
    }
    let newParentNode = document.createElement('div');
    let sortOrder = request.payload['reverseSort'] || false;

    sortedNodeList(enclosing_tags, sortOrder).forEach((tag) => {
      let cloned_tag = tag.cloneNode(true); // deep clone
      let formatted_node = formatcode(cloned_tag, request.payload);
      newParentNode.appendChild(formatted_node.children[0]);
    });

    let message = { type: 'Download', payload: newParentNode.outerHTML };
    chrome.runtime.sendMessage(message);
  }

  // Send an empty response
  // See https://github.com/mozilla/webextension-polyfill/issues/130#issuecomment-531531890
  sendResponse({});
});

/*
returns an array of dom nodes
*/
function sortedNodeList(nodeList, reverse = false) {
  return reverse ? [...nodeList].reverse() : [...nodeList];
}
