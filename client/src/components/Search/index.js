import React from 'react';
import ReactTooltip from 'react-tooltip';
import {Spinner} from '../Partials/Spinner';
import './index.css';

import {GameCard} from './GameCard';


export class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resultList: [],
            isLoading: false
        };
    }

    componentDidMount() {
        this.setState({
            isLoading: this.props.isLoading,
            resultList: this.props.resultList
        });
    }

    componentDidUpdate() {
        if (this.state.resultList !== this.props.resultList) {
            this.setState({
                isLoading: this.props.isLoading,
                resultList: this.props.resultList
            });
        }
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