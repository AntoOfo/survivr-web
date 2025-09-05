import { useState } from "react"
import Card from "./Card"

export default function Grid() {
    
    const [hacks, setHacks] = useState([]);
    return (
        <main>
            <h2 className="grid-title">Today's Picks</h2>
            <div className="grid">
                <Card />
            </div>
        </main>
    )
}