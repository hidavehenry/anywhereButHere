
const Directions = (props) => {

    return (
        <div>
          <h2>Take me to there!</h2>
            {props.myJourney.map( (value) => {
                console.log(value.narrative)
                return(
                  <div>
                    <p>{value.narrative}</p>
                  </div>
                )
              })
            }
        </div>
    )
}

export default Directions;
