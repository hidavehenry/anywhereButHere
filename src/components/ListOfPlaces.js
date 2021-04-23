const ListOfPlaces = (props) => {

    return(
        <div>
            <ul>
                <li 
                    onClick={ (event) => {props.getDirections(event, props.place.id)
                    props.setShowMeTheDirections(false)
                    } } 
                    key={props.place.id}
                >
                    {props.place.displayString}
                </li>
            </ul>
        </div>
    )
}


export default ListOfPlaces; 