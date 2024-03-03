import { useMutation } from "@apollo/client"
import { GENERATE_PROMPT, TEST } from "../graphql/mutations"
import { useState, useEffect } from "react"

function PromptBox({ type }) {


    const [generatePrompt, { data, loading, error }] = useMutation(GENERATE_PROMPT)

    const [currentStep, setCurrentStep] = useState('creamSelection');
    const [mood, setMood] = useState(5);
    const [creamType, setCreamType] = useState('');
    const [prompt, setPrompt] = useState("")
    const [value, setValue] = useState(5);

    useEffect(() => {

    }, [])


    const handleMoodSelection = (value) => {
        setMood(value),
            setCurrentStep('creamSelection')
    }

    const handleCreamSelection = async (type) => {

        setCreamType(type)

        try {
            const res = await generatePrompt({ variables: { type } })
            setPrompt(res.data.generatePrompt.text)
            setCurrentStep('showPrompt')
        } catch (err) {
            console.error(err)
        }

    }

    const genNewPrompt = async () =>{
        try {
            const res = await generatePrompt({ variables: { type } })
            setPrompt(res.data.generatePrompt.text)
            setCurrentStep('showPrompt')
        } catch (err) {
            console.error(err)
        }
    }

    

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const renderMoodSlider = () => {
        return (
            <div className="flex flex-row items center">
            <span>
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={value}
                    onChange={handleChange}
                />
                <p>Value: {value}</p>
                </span>
                <p className="pa1 bg-green" onClick={() => handleMoodSelection(value)}>Continue</p> {/* Add this to move to the next step */}
            </div>
        )
    }

    const renderCreamSelection = () => {
        return (<div className="flex">
        <p>Generate Prompt:</p>
            <button onClick={() => handleCreamSelection('Light')}>Light</button>
            <button onClick={() => handleCreamSelection('Heavy')}>Heavy</button>
        </div>)
    };

    const renderPrompt = () => {
        return (
            
        <div className="tl">
            <p>{prompt}</p>
            <button className="pa2 ma0" onClick={() => setCurrentStep('creamSelection')}>Generate New Prompt</button>
        </div>
        
        )
    }


    const renderContentBasedOnStep = () => {
        switch (currentStep) {
            case 'newPrompt':
                return renderMoodSlider();
            case 'creamSelection':
                return renderCreamSelection();
            case 'showPrompt':
                return renderPrompt();
            default:
                return null;
        }
    };

    return (
        <div>
            {loading ? <p>Loading...</p> : renderContentBasedOnStep()}
        </div>
    )
}

export default PromptBox