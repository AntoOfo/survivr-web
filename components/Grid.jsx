import { useEffect, useState } from "react"
import Card from "./Card"

export default function Grid() {

    // current date
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const [hacks, setHacks] = useState([]);

    useEffect(() => {
        console.log("Making api call..");
        // call api
        fetch("http://localhost:8080/lifehacks")
            .then((res) => res.json())  // convert 2 json
            .then((data) => {
                // save in lifehacks as state
                setHacks(data);
            })
            .catch((err) => console.error("Error getting hacks:", err));
}, []);

    return (
        <main>
            <h2 className="grid-title">Today's Picks - {month}/{day}/{year}</h2>
            <div className="grid">
                {hacks.map((hack, i) => (
                    <Card 
                        key={i}
                        img={hack.image}
                        title={hack.title}
                        bio={hack.bio}/>
                ))}
                
            </div>
        </main>
    )
}