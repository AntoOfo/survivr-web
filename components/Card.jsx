import Placeholder from "../images/helpimg.jpg"

export default function Card({img, title, bio, onClick}) {
    return (
        <div className="card" onClick={onClick}>   {/* grid handling onclick*/}
            <img src={img} />
            <div className="card-right-side">
            <h2>{title}</h2>
            <p>{bio}</p>
            </div>
        </div>
    )
}