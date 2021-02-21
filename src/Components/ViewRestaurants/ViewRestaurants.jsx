import moment from 'moment';
import React from 'react';
import './ViewRestaurants.css'
import { Link } from 'react-router-dom';
import { NavLink } from 'reactstrap';
import Loading from '../../Images/loading.gif';

class ViewRestaurants extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        isLoaded: false,
        restaurants: [],
        users: [],
       }
   }

    componentDidMount() {
        Promise.all([
            fetch("https://localhost:5001/restaurant/GetAllNotVisited")
            .then(response => response.json()),
            fetch("https://localhost:5001/auth/GetAllUsers")
            .then(response => response.json())
        ])
        .then(([restaurantData, userData]) => {
            this.setState({ 
                isLoaded: true,
                restaurants: restaurantData,
                users: userData
            });
       })
   }

    render() {

        if (!this.state.isLoaded) {
            return (<div className="view-restaurants-container-loading">
                        <img src={Loading} alt="loading" className="view-restaurants-loading-gif" />
                        <p className="view-restaurants-loading-text">Loading Restaurants...</p>
                    </div>)
        } else {
        return (
            <div className="view-restaurants-container">
                <div className="container view-restaurants-header">
                    <h1 className="view-restaurants-title">Pick Restaurant</h1>
                    <NavLink className="view-restaurants-go-back" tag={Link} to="/Menu">Main Menu</NavLink>
                </div>
                <div className="view-restaurants-lower-container">
                    <div className="view-restaurants">
                        {Array.isArray(this.state.restaurants.data) && this.state.restaurants.data.map( res => (
                            <div className="restaurant-container" key={res.id}>
                                <h4 className="restaurant-name">{res.name}</h4>
                                <p className="restaurant-location">{res.location}</p>
                                <p className="restaurant-cuisine">{res.cuisine}</p>
                                <small className="restaurant-user-details">Added by {this.state.users.data[res.addedBy].username} on {moment(res.addedOn).format('MMMM Do YYYY')}</small>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )};
    }
}

export default ViewRestaurants;