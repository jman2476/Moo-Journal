import { PromptBox, EditorComponent } from "../components"
import { useState, useEffect } from 'react'
import { useStore } from '../store'
import {NEW_ENTRY} from '../graphql/mutations'
import { useMutation } from '@apollo/client'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'

import '../styles/pages/entryPage.scss'

const styleMap = {
    'SMALL': { fontSize: 12 },
    'MEDIUM': { fontSize: 18 },
    'LARGE': { fontSize: 24 },
    'HIGHLIGHT': { backgroundColor: 'yellow' },
}

import { EditorState, RichUtils } from 'draft-js';


function Entry() {

    const moods = [
        { mood: "Absolutely dreadful", color: "#4a4e69" }, // Dark gray
        { mood: "Terri-bull", color: "#22223b" }, // Charcoal
        { mood: "Somewhat gloomy", color: "#6b705c" }, // Olive green
        { mood: "Barely tolerable", color: "#9a8c98" }, // Muted purple
        { mood: "Mediocre at best", color: "#c9ada7" }, // Soft pink
        { mood: "Accepta-bull", color: "#f2e9e4" }, // Off white
        { mood: "Pretty good", color: "#a5a58d" }, // Khaki
        { mood: "Udderly happy", color: "#f4a261" }, // Sandy orange
        { mood: "Remarka-bull", color: "#2a9d8f" }, // Teal
        { mood: "Fantastically vibrant", color: "#e9c46a" }, // Saffron
        { mood: "Euphorically ecstatic", color: "#f72585" } // Vivid pink
      ]
      


    const [value, setValue] = useState(5);

    const { state, setState } = useStore()
    const navigate = useNavigate()


    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [journalEntry, setJournalEntry] = useState({})

    const [newEntry] = useMutation(NEW_ENTRY, {variables: journalEntry })
    useEffect(() => {
        setJournalEntry({
            promptId:null,
            text:null,
            moodRanking:5
        })
        console.log('entry', journalEntry)
    }, [])

    const handleEditorStateChange = (newState) => {

        
        const contentState = newState.getCurrentContent();
        setJournalEntry({
            ...journalEntry,
            text:contentState.getPlainText()
        })


        setEditorState(newState);
        console.log(contentState.getPlainText());
    };

    const applyStyle = (style) => {
        const newState = RichUtils.toggleInlineStyle(editorState, style);
        handleEditorStateChange(newState);
    };
    const renderMoodSlider = () => {
        return (
            <div className="flex flex-column items-start w-80 mr4 pv4 tl">
                <p className="ma0 pa0 nowrap pb3 np">How Do you feel Today? <span className="pa1 ph2 ml2 br3 mb1" style={{ backgroundColor: moods[value].color, color:+value === 5 || +value === 4  ? 'black' : 'white' }}>{moods[value].mood}</span></p>
            
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={value}
                    onChange={handleMoodChange}
                    className="slider w-100"
                />
            </div>
        )
    }
    const handleMoodChange = (event) => {
        const value = event.target.value;
        console.log('type', typeof +value)
        setValue(value);
        setJournalEntry({
            ...journalEntry,
            moodRanking:+value
        })
    };

    const submitEntry = async () => {

        const textData = journalEntry?.text
        console.log(journalEntry?.text)
        console.log(journalEntry?.text.length)

        if(journalEntry?.text && journalEntry?.text.length < 50 || !journalEntry?.text.length){
            return alert('must be more than 100 chars')
        }

        console.log(editorState)
        const data = await newEntry()
        console.log(data)
        navigate('/')

    }


    return (
        <div className="entry-editor">
            <PromptBox journalEntry={journalEntry} setJournalEntry={setJournalEntry}/>

{/* 
            <span className="flex flex-row pointer">
                <p className="pr1 pt0 mt1" onClick={() => applyStyle('SMALL')}>Small</p>
                <p className="pr1 pt0 mt1" onClick={() => applyStyle('MEDIUM')}>Medium</p>
                <p className="pr1 pt0 mt1" onClick={() => applyStyle('LARGE')}>Large</p>
                <p className="pr1 pt0 mt1" onClick={() => applyStyle('HIGHLIGHT')}>Highlight</p>
            </span> */}
            <EditorComponent
                editorState={editorState} // Pass the editorState to the EditorComponent
                customStyleMap={styleMap}
                onEditorStateChange={handleEditorStateChange}
            />

            <span className="flex justify-end items-end w-100 pv2 mt2">
            {/* {renderMoodSlider()} */}
            <button onClick={() => submitEntry()}>Submit</button>

            </span>

            


        </div>
    )
}

export default Entry