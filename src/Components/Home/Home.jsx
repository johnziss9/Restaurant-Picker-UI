 import React from 'react';
 import './Home.css';

 class Home extends React.Component {
     render() {
         return (
            <div className="home-container">
                {/* BUTTON/LOG IN GOES HERE AS COMPONENT */}
                <button type="button" class="btn btn-dark btn-lg login">Login</button>
            </div>
         );
     }
 }

 export default Home;