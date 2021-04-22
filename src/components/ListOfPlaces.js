
const ListOfPlaces = (props) => {

  return(
    <div>
      <ul>
        {props.destination.map( (place) => {
            return(
              <li key={place.id}>{place.displayString}</li>
            )
        } )}
      </ul>
    </div>
  )
    
}

export default ListOfPlaces;