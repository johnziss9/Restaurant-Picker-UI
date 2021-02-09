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
                        <button type="button" className="btn btn-danger login-form-btn" onClick={this.handleShow}>Cancel</button>
                        <button type="button" className="btn btn-success login-form-btn">Login</button>
                    </div>
                </form> 
                
                }
            </div>
         );
     }
 }

 export default Home;