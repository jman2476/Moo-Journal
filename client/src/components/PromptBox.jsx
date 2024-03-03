import { useMutation } from "@apollo/client"
import { GENERATE_PROMPT, TEST } from "../graphql/mutations"
import { useState, useEffect } from "react"

function PromptBox({ journalEntry, setJournalEntry }) {


    const [generatePrompt, { data, loading, error }] = useMutation(GENERATE_PROMPT)

    const [currentStep, setCurrentStep] = useState('newPrompt');
    const [mood, setMood] = useState(5);
    const [creamType, setCreamType] = useState('');
    const [prompt, setPrompt] = useState("")
    const [value, setValue] = useState(5);




    const handleMoodSelection = (value) => {
        setMood(value),
            setCurrentStep('creamSelection')
    }

    const handleCreamSelection = async (type) => {

        setCreamType(type)

        try {
            const res = await generatePrompt({ variables: { type } })
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

    const genNewPrompt = async () => {
        try {
            const res = await generatePrompt({ variables: { type } })
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



    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const renderCreamSelection = () => {
        return (
            <div className="flex flex-row items-center">

                <button onClick={() => handleCreamSelection('Light')}>Light</button>
                <button onClick={() => handleCreamSelection('Heavy')}>Heavy</button>
            </div>
        )
    };



    const renderPrompt = () => {
        return (

            <div className="tl">
                <p className="pb0 mb0">{prompt}</p>
                <p className="f7 ma0 pa0 pointer hover-white " onClick={() => setCurrentStep('creamSelection')}>I Want a New Prompt</p>
            </div>

        )
    }

    const hidePrompt = () => {
        return (
            <div className="tl">
                <p className="f7 ma0 pa0 pointer hover-white " onClick={() => setCurrentStep('creamSelection')}>I want a prompt</p>
            </div>
        )
    }

    const renderTogglePrompt = () => {
        return (
            <div>
                <span className="flex flex-column items-start pr3">
                    <p className=" f4 bb ma0 pa0 pointer hover-white" onClick={() => setCurrentStep('creamSelection')}>Generate Prompt</p>
                    <p className="f7 ma0 pa0 pointer hover-white " onClick={() => setCurrentStep('noPrompt')}>I don't want a prompt</p>
                </span>

            </div>
        )
    }


    const renderContentBasedOnStep = () => {
        switch (currentStep) {
            case 'newPrompt':
                return renderTogglePrompt();
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
        </div>
    )
}

export default PromptBox