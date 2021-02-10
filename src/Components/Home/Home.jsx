 import React from 'react';
 import './Home.css';

 class Home extends React.Component {

    state = {
        isActive: true
    }

    handleShow = () => {
        this.setState({
            isActive: true        
        })
    }

    handleHide = () => {
        this.setState({
            isActive: false
        })
    }

     render() {
         return (
            <div className="home-container">
                {this.state.isActive ?
                <button type="button" className="btn btn-dark btn-lg login-btn" onClick={this.handleHide}>Login</button> :
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control" id="username" placeholder="Username" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="password" placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <button type="button" className="btn btn-light login-form-btn" onClick={this.handleShow}>Cancel</button>
                        <button type="button" className="btn btn-dark login-form-btn">Login</button>
                    </div>
                </form> }

                {/* <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Add Restaurant</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">View Restaurants</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Pick Restaurant</a>
                    </li>
                </ul> */}

            </div>
         );
     }
 }

 export default Home;