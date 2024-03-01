import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function AddNewEntry() {
    const [hideNewEntry, setNewEntry] = useState(true)

    return (
        <>
            {hideNewEntry ?
                <button onClick={() => { setNewEntry(false) }} className="btn">New Entry</button>
                :
                <span>
                    <NavLink className="btn" to='/entry'><span className='mj-text fw8'>Light or heavy entry</span></NavLink>
                </span>
            }
        </>
    )
}

export default AddNewEntry