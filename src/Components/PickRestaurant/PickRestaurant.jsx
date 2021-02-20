import React from 'react';
import './PickRestaurant.css'
import { Link } from 'react-router-dom';
import { NavLink, Alert } from 'reactstrap';
import moment from 'moment';

class PickRestaurant extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
            chosenRestaurant: {
                name: '',
                location: '',
                cuisine: '',
                addedBy: '',
                addedOn: new Date().toLocaleString()
            },
            showChosenRestaurant: false,
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

    // componentDidUpdate(){
    //     setTimeout(() => this.setState({
    //         showErrorAlert: false
    //     }), 6000);
    // }

    handleErrorAlert = () => {
        this.setState({ showErrorAlert: true })
    }

    handleRandom() {
        if (this.state.restaurants.data.length <= 0) {
            this.handleErrorAlert();
        } else {
            const randomRestaurant = Math.floor(Math.random() * this.state.restaurants.data.length);

            this.setState({ 
                showChosenRestaurant: true, 
                chosenRestaurant: {
                    name: this.state.restaurants.data[randomRestaurant].name ,
                    location: this.state.restaurants.data[randomRestaurant].location,
                    cuisine: this.state.restaurants.data[randomRestaurant].cuisine,
                    addedBy: this.state.restaurants.data[randomRestaurant].addedBy,
                    addedOn: this.state.restaurants.data[randomRestaurant].addedOn,
                }
            });

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

    handleDone = () => {
        this.setState({
            showChosenRestaurant: false        
        });

        this.componentDidMount();
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

                    {this.state.showChosenRestaurant
                        ?   <div className="chosen-restaurant-container">
                                <h2 className="chosen-restaurant-title">The randomly chosen restaurant is:</h2>
                                <h3 className="chosen-restaurant-name">{this.state.chosenRestaurant.name}</h3>
                                <div className="chosen-restaurant-info">
                                    <h4 className="chosen-restaurant-location"><u><b>Location:</b></u> {this.state.chosenRestaurant.location}</h4>
                                    <h4 className="chosen-restaurant-cuisine"><u><b>Cuisine:</b></u> {this.state.chosenRestaurant.cuisine}</h4>
                                </div>
                                <p className="chosen-restaurant-user-date">This restaurant was added by {this.state.chosenRestaurant.addedBy} on {moment(this.state.chosenRestaurant.addedOn).format('MMMM Do YYYY')}.</p>
                                <button type="button" className="btn btn-dark" onClick={this.handleDone}>
                                    <span className="glyphicon glyphicon-ok"></span>
                                    Done
                                </button>
                            </div>     
                        : null }

                    <button type="button" className="btn btn-success" onClick={this.handleRandom}>Pick a Random Restaurant</button>
                </div>
            </div>
        );
    }
}

export default PickRestaurant;