'use strict';
/* importing css so that changes in css file could be picked to initiate recompiling during development */
import './popup.css';
import validCodeLang from './helpers/constants';
import events from './helpers/events';

(function () {
  const downloadBtn = document.querySelector('#download-btn');
  const sortOrder = document.querySelector('#sort-order');
  const addHorizontalRule = document.querySelector('#horizontal-rule');
  const codeFormatLanguage = document.querySelector('#code-lang');
  const links = document.querySelectorAll('a');
  //const UDEMY_REGEX = /^https:\/\/(?:www\.|.*?\.)?udemy\.com\/.*$/i;
  const UDEMY_HOST_REGEX = /^(?:.*?)?\.udemy\.com$/i;

  //This script needs to behave differently for firefox, for now this is a working way to detect which browser it's running in
  //Better to have a config file that holds a platform variable but this works for now
  const FIREFOX = typeof browser == 'object' ? true : false;

  /* make links clickable */
  links.forEach((link) => {
    link.addEventListener('click', () => {
      // open link in new active tab
      chrome.tabs.create({ url: link.getAttribute('href') });
    });
  });

  /* communicate download request to content script */
  downloadBtn.addEventListener('click', async () => {
    let tabs = FIREFOX ? await browser.tabs.query({ active: true, currentWindow: true }) : await chrome.tabs.query({ active: true, currentWindow: true });
    if (!valideUrl(tabs[0])) {
      /* execution context is lost when chrome executes function passed to execute script
       ** because of serialization and de-serialization */
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => alert(`Download action only applicable on udemy.com websites.`),
      });
    } else {
      let message = { type: events.download, payload: generatePayload() };
      await chrome.tabs.sendMessage(tabs[0].id, message);
    }
  });

  /* TODO: Update to check notes tab is open */
  function valideUrl(tab) {
    let url = new URL(tab.url);

    return UDEMY_HOST_REGEX.test(url.host);
  }

  function generatePayload() {
    let reverseSortOrder = sortOrder.checked;
    let horizontalRule = addHorizontalRule.checked;
    let codeLang = validCodeLang.includes(codeFormatLanguage.value) ? codeFormatLanguage.value : 'javaScript';

    return { reverseSort: reverseSortOrder, addHorizontalRule: horizontalRule, codeLang: codeLang };
  }
})();
