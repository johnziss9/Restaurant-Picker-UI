 import React from 'react';
 import './Home.css';

 class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isActive: true,
            username: '',
            password: ''
        }

        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
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

    handleUsername(event) {
        this.setState({ username: event.target.value })
    }

    handlePassword(event) {
        this.setState({ password: event.target.value })
    }

    handleLogin(event) {
        fetch('https://localhost:5001/auth/Login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
        .then((Response) => Response.json())
        .then((result) => {
            console.log(result);
        })
    }

     render() {
         return (
            <div className="home-container">
                {this.state.isActive ?
                <button type="button" className="btn btn-dark btn-lg login-btn" onClick={this.handleHide}>Login</button> :
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control" id="username" placeholder="Username" onChange={this.handleUsername} />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="password" placeholder="Password" onChange={this.handlePassword}/>
                    </div>
                    <div className="form-group">
                        <button type="button" className="btn btn-light login-form-btn" onClick={this.handleShow}>Cancel</button>
                        <button type="button" className="btn btn-dark login-form-btn" onClick={this.handleLogin}>Login</button>
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