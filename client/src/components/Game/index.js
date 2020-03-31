import axios from 'axios';
import React from 'react';
import {Gauges} from './Gauges'; // Game Gauge >:)
import {Spinner} from '../Partials/Spinner';
import {ErrorPage} from '../Partials/Error';
import {Alert} from '../Partials/Alert';
import './index.css';


export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: {
                gameData: true,
                gameScore: true,
            },
            gameID: 0,
            gameData: {},
            error: {},
            alert: {},

            // favorite data
            favorite: false,
            favStyle: {
                class: 'btn btn-danger',
                text: 'Favorites'
            },
            favCount: 0,

            // Comment data
            comments: [],
            commentBody: '',
            commentAlert: {},

            // Game score data
            gameScore: {},
            scoreAlert: {},
            r1: 0, // r1-r5 is what gets submitted
            r2: 0,
            r3: 0,
            r4: 0,
            r5: 0,
        };
    }

    componentDidMount() {
        const id = this.props.match.params.g;
        this.setState({
            gameID: id
        });
        this.getGameScore(id);
        this.gameData(id);
        this.isFavorite(id);
        this.favCount(id);
        this.getComments(id);
    }

    gameData = (gid) => {
        // Retrieve GameData
        axios.request({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URI}/game/getgame/${gid}`
        })
        .then(result => {
            this.setState({
                gameData: result.data,
                loading: {
                    gameData: false
                }
            });
        })
        .catch(err => {
            this.setState({
                error: err
            });
        });
    }

    // Update favorite and styles
    updateFavorite = (gid) => {
        axios.request({
            method: 'POST',
            url: `${process.env.REACT_APP_API_URI}/game/updateFavorite/${gid}`
        })
        .then(result => {
            if (result.data.success === 'add') {
                this.favCount(gid);
                this.setState({
                    favorite: true,
                    favStyle: {
                        text: `Favorited!`,
                        class: 'btn btn-secondary'
                    }
                });
            } else if (result.data.success === 'remove') {
                this.favCount(gid);
                this.setState({
                    favorite: false,
                    favStyle: {
                        text: `${this.state.favCount} Favorites`,
                        class: 'btn btn-danger'
                    }
                });
            } else {
                this.setState({
                    alert: {
                        type: 'danger',
                        message: 'Must be logged in to favorite'
                    }
                })
            }
        })
        .catch(err => {
            console.log(err);
            this.setState({
                alert: {
                    type: 'danger',
                    message: 'An unknown error has occurred'
                }
            });
        });
    }

    // Update favorite count
    favCount = (gid) => {
        axios.request({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URI}/game/favCount/${gid}`
        })
        .then(result => {
            this.setState({
                favCount: result.data.favCount,
            });
        })
        .catch(err => {
            this.setState({
                alert: {
                    type: 'danger',
                    message: 'An unknown error has occurred'
                }
            });
        });
    }

    // Update favorite state
    isFavorite = (gid) => {
        axios.request({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URI}/game/isFavorite/${gid}`
        })
        .then(result => {
            if (result.data.isFavorite) {
                this.setState({
                    favorite: true,
                    favStyle: {
                        class: 'btn btn-secondary',
                        text: 'Favorited!'
                    }
                });
            } else {
                this.setState({
                    favorite: false,
                    favStyle: {
                        text: `${this.state.favCount} Favorites`,
                        class: 'btn btn-danger'
                    }
                });
            }
        })
        .catch(err => {
            this.setState({
                alert: {
                    type: 'danger',
                    message: 'An unknown error has occurred'
                }
            });
        });
    }

    // Get comments
    getComments = (gid) => {
        axios.request({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URI}/game/getComments/${gid}`
        })
        .then(res => {
            if (res.data.length > 0) {
                this.setState({
                    comments: res.data
                })
            }
        }).catch(err => {
            console.error(err);
        });
    }

    // Post comment
    postComment = () => {
        axios.request({
            method: 'POST',
            url: `${process.env.REACT_APP_API_URI}/game/postComment`,
            data: {
                gameID: this.state.gameID,
                comment: this.state.commentBody.replace(/'/g, "\\'")
            }
        })
        .then(res => {
            if (res.data.success) {
                this.setState({
                    commentAlert: {
                        type: 'success',
                        message: res.data.success
                    },
                    commentBody: ''
                });
                this.getComments(this.state.gameID);
            } else if (res.data.error) {
                this.setState({
                    commentAlert: {
                        type: 'danger',
                        message: res.data.error
                    }
                });
            } else {}
        }).catch(err => {
            console.log(err);
            this.setState({
                commentAlert: {
                    type: 'danger',
                    message: 'An unknown error has occurred'
                }
            });
        })
    }

    // Get Game Aggregate Score
    getGameScore = (gid) => {
        axios.request({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URI}/score/getGameScore/${gid}`
        })
        .then(res => {
            this.setState({
                gameScore: res.data,
                loading: {
                    gameScore: false
                }
            });
        }).catch(err => {
            console.log(err);
            this.setState({
                alert: {
                    type: 'danger',
                    message: 'An unknown error has occurred'
                }
            })
        });
    }

    postGameScore = () => {
        const data = {
            r1: this.state.r1,
            r2: this.state.r2,
            r3: this.state.r3,
            r4: this.state.r4,
            r5: this.state.r5,
            gameID: this.state.gameID
        }
        axios.request({
            method: 'POST',
            url: `${process.env.REACT_APP_API_URI}/score/postGameScore`,
            data: data
        })
        .then(res => {
            if (res.data.success) {
                this.setState({
                    scoreAlert: {
                        type: 'success',
                        message: res.data.success
                    }
                });
                this.getGameScore(this.state.gameID);
            } else if (res.data.error) {
                this.setState({
                    scoreAlert: {
                        type: 'danger',
                        message: res.data.error
                    }
                });
            } else {
                this.setState({
                    scoreAlert: {
                        type: 'danger',
                        message: 'Unknown error has occurred. Please contact system administrator.'
                    }
                });
            }
            
        }).catch(err => {
            console.log(err);
        });
    }

    handleChange = (e) => {
        const val = e.target.value;
        const name = e.target.name;
        if (name === 'commentBody') {
            this.setState({
                commentBody: val
            });
        } else if (name === 'r1') {
            this.setState({
                r1: val
            });
        } else if (name === 'r2') {
            this.setState({
                r2: val
            });
        } else if (name === 'r3') {
            this.setState({
                r3: val
            });
        } else if (name === 'r4') {
            this.setState({
                r4: val
            });
        } else if (name === 'r5') {
            this.setState({
                r5: val
            });
        } else {
            this.setState({
                commentBody: val
            });
        }
    }

    render() {
        const colors = {
            c1: "#f7bd00",
            c2: "#0099f7",
            c3: "#ae00ff",
            c4: "#db2100",
            c5: "#11c24c",
        }

        let result;
        if (this.state.loading.gameData || this.state.loading.gameScore) {
            result = <Spinner />;
        }
        else {
            result = (!this.state.gameData.title) ? <ErrorPage status="404" message="We could not find that game."/> : (
                <div id="top">
                    <div style={{
                        backgroundImage: 'url(' + this.state.gameData.bg_img_details + ')',
                        backgroundRepeat: "no-repeat",
                        backgroundAttachment: "fixed",
                        backgroundSize: "cover"
                        }}>
                        <div className="container detail-card"><br/>
                            <Alert type={this.state.alert.type} message={this.state.alert.message}/>
                            <div className="row">
                                <div className="col-xl-3 col-lg-4 col-4">
                                    {/* THUMBNAIL */}
                                    <img className="trailer-img" src={this.state.gameData.cover_details} />
                                </div>
                                <div className="col-xl-9 col-lg-8 col-8">
                                    <h1 className="game-title">{this.state.gameData.title}</h1>
                                    
                                    {/* FAVORITE */}
                                    <button onClick={() => this.updateFavorite(this.state.gameID)} className={this.state.favStyle.class} style={{borderRadius: "20px"}}>
                                        <i className="fa fa-heart"></i> <span className="d-none d-md-inline">{this.state.favStyle.text}</span>
                                    </button>

                                    {/* Watch Trailer */}
                                    <a className="btn btn-primary" style={{borderRadius: "20px", marginLeft: "5px", color: "white"}} target="_blank" href={this.state.gameData.trailer_details}>
                                        <i className="fa fa-film"></i> <span className="d-none d-sm-inline">Trailer</span>
                                    </a>
                                    {/* Read More */}
                                    <a className="btn btn-success" style={{borderRadius: "20px", margin: "2px 0 0 5px", color: "white"}} target="_blank" href={this.state.gameData.url_details}>
                                        <i className="fa fa-info-circle"></i> <span className="d-none d-sm-inline">More Info</span>
                                    </a>

                    
                                    {/* DETAILS */}
                                    {/* DESKTOP */}
                                    <div className="d-none d-md-block">
                                        <Details
                                            gameData={this.state.gameData}
                                        />
                                        <div className="details-summary">
                                            <p>{this.state.gameData.summary_details}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* DETAILS */}
                            {/* MOBILE */}
                            <div className="container row d-block d-md-none"><br/>
                                <Gauges 
                                    r1={this.state.gameScore.r1}
                                    r2={this.state.gameScore.r2}
                                    r3={this.state.gameScore.r3}
                                    r4={this.state.gameScore.r4}
                                    r5={this.state.gameScore.r5}
                                />
                                <ul className="nav nav-tabs">
                                    <li className="nav-item">
                                        <a className="nav-link active" data-toggle="tab" href="#deet">Details</a>
                                    </li>    
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#summ">Summary</a>
                                    </li>
                                </ul>
                                <div className="tab-content clearfix">
                                    <div id="deet" className="tab-pane active">
                                        <Details
                                            gameData={this.state.gameData}
                                        />
                                    </div>
                                    <div id="summ" className="tab-pane">
                                        <div className="details-summary">
                                            <p>{this.state.gameData.summary_details}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br/>
                        </div>
                    </div>
                    
                    <div className="container">
                        <span className="d-md-inline d-none">
                            <Gauges 
                                r1={this.state.gameScore.r1}
                                r2={this.state.gameScore.r2}
                                r3={this.state.gameScore.r3}
                                r4={this.state.gameScore.r4}
                                r5={this.state.gameScore.r5}
                            />
                        </span>
                        <div style={{textAlign: "center"}}>
                            <button data-toggle="modal" data-target="#submitScoreModal" className="btn btn-success rating-button btn-lg">Leave a Score!</button><br/>
                            <p style={{color: "gray", fontStyle:"italic"}}>{this.state.gameScore.users} users</p>
                        </div><br/>
                    
                        <h1>Comments</h1>
                        <hr style={{background:"white"}} />
                        <Alert type={this.state.commentAlert.type} message={this.state.commentAlert.message} />
                        <div className="form-group">
                            <textarea onChange={this.handleChange} value={this.state.commentBody} name="commentBody" className="form-control" placeholder="Enter comment here..."></textarea><br />
                            <input onClick={this.postComment} className="btn btn-success" type="submit" />
                        </div>
                        <br/>
                        
                        {this.state.comments.map((d, idx) => {
                            return (
                                <div className="card" style={{marginBottom: "10px"}}>
                                    <div className="card-body">
                                        <h4>{d.username}</h4>
                                        <p>{d.text}</p>
                                        <span style={{color: "gray"}}>
                                            {(new Date(d.time)).toLocaleDateString()} - 
                                            {(new Date(d.time)).toLocaleTimeString()}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Submit Score Modal */}
                    <div id="submitScoreModal" className="modal fade" tabindex="-1" role="dialog" aria-labelledby="submitScoreModal" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Rate this game!</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body slidecontainer">
                                    <Alert type={this.state.scoreAlert.type} message={this.state.scoreAlert.message} />
                                    <h4 style={{color: colors.c1}}><i class="fa fa-book"></i> Story: {this.state.r1}%</h4>
                                    <input class="slider" style={{background: colors.c1}} name="r1" type="range" min="1" max="100" onChange={this.handleChange} value={this.state.r1}/>
                                    <h4 style={{color: colors.c2}}><i class="fa fa-gamepad"></i> Gameplay: {this.state.r2}%</h4>
                                    <input class="slider" style={{background: colors.c2}} name="r2" type="range" min="1" max="100" onChange={this.handleChange} value={this.state.r2}/>
                                    <h4 style={{color: colors.c3}}><i class="fa fa-paint-brush"></i> Art/Music: {this.state.r3}%</h4>
                                    <input class="slider" style={{background: colors.c3}} name="r3" type="range" min="1" max="100" onChange={this.handleChange} value={this.state.r3}/>
                                    <h4 style={{color: colors.c4}}><i class="fa fa-bolt"></i> Difficulty: {this.state.r4}%</h4>
                                    <input class="slider" style={{background: colors.c4}} name="r4" type="range" min="1" max="100" onChange={this.handleChange} value={this.state.r4}/>
                                    <h4 style={{color: colors.c5}}><i class="fa fa-money"></i> Worth it? {this.state.r5}%</h4>
                                    <input class="slider" style={{background: colors.c5}} name="r5" type="range" min="1" max="100" onChange={this.handleChange} value={this.state.r5}/>
                                    <button onClick={this.postGameScore} className="btn btn-success">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return result;
    }
}

// Details Component
class Details extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const dateOld = this.props.gameData.dor_details.substring(0,10);
        const m = parseInt(dateOld.substring(5,7));
        const d = parseInt(dateOld.substring(8,10));
        const y = dateOld.substring(0,4);
        const dateNew = m + '/' + d + '/' + y; 
        return (
            <div className="quick-deets">
                <h5>Released: <span className="detail-card-info">{dateNew}</span></h5>
                <h5>Developer(s): <span className="detail-card-info">{this.props.gameData.developers.join(', ')}</span></h5>
                <h5>Publisher(s): <span className="detail-card-info">{this.props.gameData.publishers.join(', ')}</span></h5>
                <h5>Platform(s): <span className="detail-card-info">{this.props.gameData.platforms.join(', ')}</span></h5>
                <h5>Genre(s): <span className="detail-card-info">{this.props.gameData.genre.join(', ')}</span></h5>
            </div>
        );
    }
}
