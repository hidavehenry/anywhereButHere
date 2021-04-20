import Directions from './Directions';
import { Link } from 'react-router-dom';

const ListOfPlaces = (props) => {



    return(
        <div>
            <ul>
                {props.destination.map( (place) => {
                    // console.log(place)
                    return(
                            <Link to={`/directions${place.slug}`} key={place.id}>
                                <li>
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


export default ListOfPlaces;