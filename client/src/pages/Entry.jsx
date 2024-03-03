import { PromptBox, EditorComponent } from "../components"
import { useState, useEffect } from 'react'
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
    const [journalEntry, setJournalEntry] = useState({})


    useEffect(() => {
        setJournalEntry({
            promptId:null,
            text:null,
            moodRanking:null
        })
        console.log('entry', journalEntry)
    }, [])

    const handleEditorStateChange = (newState) => {
        setEditorState(newState);
        
        const contentState = newState.getCurrentContent();
        setJournalEntry({
            ...journalEntry,
            text:contentState.getPlainText()
        })
        console.log(contentState.getPlainText());
    };

    const applyStyle = (style) => {
        const newState = RichUtils.toggleInlineStyle(editorState, style);
        handleEditorStateChange(newState);
    };
    const renderMoodSlider = () => {
        return (
            <div className="flex flex-column items-start w-80 mr4 pv4 tl">
                <p className="ma0 pa0 nowrap pb2">How Do you feel Today? {value}</p>
            
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={value}
                    onChange={handleMoodChange}
                    className="slider w-100 "
                />
            </div>
        )
    }
    const handleMoodChange = (event) => {
        const value = event.target.value;

        setValue(value);
        setJournalEntry({
            ...journalEntry,
            moodRanking:value
        })
    };

    const submitEntry = () => {
        console.log(editorState)

    }


    return (
        <div className="entry-editor">
            <PromptBox journalEntry={journalEntry} setJournalEntry={setJournalEntry}/>


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

            <span className="flex justify-between items-center">
            {renderMoodSlider()}
            <button onClick={() => submitEntry()}>Submit</button>

            </span>

            


        </div>
    )
}

export default Entry