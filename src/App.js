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
  const [destinationSpot, setDestinationSpot] = useState([]);
  const [showMeTheDirections, setShowMeTheDirections] = useState(true)
  
  const handleQChange = (event) => {
    setSearchParam(event.target.value);
  }

  const handleFrom = (event) => {
    setUserInput(event.target.value);
  }

  const takeMeThere = (event) => {
    event.preventDefault();
    addressToCoordinates();
    getDestination();
  }

  // function for clicking and retrieving destination coordinates
  const getDirections = (event, individualId) => {
    event.preventDefault();
    const copyOfDestination = [...destination];
    const finalDestination = copyOfDestination.filter( (singleDestination) => {
      return singleDestination.id === individualId;
    })
    setDestinationSpot(finalDestination[0].place.properties.street);
  }

  useEffect( () => {
    if (destinationSpot.length > 0 && userCoords.length > 0) {
      directionsApiCall();
    }
  }, [destinationSpot, userCoords])


// API CALL FOR DIRECTIONS
const directionsApiCall = () => {
  const proxiedUrl3 = 'https://www.mapquestapi.com/directions/v2/route';
  const url3 = new URL('https://proxy.hackeryou.com');
  url3.search = new URLSearchParams({
    reqUrl: proxiedUrl3,
    'params[key]': 'VOCZhEgoahjsCUJmf4LYCnfOGZM527bT',
    'params[unit]': 'k',
    'params[routeType]': 'fastest',
    'params[from]': userInput,
    'params[to]': destinationSpot,
    'params[doReverseGeocode]': false,
    'params[enhancedNarrative]': false,
    'params[avoidTimedConditions]': false,
    'params[narrativeType]': 'text',
    'proxyHeaders[Accept]': 'application/json',
    'params[outFormat]': 'JSON',
  });

  
    fetch(url3)
      .then(response => response.json())
      .then( (data) => {
        setMyJourney(data.route.legs[0].maneuvers)
        })
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
        }


//API CALL FOR Q IN USER RADIUS
const proxiedUrl = 'https://www.mapquestapi.com/search/v4/place';
const url = new URL('https://proxy.hackeryou.com');
url.search = new URLSearchParams({
  reqUrl: proxiedUrl,
  'params[location]': userCoords,
  'params[sort]': 'distance',
  'params[key]': 'VOCZhEgoahjsCUJmf4LYCnfOGZM527bT',
  'params[circle]': userCoordsRadius,
  'params[q]': searchParam,
  'proxyHeaders[Accept]': 'application/json',
});

const getDestination = () => {
fetch(url)
  .then(response => response.json())
  .then(data => {
      setDestination(data.results)
      })
}

  function getLocation(event) {
    event.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      alert('No Locations Found. Please Try Again!')
    }
    }

    // THE USER COORDS ARE REVERSED! NEED TO FIX IT!
    function showPosition(position) {
      setUserInput([position.coords.latitude, position.coords.longitude]);
      setToAddress(true)
    }

// API CALL FOR GEOCODING THE USER'S ADDRESS
const proxiedUrl4 = 'https://www.mapquestapi.com/geocoding/v1/address';
const url4 = new URL('https://proxy.hackeryou.com');
url4.search = new URLSearchParams({
  reqUrl: proxiedUrl4,
  'params[key]': 'VOCZhEgoahjsCUJmf4LYCnfOGZM527bT',
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

  //TEST FOR REVERSE GEOLOCATION
const proxiedGeoUrl = 'http://www.mapquestapi.com/geocoding/v1/reverse';
 const geoUrl = new URL('https://proxy.hackeryou.com');
 geoUrl.search = new URLSearchParams({
  reqUrl: proxiedGeoUrl,
  'params[location]': [ -79.41756900858489, 43.64993671317276],
  'params[key]': 'VOCZhEgoahjsCUJmf4LYCnfOGZM527bT',
  'proxyHeaders[Accept]': 'application/json',
 });

useEffect( ()=> {
fetch(geoUrl)
  .then(response => response.json())
  .then(geodata => {
   setUserStreet(geodata.results[0].locations[0].street)
  });
}, [])

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



LOCATION TO RETURN STREET ADDRESS
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
          { showMeTheDirections
            ?
            destination.map( (place) => {
              return(
                <ListOfPlaces 
                place={place}
                getDirections={getDirections}
                setShowMeTheDirections={setShowMeTheDirections}
                />
              )
            })
            : 
            <Directions 
            myJourney={myJourney}
            setShowMeTheDirections={setShowMeTheDirections}
            destination={destination}
            /> 
          }

        <ListOfPlaces destination={destination} userCoords={userCoords} myJourney={myJourney}/>
        <Map destination={destination}
            />

      </div>
  );
}

export default App;