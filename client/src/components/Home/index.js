import React from 'react';
import axios from 'axios';

import './index.css';

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            randomGame: {"gameID": 0},
            mostFavorites: "Loading...",
            mostPopular: "Loading..."
        }
    }

    componentDidMount() {
        this.randomGame();
        this.mostFavorites();
        this.mostPopular();
    }

    randomGame() {
        axios
            .get(`/home/randomGame`)
            .then(result => {
                this.setState({
                    randomGame: result.data,
                });
            })
            .catch(err => {
                this.setState({
                    error: err
                });
            });
    }

    mostFavorites() {
        axios
            .get(`/home/mostFavorites`)
            .then(result => {
                this.setState({
                    mostFavorites: result.data,
                });
            })
            .catch(err => {
                this.setState({
                    error: err
                });
            });
    }

    mostPopular() {
        axios
            .get(`/home/mostPopular`)
            .then(result => {
                this.setState({
                    mostPopular: result.data,
                });
            })
            .catch(err => {
                this.setState({
                    error: err
                });
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
                        <a id="jumbo2" className="btn btn-success btn-game" href={`/game/${this.state.randomGame.gameID}`}>Take me to a game</a>
                    </div>
                </div>
                <div className="container" style={{textAlign: "center"}}>
                    <div className="row">
                        <div className="col-6">
                            <h1>Most Favorited 💖</h1>
                            <h3>
                                <a href={`/game/${this.state.mostFavorites.gameID}`}>{this.state.mostFavorites.title}</a>
                            </h3>
                        </div>
                        <div className="col-6">
                            <h1>Most Popular 👪</h1>
                            <h3>
                                <a href={`/game/${this.state.mostPopular.gameID}`}>{this.state.mostPopular.title}</a>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}