'use strict';

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

import events from './helpers/events';
import formatTag from './helpers/formatTag';

// DECLARE html selectors
const ENCLOSING_ELEMENT_SELECTOR = 'lecture-bookmark-v2--row--';
export const NOTE_CONTENT_SELECTOR = 'lecture-bookmark-v2--content-container--';
export const NOTE_SECTION_NAME_SELECTOR = 'lecture-bookmark-v2--section--';
export const NOTE_LESSON_NAME_SELECTOR = 'ud-text-sm';
export const NOTE_DURATION_ENCLOSING_SELECTOR = 'lecture-bookmark-v2--duration--';
export const NOTE_DURATION_SELECTOR = 'bookmark-';

// Listen for message from popup.html and pass download request to background job/service worker
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === events.download) {
    handleDownloadEvent(request);
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

// handle different events
// event:  DOWNLOAD
function handleDownloadEvent(request) {
  let enclosing_tags = document.querySelectorAll(`[class^='${ENCLOSING_ELEMENT_SELECTOR}']`);

  /* Notes not found */
  if (enclosing_tags.length === 0) {
    let alert_message = `No notes found!!! plz ensure your are on udemy course notes tab.`;
    alert(alert_message);
    return;
  }
  let newParentNode = document.createElement('div');
  let sortOrder = request.payload['reverseSort'] || false;

  sortedNodeList(enclosing_tags, sortOrder).forEach((tag) => {
    // Format the notes tag with code formatting as well as optional note metadata title
    const formattedTag = formatTag(tag, request.payload);
    newParentNode.append(formattedTag);
  });

  let message = { type: events.download, payload: newParentNode.outerHTML };
  chrome.runtime.sendMessage(message);
}
