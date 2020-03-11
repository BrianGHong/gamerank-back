import React from 'react';
import './index.css';

import {GameCard} from './GameCard';

export class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="container"><br/>
                <form className="form-inline" action="game.php">
                    <div className="btn-toolbar">
                        <div className="dropdown">
                            <button className="btn btn-info dropdown-toggle" type="button" id="filterButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Filter
                            </button>
                            <div className="dropdown-menu" aria-labelledby="filterButton">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </div>
                    </div>
                </form><br/>

                <GameCard 
                    r1={20.01}
                    r2={64.01}
                    r3={53.01}
                    r4={90.01}
                    r5={76.01}
                />
                <GameCard />
            </div>
        );
    }
}