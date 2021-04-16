import React from 'react'

const Directions = () => {
    const proxiedUrl = 'https://www.mapquestapi.com/search/v4/place';
    const url = new URL('https://proxy.hackeryou.com');
    url.search = new URLSearchParams({
      reqUrl: proxiedUrl,
      'params[key]': 'WWEYdye9aFyaPW4k4kRFXHMfKiFe4bHT',
      'params[from]': `userLocation`,
      'params[to]': `userChoice`,
      'params[outFormat]': 'JSON',
      'params[routeFormat]': 'pedestrian',
      'params[doReverseGeocode]': false,
      'params[enhancedNarrative]': false,
      'params[avoidTimedConditions]': false,
      'proxyHeaders[Accept]': 'application/json',
    });
    return (
        <div>
            
        </div>
    )
}

export default Directions
