import draftToHtml from 'draftjs-to-html';
import React from 'react';

export default (text) => {
  let innerHtml;
  if (text && text.indexOf('entityMap') > -1) {
    innerHtml = draftToHtml(JSON.parse(text));
  } else if (text && text.indexOf('<p>') === -1) {
    innerHtml = text;
  }
  const createMarkup = () => {
    return { __html: innerHtml };
  };
  return <div dangerouslySetInnerHTML={createMarkup()} />;
};
