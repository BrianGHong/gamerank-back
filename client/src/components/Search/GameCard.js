import React from 'react';

export class GameCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <a className="card gamecard" href="game">
                    <div className="row">
                        <div className="col-lg-2 col-md-3 col-4">
                            <img className="game-img" src="https://images.igdb.com/igdb/image/upload/t_cover_big/co1uii.jpg" />
                        </div>
                        <div className="col-lg-10 col-md-9 col-8" style={{marginTop: "10px"}}>
                            <h2 style={{wordWrap: "break-word"}}>The Legend of Zelda</h2>
                            <div className="rates row">
                                <div className="col-sm-1 col-2 ri" title="Story Rating">
                                    <i style={{color: "#f7bd00"}} className="fa fa-book"> <p id="r1">12</p></i>
                                </div>
                                <div className="col-sm-1 col-2 ri" title="Gameplay Rating">
                                    <i style={{color: "#0099f7"}} className="fa fa-gamepad"> <p id="r2">54</p></i>
                                </div>
                                <div className="col-sm-1 col-2 ri" title="Art/Music Rating">
                                    <i style={{color: "#ae00ff"}} className="fa fa-paint-brush"> <p id="r3">23</p></i>
                                </div>
                                <div className="col-sm-1 col-2 ri" title="Difficulty Rating">
                                    <i style={{color: "#db2100"}} className="fa fa-bolt"> <p id="r4">54</p></i>
                                </div>
                                <div className="col-sm-1 col-2 ri" title="Value Rating">
                                    <i style={{color: "#11c24c"}} className="fa fa-money"> <p id="r5">53</p></i>
                                </div>
                                <div className="col-sm-7">
                                </div>
                            </div>
                            <div className="genres row">
                                Action Role-playing
                            </div>
                        </div>
                    </div>
                </a><br />
            </div>
        );
    }
}