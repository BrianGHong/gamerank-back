import React from 'react';
import {GG} from './GG'; // Game Gauge >:)

import './index.css';

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Ratings
            r1: 60,
            r2: 70,
            r3: 80,
            r4: 60,
            r5: 40,
            // Colors
            c1: "#f7bd00",
            c2: "#0099f7",
            c3: "#ae00ff",
            c4: "#db2100",
            c5: "#11c24c"
        };
    }

    handleResultTextChange(val) {
        this.setState({r1: val});
    }

    render() {
        return (
            <div>
                <div style={{
                    backgroundImage: "url()",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                    backgroundSize: "cover"
                    }}>
                    <div className="container detail-card"><br/>
                        <div className="row">
                            <div className="col-xl-3 col-lg-4 col-4">
                                {/* THUMBNAIL */}
                                <a href="<%- gamedata.trailer %>" className="trailer-link" target="_blank">
                                    <img className="trailer-img" src="" />
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
                                    <a className="btn btn-primary" style={{borderRadius: "20px", marginLeft: "5px", color: "white"}} target="_blank" href="https://youtube.com">
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
                                    <div className="quick-deets">
                                        <h5>Released: <span className="detail-card-info">DOR GOES HERE</span></h5>
                                        <h5>Developer(s): <span className="detail-card-info">DEV GOES HERE</span></h5>
                                        <h5>Platform(s): <span className="detail-card-info">PLAT GOES HERE</span></h5>
                                        <h5>Genre(s): <span className="detail-card-info">GENRE GOES HERE</span></h5>
                                    </div>
                
                                    {/* SUMMARY */}
                                    <div className="details-summary">
                                        <p>SUMMARY GOES HERE<span><a href="https://www.igdb.com/games/fire-emblem-three-houses"> Read more...</a></span></p>
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
                            <div className="tab-content">
                                <div id="deet" className="tab-pane fade">
                                    <div className="quick-deets">
                                        <h5>Released: <span className="detail-card-info">DOR GOES HERE</span></h5>
                                        <h5>Developer(s): <span className="detail-card-info">DEV GOES HERE</span></h5>
                                        <h5>Platform(s): <span className="detail-card-info">PLAT GOES HERE</span></h5>
                                        <h5>Genre(s): <span className="detail-card-info">GENRE GOES HERE</span></h5>
                                    </div>
                                </div>
                                <div id="summ" className="tab-pane fade">
                                    <div className="details-summary">
                                        <p>SUMMARY GOES HERE<span><a href="https://www.igdb.com/games/fire-emblem-three-houses"> Read more...</a></span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/>
                    </div>
                </div>
                
                <div className="container">
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-2 gp">
                            <GG 
                                cat="Story"
                                icon="fa fa-book"
                                rating={this.state.r1}
                                color={this.state.c1}
                            />
                        </div>
                        <div className="col-2 gp">
                            <GG 
                                cat="Gameplay"
                                icon="fa fa-gamepad"
                                rating={this.state.r2}
                                color={this.state.c2}
                            />
                        </div>
                        <div className="col-2 gp">
                            <GG 
                                cat="Art/Music"
                                icon="fa fa-paint-brush"
                                rating={this.state.r3}
                                color={this.state.c3}
                            />
                        </div>
                        <div className="col-2 gp">
                            <GG 
                                cat="Difficulty"
                                icon="fa fa-bolt"
                                rating={this.state.r4}
                                color={this.state.c4}
                            />
                        </div>
                        <div className="col-2 gp">
                            <GG 
                                cat="Worth it?"
                                icon="fa fa-money"
                                rating={this.state.r5}
                                color={this.state.c5}
                            />
                        </div>
                        <p className="col-12" style={{textAlign: "center", marginTop: "10px", fontStyle:"italic"}}></p>
                    </div>

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