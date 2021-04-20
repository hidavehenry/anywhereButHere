import './App.css';
import Directions from './components/Directions';
import Input from './components/Input';
import Header from './Header';
import ListOfPlaces from './components/ListOfPlaces'
import { useEffect, useState } from 'react'

function App() {

  const [userCoords, setUserCoords] = useState([])
  const [userCoordsRadius, setUserCoordsRadius] = useState([])
  const [searchParam, setSearchParam] = useState('')
  const [userStreet, setUserStreet] = useState('')
  const [userInput, setUserInput] = useState('')
  const [useLocation, setUseLocation] = useState(false)
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
        setUseLocation(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else { 
            console.log('no location')
        }
        }
            function showPosition(position) {
            setUserCoords([position.coords.longitude, position.coords.latitude]);
            setUserCoordsRadius([position.coords.longitude, position.coords.latitude, 5000]);
        }

// API CALL FOR GEOCODING THE USER'S ADDRESS
const proxiedUrl4 = 'https://www.mapquestapi.com/geocoding/v1/address';
const url4 = new URL('https://proxy.hackeryou.com');
url4.search = new URLSearchParams({
  reqUrl: proxiedUrl4,
  'params[key]': 'dTlbawGG8FhZfTGC0sBQMIYLXx9s3Qtl',
  'proxyHeaders[Accept]': 'application/json',
  'params[location]': {userInput}
});

const addressToCoordinates = () => {
fetch(url4)
  .then(response => response.json())
  .then(data => {
    console.log(data.results[0].locations[0].latLng);
    setUserCoords([data.results[0].locations[0].latLng.lng, data.results[0].locations[0].latLng.lat]);
    console.log(userCoords);
  });
}

//API CALL FOR Q IN USER RADIUS
const proxiedUrl = 'https://www.mapquestapi.com/search/v4/place';
const url = new URL('https://proxy.hackeryou.com');
console.log(userCoordsRadius);
url.search = new URLSearchParams({
  reqUrl: proxiedUrl,
  'params[location]': userCoords,
  'params[sort]': 'distance',
  'params[key]': 'dTlbawGG8FhZfTGC0sBQMIYLXx9s3Qtl',
  'params[circle]': userCoordsRadius,
  'params[q]': searchParam,
  'proxyHeaders[Accept]': 'application/json',
});

const getDestination = () => {
if (useLocation === true) {
fetch(url)
  .then(response => response.json())
  .then(data => {
      setDestination(data.results)
      
      // place.place.geometry.coordinates
      })
      setUseLocation(false)
    } else {
      addressToCoordinates()
      fetch(url)
  .then(response => response.json())
  .then(data => {
      setDestination(data.results)
      
      // place.place.geometry.coordinates
      })
    }
}

  //TEST FOR REVERSE GEOLOCATION
const proxiedGeoUrl = 'http://www.mapquestapi.com/geocoding/v1/reverse';
 const geoUrl = new URL('https://proxy.hackeryou.com');
 geoUrl.search = new URLSearchParams({
  reqUrl: proxiedGeoUrl,
  'params[location]': [ -79.41756900858489, 43.64993671317276],
  'params[key]': 'dTlbawGG8FhZfTGC0sBQMIYLXx9s3Qtl',
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

    <div className="wrapper">
      <Header />
      <Input 
        getLocation={getLocation} 
        handleQChange={handleQChange}
        handleFrom={handleFrom}
        userInput={userInput}
        takeMeThere={takeMeThere}
      />
      <ListOfPlaces destination={destination}/>
      {/* <Directions from={userCoords}/> */}
    </div>
  );
}

export default App;
