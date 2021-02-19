import moment from 'moment';
import React from 'react';
import './PickRestaurant.css'

class PickRestaurant extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurants: []
        }

        this.handleRandom = this.handleRandom.bind(this);
    }
 
    componentDidMount() {
        fetch("https://localhost:5001/restaurant/GetAllNotVisited")
        .then (response => response.json())
        .then (data => {
            this.setState({ 
                restaurants: data 
            });
        });
    }

    handleRandom() {
        if (this.state.restaurants.data.length <= 0) {
            alert('No more restaurants. Please add more restaurants before picking one.')
        } else {
            const randomRestaurant = Math.floor(Math.random() * this.state.restaurants.data.length);
            alert(this.state.restaurants.data[randomRestaurant].name);

            fetch("https://localhost:5001/restaurant", {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: this.state.restaurants.data[randomRestaurant].id,
                    name: this.state.restaurants.data[randomRestaurant].name,
                    location: this.state.restaurants.data[randomRestaurant].location,
                    cuisine: this.state.restaurants.data[randomRestaurant].cuisine,
                    visited: true
                })
            })
            .then (response => response.json())
        }
    }

    render() {
        return (
            <div className="add-restaurant-container">
                <div className="container flex-column">
                    <h1 className="add-restaurant-title">Pick Restaurant</h1>
                    <button type="button" className="btn btn-success" onClick={this.handleRandom}>Pick a Random Restaurant</button>
                </div>
            </div>
        );
    }
}

export default PickRestaurant;