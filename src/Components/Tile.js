import "./Tile.css"




export default function Tile(props) {
    if (props.number % 2 == 0)
        return <div className="black-tile">
            <img src={props.image}/>
        </div>
    else
        return <div className="white-tile">
            <img src={props.image}/>
        </div>
}