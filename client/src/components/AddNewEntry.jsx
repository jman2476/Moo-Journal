import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useStore } from '../store'

function AddNewEntry() {
    const [hideNewEntry, setNewEntry] = useState(true)
    const [entryType, setEntryType] = useState('')

    const { state, setState } = useStore()

    const heavyEntry = {
        ...state,
        entryType: 'Heavy'
    }
    const lightEntry = {
        ...state,
        entryType: 'Light'
    }

    return (
        <>
            {hideNewEntry ?
                <button onClick={() => { setNewEntry(false) }} className="btn">Start New Entry</button>
                :
                <span>
                    <NavLink onClick={() => { setNewEntry(true) }} className="btn" to='/light_entry'><span className='mj-text fw8'>Light</span></NavLink>
                    <NavLink onClick={() => { setNewEntry(true) }} className="btn" to='/heavy_entry'><span className='mj-text fw8'>Heavy</span></NavLink>

                </span>
            }
        </>
    )
}

export default AddNewEntry