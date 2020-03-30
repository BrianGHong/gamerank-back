import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Gauge} from './QueryGauges';


export class GameCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameScore: {}
        };
    }

    componentDidMount() {
        this.getGameScore(this.props.gameID);
    }

    // Get Game Aggregate Score
    getGameScore = (gid) => {
        axios.request({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URI}/score/getGameScore/${gid}`
        })
        .then(res => {
            this.setState({
                gameScore: res.data
            });
        }).catch(err => {
            console.log(err);
        });
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
                <Link className="card gamecard" to={`/game/${this.props.gameID}`}>
                    <div className="row">
                        <div className="col-lg-2 col-md-3 col-4">
                            <img className="game-img" src={this.props.img} />
                        </div>
                        <div className="col-lg-10 col-md-9 col-8" style={{marginTop: "10px"}}>
                            <h2 style={{wordWrap: "break-word"}}>{this.props.title}</h2>
                            <div className="rates row">
                                <div data-tip="Story Rating" className="col-lg-1 col-2">
                                    <Gauge
                                        color={colors.c1}
                                        icon="fa fa-book"
                                        rating={this.state.gameScore.r1}
                                    />
                                </div>
                                <div data-tip="Gameplay Rating" className="col-lg-1 col-2">
                                    <Gauge
                                        color={colors.c2}
                                        icon="fa fa-gamepad"
                                        rating={this.state.gameScore.r2}
                                    />
                                </div>
                                <div data-tip="Art/Music Rating" className="col-lg-1 col-2">
                                    <Gauge
                                        color={colors.c3}
                                        icon="fa fa-paint-brush"
                                        rating={this.state.gameScore.r3}
                                    />
                                </div>
                                <div data-tip="Difficulty Rating" className="col-lg-1 col-2">
                                    <Gauge
                                        color={colors.c4}
                                        icon="fa fa-bolt"
                                        rating={this.state.gameScore.r4}
                                    />
                                </div>
                                <div data-tip="Value Rating" className="col-lg-1 col-2">
                                    <Gauge
                                        color={colors.c5}
                                        icon="fa fa-money"
                                        rating={this.state.gameScore.r5}
                                    />
                                </div>
                            </div>
                            {/* <div className="genres row">
                                Action Role-playing
                            </div> */}
                        </div>
                    </div>
                </a><br />
            </div>
        );
    }
}