# <img src="public/icons/icon_48.png" width="45" align="left"> Udemy Notes Downloader

Udemy notes downloader lets you download your course notes in markdown format.

## Features

- [x] download in markdown
- [x] sorting order
- [x] multi-language code highlight
- [ ] download in pdf
- [ ] I18n

## Install

[**Chrome** extension](https://chromewebstore.google.com/detail/udemy-notes-downloader/nfmebebffodanoadjadpjimpkihfeamn)

[**Firefox** extension](https://addons.mozilla.org/en-US/firefox/addon/udemy-notes-downloader/) 

## Contribution

Suggestions and pull requests are welcomed!.

## Build instructions

 1. Install Node.js v20 or above using a package manager or from [the Node.js website](https://nodejs.org/)
 2. Download repository and navigate to the folder in a terminal such as cmd or bash
 3. From terminal, run `npm install` to install project dependencies
 4. Run `npm run repack` from the same terminal to build the extensions (output to the `/build` folder) and pack the extensions (output to the `/release` folder)
 5. *Loading extension in Chrome:*
    1. Open Google Chrome and navigate to `chrome://extensions/`
    2. Toggle the developer mode switch on
    3. Click the `Load unpacked` button and select the `/build/chrome` repository folder
 6. *Loading extension in Firefox:* Loading unsigned extensions is only possible in Firefox Developer edition, please use the Firefox add-on store version for regular usage
	 1. Install [Firefox Developer Edition](https://www.mozilla.org/en-US/firefox/developer/) for your platform and open it
	 2. Navigate to `about:config` and proceed through the warning prompt 
	 3. Search for `xpinstall.signatures.required` and change the setting to `false`
	 4. Navigate to `about:debugging#/runtime/this-firefox` and click the `Load Temporary add-on` button
	 5. Navigate to the `/release` repository folder and select the .zip file corresponding to the Firefox version of the extension
	 6. *Optional:* Click the `inspect` button in the entry for the extension to view debugging output

---

This project was bootstrapped with [Chrome Extension CLI](https://github.com/dutiyesh/chrome-extension-cli)

