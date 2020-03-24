import axios from 'axios';
import React from 'react';
import {Gauges} from './Gauges'; // Game Gauge >:)
import {Spinner} from '../Partials/Spinner';
import {ErrorPage} from '../Partials/Error';

import './index.css';


export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            gameData: {},
            error: {}
        };
    }

    componentDidMount() {
        const id = this.props.match.params.g;
        this.gameData(id)
    }

    gameData(gid) {
        // Retrieve GameData
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/game/getgame/${gid}`)
            .then(result => {
                this.setState({
                    gameData: result.data,
                    loading: false
                });
            })
            .catch(err => {
                this.setState({
                    error: err
                });
            });
    }

    render() {
        let result;
        if (this.state.loading) {
            result = <Spinner />;
        }
        else {
            result = (!this.state.gameData.title) ? <ErrorPage status="404" message="We could not find that game."/> : (
                <div>
                    <div style={{
                        backgroundImage: 'url(' + this.state.gameData.bg_img_details + ')',
                        backgroundRepeat: "no-repeat",
                        backgroundAttachment: "fixed",
                        backgroundSize: "cover"
                        }}>
                        <div className="container detail-card"><br/>
                            <div className="row">
                                <div className="col-xl-3 col-lg-4 col-4">
                                    {/* THUMBNAIL */}
                                    <img className="trailer-img" src={this.state.gameData.cover_details} />
                                </div>
                                <div className="col-xl-9 col-lg-8 col-8">
                                    <h1 className="game-title">{this.state.gameData.title}</h1>
                                    
                                    <form>
                                        {/* FAVORITE */}
                                        <button className="btn btn-danger" style={{borderRadius: "20px"}}>
                                            <i className="fa fa-heart"></i> 13 <span className="d-none d-md-inline">Favorites</span>
                                        </button>
                                        {/* Watch Trailer */}
                                        <a className="btn btn-primary" style={{borderRadius: "20px", marginLeft: "5px", color: "white"}} target="_blank" href={this.state.gameData.trailer_details}>
                                            <i className="fa fa-film"></i> <span className="d-none d-sm-inline">Trailer</span>
                                        </a>
                                        {/* Read More */}
                                        <a className="btn btn-success" style={{borderRadius: "20px", margin: "2px 0 0 5px", color: "white"}} target="_blank" href={this.state.gameData.url_details}>
                                            <i className="fa fa-info-circle"></i> <span className="d-none d-sm-inline">More Info</span>
                                        </a>
                                    </form>
                    
                                    {/* DETAILS */}
                                    {/* DESKTOP */}
                                    <div className="d-none d-md-block">
                                        <Details
                                            dor={Date(this.state.gameData.dor_details).substring(0,16)}
                                            dev={this.state.gameData.developers.join(', ')}
                                            plat={this.state.gameData.platforms.join(', ')}
                                            genre={this.state.gameData.genre.join(', ')}
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
                                r1={43.1}
                                r2={64.1}
                                r3={50.1}
                                r4={70.1}
                                r5={80.1}
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
                                            dor={this.state.gameData.dor_details}
                                            dev={this.state.gameData.developers}
                                            plat={this.state.gameData.platforms}
                                            genre={this.state.gameData.genre}
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
                                r1={43.1}
                                r2={64.1}
                                r3={50.1}
                                r4={70.1}
                                r5={80.1}
                            />
                        </span>
                        <div style={{textAlign: "center"}}>
                            <input className="btn btn-success rating-button btn-lg" type="submit" value="Leave a Rating!"/><br/>
                            <p style={{color: "gray", fontStyle:"italic"}}>XXX users</p>
                        </div><br/>
                    
                        <h1>Comments</h1>
                        <hr style={{background:"white"}} />
                        <form className="form-group">
                            <textarea name="comment" className="form-control" placeholder="Enter comment here..."></textarea><br />
                            <input className="btn btn-success" type="submit" />
                        </form>
                        <br/>
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
        return (
            <div className="quick-deets">
                <h5>Released: <span className="detail-card-info">{this.props.dor}</span></h5>
                <h5>Developer(s): <span className="detail-card-info">{this.props.dev}</span></h5>
                <h5>Platform(s): <span className="detail-card-info">{this.props.plat}</span></h5>
                <h5>Genre(s): <span className="detail-card-info">{this.props.genre}</span></h5>
            </div>
        );
    }
}