import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {useStore} from '../store'

function AddNewEntry() {
    const [hideNewEntry, setNewEntry] = useState(true)
    const [entryType, setEntryType ] = useState('')
    
    const { state, setState } = useStore()

    const heavyEntry = {
        ...state,
        entryType:'Heavy'
    }
    const lightEntry = {
        ...state,
        entryType:'Light'
    }




    return (
        <>
            {hideNewEntry ?
                <button onClick={() => { setNewEntry(false) }} className="btn">New Entry</button>
                :
                <span>
                    <NavLink to='/entry'>
                        <span onClick={() => setState(lightEntry)} className='mj-text btn fw8'>Light</span>
                        <span onClick={() => setState(heavyEntry)} className='mj-text btn fw8'>Heavy</span>
                    </NavLink>
                </span>
            }
        </>
    )
}

export default AddNewEntry