import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function NewEntry() {
    const [hideNewEntry, setNewEntry] = useState(true)

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

export default NewEntry