import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Wysiwyg = (props) => {
  return (
    <div>
      <Editor
        editorState={props.editorState}
        onEditorStateChange={props.setEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
    </div>
  );
};

export default Wysiwyg;
