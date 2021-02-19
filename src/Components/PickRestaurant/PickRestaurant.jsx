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
        .then(response => response.json())
        .then (data => {
            this.setState({ 
                restaurants: data 
            });
        });
    }

    handleRandom() {
        const rn = Math.floor(Math.random() * this.state.restaurants.data.length);
        alert(this.state.restaurants.data[rn].name);
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