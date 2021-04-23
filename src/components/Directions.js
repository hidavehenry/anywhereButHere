
const Directions = (props) => {
<<<<<<< HEAD
  return (
      <div>
        <h2>Take me there!</h2>
          {props.myJourney.map( (value) => {
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
=======
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
>>>>>>> 4598cc3a0671cfe80b85b8ab392e98a345d66bb6
}

export default Directions;