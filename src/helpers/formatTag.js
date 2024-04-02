'use strict';

import formatcode from './format_code';
import {
  NOTE_CONTENT_SELECTOR,
  NOTE_DURATION_ENCLOSING_SELECTOR,
  NOTE_DURATION_SELECTOR,
  NOTE_LESSON_NAME_SELECTOR,
  NOTE_SECTION_NAME_SELECTOR,
} from '../contentScript';

/*
returns a heading element populated with the note's section name, lesson name and timestamp
*/
function createNoteMetadata({ noteSection, noteLesson, noteTimeStamp, separator }) {
  const heading = document.createElement('h5');
  heading.innerText = `${noteSection} ${separator} ${noteLesson} ${separator} ${noteTimeStamp}`;
  return heading;
}

/*
  returns a formatted note element with code formatting as well as optional note metadata title
*/
function formatTag(tag, options) {
  let cloned_tag = tag.cloneNode(true); // deep clone

  const noteContentTag = cloned_tag.querySelector(`[class^='${NOTE_CONTENT_SELECTOR}']`);
  const formatted_content = formatcode(noteContentTag, options);

  const isAddNoteMetadata = options['noteMetadata'] || false;

  if (isAddNoteMetadata) {
    // Get the note's metadata from their respective markup elements
    const noteSectionNameText = cloned_tag.querySelector(`[class^='${NOTE_SECTION_NAME_SELECTOR}']`).innerText;
    const noteLessonNameText = cloned_tag.querySelector(`[class^='${NOTE_LESSON_NAME_SELECTOR}']`).innerText;
    const noteTimeStampText = cloned_tag
      .querySelector(`[class^='${NOTE_DURATION_ENCLOSING_SELECTOR}']`)
      .querySelector(`[id^='${NOTE_DURATION_SELECTOR}']`).innerText;

    // Build a note metadata heading
    const noteMetadata = createNoteMetadata({
      noteSection: noteSectionNameText,
      noteLesson: noteLessonNameText,
      noteTimeStamp: noteTimeStampText,
      separator: ' | ',
    });

    // insert the the metadata heading at the begining of each div
    formatted_content.prepend(noteMetadata);
  }

  return formatted_content;
}

export default formatTag;
