import React from 'react';
import {Link} from 'react-router-dom';

export class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <div className="container-fluid inline-block">
                        <Link className="navbar-brand" to="/">
                            <h3 style={{margin: 0}}>
                                <img className="d-inline-block align-top" src="/img/gg-logo-long.png" height="40" style={{padding: 0, margin: 0}}/>
                            </h3>
                        </Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse nav-item" id="navbarToggler">
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                <li>
                                    <form className="form-inline" action="/search">
                                        <div className="input-group" role="group">
                                            <input name="s" className="form-control" style={{borderTopLeftRadius: "20px", borderBottomLeftRadius: "20px"}} type="search" placeholder="Search" aria-label="Search" />
                                            <div className="input-group-append">
                                                <button className="gg-item btn btn-outline-light" style={{borderTopRightRadius: "20px", borderBottomRightRadius: "20px"}} type="submit"><i className="fa fa-search"></i></button>
                                            </div>
                                        </div>
                                    </form>
                                </li>
                            </ul>
                            <Link className="gg-item nav-item btn btn-outline-light" style={{marginTop: "2px", borderRadius: "20px"}} to="/user">
                                <i className="fa fa-user"></i> Login
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}
