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

                <ul class="nav flex-column">
                    <li class="nav-item">
                        <NavLink tag={Link} to="/Blog">Add Restaurant</NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink tag={Link} to="/ViewRestaurants">View Restaurants</NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink tag={Link} to="/PickRestaurant">Pick Restaurant</NavLink>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Menu;