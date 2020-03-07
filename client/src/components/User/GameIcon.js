import React from 'react';
import './GameIcon.css';

export class GameIcon extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="gamecard col-auto mb-4">
                <a className="card" href="game" style={{margin: 0}}>
                    <div title={this.props.title} id="g-title" data-toggle="tooltip" data-placement="top">
                        <img className="game-img" src={this.props.url}/>
                    </div>
                </a>
            </div>
        );
    }
}