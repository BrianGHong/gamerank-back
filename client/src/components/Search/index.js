import axios from 'axios';
import React from 'react';
import ReactTooltip from 'react-tooltip';
import queryString from 'query-string';
import {Spinner} from '../Partials/Spinner';
import './index.css';

import {GameCard} from './GameCard';


export class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            resultList: []
        };
    }

    componentDidMount() {
        const s = queryString.parse(this.props.location.search)['s'];
        this.conductSearch(s ? s : 'all');
    }

    conductSearch(search) {
        axios.request({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URI}/search/conductSearch/${search}`
        })
        .then(result => {
            this.setState({
                isLoading: false,
                resultList: result.data
            });
        })
        .catch(err => {
            this.setState({
                error: err,
                isLoading: false,
                resultList: []
            });
        });
    }

    render() {
        let resultList;
        if (this.state.isLoading) {
            resultList = <Spinner/>;
        } else {
            if (this.state.resultList.length > 0) {
                resultList = (
                    <div id="gamecards" className="card-deck">
                        {this.state.resultList.map((d, idx) => {
                            return (<GameCard
                                title={d.title}
                                img={d.cover_details}
                                gameID={d.gameID}
                                />);
                        })}
                    </div>
                );
            } else {
                resultList = <h5>No results :(</h5>
            }
        }

        return (
            <div className="container"><br/>
                {resultList}
                <ReactTooltip/>
            </div>
            );
    }
}