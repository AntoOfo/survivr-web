import FilterIcon from "../images/filter.png"

export default function Header() {
    return (
        <header>
            <h1>SURVIVR</h1>
            <input type="text" placeholder="Search.."></input>
            <button>
                <img src={FilterIcon}/>
            </button>
        </header>
    )
}