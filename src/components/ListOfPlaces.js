const ListOfPlaces = (props) => {
<<<<<<< HEAD

    return(
        <div>
            <ul>
=======
    console.log(props.place);

    return(
>>>>>>> 4598cc3a0671cfe80b85b8ab392e98a345d66bb6
                <li 
                    onClick={ (event) => {props.getDirections(event, props.place.id)
                    props.setShowMeTheDirections(false)
                    } } 
                    key={props.place.id}
                >
<<<<<<< HEAD
                    {props.place.displayString}
                </li>
            </ul>
        </div>
=======
                    {props.place.name} - {props.place.place.properties.street}
                    
                </li>

>>>>>>> 4598cc3a0671cfe80b85b8ab392e98a345d66bb6
    )
}


export default ListOfPlaces; 