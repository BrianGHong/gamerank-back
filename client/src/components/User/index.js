import axios from 'axios';
import React from 'react';
import './index.css';

import {GameIcon} from './GameIcon';


export class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favList: [],
            username: ''
        };
    }

    componentDidMount() {
        this.getUsername();
        this.getFavList();
    }

    getUsername() {
        axios.request({
            method: 'GET',
            url: 'http://localhost:8000/getSession',
            data: {}
        })
        .then(result => {
            this.setState({
                username: result.data.username
            });
        })
        .catch(err => {
            this.setState({
                username: ''
            })
            console.error(err);
        });
    }

    getFavList() {
        axios.request({
            method: 'GET',
            url: 'http://localhost:8000/user/getUserFavorites',
            data: {}
        })
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
        // Redirect user to login page if not logged in
        // if (this.state.username == '') {
        //     return <Redirect to='/login' />;
        // }

        // Render User Favorites
        let favList;
        if (this.state.favList.length === 0) {
            favList = <h5>No favorites :(</h5>
        } else {
            favList = (
                <div id="gamecards" className="card-deck">
                    {this.state.favList.map((d, idx) => {
                        return (<GameIcon title={d.title} gameurl={`http://localhost:8000/game/${d.gameID}`} imgurl={d.cover_details} />);
                    })}
                </div>
            );
        }

        return (
            <div className="container"><br/>
                <h1>Hi, {this.state.username}! </h1>
                <div className="col-12">
                    <div className="d-inline-flex">
                        <button className="btn btn-success" style={{marginRight: "10px"}} data-toggle="modal" data-target="#updateUserModal">
                            Update Username
                        </button>
                        <form action={`/user/logout`} method="post">
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
                                <form className="btn-group" action={`/user/updateUsername`} method="post">
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