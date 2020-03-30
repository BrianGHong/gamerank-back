import axios from 'axios';
import React from 'react';
import queryString from 'query-string';
import './index.css';

import {GameIcon} from './GameIcon';
import {Alert} from '../Partials/Alert';
import {Spinner} from '../Partials/Spinner';

class Alerts extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const error = this.props.query["error"];
        const success = this.props.query["success"];
        
        if (success) {
            return <Alert type="success" message={success} />;
        } 
        if (error) {
            return <Alert type="danger" message={error}/>;
        }
        return <span></span>;
    }
}

export class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favList: [],
            username: '',
            update: {
                username: ''
            },
            alert: {},
            modalAlert: {},
            isLoading: {
                username: true,
                favList: true
            }
        };
    }

    componentDidMount() {
        this.getUsername();
        this.getFavList();
    }

    getUsername = () => {
        axios.request({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + '/getSession',
            data: {}
        })
        .then(result => {
            this.setState({
                username: result.data.username,
                isLoading: {
                    username: false,
                }
            });
        })
        .catch(err => {
            this.setState({
                username: '',
            })
            console.error(err);
        });
    }

    getFavList = () => {
        axios.request({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + '/user/getUserFavorites',
            data: {}
        })
        .then(result => {
            if (result.data) {
                this.setState({
                    favList: result.data,
                    isLoading: {
                        favList: false
                    }
                });
            } else {
                this.setState({
                    favList: []
                });
            }
        })
        .catch(err => {
            this.setState({
                favList: [],
            });
        });
    }

    // POST: update user's username
    updateUsername = () => {
        const data = {
            newUsername: this.state.update.username
        };

        axios.request({
            method: 'POST',
            url: process.env.REACT_APP_API_URI + '/user/updateUsername',
            data: data
        })
        .then(res => {
            if (res.data.success) {
                this.setState({
                    modalAlert: {
                        type: 'success',
                        message: 'Username changed successfully!'
                    }
                });
                window.location.replace('/dashboard');
            } else if (res.data.error) {
                this.setState({
                    modalAlert: {
                        type: 'danger',
                        message: res.data.error
                    }
                });
            } else {
                this.setState({
                    modalAlert: {
                        type: 'danger',
                        message: 'Unknown error has occurred. Please contact administrator'
                    }
                });
            }   
        }).catch(err => {
            console.error(err);
            this.setState({
                modalAlert: {
                    type: 'danger',
                    message: 'Unknown error has occurred. Please contact administrator'
                }
            });
        });
    }

    // Update state whenever input is changed
    handleChange = (e) => {
        const val = e.target.value;
        const name = e.target.name;
        if (name == 'changeUsername') {
            this.setState({
                update: {
                    username: val
                }
            });
        }
    }

    render() {
        // Render User Favorites
        let favList;
        if (this.state.favList.length === 0) {
            favList = <h5>No favorites :(</h5>
        } else {
            favList = (
                <div id="gamecards" style={{display: 'flex', flexFlow: 'row wrap'}}>
                    {this.state.favList.map((d, idx) => {
                        return (<GameIcon title={d.title} gameurl={`/game/${d.gameID}`} imgurl={d.cover_details} />);
                    })}
                </div>
            );
        }

        let data;
        if (!this.state.isLoading.username && !this.state.isLoading.favList) {
            data = (
                <div className="container">
                    <Alert type={this.state.alert.type} message={this.state.alert.message} />
                    <h1>Hi, {this.state.username}! </h1>
                    <div className="col-12">
                        <div className="d-inline-flex">
                            <button className="btn btn-success" style={{marginRight: "10px"}} data-toggle="modal" data-target="#updateUserModal">
                                Update Username
                            </button>
                            <button className="btn btn-danger" style={{marginRight: "10px"}} data-toggle="modal" data-target="#logoutUserModal">
                                Logout
                            </button>
                        </div>
                    </div><br/>
                    <h2>Favorites ❤️</h2>
                    {favList}
                    
                    {/* Update username modal */}
                    <div id="updateUserModal" className="modal fade" tabindex="-1" role="dialog" aria-labelledby="updateUserModal" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <Alert type={this.state.modalAlert.type} message={this.state.modalAlert.message} />
                                <div className="modal-header">
                                    <h5 className="modal-title">Update Username</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body btn-group">
                                    <input onChange={this.handleChange} value={this.state.update.username} className="form-control" type="text" name="changeUsername" placeholder="New Username"/>
                                    <button onClick={this.updateUsername} className="btn btn-success">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    {/* Logout user modal */}
                    <div id="logoutUserModal" className="modal fade" tabindex="-1" role="dialog" aria-labelledby="logoutUserModal" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Are you sure you want to logout?</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body btn-group">
                                    <form action="http://localhost:8000/user/logout" method="post">
                                        <input className="btn btn-danger" type="submit" value="Logout" style={{marginRight: "4px"}}/>
                                        <button type="button" className="btn btn-primary" data-dismiss="modal" aria-label="Close">Nevermind</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            data = (<Spinner/>);
        }

        return data;
    }
}
