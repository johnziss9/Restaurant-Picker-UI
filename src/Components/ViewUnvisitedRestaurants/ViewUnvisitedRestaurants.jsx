import moment from 'moment';
import React from 'react';
import './ViewUnvisitedRestaurants.css'
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { NavLink } from 'reactstrap';
import Loading from '../../Images/loading.gif';

class ViewUnvisitedRestaurants extends React.Component {

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
            <div className="view-unvisited-restaurants-container">
                <div className="container">
                    <Header title="View Unvisited Restaurants" />
                </div>
                <div className="view-unvisited-restaurants-content-container container">
                    <div className="view-unvisited-restaurants-content">
                        {Array.isArray(this.state.restaurants.data) && this.state.restaurants.data.map( res => (
                            <div className="unvisited-restaurant-container" key={res.id}>
                                <h4 className="unvisited-restaurant-name">{res.name}</h4>
                                <p className="unvisited-restaurant-location">{res.location}</p>
                                <p className="unvisited-restaurant-cuisine">{res.cuisine}</p>
                                <small className="unvisited-restaurant-user-details">Added on {moment(res.addedOn).format('MMMM Do YYYY')}</small>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )};
    }
}

export default ViewUnvisitedRestaurants;