import { useMutation } from "@apollo/client"
import { GENERATE_PROMPT, TEST } from "../graphql/mutations"
import { useState, useEffect } from "react"
import { MoodTest } from './'

function PromptBox({ type }) {


    const [generatePrompt, { data, loading, error }] = useMutation(GENERATE_PROMPT)

    const [currentStep, setCurrentStep] = useState('moodSelection');
    const [mood, setMood] = useState(5);
    const [creamType, setCreamType] = useState('');
    const [prompt, setPrompt] = useState("")
    const [value, setValue] = useState(5);

    useEffect(() => {
        console.log('load')
    }, [])


    const handleMoodSelection = (value) => {
        setMood(value),
            setCurrentStep('creamSelection')
    }

    const handleCreamSelection = async (type) => {

        setCreamType(type)

        try {
            const res = await generatePrompt({ variables: { type, mood } })
            setPrompt(res.data.generatePrompt.text)
            setCurrentStep('showPrompt')
        } catch (err) {
            console.error(err)
        }

    }

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const renderPromptText = async () => {
        try {
            const res = await generatePrompt({ variables: { type } })
            console.log(res)
            setPrompt(res.data.generatePrompt.text)
        } catch (err) {
            console.error(err)
        }
    }

    const renderMoodSlider = () => {
        return (
            <div>
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={value}
                    onChange={handleChange}
                />
                <p>Value: {value}</p>
                <button onClick={() => handleMoodSelection(value)}>Select Mood</button> {/* Add this to move to the next step */}
            </div>
        )
    }

    const renderCreamSelection = () => {
        return (<div>
            <button onClick={() => handleCreamSelection('Light')}>Light</button>
            <button onClick={() => handleCreamSelection('Heavy')}>Heavy</button>
        </div>)
    };

    const renderPrompt = () => {
        return (
            
        <div>
            <p>{prompt}</p>
            <p>Generate New Prompt</p>
            <p>Restart</p>
        </div>
        
        )
    }


    const renderContentBasedOnStep = () => {
        switch (currentStep) {
            case 'moodSelection':
                console.log('render mood')
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