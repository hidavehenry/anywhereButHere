
const ListOfPlaces = (props) => {


    return(
        <div>
            <ul>
                {props.destination.map( (place) => {
                    return(
                        <li>{place.displayString}</li>
                    )
                } )}
            </ul>
        </div>
    )
}

export default ListOfPlaces;