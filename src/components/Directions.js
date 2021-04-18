import {useState, useEffect} from 'react';

const Directions = (props) => {

const directionsApi = (userFrom, userTo) => {
    const proxiedUrl = 'https://www.mapquestapi.com/directions/v2/route';
    const url = new URL('https://proxy.hackeryou.com');
    url.search = new URLSearchParams({
      reqUrl: proxiedUrl,
      'params[key]': 'WWEYdye9aFyaPW4k4kRFXHMfKiFe4bHT',
      'params[unit]': 'k',
      'params[routeType]': 'fastest',
      'params[from]': props.from,
      'params[to]': props.to,
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
          {/* <form>
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
          </form> */}
        </div>
    )
}

export default Directions;
