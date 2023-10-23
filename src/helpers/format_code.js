// import NAME_TO_TYPE_MAPPING from './constants';
/*
 * format udemy html formatting to make it more elegant when its converted to markdown
 * htmlNode -> node to be formatted to markdown
 * options -> additional params to finetune formatting
 *
 */
export default function formatcode(htmlNode, options = { codeLang: 'javaScript' }) {
  // for now lets just fix code block formatting to be compatible with markdown

  let codeBlocks = htmlNode.querySelectorAll('pre');
  let formattingLanguage = options['codeLang'];
  let addHorizontalRule = options['addHorizontalRule'];

  codeBlocks.forEach((codeBlock) => {
    let linesOfCode = codeBlock.querySelectorAll('li');
    let locs = [...linesOfCode].map((loc) => loc.innerText);

    // Build compatible code block
    let preTag = document.createElement('pre');
    let codeTag = document.createElement('code');
    codeTag.classList = `language-${formattingLanguage}`;
    codeTag.innerText = locs.join('\n');
    preTag.appendChild(codeTag);

    // replce newly created old code tag with new one
    codeBlock.parentNode.replaceChild(preTag, codeBlock);
  });

  // Add horizontal tag at end of each section
  if (addHorizontalRule) {
    let hrTag = document.createElement('hr');
    htmlNode.appendChild(hrTag);
  }

  return htmlNode;
}
