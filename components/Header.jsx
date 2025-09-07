import { useState } from "react"
import FilterIcon from "../images/filter.png"

export default function Header({searchQuery, setSearchQuery}) {

    // track dropdown status
    const [showDropdown, setShowDropdown] = useState(false)


    return (
        <header>
            <h1>SURVIVR</h1>
            <input 
                type="text" 
                placeholder="Search.."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}  // updates searchQuery
                />
            <button>
                <img src={FilterIcon}/>
            </button>
        </header>
    )
}