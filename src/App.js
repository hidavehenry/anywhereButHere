import './App.css';
import Directions from './components/Directions';
import Input from './components/Input';
import Header from './Header';
import { useState } from 'react'

function App() {

  const [userCoords, setUserCoords] = useState([])
  const [userCoordsRadius, setUserCoordsRadius] = useState([])
  const [searchParam, setSearchParam] = useState('')
    
  const handleQChange = (event) => {
    setSearchParam(event.target.value);
  }

    function getLocation(e) {
        e.preventDefault();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else { 
            console.log('no location')
        }
        }
    
        // NEED TO STORE THIS IN A STATE? 
        function showPosition(position) {

            setUserCoords([position.coords.longitude, position.coords.latitude]);

            setUserCoordsRadius([position.coords.longitude, position.coords.latitude, 5000]);
      
            

            // console.log(userCoords)

            // const userLocation = [position.coords.latitude, position.coords.longitude]
        }

  /* 
  Create component to take user input
  User submits location or chooses use my location
  User selects what to search for
  User searches, on search updates state to equal value of filled in feilds
  Makes a call to search API using the two locations
  Create component to take names of returned results objects
  Map over returned array for name property
  Pass data to list component
  User selects name, updates thir state
  API call to direction API
  Create component for return
  */

//API CALL FOR Q IN USER RADIUS
const proxiedUrl = 'https://www.mapquestapi.com/search/v4/place';
const url = new URL('https://proxy.hackeryou.com');
url.search = new URLSearchParams({
  reqUrl: proxiedUrl,
  'params[location]': {userCoords},
  'params[sort]': 'distance',
  'params[key]': 'WWEYdye9aFyaPW4k4kRFXHMfKiFe4bHT',
  'params[circle]': {userCoordsRadius},
  'params[q]': {searchParam},
  'proxyHeaders[Accept]': 'application/json',
});

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data)
  });


  return (

    <div className="wrapper">
      <Header />
      <Input getLocation={getLocation} handleQChange={handleQChange}/>
      <Directions />
    </div>
  );
}

export default App;
