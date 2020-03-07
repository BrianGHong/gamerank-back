import React from 'react';
import './index.css';

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="jumbotron" style={{
            backgroundImage: "url('https://cdn2.unrealengine.com/Diesel%2Fblog%2Fepic-games-store-update%2FEGS_Social_Update_News-2560x1440-128a69890d92407b815582c1deba54450e5645f9.jpg')",
            backgroundRepeat: "repeat",
            backgroundAttachment: "none",
            backgroundSize: "cover",
            color: "white",
            borderRadius: 0
            }}>
                <div class="container">
                    <h1 id="jumbo1" style={{fontWeight: "bold", textShadow: "4px 4px black"}}>So Many Games, So Little Time</h1>
                    <a id="jumbo2" className="btn btn-success btn-game" href="/game">Take me to a game</a>
                </div>
            </div>
        );
    }
}