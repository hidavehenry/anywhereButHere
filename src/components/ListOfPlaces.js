import Directions from './Directions';
import { Link } from 'react-router-dom';

const ListOfPlaces = (props) => {



    return(
        <div>
            <ul>
                {props.destination.map( (place) => {
                    const name = place.name;
                    return(
                        <Link to={`/directions`}>
                            <li key={place.id}>
                                {place.displayString}
                            </li>
                        </Link>
                    )
                })
                }
            </ul>
        </div>
    )
}

{/* <Directions userCoords={props.userCoords} name={name}/> */}
export default ListOfPlaces;