import React from 'react'

const Input = ( props ) => {

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else { 
            console.log('no location')
        }
        }
    
        // NEED TO STORE THIS IN A STATE? 
        function showPosition(position) {
        console.log(position.coords.latitude) 
        console.log(position.coords.longitude)
        }

    return (
        <div>
            <form>
                <label>WORDS</label>
                <input type="text"></input> 
                <button onClick={getLocation}>Get my Location</button>
            </form>
        </div>
    )
}

export default Input
