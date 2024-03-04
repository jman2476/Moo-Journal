// This will be the equivalent of the user's dashboard
import { GET_USER_NOTES } from '../graphql/queries'
import { useQuery } from '@apollo/client'
import moods from '../lib/moods'
import '../styles/pages/myMooJournal.scss'
import dayjs from 'dayjs'

import { useState, useEffect } from "react"

function MyMooJournal() {
    console.log(moods)
    
    const [showPrompt, setShowPrompt] = useState(true);
    const [showEntry, setShowEntry] = useState(true);



    const getDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString()
    }


    const togglePrompt = (entry) => {
        console.log(showPrompt)
        return showPrompt ? (
            <span>
            <p className="truncate ma0 pa0">{entry.prompt.text}</p>
            <p className="f7 ma0 pa0 pointer hover-white" onClick={() => setShowPrompt(false)}>See Full Prompt</p>  
        </span>
        ) : (
            <span>
            <p className="ma0 pa0">{entry.prompt.text}</p>
            <p className="f7 ma0 pa0 pointer hover-white" onClick={() => setShowPrompt(true)}>Hide Prompt</p>  
        </span>
        )
    }

    const toggleEntry = (entry) => {
        return showEntry ? (
            <span>
            <p className="truncate ma0 pa0">{entry.text}</p>
            <p className="f7 ma0 pa0 pointer hover-white" onClick={() => setShowEntry(false)}>See Full Entry</p>  
        </span>
        ) : (
            <span>
            <p className="ma0 pa0">{entry.text}</p>
            <p className="f7 ma0 pa0 pointer hover-white" onClick={() => setShowEntry(true)}>Hide Entry</p>  
        </span>
        )
    }

    const editEntry = () => {

    }

    const deleteEntry = () => {
        
    }

    const { data: entryData } = useQuery(GET_USER_NOTES)

    return (

        <>
            {/* <h1>MyMooJournal</h1> */}
            <button onClick={() => console.log(entryData)}>Get notes</button>
            <div className="entry-container overflow-auto flex flex-column items-start ">
                {!entryData?.getUserEntries.length && <h2>You have not created any Entries.</h2>}
                {entryData?.getUserEntries.map((entry, index) => (
                    <div style={{
                        borderColor: moods[entry.moodRanking].color,
                        borderStyle: 'solid', // Ensure the border is visible by setting a style
                        borderWidth: '3px' // Set a default border width
                    }} key={entry._id} className="ba br4 ma2 journalEntryCard tl">
                        <h4 className="w-100 flex justify-between">{dayjs(entry.createdAt).format('MM/DD/YYYY [at] hh:mm a')}<span className="pa1 ph2 ml1 br3 mb1 mr2" style={{ backgroundColor: moods[entry.moodRanking].color, color:+entry.moodRanking === 5 || +entry.moodRanking === 4  ? 'black' : 'white' }}>Mood: {moods[entry.moodRanking].mood}</span></h4>
                        <span className="ma2">
                        {togglePrompt(entry)}

                        </span>

                        {toggleEntry(entry)}

                        <span >
                            <button onClick={() => editEntry()}>Edit</button>
                            <button onClick={() => deleteEntry()}>Delete</button>
                        </span>
                    </div>
                ))}
            </div>

        </>
    )
}

export default MyMooJournal