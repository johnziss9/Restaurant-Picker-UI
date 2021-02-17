import moment from 'moment';
import React from 'react';
import './AddRestaurant.css'

class AddRestaurant extends React.Component {

   constructor(props) {
       super(props);
       this.state = {
           cuisines: []
       }
   }

   componentDidMount() {
    fetch("https://localhost:5001/restaurant/GetAllCuisines")
    .then(response => response.json())
    .then (data => {
        this.setState({ 
            cuisines: data 
        });
    });
   }

    render() {
        return (
            <div className="container add-restaurant-container">
                <h2>Add Restaurant</h2>
                <form>
                    <div class="form-group">
                        <label for="restaurant-name">Restaurant Name:</label>
                        <input type="text" id="restaurant-name" class="form-control" placeholder="Enter Restaurant Name" />
                    </div>
                    <div class="form-group">
                        <label for="restaurant-location">Location</label>
                        <input type="text" class="form-control" id="restaurant-location" placeholder="Enter Restaurant Location" />
                    </div>
                    <label for="restaurant-cuisine">Cuisine</label>
                    <select class="form-control">
                        <option>Select Cuisine</option>
                        {Array.isArray(this.state.cuisines.data) && this.state.cuisines.data.map( c => (
                            <option key={c}>{c}</option>
                        ))}
                    </select>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default AddRestaurant;