import React from 'react';
import {Link} from 'react-router-dom';
import {Gauge} from './QueryGauges';

export class GameCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const colors = {
            c1: "#f7bd00",
            c2: "#0099f7",
            c3: "#ae00ff",
            c4: "#db2100",
            c5: "#11c24c",
        }

        return (
            <div>
                <Link className="card gamecard" to="/game">
                    <div className="row">
                        <div className="col-lg-2 col-md-3 col-4">
                            <img className="game-img" src="https://images.igdb.com/igdb/image/upload/t_cover_big/co1uii.jpg" />
                        </div>
                        <div className="col-lg-10 col-md-9 col-8" style={{marginTop: "10px"}}>
                            <h2 style={{wordWrap: "break-word"}}>The Legend of Zelda</h2>
                            <div className="rates row">
                                <div className="col-lg-1 col-2">
                                    <Gauge
                                        color={colors.c1}
                                        icon="fa fa-book"
                                        rating={this.props.r1}
                                    />
                                </div>
                                <div className="col-lg-1 col-2">
                                    <Gauge
                                        color={colors.c2}
                                        icon="fa fa-gamepad"
                                        rating={this.props.r2}
                                    />
                                </div>
                                <div className="col-lg-1 col-2">
                                    <Gauge
                                        color={colors.c3}
                                        icon="fa fa-paint-brush"
                                        rating={this.props.r3}
                                    />
                                </div>
                                <div className="col-lg-1 col-2">
                                    <Gauge
                                        color={colors.c4}
                                        icon="fa fa-bolt"
                                        rating={this.props.r4}
                                    />
                                </div>
                                <div className="col-lg-1 col-2">
                                    <Gauge
                                        color={colors.c5}
                                        icon="fa fa-money"
                                        rating={this.props.r5}
                                    />
                                </div>
                            </div>
                            <div className="genres row">
                                Action Role-playing
                            </div>
                        </div>
                    </div>
                </Link><br />
            </div>
        );
    }
}