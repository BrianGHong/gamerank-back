import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import './index.css';

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            randomGameUrl: "/",
            mostFavorites: {title: '...'},
            mostPopular: {title: '...'}
        }
    }

    componentDidMount() {
        this.getRandomGame();
        this.getMostFavorited();
        this.getMostPopular();
    }

    getRandomGame() {
        axios.request({
            method: 'GET',
            url: 'http://localhost:8000/home/randomGame'
        })
        .then(res => {
            if (res.data.url) {
                this.setState({
                    randomGameUrl: res.data.url
                });
            }
        }).catch(err => {
            console.error(err);
        });
    }

    getMostFavorited() {
        axios.request({
            method: 'GET',
            url: 'http://localhost:8000/home/mostFavorites'
        })
        .then(res => {
            if (res.data.gameID) {
                this.setState({
                    mostFavorites: res.data,
                });
            }
        }).catch(err => {
            console.error(err);
        });
    }

    getMostPopular() {
        axios.request({
            method: 'GET',
            url: 'http://localhost:8000/home/mostPopular'
        })
        .then(res => {
            if (res.data.gameID) {
                this.setState({
                    mostPopular: res.data,
                });
            }
        }).catch(err => {
            console.error(err);
        });
    }

    render() {
        return (
            <div>
                <div className="jumbotron" style={{
                backgroundImage: "url('https://cdn2.unrealengine.com/Diesel%2Fblog%2Fepic-games-store-update%2FEGS_Social_Update_News-2560x1440-128a69890d92407b815582c1deba54450e5645f9.jpg')",
                backgroundRepeat: "repeat",
                backgroundAttachment: "none",
                backgroundSize: "cover",
                color: "white",
                borderRadius: 0
                }}>
                    <div className="container">
                        <h1 id="jumbo1" style={{fontWeight: "bold", textShadow: "4px 4px black"}}>So Many Games, So Little Time</h1>
                        <Link id="jumbo2" className="btn btn-success btn-game" to={`${this.state.randomGameUrl}`}>Take me to a game</Link>
                    </div>
                </div>
                <div className="container" style={{textAlign: "center"}}>
                    <div className="row">
                        <div className="col-6">
                            <h1>Most Favorited 💖</h1>
                            <h3>
                                <Link to={`/game/${this.state.mostFavorites.gameID}`}>{this.state.mostFavorites.title}</Link>
                            </h3>
                        </div>
                        <div className="col-6">
                            <h1>Most Popular 👪</h1>
                            <h3>
                                <Link to={`/game/${this.state.mostPopular.gameID}`}>{this.state.mostPopular.title}</Link>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}