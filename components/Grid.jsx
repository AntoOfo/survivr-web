import { useEffect, useState } from "react"
import Card from "./Card"

export default function Grid() {

    const [hacks, setHacks] = useState([]);

    useEffect(() =>
        // call api
        fetch("http://localhost:8080/lifehacks")
            .then((res) => res.json())  // convert 2 json
            .then)
    return (
        <main>
            <h2 className="grid-title">Today's Picks</h2>
            <div className="grid">
                <Card />
            </div>
        </main>
    )
}