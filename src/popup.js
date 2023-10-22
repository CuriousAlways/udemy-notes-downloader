'use strict';

(function () {
  const downloadBtn = document.querySelector('#downloadBtn');
  const links = document.querySelectorAll('a');
  const UDEMY_HOST = 'www.udemy.com';

  /* make links clickable */
  links.forEach((link) => {
    link.addEventListener('click', () => {
      // open link in new active tab
      chrome.tabs.create({ url: link.getAttribute('href') });
    });
  });

  /* communicate download request to content script */
  downloadBtn.addEventListener('click', async () => {
    let tabs = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!validateUrl(tabs[0])) {
      /* execution context is lost when chrome executes function passed to execute script
       ** because of serialization and de-serialization */
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => alert(`Download action only applicable on www.udemy.com`),
      });
    } else {
      let message = { type: 'Download' };
      let response = await chrome.tabs.sendMessage(tabs[0].id, message);
      console.log(response);
    }
  });

  /* TODO: Update to check notes tab is open */
  function validateUrl(tab) {
    let url = new URL(tab.url);

    return url.host === UDEMY_HOST;
  }
})();
