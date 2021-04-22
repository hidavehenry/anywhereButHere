import React from 'react'

const Input = ( props ) => {

    return (
        <div className="sectionWrapper">
            <h2>Start your journey!</h2>
            <div className="userLocation">
                <form>
                    <label 
                        htmlFor="userAddress"
                        className="sr-only">Type your address
                    </label>

                    <input 
                        id="userAddress" 
                        type="text" 
                        placeholder="type your address" 
                        value={props.userInput}
                        onChange={props.handleFrom}
                    />

                    <button 
                        onClick={props.getLocation}
                    >Use my Location
                    </button>
                </form>
            </div>
            <div className="userSearch">
                <form>
                <label htmlFor="destination" className="sr-only">Where do you want to go?</label>
                    <input 
                        id="destination" 
                        type="text" 
                        placeholder="Where do you want to go?" 
                        onChange={props.handleQChange} 
                    />

                    <button
                        onClick={props.takeMeThere}
                    >Take me there!</button>
                </form>
            </div>
        </div>
        
    )
}

export default Input
