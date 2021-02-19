import React from 'react';
import './AddRestaurant.css'
import { Link } from 'react-router-dom';
import { NavLink } from 'reactstrap';

class AddRestaurant extends React.Component {

   constructor(props) {
       super(props);
       this.state = {
           cuisines: [],
           name: '',
           location: '',
           cuisine: ''
       }

        this.handleName = this.handleName.bind(this);
        this.handleLocation = this.handleLocation.bind(this);
        this.handleCuisine = this.handleCuisine.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleName(event) {
        this.setState({ name: event.target.value })
    }

    handleLocation(event) {
        this.setState({ location: event.target.value })
    }

    handleCuisine(event) {
        this.setState({ cuisine: event.target.value })
    }

    handleSubmit() {

        if (this.state.name == '')
            alert('Enter restaurant name.');
        else if (this.state.location == '')
            alert('Enter restaurant location.');
        else if (this.state.cuisine == 'Select Cuisine' || this.state.cuisine == '')
            alert('Select cuisine. If not sure, select \"Other\" option.');

        fetch('https://localhost:5001/restaurant', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                location: this.state.location,
                cuisine: this.state.cuisine
            })
        })
        .then(response => response.json())
    }

    render() {
        return (
            <div className="add-restaurant-container">
                <div className="container flex-column">
                    <div className="add-restaurant-header">
                        <h1 className="add-restaurant-title">Add Restaurant</h1>
                        <NavLink className="add-restaurant-go-back" tag={Link} to="/Menu">Main Menu</NavLink>
                    </div>
                    <form>
                        <div className="form-group">
                            <label htmlFor="restaurant-name">Restaurant Name:</label>
                            <input type="text" id="restaurant-name" className="form-control" placeholder="Enter Restaurant Name" onChange={this.handleName} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="restaurant-location">Location</label>
                            <input type="text" className="form-control" id="restaurant-location" placeholder="Enter Restaurant Location" onChange={this.handleLocation} />
                        </div>
                        <label htmlFor="restaurant-cuisine">Cuisine</label>
                        <select className="form-control" onChange={this.handleCuisine}>
                            <option>Select Cuisine</option>
                            {Array.isArray(this.state.cuisines.data) && this.state.cuisines.data.map( c => (
                                <option key={c}>{c}</option>
                            ))}
                        </select>
                        <button type="submit" className="btn btn-success add-restaurant-submit" onClick={this.handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddRestaurant;