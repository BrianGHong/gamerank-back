import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


export class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            icon: {
                class: 'nav-item btn btn-outline-light',
                link: '/login',
                text: 'Login'
            },
            searchTerm: '',
            goToSearchPage: false
        };
    }
    
    componentDidMount() {
        axios.request({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + '/getSession',
            data: {}
        })
        .then(result => {
            if (result.data.username) {
                this.setState({
                    icon: {
                        class: 'gg-item nav-item btn btn-outline-light',
                        link: '/dashboard',
                        text: result.data.username
                    }
                });
            } else {
                this.setState({
                    icon: {
                        class: 'nav-item btn btn-outline-light',
                        link: '/login',
                        text: 'Login'
                    }
                });
            }
        })
        .catch(err => {
            console.error(err);
        });
    }

    handleChange = (e) => {
        const val = e.target.value;
        const name = e.target.name;
        if (name === 's') {
            this.setState({
                searchTerm: val == '' ? 'all' : val
            });
        }
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
                                    <form action="/search" method="get" className="form-inline input-group" role="group">
                                        <input name="s" onChange={this.handleChange} value={this.state.searchTerm} className="form-control" style={{borderTopLeftRadius: "20px", borderBottomLeftRadius: "20px"}} type="search" placeholder="Search" aria-label="Search" />
                                        <div className="input-group-append">
                                            <button className="gg-item btn btn-outline-light" style={{borderTopRightRadius: "20px", borderBottomRightRadius: "20px"}} type="submit"><i className="fa fa-search"></i></button>
                                        </div>
                                    </form>
                                </li>
                            </ul>
                            <Link className={this.state.icon.class} style={{marginTop: "2px", borderRadius: "20px"}} to={this.state.icon.link}>
                                <i className="fa fa-gamepad"></i> {this.state.icon.text}
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}
