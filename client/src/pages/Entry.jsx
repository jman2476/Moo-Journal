import { PromptBox, EditorComponent, Dropdown } from "../components"
import { useState, useEffect } from 'react'
import { useStore } from '../store'
import { NEW_ENTRY } from '../graphql/mutations'
import { useMutation } from '@apollo/client'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import moods from '../utils/moods'

import '../styles/pages/entryPage.scss'

import { styleMap, combinedStyleConfig } from '../utils/editorStyleMap'

import { EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';


function Entry() {

    const navigate = useNavigate()


    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [journalEntry, setJournalEntry] = useState({})

 

    const [newEntry] = useMutation(NEW_ENTRY, { variables: journalEntry })

    useEffect(() => {
        setJournalEntry({
            promptId: null,
            text: "",
            moodRanking: 5
        })
        console.log('entry', journalEntry)
    }, [])

    const handleEditorStateChange = (newState) => {

        const rawEditorState = convertToRaw(editorState.getCurrentContent());
        const serializedEditorState = JSON.stringify(rawEditorState);

        const contentState = newState.getCurrentContent();
        setJournalEntry({
            ...journalEntry,
            text: contentState.getPlainText()
        })


        setEditorState(newState);
    };

    const submitEntry = async () => {
        const rawEditorState = convertToRaw(editorState.getCurrentContent());
        const serializedEditorState = JSON.stringify(rawEditorState);

        if (journalEntry?.text && journalEntry?.text.length < 10 || !journalEntry?.text.length) {
            return alert('must be more than 10 chars')
        }

        try {
            console.log('entry', journalEntry)
            console.log(editorState)
            const data = await newEntry({
                variables: {
                    ...journalEntry,
                    editorState: serializedEditorState
                }
            })
            console.log(data)
            navigate('/my_journal')
        } catch (err) {
            console.log(err)
        }
    }

    const groupStylesByCategory = (styles) => {
        return styles.reduce((acc, item) => {
            const { category } = item

            if(!acc[category]){
                acc[category] = []
            }

            acc[category].push(item)

            return acc
        }, {})
    }

    const createStyleMap = (styles) => {

        styles.reduce((acc, option) => {
                acc[option.style] = option.css
                return acc
            }, {})
    }

    const renderStyleButtons = () => {
        return combinedStyleConfig.map((option, index) => {
            const applyStyle = () => {
                let newState;

                if (option.type === 'inline') {
                    newState = RichUtils.toggleInlineStyle(editorState, option.style)
                } else if (option.type === 'block') {
                    newState = RichUtils.toggleBlockType(editorState, option.style)
                }

                if (newState) {
                    handleEditorStateChange(newState)
                }
            }

            return (
                <button key={index} className={option.className} onClick={applyStyle}>
                    {option.label}
                </button>
            )


        })
    }


    const customStyleMap = createStyleMap(combinedStyleConfig)

    const groupedStyles = groupStylesByCategory(combinedStyleConfig)


    return (
        <div className="entry-editor">
            <PromptBox journalEntry={journalEntry} setJournalEntry={setJournalEntry} />


            <span className="flex flex-row pointer">
                {renderStyleButtons()}

            </span>
            <EditorComponent
                editorState={editorState} // Pass the editorState to the EditorComponent
                customStyleMap={customStyleMap}
                onEditorStateChange={handleEditorStateChange}
            />

            <span className="flex justify-end items-end w-100 pv2 mt2">
                {/* {renderMoodSlider()} */}
                <button onClick={() => submitEntry()}>Submit</button>

            </span>

            <Dropdown
                label="Text Size"
                options={[
                    { label: 'Small', style: 'SMALL' },
                    { label: 'Medium', style: 'MEDIUM' },
                    { label: 'Large', style: 'LARGE' }
                ]}
                onChange={(option) => {
                    console.log(option.style); // Here, you would apply the style
                    // For example: applyStyle(option.style)
                }}
            />


        </div>
    )
}

export default Entry