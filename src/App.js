import './App.css';
import Input from './components/Input';
import Header from './Header';
import ListOfPlaces from './components/ListOfPlaces'
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Directions from './components/Directions';

function App() {

  const [userCoords, setUserCoords] = useState([])
  const [userCoordsRadius, setUserCoordsRadius] = useState([])
  const [searchParam, setSearchParam] = useState('')
  const [userStreet, setUserStreet] = useState('')
  const [userInput, setUserInput] = useState('')
  const [myJourney, setMyJourney] = useState('')
  const [destination, setDestination] = useState([]);
    
  const handleQChange = (event) => {
    setSearchParam(event.target.value);
  }

  const handleFrom = (event) => {
    setUserInput(event.target.value);
  }

  const takeMeThere = (event) => {
    event.preventDefault();
    getDestination();
  }

    function getLocation(event) {
        event.preventDefault();
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
            console.log(userCoordsRadius);
        }


//API CALL FOR Q IN USER RADIUS
const proxiedUrl = 'https://www.mapquestapi.com/search/v4/place';
const url = new URL('https://proxy.hackeryou.com');
url.search = new URLSearchParams({
  reqUrl: proxiedUrl,
  'params[location]': userCoords,
  'params[sort]': 'distance',
  'params[key]': 'GvTYDdAzlzCU5UcQ00cnarwGMaBtz8gi',
  'params[circle]': userCoordsRadius,
  'params[q]': searchParam,
  'proxyHeaders[Accept]': 'application/json',
});

const getDestination = () => {
fetch(url)
  .then(response => response.json())
  .then(data => {
    // console.log(data.results[0].displayString);
      setDestination(data.results)
      
      // place.place.geometry.coordinates
      })
}




// API CALL FOR GEOCODING THE USER'S ADDRESS
const proxiedUrl4 = 'https://www.mapquestapi.com/geocoding/v1/address';
const url4 = new URL('https://proxy.hackeryou.com');
url4.search = new URLSearchParams({
  reqUrl: proxiedUrl4,
  'params[key]': 'GvTYDdAzlzCU5UcQ00cnarwGMaBtz8gi',
  'proxyHeaders[Accept]': 'application/json',
  'params[location]': {userInput}
});

useEffect( () => {
fetch(url4)
  .then(response => response.json())
  .then(data => {
    console.log(data.results[0].locations[0].latLng);
    setUserCoords([data.results[0].locations[0].latLng.lng, data.results[0].locations[0].latLng.lat]);
    console.log(userCoords);
  });
}, [myJourney])


  //TEST FOR REVERSE GEOLOCATION
const proxiedGeoUrl = 'http://www.mapquestapi.com/geocoding/v1/reverse';
 const geoUrl = new URL('https://proxy.hackeryou.com');
 geoUrl.search = new URLSearchParams({
  reqUrl: proxiedGeoUrl,
  'params[location]': [ -79.41756900858489, 43.64993671317276],
  'params[key]': 'WWEYdye9aFyaPW4k4kRFXHMfKiFe4bHT',
  'proxyHeaders[Accept]': 'application/json',
 });

useEffect( ()=> {
fetch(geoUrl)
  .then(response => response.json())
  .then(geodata => {
   setUserStreet(geodata.results[0].locations[0].street)
   console.log(geodata.results[0].locations[0].street)
  //  console.log(userStreet)
  });
}, [])

console.log(searchParam);

  return (
    <Router>
      <div className="wrapper">
        <Header />
        <Input 
          getLocation={getLocation} 
          handleQChange={handleQChange}
          handleFrom={handleFrom}
          userInput={userInput}
          takeMeThere={takeMeThere}
        />
        <ListOfPlaces destination={destination} userCoords={userCoords}/>
        <Route path="/directions" component={Directions}/>
      </div>
    </Router>
  )
}

export default App;
