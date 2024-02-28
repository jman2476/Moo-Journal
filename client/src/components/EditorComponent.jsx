import React from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import 'draft-js/dist/Draft.css';
import { useState } from 'react'

const EditorComponent = ({ customStyleMap, onEditorStateChange }) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

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
            onChange={(newState) => {
                console.log(newState)
                setEditorState(newState);
                onEditorStateChange(newState); // Pass the new state back to the parent component
            }}
            customStyleMap={customStyleMap}
        />
    )
}

export default EditorComponent