'use strict';

import { NodeHtmlMarkdown } from 'node-html-markdown';

// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

// generate and download markdow for given html string
function generate_markdown(html_string) {
  return NodeHtmlMarkdown.translate(html_string);
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log(request);
  if (request.type === 'Download') {
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
    let url = `data:text/markdown,${markdown}`;
    let filename = 'test.md';
    chrome.downloads.download({ url: url, saveAs: true, filename: filename });
  }
});
