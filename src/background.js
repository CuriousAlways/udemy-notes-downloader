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
    console.log('====== download request initiated =========');
    let markdown = generate_markdown(request.payload);
    console.log(markdown);
    let blob = new Blob([markdown], { type: 'text/plain' });
    console.log(blob);
    let url = URL.createObjectURL(blob);

    chrome.downloads.download({ url: url, saveAs: true });
  }
});
