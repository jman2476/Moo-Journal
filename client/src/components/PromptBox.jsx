import { useMutation } from "@apollo/client"
import { GENERATE_PROMPT } from "../graphql/mutations"
import { useState, useEffect } from "react"
import dayjs from 'dayjs';
import moods from '../utils/moods'

function PromptBox({ journalEntry, setJournalEntry }) {

    const [generatePrompt, { data, loading, error }] = useMutation(GENERATE_PROMPT)

    const [currentStep, setCurrentStep] = useState('selectMood');
    const [mood, setMood] = useState(5);
    const [creamType, setCreamType] = useState('');
    const [prompt, setPrompt] = useState("")
    const [value, setValue] = useState(5);

    const handleCreamSelection = async (type) => {

        setCreamType(type)

        try {
            const moodValue = journalEntry.moodRanking
            const res = await generatePrompt({ variables: { type, moodValue } })
            setJournalEntry({
                ...journalEntry,
                promptId: res.data.generatePrompt._id
            })
            setPrompt(res.data.generatePrompt.text)
            setCurrentStep('showPrompt')
        } catch (err) {
            console.error(err)
        }

    }

    const handleMoodChange = (event) => {
        const value = event.target.value;
        console.log('type',+value)
        setValue(value);
        setJournalEntry({
            ...journalEntry,
            moodRanking:+value
        })

        console.log(journalEntry)
    };

    const renderCreamSelection = () => {
        return (
            <div className="flex flex-row items-center">
                <p className="f5">Pick Prompt type: </p>

                <button onClick={() => handleCreamSelection('Light')}>Light</button>
                <button onClick={() => handleCreamSelection('Heavy')}>Heavy</button>
            </div>
        )
    };



    const renderPrompt = () => {
        return (

            <div className="tl pt0 mb2">
                <p className={`pb0 mb2 np mt0 ${prompt.length < 300 ? 'f4' : 'f5'}`}>{prompt}</p>
                <span className="flex">
                    <p className="f7 ma0 pa0 pointer hover-white mr2 br-pill" onClick={() => setCurrentStep('creamSelection')}>I Want a New Prompt</p>
                    <p className="f7 ma0 pa0 pointer hover-white mr2" onClick={() => setCurrentStep('noPrompt')}>Hide Prompt</p>
                    <p className="f7 ma0 pa0 pointer hover-white" onClick={() => setCurrentStep('selectMood')}>I want to change my mood</p>

                </span>

            </div>

        )
    }

    const hidePrompt = () => {
        return (
            <div className="tl flex pb2">

            {prompt !== '' && <p className="f7 ma0 pa0 pointer hover-white mr2 " onClick={() => setCurrentStep('showPrompt')}>Show prompt</p>}
                

                <p className="f7 ma0 pa0 pointer hover-white" onClick={() => setCurrentStep('newPrompt')}>I want a {prompt && 'new'} prompt</p>
            </div>
        )
    }

    const renderTogglePrompt = () => {
        return (
            <div>
                <span className="flex flex-column items-start pr3 mb2">
                    <p className=" f4 ma0 pa0 pointer hover-white" onClick={() => setCurrentStep('creamSelection')}>Give Me a Prompt</p>
                    <span className="flex bt">
                    <p className="f7 ma0 pa0 pointer hover-white mr2" onClick={() => setCurrentStep('noPrompt')}>I don't want a prompt</p>
                    <p className="f7 ma0 pa0 pointer hover-white" onClick={() => setCurrentStep('selectMood')}>I want to change my mood</p>
                
                    </span>
                     </span>

            </div>
        )
    }

    const renderMoodSlider = () => {
        return (
            <div className="flex flex-column items-start w-100 mr4 pb3 tl wrap">
            <span className="flex items-center justify-between w-100 pb2">
            <p className="ma0 pa0 nowrap np f4">How Do you feel Today? </p>
            
            <span className="pa1 ph2 ml2 br3 mb1" style={{ backgroundColor: moods[value].color, color:+value === 5 || +value === 4  ? 'black' : 'white' }}>{moods[value].mood}</span>
            </span>
           
            <span className="flex flex-row nowrap items-center w-100">
            <input
                    type="range"
                    min="1"
                    max="10"
                    value={value}
                    onChange={handleMoodChange}
                    className="slider w-100"
                />
            <button className="pv2 ph3 br3 mr0" onClick={() => setCurrentStep('newPrompt')}>Continue</button>

            </span>

                
            </div>
        )
    }

    const renderContentBasedOnStep = () => {
        switch (currentStep) {
            case 'newPrompt':
                return renderTogglePrompt();
            case 'selectMood':
                return renderMoodSlider();
            case 'creamSelection':
                return renderCreamSelection();
            case 'showPrompt':
                return renderPrompt();
            case 'noPrompt':
                return hidePrompt();
            default:
                return null;
        }
    };

    return (
        <div className="tl">
            {loading ? <p>Loading...</p> : renderContentBasedOnStep()}

            <div className="absolute bottom-1 left-2">
            <p className=""><span className="pa1 ph2 ml1 br3 mb1 mr2" style={{ backgroundColor: moods[value].color, color:+value === 5 || +value === 4  ? 'black' : 'white' }}>Mood: {moods[value].mood}</span> Date: <span className="pr2">{dayjs().format('MM/DD/YY')}</span> </p>
            
            </div>
            
        </div>
    )
}

export default PromptBox