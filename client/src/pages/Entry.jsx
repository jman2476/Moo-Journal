import { PromptBox, EditorComponent } from "../components"
import { useState } from 'react'

const styleMap = {
    'SMALL':{ fontSize: 12 },
    'MEDIUM':{ fontSize: 18 },
    'LARGE':{ fontSize: 24 },
    'HIGHLIGHT':{ backgroundColor: 'yellow' },
}

import { EditorState, RichUtils } from 'draft-js';









function Entry(){

    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const handleEditorStateChange = (newState) => {
        setEditorState(newState);
        // Get the current content state from the new editor state
        const contentState = newState.getCurrentContent();
        // Convert the content state to plain text
        const text = contentState.getPlainText();
    
        // Log the plain text to the console
        console.log(text);
    
        // Add logic to save the state to a database here, if necessary
    };
    

    const applyStyle = (style) => {
        const newState = RichUtils.toggleInlineStyle(editorState, style);
        handleEditorStateChange(newState);
    };

    return (
        <>
            {/* <h1>Entry</h1> */}
        <PromptBox/>


        <button onClick={() => applyStyle('SMALL')}>Small</button>
            <button onClick={() => applyStyle('MEDIUM')}>Medium</button>
            <button onClick={() => applyStyle('LARGE')}>Large</button>
            <button onClick={() => applyStyle('HIGHLIGHT')}>Highlight</button>
            <EditorComponent
                editorState={editorState} // Pass the editorState to the EditorComponent
                customStyleMap={styleMap}
                onEditorStateChange={handleEditorStateChange}
            />


        </>
    )
}

export default Entry