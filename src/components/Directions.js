
const Directions = (props) => {
    return (
        <div className="directionsClass">
          <h2>Take me there!</h2>
            {props.myJourney.map( (value) => {
              console.log(value);
                return(
                  <div>
                    <p>{value.narrative}</p>
                  </div>
                )
              })
            }
          <button onClick={() => {props.setShowMeTheDirections(true)}}>take me back to list!</button>
        </div>
    )
}

export default Directions;
