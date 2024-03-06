// This will be the equivalent of the user's dashboard
import { GET_USER_NOTES } from '../graphql/queries'
import { DELETE_ENTRY } from '../graphql/mutations'
import { useQuery, useMutation } from '@apollo/client'
import moods from '../utils/moods'
import '../styles/pages/myMooJournal.scss'
import dayjs from 'dayjs'
import { EntryBox } from '../components'

import { useState, useEffect, useCallback, useRef } from "react"

import { useStore } from '../store'


function MyMooJournal() {

    const [showPrompt, setShowPrompt] = useState(true);
    const [showEntry, setShowEntry] = useState(true);
    const [editingEntryId, setEditingEntryId] = useState(null);
    const [toggleExpandCollapse, setToggleExpandCollapse] = useState(true);
    const [contentHeights, setContentHeights] = useState({})
    const [scrollPosition, setScrollPosition] = useState(0)

    const scrollableDivRef = useRef(null)

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

        const displayText = showPrompt[entry._id] ? entry.prompt.text : truncateText(entry.prompt.text, 105); // Adjust 100 to your desired length

        return (
            <>
                <p className="ma0 pa0">{displayText}</p>
                <p className="f7 ma0 pa0 mb2 pointer hover-white " onClick={() => togglePromptVis(entry._id)}>
                    <span className="bt">
                        {showPrompt[entry._id] ? "Collapse" : "Expand"}
                    </span>
                </p>
            </>
        );
    };

    const toggleEntry = (entry) => {
        console.log(entryData)


        return (
            <>
                <div className={showEntry[entry._id] ? "" : "hideEntry"}>
                    <EntryBox onHeightChange={handleHeightChange} fetchedEditorStateString={entry.editorState} entryId={entry._id} />
                </div>

                {
                    toggleExpandCollapse && contentHeights[entry._id] > 50 &&
                    <p className="f7 ma0 pa0 pointer hover-white" onClick={() => toggleEntryVis(entry._id)}>
                        <span className="bt">
                            {showEntry[entry._id] ? "Collapse" : "Expand"}
                        </span>

                    </p>
                }
            </>
        );
    };
    const handleHeightChange = useCallback((id, height) => {
        setContentHeights(prevHeights => {
            // Only update if height is different to prevent unnecessary updates
            if (prevHeights[id] !== height) {
                return { ...prevHeights, [id]: height };
            }
            return prevHeights;
        });
    }, []);

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

    const setPromptVis = (id, isVisible) => {
        setShowPrompt((prevShowPrompt) => ({
            ...prevShowPrompt,
            [id]: isVisible
        }))
    }

    const setEntryVis = (id, isVisible) => {
        setShowEntry((prevShowEntry => ({
            ...prevShowEntry,
            [id]: isVisible
        })))
    }

    const openEntry = (entryId) => {
        handleScrollPosition('save')

        setEditingEntryId(entryId)
        setToggleExpandCollapse(false)

        setEntryVis(entryId, true)
        setPromptVis(entryId, true)
        setState({
            ...state,
            bgBlur: true
        })
    }

    const closeEntry = (entryId) => {
        handleScrollPosition('restore')
        setEditingEntryId(null)
        setToggleExpandCollapse(true)

        setEntryVis(entryId, false)
        setPromptVis(entryId, false)
        setState({
            ...state,
            bgBlur: false
        })
    }

    const deleteEntry = async (entryId) => {
        closeEntry(entryId)
        try {
            await removeEntry({
                variables: {
                    journalId: entryId
                }
            })
        } catch (err) {
            console.error(err)   
        }


        refetchUserEntries()
    }

    const handleScrollPosition = (handleCase) => {
        if (scrollableDivRef?.current) {
            switch (handleCase) {
                case 'save':
                    setScrollPosition(scrollableDivRef.current.scrollTop)
                default:
                    scrollableDivRef.current.scrollTop = scrollPosition;
            }
        }
    }

    return (
        <>
            <div className="relative">
                <div className="entry-container overflow-auto flex flex-column items-start mt5" ref={scrollableDivRef}>
                    <div className="flex flex-column-reverse">
                        {!entryData?.getUserEntries.length && <h2>You have not created any Entries.</h2>}
                        {entryData?.getUserEntries.map((entry, index) => (
                            <div style={{
                                borderColor: moods[entry.moodRanking].color,
                                borderStyle: 'solid',
                                borderWidth: '3px'
                            }} key={entry._id} className={`journalEntryCard ${entry._id === editingEntryId ? 'editEntryModal' : ''} ba br4 ma2 tl `}>

                                <h4 className="w-100 flex justify-between ma2 mt3 nowrap flex-wrap">
                                    <span className="mj-text">
                                        {getDate(+entry.createdAt)}
                                    </span>
                                    <span className="pa1 ph2 ml1 br3 mb1 mr2 fw1 ba b--black" style={{ backgroundColor: moods[entry.moodRanking].color, color: +entry.moodRanking === 5 || +entry.moodRanking === 4 ? 'black' : 'white' }}>
                                        Mood: {moods[entry.moodRanking].mood}
                                    </span>
                                </h4>
                                <div className="promptEntryBox ma2">
                                    {entry.prompt ? togglePrompt(entry) : <></>}
                                    {toggleEntry(entry)}
                                </div>
                                <div className="justify-end flex">
                                    {
                                        entry._id === editingEntryId ? (
                                            <button className="pa1 ph3 ma0 mh2 mb1 br3" onClick={() => closeEntry(entry._id)}>Go Back</button>
                                        ) : (
                                            <button className="pa1 ph3 ma0 mh2 mb1 br3" onClick={() => openEntry(entry._id)}>Open</button>
                                        )
                                    }
                                    <button className="pa1 ph3 ma0 mh2 mb1 br3" onClick={() => deleteEntry(entry._id)}>Delete</button>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>


            </div>
        </>
    )
}

export default MyMooJournal