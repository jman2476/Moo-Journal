import { useState } from 'react'

import '../styles/components/dropdown.scss'

function Dropdown({ label, options, onChange }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen)

    return (
        <div className="dropdown">
            <button className="dropdown-button" onClick={toggleDropdown}>
                {label}
            </button>

            {isOpen && (
                <ul className="dropdown-menu">
                    {options.map((option, index) => (
                        <li
                            style={option.css}
                            key={index}
                            className="dropdown-item pointer"
                            onClick={() => {
                                onChange(option)
                                toggleDropdown()
                                console.log(option)
                            }}
                        >
                           <p style={option.css}>{option.label}</p> 
                        </li>
                    ))}
                </ul>
            )}
        </div>

    )
}

export default Dropdown