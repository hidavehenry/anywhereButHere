const ListOfPlaces = (props) => {
    return(
                <li 
                    onClick={ (event) => {props.getDirections(event, props.place.id)
                    props.setShowMeTheDirections(false)
                    } } 
                    key={props.place.id}
                >
                    {props.place.name} - {props.place.place.properties.street}
                    
                </li>

    )
}


export default ListOfPlaces; 