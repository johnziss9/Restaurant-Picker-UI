import React from 'react';
import './App.css';
import Home from './Components/Home/Home';
import ViewRestaurants from './Components/ViewRestaurants/ViewRestaurants';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Home/>
      </div>
    );
  }
}

export default App;
