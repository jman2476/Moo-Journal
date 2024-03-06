import { PromptBox, EditorComponent, Dropdown } from "../components"
import { useState, useEffect } from 'react'
import { NEW_ENTRY } from '../graphql/mutations'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import moods from '../utils/moods'

import '../styles/pages/entryPage.scss'

import { combinedStyleConfig } from '../utils/editorStyleMap'

import { EditorState, RichUtils, convertToRaw } from 'draft-js';


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

            const data = await newEntry({
                variables: {
                    ...journalEntry,
                    editorState: serializedEditorState
                }
            })
            navigate('/my_journal')
        } catch (err) {
            console.log(err)
        }
    }

    const groupStylesByCategory = (styles) => {
        return styles.reduce((acc, item) => {
            const { category } = item

            if (!acc[category]) {
                acc[category] = []
            }

            acc[category].push(item)

            return acc
        }, {})
    }

    const createStyleMap = (styles) => {
        return styles.reduce((acc, option) => {
            acc[option.style] = option.css
            return acc
        }, {})
    }

    const customStyleMap = createStyleMap(combinedStyleConfig)

    const groupedStyles = groupStylesByCategory(combinedStyleConfig)

    const renderStyleDropdowns = () => {
        return Object.keys(groupedStyles).map((category) => (
            <Dropdown
                key={category}
                label={category}
                options={groupedStyles[category].map(style => ({
                    label: style.label,
                    style: style.style,
                    css: style.css
                }))}
                onChange={(option) => applyStyle(option.style)}
            />
        ))
    }

    const applyStyle = (styleName) => {
        const selectedStyle = combinedStyleConfig.find(style => style.style === styleName)
        let newState

        if (selectedStyle.type === 'inline') {
            newState = RichUtils.toggleInlineStyle(editorState, styleName)

        } else if (selectedStyle.type === 'block') {
            newState = RichUtils.toggleBlockType(editorState, styleName)
        }

        if (newState) {
            setEditorState(newState)
        }
    }

    return (
        <div className="entry-editor">
            <PromptBox journalEntry={journalEntry} setJournalEntry={setJournalEntry} />

            <span className="flex flex-row pointer pb3">

                {renderStyleDropdowns()}

            </span>
            <EditorComponent
                editorState={editorState} // Pass the editorState to the EditorComponent
                customStyleMap={customStyleMap}
                onEditorStateChange={handleEditorStateChange}
            />

            <span className="flex justify-end displayMoodMobile items-end w-100 pv2 mt2">
                <button className="entrySubmitBtn ph4 pa1 br3 mr0" onClick={() => submitEntry()}>Submit</button>

            </span>
        </div>
    )
}

export default Entry