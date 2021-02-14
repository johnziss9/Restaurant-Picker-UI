import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import ViewRestaurants from './Components/ViewRestaurants/ViewRestaurants';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/ViewRestaurants" component={ViewRestaurants} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
