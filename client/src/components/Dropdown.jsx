import { useState, useEffect } from 'react'

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
                            key={index}
                            className="dropdown-item"
                            onClick={() => {
                                onChange(option)
                                toggleDropdown()
                            }}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>

    )
}

export default Dropdown