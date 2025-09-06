import FilterIcon from "../images/filter.png"

export default function Header({searchQuery, setSearchQuery}) {
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