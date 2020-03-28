import axios from 'axios';
import React from 'react';
import ReactTooltip from 'react-tooltip';
import queryString from 'query-string';
import './index.css';

import {GameCard} from './GameCard';


export class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resultList: []
        };
    }

    componentDidMount() {
        const s = queryString.parse(this.props.location.search)['s'];
        this.conductSearch(s ? s : 'all');
    }

    conductSearch(search) {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/search/conductSearch/${search}`)
            .then(result => {
                this.setState({
                    resultList: result.data
                });
            })
            .catch(err => {
                this.setState({
                    error: err,
                    resultList: []
                });
            });
    }

    render() {
        let resultList;
        if (this.state.resultList.length > 0) {
            resultList = (
                <div id="gamecards" className="card-deck">
                    {this.state.resultList.map((d, idx) => {
                        return (<GameCard
                            title={d.title}
                            img={d.cover_details}
                            gameID={d.gameID}
                            r1={20.01}
                            r2={64.01}
                            r3={53.01}
                            r4={90.01}
                            r5={76.01}
                            />);
                    })}
                </div>
            );
        } else {
            resultList = <h5>No results :(</h5>
        }

        return (
            <div className="container"><br/>
                {resultList}
                {/* <form className="form-inline" action="game.php">
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
                </form><br/> */}
                <ReactTooltip />
            </div>
        );
    }
}