// import Directions from './Directions';

const ListOfPlaces = (props) => {

console.log(props.destination);


    return(
        <div>
            <ul>
                {props.destination.map( (place) => {
                    return(
                        <li key={place.id}>{place.displayString}</li>
                    )
                } )}
            </ul>
                  {/* <Directions userCoords={props.userCoords} userTo={}/> */}
        </div>
    )
}

export default ListOfPlaces;