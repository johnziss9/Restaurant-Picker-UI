import React from 'react';
import './Menu.css';
import { Link } from 'react-router-dom';
import { NavLink } from 'reactstrap';

class Menu extends React.Component {

    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        localStorage.clear();
        this.props.history.push("/");
    }

    render() {
        return (
            <div className="menu-container">
                {/* <h3>Hello sir</h3>
                <button type="button" className="btn btn-link" onClick={this.handleLogout}>
                    <span>(Logout)</span>
                </button> */}

                <ul className="nav menu-nav flex-column">
                    <li className="nav-item">
                        <NavLink className="menu-nav-link" tag={Link} to="/AddRestaurant">Add Restaurant</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="menu-nav-link" tag={Link} to="/ViewRestaurants">View Restaurants</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="menu-nav-link" tag={Link} to="/PickRestaurant">Pick Restaurant</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="menu-nav-link" onClick={this.handleLogout} tag={Link} to="/">Log Out</NavLink>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Menu;