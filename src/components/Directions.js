import {useState, useEffect} from 'react';

const Directions = (props) => {

    const proxiedUrl = 'https://www.mapquestapi.com/directions/v2/route';
    const url = new URL('https://proxy.hackeryou.com');
    url.search = new URLSearchParams({
      reqUrl: proxiedUrl,
      'params[key]': 'GvTYDdAzlzCU5UcQ00cnarwGMaBtz8gi',
      'params[unit]': 'k',
      'params[routeType]': 'fastest',
      'params[from]': `8405 avenue de l'epee`,
      'params[to]': `8405 avenue de l'epee`,
      'params[doReverseGeocode]': false,
      'params[enhancedNarrative]': false,
      'params[avoidTimedConditions]': false,
      'params[narrativeType]': 'text',
      'proxyHeaders[Accept]': 'application/json',
      'params[outFormat]': 'JSON',
    });

useEffect( () => {
    fetch(url)
      .then(response => response.json())
      .then( (data) => {
        const directions = data.route.legs[0].maneuvers;
        const directionsNarrative = directions.map( (value) => {
          console.log(value.narrative);
        })
        })
        // console.log(directionsNarrative);
      }, [])

    return (
        <div>
          <h2>hi</h2>
        </div>
    )

}

export default Directions;
