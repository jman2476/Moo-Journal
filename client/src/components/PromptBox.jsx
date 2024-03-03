import { useMutation } from "@apollo/client"
import { GENERATE_PROMPT, TEST } from "../graphql/mutations"
import { useState } from "react"

function PromptBox({ type }) {

    const [prompt, setPrompt] = useState('')
    const [test] = useMutation(TEST)
    const [generatePrompt, { data, loading, error }] = useMutation(GENERATE_PROMPT)
    const renderPromptText = async () => {
        try {
            const res = await generatePrompt({ variables: { type } })

            console.log(res)
            setPrompt(res.data.generatePrompt.text)
        } catch (err) {
            console.error(err)
        }
    }


    return (
        <div>
            {loading ? (
                <p>Loading...</p> // This can be replaced with a spinner or any loading indicator
            ) : (
                <p>{prompt}</p>
            )}            <button onClick={renderPromptText}>Generate Prompt</button>
        </div>
    )
}

export default PromptBox