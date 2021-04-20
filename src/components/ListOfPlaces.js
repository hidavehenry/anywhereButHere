// import Directions from './Directions';
import { Link } from 'react-router-dom';

const ListOfPlaces = (props) => {



    return(
        <div>
            <ul>
                {props.destination.map( (place) => {
                    const name = place.name;
                    // console.log(place)
                    return(
                        <Link to={`/directions${place.slug}`}>
                            <li key={place.id}>
                                {place.displayString}
                            </li>
                        </Link>
                    )
                    // {<Directions userCoords={props.userCoords} name={name}/> }
                })
                }
            </ul>
        </div>
    )
}


export default ListOfPlaces;