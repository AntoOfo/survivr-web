import { useState } from "react"
import FilterIcon from "../images/filterv2.png"
import CloseIcon from "../images/close.png"

export default function Header({searchQuery, setSearchQuery, selectedCategory, setSelectedCategory}) {

    // track dropdown status
    const [showDropdown, setShowDropdown] = useState(false)

    function toggleDropdown() {
        setShowDropdown((prev) => !prev)  // flips boolean state
    }

    function chooseCategory(category) {
        setSelectedCategory(category);  // updates selected category
        setShowDropdown(false);
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
                <>
                <div className="overlay" onClick={toggleDropdown}></div>
                <div className="dropdown">
                    <img src={CloseIcon} onClick={toggleDropdown}/>
                    <ul>
                        <li key="All" onClick={() => chooseCategory("All")}>All</li>
                        <li key="Survival" onClick={() => chooseCategory("Survival")}>Survival</li>
                        <li key="Health" onClick={() => chooseCategory("Health")}>Health</li>
                        <li key="City Safety" onClick={() => chooseCategory("City Safety")}>City Safety</li>
                        <li key="Prep" onClick={() => chooseCategory("Prep")}>Prep</li>
                    </ul>
                </div>
                </>
            )}
        </header>
    )
}