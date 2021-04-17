import {useState, useEffect} from 'react';


const Directions = () => {

  const [userFrom, setUserFrom] = useState('');
  const [userTo, setUserTo] = useState('');

  const handleChangeFrom = (event) => {
    console.log(event.target.value);
  }

  const handleChangeTo = (event) => {
    console.log(event.target.value);
  }

  const handleClick = (event) => {
    event.preventDefault();
    setUserFrom(event.target.value);
    setUserTo(event.target.value);
  }

const directionsApi = (userFrom, userTo) => {
    const proxiedUrl = 'https://www.mapquestapi.com/directions/v2/route';
    const url = new URL('https://proxy.hackeryou.com');
    url.search = new URLSearchParams({
      reqUrl: proxiedUrl,
      'params[key]': 'WWEYdye9aFyaPW4k4kRFXHMfKiFe4bHT',
      'params[unit]': 'k',
      'params[routeType]': 'fastest',
      'params[from]': userFrom,
      'params[to]': userTo,
      'params[doReverseGeocode]': false,
      'params[enhancedNarrative]': false,
      'params[avoidTimedConditions]': false,
      'params[narrativeType]': 'text',
      'proxyHeaders[Accept]': 'application/json',
      'params[outFormat]': 'JSON',
    });

    // put useEffect here 
    fetch(url)
      .then(response => response.json())
      .then( (data) => {
        const directions = data.route.legs[0].maneuvers;

        const directionsNarrative = directions.map( (value) => {
          return value.narrative;
        })
        console.log(directionsNarrative);
      });
  }

  directionsApi();

    return (
        <div>
          <form>
                <label htmlFor="from">from</label>
                <input 
                  type="text" 
                  id="from"
                  onChange={handleChangeFrom}
                  value={userFrom}
                /> 

                <label htmlFor="to">to</label>
                <input 
                  type="text" 
                  id="to"
                  onChange={handleChangeTo}
                  value={userTo}
                /> 

                <button onClick={handleClick}>Take me there!</button>
          </form>
          <p>
            You are going from {userFrom} to {userTo}!
          </p>
        </div>
    )
}

export default Directions;
