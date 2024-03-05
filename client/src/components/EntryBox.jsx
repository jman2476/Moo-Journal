import { Editor, EditorState, convertFromRaw, createWithContent } from 'draft-js';
import { useState, useEffect, useRef } from "react"
import { combinedStyleConfig } from '../utils/editorStyleMap'


function EntryBox({ fetchedEditorStateString, onHeightChange, entryId}) {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
    const editorWrapperRef = useRef(null)

    const customStyleMap = combinedStyleConfig.reduce((acc, option) => {
        acc[option.style] = option.css
        return acc
    }, {})

    useEffect(() => {
        if (fetchedEditorStateString) {
            const storedEditorState = JSON.parse(fetchedEditorStateString)
            const contentState = convertFromRaw(storedEditorState)
            const newEditorState = EditorState.createWithContent(contentState)
            setEditorState(newEditorState)
        }
 
    }, [fetchedEditorStateString])


    useEffect(() => {
        const height = editorWrapperRef.current?.clientHeight

        onHeightChange && onHeightChange(entryId, height)
    }, [editorState, onHeightChange])

    return (
        <div ref={editorWrapperRef}>
            <Editor  customStyleMap={customStyleMap} editorState={editorState} readOnly={true} />

        </div>


    )

}

export default EntryBox