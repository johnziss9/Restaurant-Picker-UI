import moment from 'moment';
import React from 'react';
import './ViewRestaurants.css'
import Header from '../Header/Header';
import Loading from '../../Images/loading.gif';

class ViewRestaurants extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        isLoaded: false,
        notVisitedRestaurants: [],
        visitedRestaurants: [],
        users: [],
        showVisited: false
       }
   }

    componentDidMount() {
        Promise.all([
            fetch('https://localhost:5001/restaurant/GetNotVisited', {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                }
            })
            .then(res => res.json()),
            fetch('https://localhost:5001/restaurant/GetVisited',  {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                }
            })
            .then(res => res.json())
        ]).then(([notVisitedRestaurantData, visitedRestaurantData]) => {
            this.setState({
                isLoaded: true,
                notVisitedRestaurants: notVisitedRestaurantData,
                visitedRestaurants: visitedRestaurantData
            });
        })
    }
   
    handleActiveButton = e => {
        const viewRestaurantButtons = document.getElementsByClassName('view-filtered-restaurants');

        Array.from(viewRestaurantButtons).forEach(element => element.classList.remove('active'));
        e.target.classList.add('active');

        if (this.state.showVisited) {
            this.setState({
                showVisited: false        
            })
        } else {
            this.setState({
                showVisited: true        
            })
        }
    }

    render() {
        if (!this.state.isLoaded) {
            return (<div className="view-restaurants-container-loading flex-column">
                        <img src={Loading} alt="loading" className="view-restaurants-loading-gif" />
                        <p className="view-restaurants-loading-text">Loading Restaurants...</p>
                    </div>)
        } else {
        return (
            <div className="view-restaurants-container">
                <div className="view-restaurants-header-buttons container">
                    <Header title="View Restaurants" />
                    <div className="view-restaurant-buttons-container">
                        <button className="btn btn-link view-filtered-restaurants active" onClick={this.handleActiveButton}>Not Visited</button>
                        <button className="btn btn-link view-filtered-restaurants" onClick={this.handleActiveButton}>Visited</button>
                    </div>
                </div>
                <div className="view-restaurants-content-container container">
                    {!this.state.showVisited ?
                    <div className="view-restaurants-content">
                        {Array.isArray(this.state.notVisitedRestaurants.data) && this.state.notVisitedRestaurants.data.map( res => (
                            <div className="restaurant-container" key={res.id}>
                                <h4 className="restaurant-name">{res.name}</h4>
                                <p className="restaurant-location">{res.location}</p>
                                <p className="restaurant-cuisine">{res.cuisine}</p>
                                <small className="restaurant-user-details">Added on {moment(res.addedOn).format('MMMM Do YYYY')}</small>
                            </div>
                        ))}
                    </div> :
                    <div className="view-restaurants-content">
                        {Array.isArray(this.state.visitedRestaurants.data) && this.state.visitedRestaurants.data.map( res => (
                            <div className="restaurant-container" key={res.id}>
                                <h4 className="restaurant-name">{res.name}</h4>
                                <p className="restaurant-location">{res.location}</p>
                                <p className="restaurant-cuisine">{res.cuisine}</p>
                                <small className="restaurant-user-details">Added on {moment(res.addedOn).format('MMMM Do YYYY')}</small>
                            </div>
                        ))}
                    </div> }
                </div>
            </div>
        )};
    }
}

export default ViewRestaurants;