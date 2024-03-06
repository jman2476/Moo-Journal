import React from 'react'
import { Editor, RichUtils } from 'draft-js'
import 'draft-js/dist/Draft.css';

const EditorComponent = ({ editorState, customStyleMap, onEditorStateChange }) => {
    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command)
        if (newState) {
            onEditorStateChange(newState)
            return 'handled'
        }
        return 'not-handled'
    }

    return (
        <Editor
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            onChange={onEditorStateChange}
            customStyleMap={customStyleMap}
        />
    )
}

export default EditorComponent