// This will be the equivalent of the user's dashboard
import { GET_USER_NOTES } from '../graphql/queries'
import { useQuery } from '@apollo/client'
import moods from '../lib/moods'
import '../styles/pages/myMooJournal.scss'
import dayjs from 'dayjs'
import {EntryBox} from '../components'

import { useState, useEffect } from "react"
import {styleMap} from '../lib/editorStyleMap'
function MyMooJournal() {

    const [showPrompt, setShowPrompt] = useState(true);
    const [showEntry, setShowEntry] = useState(true);
    
    const { data: entryData, refetch } = useQuery(GET_USER_NOTES)

    console.log(entryData)

    useEffect(() => {
        refetch()
    }, [refetch])

    const getDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString()
    }



    const togglePrompt = (entry) => {
        // Determine the text to display based on the showPrompt state
        const displayText = showPrompt[entry._id] ? entry.prompt.text : truncateText(entry.prompt.text, 105); // Adjust 100 to your desired length

        return (
            <>
                <p className="ma0 pa0">{displayText}</p>
                <p className="f7 ma0 pa0 mb2 pointer hover-white" onClick={() => togglePromptVis(entry._id)}>
                    {showPrompt[entry._id] ? "Hide Prompt" : "Show Prompt"}
                </p>
            </>
        );
    };

    const toggleEntry = (entry) => {
        // Similar approach for entry text
        const displayText = showEntry[entry._id] ? entry.text : truncateText(entry.text, 105); // Adjust 100 to your desired length

        return (
            <>
                <p className="ma0 pa0">{displayText}</p>
                <p className="f7 ma0 pa0 pointer hover-white" onClick={() => toggleEntryVis(entry._id)}>
                    {showEntry[entry._id] ? "Hide Entry" : "Show Full Entry"}
                </p>
            </>
        );
    };


    function truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    }



    const togglePromptVis = (id) => {
        setShowPrompt((prevShowPrompt) => ({
            ...prevShowPrompt,
            [id]: !prevShowPrompt[id]
        }))
    }

    const toggleEntryVis = (id) => {
        setShowEntry((prevShowEntry => ({
            ...prevShowEntry,
            [id]: !prevShowEntry[id]
        })))
    }



    const editEntry = () => {

    }

    const deleteEntry = () => {

    }



    return (

        <>
            {/* <h1>MyMooJournal</h1> */}
            {/* <button onClick={() => console.log(entryData)}>Get notes</button> */}
            <div className="entry-container overflow-auto flex flex-column items-start ">
                <h2 className="fw1 mr2 bb">My Journal Entries</h2>
                {!entryData?.getUserEntries.length && <h2>You have not created any Entries.</h2>}
                {entryData?.getUserEntries.map((entry, index) => (
                    <div style={{
                        borderColor: moods[entry.moodRanking].color,
                        borderStyle: 'solid', // Ensure the border is visible by setting a style
                        borderWidth: '3px' // Set a default border width
                    }} key={entry._id} className="ba br4 ma2 journalEntryCard tl">

                        <h4 className="w-100 flex justify-between ma2 mt3 nowrap flex-wrap">
                            <span className="mj-text">
                                {dayjs(entry.createdAt).format('MM/DD/YYYY [at] hh:mm a')}
                            </span>
                            <span className="pa1 ph2 ml1 br3 mb1 mr2 fw1 ba b--black" style={{ backgroundColor: moods[entry.moodRanking].color, color: +entry.moodRanking === 5 || +entry.moodRanking === 4 ? 'black' : 'white' }}>
                                Mood: {moods[entry.moodRanking].mood}
                            </span>
                        </h4>



                        <div className="promptEntryBox ma2">

                        
                            { entry.prompt ? togglePrompt(entry) : <></>}

                            {/* {toggleEntry(entry)} */}
                            <EntryBox fetchedEditorStateString={entry.editorState} />
                        </div>


                        <div className="justify-end flex">
                            <button className="pa1 ph3 ma0 mh2 mb1 br3" onClick={() => editEntry()}>Edit Entry</button>
                            <button className="pa1 ph3 ma0 mh2 mb1 br3" onClick={() => deleteEntry()}>Delete Entry</button>
                        </div>




                    </div>
                ))}
            </div>

        </>
    )
}

export default MyMooJournal