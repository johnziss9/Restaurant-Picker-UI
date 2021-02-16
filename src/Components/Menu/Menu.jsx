import React from 'react';

class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: ''
        }

        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        fetch("https://localhost:5001/restaurant/GetAll")
        .then(response => response.json())
        .then (data => {
            this.setState({ 
                restaurants: data 
            });
        });
    }


    handleLogout() {
        localStorage.clear();
        this.props.history.push("/");
    }

    render() {        
        return (
            <div className="container">
                <h3>Hello sir</h3>
                <button type="button" className="btn btn-link" onClick={this.handleLogout}>
                    <span>(Logout)</span>
                </button>
            </div>
        );
    }
}

export default Menu;