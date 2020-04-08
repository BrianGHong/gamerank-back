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
            currentFilter: '',
            goToSearchPage: false
        };
    }
    
    componentDidMount() {
        axios.request({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + '/getSession'
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

    conductSearch = (e) => {
        e.preventDefault();

        const s = this.state.searchTerm;
        const f = this.state.currentFilter;
        const {doSearch} = this.props;
        doSearch(s,f);
    }

    handleChange = (e) => {
        const val = e.target.value;
        const name = e.target.name;
        if (name === 's') {
            this.setState({
                searchTerm: val
            });
        }
    }

    handleFilterChange = (e) => {
        this.setState({
            currentFilter: e.target.value
        });
    }

    render() {
        let toRender = (
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
                                    <div className="form-inline input-group" role="group">
                                        <input name="s" onChange={this.handleChange} value={this.state.searchTerm} className="form-control" style={{borderTopLeftRadius: "20px", borderBottomLeftRadius: "20px"}} type="search" placeholder="Search" aria-label="Search" />
                                        <input hidden name="f" value={this.state.currentFilter} onChange={this.handleFilterChange}/>
                                        <div className="input-group-append">
                                            <button className="gg-item btn btn-outline-light" style={{}} type="button" data-toggle="modal" data-target="#filterModal"><i className="fa fa-list"></i></button>
                                            <button type="submit" onClick={this.conductSearch} className="gg-item btn btn-outline-light" style={{borderTopRightRadius: "20px", borderBottomRightRadius: "20px"}}><i className="fa fa-search"></i></button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <Link className={this.state.icon.class} style={{marginTop: "2px", borderRadius: "20px"}} to={this.state.icon.link}>
                                <i className="fa fa-gamepad"></i> {this.state.icon.text}
                            </Link>
                        </div>
                    </div>
                </nav>
                {/* Filter Modal */}
                <div className="modal fade" id="filterModal" tabIndex="-1" role="dialog" aria-labelledby="filterModal" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title" id="filterModal">Search by</h3>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" value="title" 
                                        checked={this.state.currentFilter === 'title'}
                                        onChange={this.handleFilterChange}/>
                                    <label className="form-check-label">Title</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" value="genre" 
                                        checked={this.state.currentFilter === 'genre'}
                                        onChange={this.handleFilterChange}/>
                                    <label className="form-check-label">Genre</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" value="company" 
                                        checked={this.state.currentFilter === 'company'}
                                        onChange={this.handleFilterChange}/>
                                    <label className="form-check-label">Company</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        return toRender;
    }
}
