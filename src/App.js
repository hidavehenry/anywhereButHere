import './App.css';
import Input from './components/Input'
// import axios from 'axios'

function App() {

  /* 
  Create component to take user input
  User submits location or chooses use my location
  User selects what to search for
  User searches, on search updates state to equal value of filled in feilds
  Makes a call to search API using the two locations
  Create component to take names of returned results objects
  Map over returned array for name property
  Pass data to list component
  User selects name, updates thir state
  API call to direction API
  Create component for return
  */

  // API CALL FOR SEARCH
  // axios( {
  //   method:'GET',
  //   url: 'https://www.mapquestapi.com/search/v4/place',
  //   responseType: 'json',
  //     params: {
  //       location: [-79.41753141902342, 43.649976291114896],
  //       sort: 'distance',
  //       key: '70bf0d125d0d890aaada4fc8639854d0',
  //       feedback: false,
  //       circle: [-79.41753141902342, 43.649976291114896, 5000],
  //       q: `coffee`
  //     }
  //   }).then(function (res) {
  //     console.log(res);
  //   });

    

  return (
    <div>
      <Input />
    </div>
  );
}

export default App;
