import Card from "./Card"

export default function Grid() {
    return (
        <main>
            <h2 className="grid-title">Today's Picks</h2>
            <div className="grid">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </main>
    )
}