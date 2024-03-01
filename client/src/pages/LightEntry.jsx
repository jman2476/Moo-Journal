import React from 'react'
import EditorComponent from '../components/EditorComponent'
import { useState } from 'react'

const styleMap = {
    'SMALL':{ fontSize: 12 },
    'MEDIUM':{ fontSize: 12 },
    'LARGE':{ fontSize: 12 },
    'HIGHLIGHT':{ backgroundColor: 'yellow' },
}

// const LightEntryEditor = () => {
//     const handleEditorStateChange = (newState) => {
//         // save to db
//     };

//     return (
//         <div>
//             <EditorComponent customStyleMap={styleMap} onEditorStateChange={handleEditorStateChange} />
//         </div>
//     )
// }
import { EditorState, RichUtils } from 'draft-js';
// import EditorComponent from './EditorComponent';

const LightEntry = () => {
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
        <div>
        <p>This is the page in the folder</p>
            <button onClick={() => applyStyle('SMALL')}>Small</button>
            <button onClick={() => applyStyle('MEDIUM')}>Medium</button>
            <button onClick={() => applyStyle('LARGE')}>Large</button>
            <button onClick={() => applyStyle('HIGHLIGHT')}>Highlight</button>
            <EditorComponent
                editorState={editorState} // Pass the editorState to the EditorComponent
                customStyleMap={styleMap}
                onEditorStateChange={handleEditorStateChange}
            />
        </div>
    );
};

export default LightEntry;



// export default LightEntryEditor