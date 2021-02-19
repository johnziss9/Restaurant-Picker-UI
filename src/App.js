import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import ViewRestaurants from './Components/ViewRestaurants/ViewRestaurants';
import Menu from './Components/Menu/Menu';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import AddRestaurant from './Components/AddRestaurant/AddRestaurant';
import PickRestaurant from './Components/PickRestaurant/PickRestaurant';

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
            <ProtectedRoute path="/AddRestaurant" component={props => <AddRestaurant {...props } /> } />
            <ProtectedRoute path="/PickRestaurant" component={props => <PickRestaurant {...props } /> } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
