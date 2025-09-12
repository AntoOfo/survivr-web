import { useEffect, useState } from "react"
import Card from "./Card"
import CloseIcon from "../images/close.png"

export default function Grid({searchQuery, selectedCategory}) {

    // current date
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const [hacks, setHacks] = useState([]);

    const [loading, setLoading] = useState(true);

    const [selectedHack, setSelectedHack] = useState(null);

    const [error, setError] = useState(null)

    function toggleFact(hack) {
        setSelectedHack((prev) => (prev ? null : hack));
    }

    useEffect(() => {
        console.log("Making api call..");
        setLoading(true)
        // call api
        fetch("http://localhost:8080/lifehacks")
            .then((res) => res.json())  // convert 2 json
            .then((data) => {
                // save in lifehacks as state
                setHacks(data);
            })
            .catch(() => {
                setError("This site has gone to sleep due to inactivity. Refresh to wake it up!");
            })

            .finally(() => setLoading(false));  // stop spinner
            
        }, []);
        
    // for search query
    const filteredHacks = hacks.filter((hack) => {
        const matchesSearch = hack.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || hack.category === selectedCategory

        return matchesSearch && matchesCategory
    });

    if (loading) {
        return (
            <div className="loader-container">
                <div className="loader"></div>
            </div>
        )
    }

    return (
        <main>
            <h2 className="grid-title">Today's Picks - {month}/{day}/{year}</h2>

            {filteredHacks.length === 0 ? (  // if array is empty
                <div className="no-hacks">
                <h3>No hacks available</h3>
                </div>
            ) : (
            <div className="grid">
                {filteredHacks.map((hack, i) => (
                    <Card
                        key={i}
                        img={hack.image}
                        title={hack.title}
                        bio={hack.bio}
                        onClick={() => toggleFact(hack)}/>
                ))}
                
            </div>
            )}

            {/* if isnt null*/}
            {selectedHack && (
                <>
                <div className="overlay" onClick={() => setSelectedHack(null)}></div>
                <div className="fact">
                        <span className="fact-top">
                            <h2>Did you know?</h2>
                            <img src={CloseIcon} onClick={() => setSelectedHack(null)}/>
                        </span>
                        <h3>{selectedHack.didYouKnow}</h3>
                </div>
                </>
            )}

            {error && (
                <>
                    <div className="overlay" onClick={() => setError(null)}></div>
                    <div className="fact">
                    <span className="fact-top">
                        <h2>Hey!</h2>
                        <img src={CloseIcon} onClick={() => setError(null)} />
                    </span>
                    <h3>{error}</h3>
                    </div>
                </>
            )}
        </main>
    )
}