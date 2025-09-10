import { useEffect, useState } from "react"
import Card from "./Card"

export default function Grid({searchQuery, selectedCategory}) {

    // current date
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const [hacks, setHacks] = useState([]);

    const [loading, setLoading] = useState(true);

    const [showFact, setShowfact] = useState(false);

    function toggleFact() {
        setShowfact((prev) => !prev)
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
            .catch((err) => console.error("Error getting hacks:", err))

            .finally(() => setLoading(false));
            
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
            <div className="grid">
                {filteredHacks.map((hack, i) => (
                    <Card
                        key={i}
                        img={hack.image}
                        title={hack.title}
                        bio={hack.bio}
                        onClick={toggleFact}/>
                ))}
                
            </div>

            {showFact && (
                <div className="fact">
                    <h2>Fun Fact</h2>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum laboriosam quod rem fuga? Quam ab dolores</p>
                </div>
            )}
        </main>
    )
}