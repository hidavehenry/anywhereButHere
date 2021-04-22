import './App.css';
import Directions from './components/Directions';
import Input from './components/Input';
import ListOfPlaces from './components/ListOfPlaces'
import Header from './Header';
import { useEffect, useState } from 'react'

function App() {

  const [userCoords, setUserCoords] = useState([])
  const [userCoordsRadius, setUserCoordsRadius] = useState([])
  const [searchParam, setSearchParam] = useState('')
  const [userStreet, setUserStreet] = useState('')
  const [userInput, setUserInput] = useState('')
  const [destination, setDestination] = useState([]);
    
  const handleQChange = (event) => {
    setSearchParam(event.target.value);
  }

  const handleFrom = (event) => {
    setUserInput(event.target.value);
  }

  const takeMeThere = (event) => {
    event.preventDefault();
    addressToCoordinates();
  }

    function getLocation(event) {
        event.preventDefault();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else { 
            console.log('no location')
        }
        }
            function showPosition(position) {
            setUserCoords([position.coords.longitude, position.coords.latitude])
            console.log(userCoords);
        }

// API CALL FOR GEOCODING THE USER'S ADDRESS
const proxiedUrl4 = 'https://www.mapquestapi.com/geocoding/v1/address';
const url4 = new URL('https://proxy.hackeryou.com');
url4.search = new URLSearchParams({
  reqUrl: proxiedUrl4,
  'params[key]': 'GvTYDdAzlzCU5UcQ00cnarwGMaBtz8gi',
  'proxyHeaders[Accept]': 'application/json',
  'params[location]': userInput
});

const addressToCoordinates = () => {
fetch(url4)
  .then(response => response.json())
  .then(data => {
    setUserCoords([data.results[0].locations[0].latLng.lng, data.results[0].locations[0].latLng.lat]);
  });
  
};


useEffect( () => {
  if (userCoords !== []) {
  setUserCoordsRadius([...userCoords, 5000])
}}, [userCoords])

//API CALL FOR Q IN USER RADIUS
const proxiedUrl = 'https://www.mapquestapi.com/search/v4/place';
const urlQ = new URL('https://proxy.hackeryou.com');
urlQ.search = new URLSearchParams({
reqUrl: proxiedUrl,
'params[location]': userCoords,
'params[sort]': 'distance',
'params[key]': 'GvTYDdAzlzCU5UcQ00cnarwGMaBtz8gi',
'params[circle]': userCoordsRadius,
'params[q]': searchParam,
'proxyHeaders[Accept]': 'application/json',
});

useEffect(() => {
if (userCoordsRadius.length !== 0 && userCoordsRadius.length !== 1) {
  console.log(userCoordsRadius)

  fetch(urlQ)
  .then(response => response.json())
  .then(data => {
      setDestination(data.results)
      console.log(data)
      })
}
}, [userCoordsRadius]);

// TEST FOR REVERSE GEOLOCATION
const proxiedGeoUrl = 'http://www.mapquestapi.com/geocoding/v1/reverse';
 const geoUrl = new URL('https://proxy.hackeryou.com');
 geoUrl.search = new URLSearchParams({
  reqUrl: proxiedGeoUrl,
  'params[location]': [ -79.41756900858489, 43.64993671317276],
  'params[key]': 'GvTYDdAzlzCU5UcQ00cnarwGMaBtz8gi',
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
