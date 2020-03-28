import axios from 'axios';
import React from 'react';
import {Alert} from '../Partials/Alert';
import queryString from 'query-string';
import './index.css';

import {GameIcon} from './GameIcon';

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
            username: 'USER'
        };
    }

    componentWillMount() {
        this.getUsername();
        this.getFavList();
    }

    getUsername() {
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

    getFavList() {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/user/getUserFavorites`)
            .then(result => {
                if (result.data) {
                    this.setState({
                        favList: result.data,
                    });
                } else {
                    this.setState({
                        favList: [],
                    });
                }
            })
            .catch(err => {
                this.setState({
                    favList: [],
                });
            });
    }

    render() {
        let favList;
        if (this.state.favList.length === 0) {
            favList = <h5>No favorites :(</h5>
        } else {
            favList = (
                <div id="gamecards" className="card-deck">
                    {this.state.favList.map((d, idx) => {
                        return (<GameIcon title={d.title} gameurl={`${process.env.REACT_APP_BASE_URL}/game/${d.gameID}`} imgurl={d.cover_details} />);
                    })}
                </div>
            );
        }

        return (
            <div className="container"><br/>
                <Alerts query={queryString.parse(this.props.location.search)}/>
                <h1>Hi, {this.state.username}! </h1>
                <div className="col-12">
                    <div className="d-inline-flex">
                        <button className="btn btn-success" style={{marginRight: "10px"}} data-toggle="modal" data-target="#updateUserModal">
                            Update Username
                        </button>
                        <form action={`${process.env.REACT_APP_BASE_URL}/user/logout`} method="post">
                            <input className="btn btn-warning" type="submit" value="Sign Out" />
                        </form>
                    </div>
                </div><br/>
                <h2>Favorites ❤️</h2>
                {favList}
                
                <div id="updateUserModal" className="modal fade" tabindex="-1" role="dialog" aria-labelledby="updateUserModal" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update Username</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form className="btn-group" action={`${process.env.REACT_APP_BASE_URL}/user/updateUsername`} method="post">
                                    <input className="form-control" type="text" name="username" placeholder="New Username"/>
                                    <input className="btn btn-success" type="submit" value="Submit"/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}