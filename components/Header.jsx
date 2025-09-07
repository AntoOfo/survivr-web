import { useState } from "react"
import FilterIcon from "../images/filter.png"
import CloseIcon from "../images/close.png"

export default function Header({searchQuery, setSearchQuery}) {

    // track dropdown status
    const [showDropdown, setShowDropdown] = useState(false)

    function toggleDropdown() {
        setShowDropdown((prev) => !prev)  // flips boolean state
    }

    return (
        <header>
            <h1>SURVIVR</h1>
            <input 
                type="text" 
                placeholder="Search.."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}  // updates searchQuery
                />
            <button onClick={toggleDropdown}>
                <img src={FilterIcon}/>
            </button>

            {showDropdown && (
                <div className="dropdown">
                    <img src={CloseIcon} />
                    <ul>
                        <li>All</li>
                        <li>Survival</li>
                        <li>Health</li>
                        <li>City Safety</li>
                        <li>Prep</li>
                    </ul>
                </div>
            )}
        </header>
    )
}