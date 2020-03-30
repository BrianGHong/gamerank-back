import React from 'react';
import {Link} from 'react-router-dom';
import './GameIcon.css';

export class GameIcon extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="u" className="gamecard col-auto mb-2 ml-1 mr-1" style={{margin: 0, padding: 0}}>
                <Link className="card" to={this.props.gameurl}>
                    <div title={this.props.title} id="g-title" data-toggle="tooltip" data-placement="top">
                        <img className="game-img" src={this.props.imgurl}/>
                    </div>
                </Link>
            </div>
        );
    }
}