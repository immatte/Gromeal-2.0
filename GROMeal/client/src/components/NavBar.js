import React from 'react';
import { NavLink, Link } from 'react-router-dom';


function NavBar(props) {
    return (
        <nav className="Navbar navbar navbar-expand-sm navbar-dark">
            <div className="container-fluid col-11">
                <span className="navbar-brand font-weight-bold">
                    <Link to="/" style={{ color: '#FF5733', fontWeight: '800', fontFamily:'Segoe UI', fontSize: 'x-large'}} className="nav-link">GROMeal</Link>
                    </span>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Right-aligned stuff, based on whether user is logged in */}
                {
                    props.user
                        ?   
                            (
                                <ul className="navbar-nav">
                                    {/* <li className="nav-item">
                                        <NavLink className="nav-link" style={{ color: '#FF5733', fontWeight: 'bold'}} to={`/users/${props.user.id}`}>My Profile ({props.user.username})</NavLink>
                                    </li> */}
                                    {/* I NEED THAT WITH THE CODE BELOW IT GOES TO THE USER OLD PLANS */}
                                    <li className="nav-item"> 
                                        <NavLink className="nav-link" style={{ color: '#FF5733', fontWeight: 'bold'}} to={`/plans/${props.user.id}`}>All My Plans ({props.user.username})</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        {/* Log out user. Then go to home page. */}
                                        <Link className="nav-link" style={{ color: '#FF5733', fontWeight: 'bold'}} to="/" onClick={props.logoutCb}>Logout</Link>
                                    </li>
                                </ul>
                            )
                        :
                            (
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <NavLink className="nav-link" style={{ color: '#FF5733', fontWeight: 'bold'}} to="/login">Login</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" style={{ color: '#FF5733', fontWeight: 'bold'}} to="/register">Register</NavLink>
                                    </li>
                                </ul>
                                
                            )
                }
            </div>
        </nav>
    );
}

export default NavBar;