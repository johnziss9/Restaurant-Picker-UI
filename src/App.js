import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import ViewRestaurants from './Components/ViewRestaurants/ViewRestaurants';
import Menu from './Components/Menu/Menu';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

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
            <ProtectedRoute path="/Home" component={props => <Menu {...props } /> } />
            <ProtectedRoute path="/ViewRestaurants" component={props => <ViewRestaurants {...props } /> } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
