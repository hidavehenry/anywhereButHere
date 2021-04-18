import React from 'react'
import { useState } from 'react'

const Input = ( props ) => {

    return (
        <div className="sectionWrapper">
            <div className="userLocation">
                <form>
                    <label htmlFor="userAddress" className="sr-only">Type your address</label>
                    <input id="userAddress" type="text" placeholder="type your address" value=""></input> 
                    <button onClick={props.getLocation}>Use my Location</button>
                </form>
            </div>
            <div className="userSearch">
                <form>
                <label htmlFor="destination" className="sr-only">Where do you want to go?</label>
                    <input id="destination" type="text" placeholder="Where do you want to go?" onChange={props.handleQChange} ></input> 
                    <button>Take me there!</button>
                </form>
            </div>
        </div>
        
    )
}

export default Input
