import Directions from "./Directions"

const ListOfPlaces = (props) => {
    
    const myJourney = props.myJourney; 
    const directionsClick = () => {
        return(
            <div>
                <Directions myJourney={myJourney}/>
            </div>
        )
    }

    return(
        <div>
            <ul>
                {props.destination.map( (place) => {
                    console.log(place)
                    return(
                            <li onClick={ directionsClick }>
                                {place.displayString}
                            </li>
                    )
                })
                }
            </ul>
        </div>
    )
}


export default ListOfPlaces;