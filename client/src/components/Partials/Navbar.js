import React from 'react';
import axios from 'axios';

export class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: undefined
        }
    }

    componentWillMount() {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/getSession`)
            .then(result => {
                this.setState({
                    username: result.data.username,
                });
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <div className="container-fluid inline-block">
                        <a className="navbar-brand" href="/">
                            <h3 style={{margin: 0}}>
                                <img className="d-inline-block align-top" src="/img/gg-logo-long.png" height="40" style={{padding: 0, margin: 0}}/>
                            </h3>
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse nav-item" id="navbarToggler">
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                <li>
                                    <form className="form-inline" action="/search" method="get">
                                        <div className="input-group" role="group">
                                            <input name="s" className="form-control" style={{borderTopLeftRadius: "20px", borderBottomLeftRadius: "20px"}} type="search" placeholder="Search" aria-label="Search" />
                                            <div className="input-group-append">
                                                <button className="gg-item btn btn-outline-light" style={{borderTopRightRadius: "20px", borderBottomRightRadius: "20px"}} type="submit"><i className="fa fa-search"></i></button>
                                            </div>
                                        </div>
                                    </form>
                                </li>
                            </ul>
                            <TopRightIcon username={this.state.username} />
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

class TopRightIcon extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.username) {
            return (
                <a className="gg-item nav-item btn btn-outline-light" style={{marginTop: "2px", borderRadius: "20px"}} href="/dashboard">
                    <i className="fa fa-gamepad"></i> {this.props.username}
                </a>
            );
        }
        return (
            <a className="nav-item btn btn-outline-light" style={{marginTop: "2px", borderRadius: "20px"}} href="/login">
                <i className="fa fa-user"></i> Login
            </a>
        );
    }
}