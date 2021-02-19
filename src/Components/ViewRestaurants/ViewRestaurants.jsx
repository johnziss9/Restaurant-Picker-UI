import moment from 'moment';
import React from 'react';
import './ViewRestaurants.css'

class ViewRestaurants extends React.Component {

   constructor(props) {
       super(props);
       this.state = {
           restaurants: []
       }
   }

   componentDidMount() {
    fetch("https://localhost:5001/restaurant/GetAllNotVisited")
    .then(response => response.json())
    .then (data => {
        this.setState({ 
            restaurants: data 
        });
    });
   }

    render() {
        return (
            <div className="container">
                <div className="view-restaurants-container">
                    {Array.isArray(this.state.restaurants.data) && this.state.restaurants.data.map( res => (
                        <div className="restaurant-container" key={res.id}>
                            <h4 className="restaurant-name">{res.name}</h4>
                            <p className="restaurant-location">{res.location}</p>
                            <p className="restaurant-cuisine">{res.cuisine}</p>
                            <small className="restaurant-user-details">Added by {res.addedBy} on {moment(res.addedOn).format('MMMM Do YYYY')}</small>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default ViewRestaurants;