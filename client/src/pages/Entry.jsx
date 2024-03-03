import { PromptBox, EditorComponent } from "../components"
import { useState } from 'react'
import { useStore } from '../store'

const styleMap = {
    'SMALL': { fontSize: 12 },
    'MEDIUM': { fontSize: 18 },
    'LARGE': { fontSize: 24 },
    'HIGHLIGHT': { backgroundColor: 'yellow' },
}

import { EditorState, RichUtils } from 'draft-js';


function Entry() {
    const [value, setValue] = useState(5);

    const { state, setState } = useStore()


    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const handleEditorStateChange = (newState) => {
        setEditorState(newState);
        const contentState = newState.getCurrentContent();
        console.log(contentState.getPlainText());
    };

    const applyStyle = (style) => {
        const newState = RichUtils.toggleInlineStyle(editorState, style);
        handleEditorStateChange(newState);
    };
    const renderMoodSlider = () => {
        return (
            <div className="flex flex-row items-center">
            <span>
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={value}
                    onChange={handleChange}
                />
                <p>Value: {value}</p>
                </span>
                <p className="pa1 bg-green" onClick={() => handleMoodSelection(value)}>Continue</p> {/* Add this to move to the next step */}
            </div>
        )
    }
    const handleChange = (event) => {
        setValue(event.target.value);
    };


    return (
        <div className="entry-editor">
            <PromptBox />


            <span className="flex flex-row">
                <p className="ph1" onClick={() => applyStyle('SMALL')}>Small</p>

                <p className="ph1" onClick={() => applyStyle('MEDIUM')}>Medium</p>
                <p className="ph1" onClick={() => applyStyle('LARGE')}>Large</p>
                <p className="ph1" onClick={() => applyStyle('HIGHLIGHT')}>Highlight</p>
            </span>
            <EditorComponent
                editorState={editorState} // Pass the editorState to the EditorComponent
                customStyleMap={styleMap}
                onEditorStateChange={handleEditorStateChange}
            />

            <span className="flex justify-between">
            {renderMoodSlider()}
            <button>Submit</button>

            </span>

            


        </div>
    )
}

export default Entry