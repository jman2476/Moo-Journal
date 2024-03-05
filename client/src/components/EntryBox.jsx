import { Editor, EditorState, convertFromRaw, createWithContent } from 'draft-js';
import { useState, useEffect, useRef } from "react"
import { styleMap } from '../utils/editorStyleMap'


function EntryBox({ fetchedEditorStateString, onHeightChange, entryId}) {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
    const editorWrapperRef = useRef(null)

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
        console.log(editorWrapperRef.current)
        console.log('height', height)
        console.log(entryId)
        onHeightChange && onHeightChange(entryId, height)
    }, [editorState, onHeightChange])

    return (
        <div ref={editorWrapperRef}>
            <Editor  customStyleMap={styleMap} editorState={editorState} readOnly={true} />

        </div>


    )

}

export default EntryBox