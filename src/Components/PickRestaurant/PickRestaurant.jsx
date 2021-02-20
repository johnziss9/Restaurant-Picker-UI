import React from 'react';
import './PickRestaurant.css'
import { Link } from 'react-router-dom';
import { NavLink, Alert } from 'reactstrap';

class PickRestaurant extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
            showErrorAlert: false
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

    componentDidUpdate(){
        setTimeout(() => this.setState({
            showErrorAlert: false
        }), 6000);
    }

    handleErrorAlert = () => {
        this.setState({ showErrorAlert: true })
    }

    handleRandom() {
        if (this.state.restaurants.data.length <= 0) {
            this.handleErrorAlert();
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
            <div className="pick-restaurant-container">
                <div className="container flex-column">
                    <div className="pick-restaurant-header">
                        <h1 className="pick-restaurant-title">Pick Restaurant</h1>
                        <NavLink className="pick-restaurant-go-back" tag={Link} to="/Menu">Main Menu</NavLink>
                    </div>
                    {this.state.showErrorAlert 
                        ? <Alert color="danger">
                            <h4>Uh-oh!</h4>
                            <hr />
                            <p>No more restaurants. Please add some restaurants before picking one.</p>
                            <NavLink tag={Link} className="add-restaurant-alert-link" to="/AddRestaurant">Add Restaurant</NavLink>
                        </Alert>
                        : null }
                    <button type="button" className="btn btn-success" onClick={this.handleRandom}>Pick a Random Restaurant</button>
                </div>
            </div>
        );
    }
}

export default PickRestaurant;