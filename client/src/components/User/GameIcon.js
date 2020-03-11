import React from 'react';
import './GameIcon.css';

export class GameIcon extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="u">
                <div className="gamecard user-page col-auto mb-4">
                    <a className="card user-page" href="game" style={{margin: 0}}>
                        <div title={this.props.title} id="g-title" data-toggle="tooltip" data-placement="top">
                            <img className="game-img user-page" src={this.props.url}/>
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}