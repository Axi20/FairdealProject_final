import React, { useState } from 'react'
import { Nav } from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import { addUserData } from '../redux/userData';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function Navigation() {
    const isLoggedIn = useSelector(state => state.userData.userData.IsLoggedIn);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(addUserData());
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem("jwt");
            localStorage.removeItem("ID");
        };

    return (
        <div>
            <nav className="navbar navbar-expand-sm fixed-top">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="collapsibleNavbar">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                            <a className="nav-link" href="/">Főoldal</a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link" href="/contact">Kapcsolat</a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link" href="/about">Rólunk</a>
                            </li>   
                            <li className="nav-item">
                            <a className="nav-link" href="/cars">Autóink</a>
                            </li>     
                            {isLoggedIn ? (
                                    <Nav.Link className='nav-link' eventKey="2" onClick={() => logout()}>Kijelentkezés</Nav.Link>
                                ) : (
                                    <Nav.Link className='nav-link' eventKey="2"  href='/login'>Bejelentkezés</Nav.Link>
                                )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navigation;