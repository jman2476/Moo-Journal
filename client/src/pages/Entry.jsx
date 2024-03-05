import { PromptBox, EditorComponent } from "../components"
import { useState, useEffect } from 'react'
import { useStore } from '../store'
import {NEW_ENTRY} from '../graphql/mutations'
import { useMutation } from '@apollo/client'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import moods from '../utils/moods'

import '../styles/pages/entryPage.scss'

import {styleMap} from '../utils/editorStyleMap'

import { EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';


function Entry() {
    const [value, setValue] = useState(5);

    const { state, setState } = useStore()
    const navigate = useNavigate()


    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [journalEntry, setJournalEntry] = useState({})

    const [newEntry] = useMutation(NEW_ENTRY, {variables: journalEntry })
    useEffect(() => {
        setJournalEntry({
            promptId:null,
            text:"",
            moodRanking:5
        })
        console.log('entry', journalEntry)
    }, [])

    const handleEditorStateChange = (newState) => {

        const rawEditorState = convertToRaw(editorState.getCurrentContent());
        const serializedEditorState = JSON.stringify(rawEditorState);

        const contentState = newState.getCurrentContent();
        setJournalEntry({
            ...journalEntry,
            text:contentState.getPlainText(),
            editorState:serializedEditorState
        })


        setEditorState(newState);
    };

    const applyStyle = (style) => {
        const newState = RichUtils.toggleInlineStyle(editorState, style);
        handleEditorStateChange(newState);
    };
    const renderMoodSlider = () => {
        return (
            <div className="flex flex-column items-start w-80 mr4 pv4 tl moodMobile">
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
        setValue(value);
        setJournalEntry({
            ...journalEntry,
            moodRanking:+value
        })
    };

    const submitEntry = async () => {


        if(journalEntry?.text && journalEntry?.text.length < 10 || !journalEntry?.text.length){
            return alert('must be more than 10 chars')
        }
        console.log('entry', journalEntry)
        console.log(editorState)
        const data = await newEntry({
            variables:{
                ...journalEntry
            }
        })
        console.log(data)
        navigate('/')

    }


    return (
        <div className="entry-editor">
            <PromptBox journalEntry={journalEntry} setJournalEntry={setJournalEntry}/>


            <span className="flex flex-row pointer">
                <p className="pr1 pt0 mt1" onClick={() => applyStyle('SMALL')}>Small</p>
                <p className="pr1 pt0 mt1" onClick={() => applyStyle('MEDIUM')}>Medium</p>
                <p className="pr1 pt0 mt1" onClick={() => applyStyle('LARGE')}>Large</p>
                <p className="pr1 pt0 mt1" onClick={() => applyStyle('HIGHLIGHT')}>Highlight</p>
            </span>
            <EditorComponent
                editorState={editorState} // Pass the editorState to the EditorComponent
                customStyleMap={styleMap}
                onEditorStateChange={handleEditorStateChange}
            />

            <span className="flex justify-end items-end w-100 pv2 mt2">
            {/* {renderMoodSlider()} */}
            <button className="entrySubmitBtn" onClick={() => submitEntry()}>Submit</button>

            </span>

            


        </div>
    )
}

export default Entry