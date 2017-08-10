import React, { Component } from 'react';
import { Card } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import draftToHtml from 'draftjs-to-html';
import { EditorState, ContentState, convertToRaw, convertFromHTML, convertFromRaw } from 'draft-js';

////////////////////////////////////////////////////////////
////// EditerState 和 contentState 是不一样的 ！！！///////////
////////////////////////////////////////////////////////////

class RichEditer extends Component {
  render() {
    const { title, value, onChange } = this.props;
    return (
      <Card title={title} bordered={false} >
        <Editor
          editorState={value}
          toolbarClassName="home-toolbar"
          wrapperClassName="home-wrapper"
          editorClassName="home-editor"
          onEditorStateChange={onChange}
          localization={{ locale: 'zh', translations: {'generic.add': 'Test-Add'} }}
        />
        <style>{`
            .home-editor {
                min-height: 300px;
            }
        `}</style>
      </Card>
    );
  }
}

export default RichEditer;

// 初始化文本内容 1. draftRow 2. 纯文本信息 3. html文本信息 4.空信息
export const initEditer = (text) => {
  let editorState;
  // console.log('text', text);
  if (text && text.indexOf('entityMap') > -1) {
    console.log('object');
    const contentState = convertFromRaw(JSON.parse(text));
    editorState = EditorState.createWithContent(contentState);
  } else if (text && text.indexOf('<p>') > -1) {
    console.log('html');
    const blocksFromHTML = convertFromHTML(text);
    const contentState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    editorState = EditorState.createWithContent(contentState);
  } else if (text && text.indexOf('<p>') === -1) {
    console.log('string');
    const contentState = ContentState.createFromText(text)
    editorState = EditorState.createWithContent(contentState);
  } else {
    console.log('empty');
    editorState = EditorState.createEmpty()
  }

  return editorState;
}

export const toRaw = (editorState) => convertToRaw(editorState.getCurrentContent())
