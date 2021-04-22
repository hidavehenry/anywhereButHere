import './App.css';
import Input from './components/Input';
import Header from './Header';
import ListOfPlaces from './components/ListOfPlaces';
import Map from './components/Map';
import Directions from './components/Directions';
import { useEffect, useState } from 'react'; 


function App() {

  const [userCoords, setUserCoords] = useState([])
  const [userCoordsRadius, setUserCoordsRadius] = useState([])
  const [searchParam, setSearchParam] = useState('')
  const [userInput, setUserInput] = useState('')
  const [myJourney, setMyJourney] = useState([])
  const [toAddress, setToAddress] = useState(false)

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
      console.log(userCoords)
      console.log(userCoordsRadius)

  }

  function getLocation(event) {
    event.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      console.log(navigator.geolocation)
    } else { 
      alert('No Locations Found. Please Try Again!')
    }
    // console.log(showPosition)
    }

    // THE USER COORDS ARE REVERSED! NEED TO FIX IT!
    function showPosition(position) {
      setUserInput([position.coords.latitude, position.coords.longitude]);
      setToAddress(true)
    }


  const getDestination = () => {
  fetch(urlQ)
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
      })
}
}, [userCoordsRadius]);

  // REVERSE GEOLOCATION TO RETURN STREET ADDRESS
  useEffect( () => {
    if (toAddress === true) {
      const proxiedGeoUrl = 'http://www.mapquestapi.com/geocoding/v1/reverse';
      const geoUrl = new URL('https://proxy.hackeryou.com');
      geoUrl.search = new URLSearchParams({
        reqUrl: proxiedGeoUrl,
        'params[location]': userInput,
        'params[key]': 'AhbgCPRoF1OzG1YBICuTKhcx25nl5X5M',
        'proxyHeaders[Accept]': 'application/json',
      });

        fetch(geoUrl)
          .then(response => response.json())
          .then(geodata => {
            // console.log(geodata)
            setUserInput((geodata.results[0].locations[0].street) + ` ` + (geodata.results[0].locations[0].adminArea4) + ` ` + (geodata.results[0].locations[0].adminArea3))
          });
    }
}, [toAddress])

// API CALL FOR DIRECTIONS
const proxiedUrl3 = 'https://www.mapquestapi.com/directions/v2/route';
const url3 = new URL('https://proxy.hackeryou.com');
url3.search = new URLSearchParams({
  reqUrl: proxiedUrl3,
  'params[key]': 'GvTYDdAzlzCU5UcQ00cnarwGMaBtz8gi',
  'params[unit]': 'k',
  'params[routeType]': 'fastest',
  'params[from]': `8405 avenue de l'epee`,
  'params[to]': `1000 Rue Legendre O, Montréal, QC H4N`,
  'params[doReverseGeocode]': false,
  'params[enhancedNarrative]': false,
  'params[avoidTimedConditions]': false,
  'params[narrativeType]': 'text',
  'proxyHeaders[Accept]': 'application/json',
  'params[outFormat]': 'JSON',
});

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
        <ListOfPlaces destination={destination} userCoords={userCoords} myJourney={myJourney}/>
        {/* <Directions from={userCoords}/> */}
        <Map destination={destination}
            />
      </div>
  );
}

export default App;