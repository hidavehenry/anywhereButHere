import Directions from "./Directions"

const ListOfPlaces = (props) => {



    return(
        <div>
            <ul>
                {
                props.destination.map( (place) => {
                    return(
                            <li onClick={ props.getDirections }>
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