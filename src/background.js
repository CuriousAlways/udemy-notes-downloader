'use strict';

import events from './helpers/events';
import { NodeHtmlMarkdown } from 'node-html-markdown';

// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

// generate and download markdow for given html string
function generate_markdown(html_string) {
  return NodeHtmlMarkdown.translate(html_string);
}

function generate_blob_from_string(str, mimeType) {
  return new Blob([str], { type: mimeType });
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.type === events.download) {
    let markdown = generate_markdown(request.payload);
    /* service workers since manifest v3 does not allow to url for blob
     * so as work around we will generate data uri with string. One
     * limitation is we can only have data uri of size 64 MB but
     * its a lot for plain text with no media
     *
     * let blob = new Blob([markdown], { type: 'text/plain' });
     * console.log(blob);
     * let url = URL.createObjectURL(blob);
     */

    /**************************************************
     * encode generated string in base64 to avoid content
     * truncation
    ***************************************************/
    const blob = generate_blob_from_string(markdown, "text/markdown");
    const reader = new FileReader()
    reader.addEventListener('load', (ev) => {
      const base64Url = ev.target.result;
      chrome.downloads.download({ url: base64Url, saveAs: true, filename: 'notes.md' });
    })

    reader.readAsDataURL(blob);
  }
});
