import React from 'react';
import {Gauges} from './Gauges'; // Game Gauge >:)

import './index.css';


export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Details
            summary: "Here, order is maintained by the Church of Seiros, which hosts the prestigious Officer’s Academy within its headquarters. You are invited to teach one of its three mighty houses, each comprised of students brimming with personality and represented by a royal from one of three territories. As their professor, you must lead your students in their academic lives and in turn-based, tactical RPG battles wrought with strategic, new twists to overcome. Which house, and which path, will you choose?"
        };
    }

    render() {
        return (
            <div>
                <div style={{
                    backgroundImage: "url(https://images.igdb.com/igdb/image/upload/t_screenshot_big/ynbji1swyqkg0co3cgag.jpg)",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                    backgroundSize: "cover"
                    }}>
                    <div className="container detail-card"><br/>
                        <div className="row">
                            <div className="col-xl-3 col-lg-4 col-4">
                                {/* THUMBNAIL */}
                                <a href="<%- gamedata.trailer %>" className="trailer-link" target="_blank">
                                    <img className="trailer-img" src="https://images.igdb.com/igdb/image/upload/t_cover_big/co1n8t.jpg" />
                                </a>
                            </div>
                            <div className="col-xl-9 col-lg-8 col-8">
                                <h1 className="game-title">Fire Emblem: Three Houses</h1>
                                
                                <form>
                                    {/* FAVORITE */}
                                    <button className="btn btn-danger" style={{borderRadius: "20px"}}>
                                        <i className="fa fa-heart"></i> 13 <span className="d-none d-md-inline">Favorites</span>
                                    </button>
                                    {/* Watch Trailer */}
                                    <a className="btn btn-primary" style={{borderRadius: "20px", marginLeft: "5px", color: "white"}} target="_blank" href="https://www.youtube.com/watch?v=pIUTKOvPc4I">
                                        <i className="fa fa-film"></i> <span className="d-none d-sm-inline">Trailer</span>
                                    </a>
                                    {/* Read More */}
                                    <a className="btn btn-success" style={{borderRadius: "20px", margin: "2px 0 0 5px", color: "white"}} target="_blank" href="https://igdb.com">
                                        <i className="fa fa-info-circle"></i> <span className="d-none d-sm-inline">More Info</span>
                                    </a>
                                </form>
                
                                {/* DETAILS */}
                                {/* DESKTOP */}
                                <div className="d-none d-md-block">
                                    <Details
                                        dor="July 25th, 2019"
                                        dev="Intelligent Systems, Nintendo"
                                        plat="Nintendo Switch"
                                        genre="Strategy RPG, Tactics"
                                    />
                                    <div className="details-summary">
                                        <p>{this.state.summary}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* DETAILS */}
                        {/* MOBILE */}
                        <div className="container row d-block d-md-none"><br/>
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
                                        dor="July 25th, 2019"
                                        dev="Intelligent Systems, Nintendo"
                                        plat="Nintendo Switch"
                                        genre="Strategy RPG, Tactics"
                                    />
                                </div>
                                <div id="summ" className="tab-pane">
                                    <div className="details-summary">
                                        <p>{this.state.summary}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/>
                    </div>
                </div>
                
                <div className="container">
                    <Gauges 
                        r1={43}
                        r2={64}
                        r3={50}
                        r4={70}
                        r5={80}
                    />
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
}

// Details Component
class Details extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="quick-deets">
                <h5>Released: <span className="detail-card-info">July 25th 2019</span></h5>
                <h5>Developer(s): <span className="detail-card-info">Intelligent Systems, Nintendo</span></h5>
                <h5>Platform(s): <span className="detail-card-info">Nintendo Switch</span></h5>
                <h5>Genre(s): <span className="detail-card-info">Adventure, RPG, Tactics, Turn-Based Strategy</span></h5>
            </div>
        );
    }
}