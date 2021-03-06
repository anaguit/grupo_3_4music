import React from 'react';
import './app.css';
import { Link, Route, Switch } from 'react-router-dom';

//import { useState, useEffect, useRef } from 'react';

function BarraSuperior() {
    return (

        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                <i className="fa fa-bars"></i>
            </button>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown no-arrow mx-1">
                    <a className="nav-link dropdown-toggle" href="/" id="alertsDropdown">
                    <i className="fas fa-bell fa-fw"></i>
                    
                    <span className="badge badge-danger badge-counter">3+</span>
                    </a>
                </li>

                <li className="nav-item dropdown no-arrow mx-1">
                    <a className="nav-link dropdown-toggle" href="/" id="messagesDropdown">
                    <i className="fas fa-envelope fa-fw"></i>
                    
                    <span className="badge badge-danger badge-counter">7</span>
                    </a>
                </li>

                <div className="topbar-divider d-none d-sm-block"></div>

                
                <li className="nav-item dropdown no-arrow">
                    <Link to="/http://localhost:3000/users/profile" className="nav-link dropdown-toggle" href="/" id="userDropdown">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">Usuario Administrador</span>
                    </Link>
                    <Route path='/http://localhost:3000/users/profile' component={() => { 
                        window.location.href = 'http://localhost:3000/users/profile'; 
                        return null;
                    }}/>
                
                </li>

            </ul>

        </nav>
    );
}
    
export default BarraSuperior;