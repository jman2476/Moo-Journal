import { Editor, EditorState, convertFromRaw, createWithContent } from 'draft-js';
import { useState, useEffect } from "react"
import {styleMap} from '../utils/editorStyleMap'


function EntryBox({fetchedEditorStateString}) {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

    useEffect(() => {

        if(fetchedEditorStateString){
            const storedEditorState = JSON.parse(fetchedEditorStateString)
            const contentState = convertFromRaw(storedEditorState)
            const newEditorState = EditorState.createWithContent(contentState)
            setEditorState(newEditorState)
        }
        
    }, [fetchedEditorStateString])

    return <Editor customStyleMap={styleMap} editorState={editorState} readOnly={true}/>
   
}

export default EntryBox