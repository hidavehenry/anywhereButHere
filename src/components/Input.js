import React from 'react'

const Input = ( props ) => {

    return (
        <div className="sectionWrapper">
            <h2>Get lost, or don't ... whatever, who cares</h2>
            <div className="userLocation">
                <form>
                    <label 
                        htmlFor="userAddress"
                        className="sr-only">Type your address
                    </label>
                    <input 
                        id="userAddress" 
                        type="text" 
                        placeholder="where are you starting?"
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
                <label htmlFor="userDestination" className="sr-only">Where do you want to go?</label>
                    <input 
                        id="userDestination" 
                        type="text" 
                        placeholder="What do you want?" 
                        onChange={props.handleQChange} 
                    />

                    <button
                        onClick={props.takeMeThere}
                    >Take me there, I guess</button>
                </form>
            </div>
        </div>
        
    )
}

export default Input