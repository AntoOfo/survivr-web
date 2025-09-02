import Placeholder from "../images/helpimg.jpg"

export default function Card() {
    return (
        <div className="card">
            <img src={Placeholder} />
            <div className="card-right-side">
            <h2>Signal for Help</h2>
            <p>
                If you’re lost without cell service, three short signals (whistle blasts, shouts, or flashes) 
                is the universal distress call.  
                Pause, then repeat until spotted.
            </p>
            </div>
        </div>
    )
}