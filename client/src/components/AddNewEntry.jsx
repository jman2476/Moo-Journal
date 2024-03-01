import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useStore } from '../store'

function AddNewEntry() {
    const [hideNewEntry, setNewEntry] = useState(true)
    const [cream, setCream] = useState('')

    const { state, setState } = useStore()

    const heavyEntry = {
        ...state,
        cream: 'Heavy'
    }
    const lightEntry = {
        ...state,
        cream: 'Light'
    }

    return (
        <>
            {hideNewEntry ?
                <button onClick={() => { setNewEntry(false) }} className="btn">New Entry</button>
                :
                <span>
                    <NavLink className="btn" to='/light_entry'><span className='mj-text fw8'>Light</span></NavLink>
                    <NavLink className="btn" to='/heavy_entry'><span className='mj-text fw8'>Heavy</span></NavLink>

                </span>
            }
        </>
    )
}

export default AddNewEntry