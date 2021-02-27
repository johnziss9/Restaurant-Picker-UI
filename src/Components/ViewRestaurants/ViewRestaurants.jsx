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
        fetch("https://localhost:5001/restaurant/GetAllNotVisited", {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => {
            this.setState({ 
                isLoaded: true,
                restaurants: data
            });
        });
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
                <div className="view-restaurants-content-container container">
                    <div className="view-restaurants-content">
                        {Array.isArray(this.state.restaurants.data) && this.state.restaurants.data.map( res => (
                            <div className="restaurant-container" key={res.id}>
                                <h4 className="restaurant-name">{res.name}</h4>
                                <p className="restaurant-location">{res.location}</p>
                                <p className="restaurant-cuisine">{res.cuisine}</p>
                                <small className="restaurant-user-details">Added on {moment(res.addedOn).format('MMMM Do YYYY')}</small>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )};
    }
}

export default ViewRestaurants;