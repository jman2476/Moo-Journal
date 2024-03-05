// This will be the equivalent of the user's dashboard
import { GET_USER_NOTES } from '../graphql/queries'
import { DELETE_ENTRY } from '../graphql/mutations'
import { useQuery, useMutation } from '@apollo/client'
import moods from '../utils/moods'
import '../styles/pages/myMooJournal.scss'
import dayjs from 'dayjs'
import { EntryBox } from '../components'

import { useState, useEffect } from "react"
import { styleMap } from '../utils/editorStyleMap'

import { useStore } from '../store'

// Your timestamp
const timestamp = 1709591711539;

// Parse the timestamp and format the date
const formattedDate = dayjs(timestamp).format('MM/DD/YYYY [at] hh:mm a');

console.log(formattedDate); // This should print the correctly formatted date


function MyMooJournal() {

    const [showPrompt, setShowPrompt] = useState(true);
    const [showEntry, setShowEntry] = useState(true);
    const [editingEntryId, setEditingEntryId] = useState(null);
    const [toggleExpandCollapse, setToggleExpandCollapse] = useState(true);

    const { state, setState } = useStore()

    const { data: entryData, refetch: refetchUserEntries } = useQuery(GET_USER_NOTES)


    useEffect(() => {
        refetchUserEntries()
    }, [refetchUserEntries])

    const getDate = (timestamp) => {
        const rawDate = dayjs(timestamp);
        const date = rawDate.format('MM/DD/YYYY [at] hh:mm a');
        return date
    }

    const [removeEntry] = useMutation(DELETE_ENTRY)




    const togglePrompt = (entry) => {
        // Determine the text to display based on the showPrompt state
        const displayText = showPrompt[entry._id] ? entry.prompt.text : truncateText(entry.prompt.text, 105); // Adjust 100 to your desired length

        return (
            <>
                <p className="ma0 pa0">{displayText}</p>
                {
                    toggleExpandCollapse &&

                    <p className="f7 ma0 pa0 mb2 pointer hover-white " onClick={() => togglePromptVis(entry._id)}>
                        <span className="bt">
                            {showPrompt[entry._id] ? "Collapse" : "Expand"}

                        </span>
                    </p>
                }

            </>
        );
    };

    const toggleEntry = (entry) => {
        // Similar approach for entry text
        const displayText = showEntry[entry._id] ? entry.text : truncateText(entry.text, 105); // Adjust 100 to your desired length

        return (
            <>
                <div className={showEntry[entry._id] ? "" : "hideEntry"}>
                    <EntryBox fetchedEditorStateString={entry.editorState} />
                </div>

                {
                    toggleExpandCollapse &&
                    <p className="f7 ma0 pa0 pointer hover-white" onClick={() => toggleEntryVis(entry._id)}>
                        <span className="bt">
                            {showEntry[entry._id] ? "Collapse" : "Expand"}
                        </span>

                    </p>
                }
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



    const openEntry = (entryId) => {
        setEditingEntryId(entryId)
        setToggleExpandCollapse(false)
        toggleEntryVis(entryId)
        togglePromptVis(entryId)
        setState({
            ...state,
            bgBlur: true
        })
    }

    const closeEntry = (entryId) => {
        setEditingEntryId(null)
        setToggleExpandCollapse(true)
        toggleEntryVis(entryId)
        togglePromptVis(entryId)
        setState({
            ...state,
            bgBlur: false
        })
    }

    const deleteEntry = async (journalId) => {
        console.log(journalId)
        const msg = await removeEntry({
            variables: {
                journalId: journalId
            }
        })

        console.log(msg)
        refetchUserEntries()
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
                    }} key={entry._id} className={`journalEntryCard ${entry._id === editingEntryId ? 'editEntryModal' : ''} ba br4 ma2 tl `}>

                        <h4 className="w-100 flex justify-between ma2 mt3 nowrap flex-wrap">
                            <span className="mj-text">
                                {/* {dayjs(entry.createdAt).format('MM/DD/YYYY [at] hh:mm a')} */}
                                {getDate()}
                            </span>
                            <span className="pa1 ph2 ml1 br3 mb1 mr2 fw1 ba b--black" style={{ backgroundColor: moods[entry.moodRanking].color, color: +entry.moodRanking === 5 || +entry.moodRanking === 4 ? 'black' : 'white' }}>
                                Mood: {moods[entry.moodRanking].mood}
                            </span>
                        </h4>



                        <div className="promptEntryBox ma2">


                            {entry.prompt ? togglePrompt(entry) : <></>}

                            {toggleEntry(entry)}
                            <div>

                            </div>
                        </div>


                        <div className="justify-end flex">
                            {
                                entry._id === editingEntryId ? (
                                    <button className="pa1 ph3 ma0 mh2 mb1 br3" onClick={() => closeEntry(entry._id)}>Go Back</button>

                                ) : (
                                    <button className="pa1 ph3 ma0 mh2 mb1 br3" onClick={() => openEntry(entry._id)}>Open Entry</button>

                                )
                            }



                            <button className="pa1 ph3 ma0 mh2 mb1 br3" onClick={() => deleteEntry(entry._id)}>Delete Entry</button>
                        </div>




                    </div>
                ))}
            </div>

        </>
    )
}

export default MyMooJournal