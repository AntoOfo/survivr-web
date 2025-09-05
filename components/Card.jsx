import Placeholder from "../images/helpimg.jpg"

export default function Card({img, title, bio}) {
    return (
        <div className="card">
            <img src={img} />
            <div className="card-right-side">
            <h2>{title}</h2>
            <p>{bio}</p>
            </div>
        </div>
    )
}