import './App.css';
import Input from './components/Input';
import Header from './Header';
import ListOfPlaces from './components/ListOfPlaces';
import Map from './components/Map';
import Directions from './components/Directions';
import { useEffect, useState } from 'react'; 
import Footer from './components/Footer';


function App() {

  const [userCoords, setUserCoords] = useState([])
  const [userCoordsR, setUserCoordsR] = useState([43.651, -79.418])
  const [userCoordsRadius, setUserCoordsRadius] = useState([])
  const [searchParam, setSearchParam] = useState('')
  const [userInput, setUserInput] = useState('')
  const [myJourney, setMyJourney] = useState([])
  const [toAddress, setToAddress] = useState(false)
  const [destination, setDestination] = useState([]);
  const [destinationSpot, setDestinationSpot] = useState([]);
  const [showMeTheDirections, setShowMeTheDirections] = useState(true)
  const [showMeTheMap, setMeTheShowMap] = useState(false)
  
  const handleQChange = (event) => {
    setSearchParam(event.target.value);
  }

  const handleFrom = (event) => {
    setUserInput(event.target.value);
  }

  const takeMeThere = (event) => {
    event.preventDefault();
    addressToCoordinates();
    setMeTheShowMap(true);
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


// API CALL FOR DIRECTIONS
  useEffect( () => {
    if (destinationSpot.length > 0 && userCoords.length > 0) {  
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
  }, [destinationSpot, userCoords, userInput])

    

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
    setUserCoordsR([data.results[0].locations[0].latLng.lat, data.results[0].locations[0].latLng.lng]);
  });
};

useEffect( () => {
  if (userCoords !== []) {
  setUserCoordsRadius([...userCoords, 5000])
}}, [userCoords])


//API CALL FOR Q IN USER RADIUS

useEffect(() => {
  
if (userCoordsRadius.length !== 0 && userCoordsRadius.length !== 1) {
  const proxiedUrlQ = 'https://www.mapquestapi.com/search/v4/place';
  const urlQ = new URL('https://proxy.hackeryou.com');
  urlQ.search = new URLSearchParams({
  reqUrl: proxiedUrlQ,
  'params[location]': userCoords,
  'params[sort]': 'distance',
  'params[key]': 'GvTYDdAzlzCU5UcQ00cnarwGMaBtz8gi',
  'params[circle]': userCoordsRadius,
  'params[q]': searchParam,
  'proxyHeaders[Accept]': 'application/json',
  });
  fetch(urlQ)
  .then(response => response.json())
  .then(data => {
      setDestination(data.results)
      })
}
}, [userCoordsRadius, userCoords, searchParam]);


// LOCATION TO RETURN STREET ADDRESS
  useEffect( () => {
    if (toAddress === true) {
      setToAddress(false);
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
            setUserInput((geodata.results[0].locations[0].street) + ` ` + (geodata.results[0].locations[0].adminArea4) + ` ` + (geodata.results[0].locations[0].adminArea3))
          });
    }
}, [toAddress, userInput])


  return (
    <div>
      <div className="wrapper">
        <Header />
        <Input 
          getLocation={getLocation} 
          handleQChange={handleQChange}
          handleFrom={handleFrom}
          userInput={userInput}
          takeMeThere={takeMeThere}
        />
        <div className="flexApp">
          { showMeTheDirections
            ?
            (
            <div className="listOfPlaces">
              <ul>
              {
                destination.length > 0
                ?
                destination.map( (place) => {
                  return(
                      <ListOfPlaces 
                      place={place}
                      getDirections={getDirections}
                      setShowMeTheDirections={setShowMeTheDirections}
                      />
                  )})
                : 
                showMeTheMap === true
                ?
                (
                  <div className="loserClass">
                  <p>Sorry, loser, you're going nowhere.</p>
                  <p>Try another search.</p>
                  </div>
                )
                :
                <div></div>
                }
                  </ul>
                </div>
                )
            : 
            <Directions 
            myJourney={myJourney}
            setShowMeTheDirections={setShowMeTheDirections}
            /> 
          }

          {
            showMeTheMap  
            ?
            <Map 
            userInput={userInput}
            destination={destination}
            userCoordsR={userCoordsR}
            />
            : 
            <div className="emptyDiv"></div>
          }
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default App;