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

    goPrev = (e) => {
        e.preventDefault();

        const s = this.state.searchTerm;
        const f = this.state.currentFilter;
        const p = this.props.currentPage;
        const {doSearch} = this.props;
        doSearch(s,f,p-1);
    }

    goNext = (e) => {
        e.preventDefault();

        const s = this.state.searchTerm;
        const f = this.state.currentFilter;
        const p = this.props.currentPage;
        const {doSearch} = this.props;
        doSearch(s,f,p+1);
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
                let prev = (this.props.currentPage !== 1 ? 
                    <button onClick={this.props.changePage} name="goPrev" type="button" className="btn btn-primary">Previous</button> : 
                    <button disabled className="btn btn-primary">Previous</button>);
                let back = (this.props.currentPage < this.props.maxPage ? 
                    <button onClick={this.props.changePage} name="goNext" type="button" class="btn btn-primary">Next</button> : 
                    <button disabled className="btn btn-primary">Next</button>);
                const paginator = (
                    <div>
                        <div>
                            {prev}
                            <div className="btn">{this.props.currentPage}</div>
                            {back}
                        </div>
                        <br/><br/>
                    </div>
                );
                resultList = (
                    <div>
                        {paginator}
                        <div id="gamecards" className="card-deck">
                            {this.state.resultList.map((d, idx) => {
                                return (<GameCard
                                    title={d.title}
                                    img={d.cover_details}
                                    gameID={d.gameID}
                                    />);
                                })}
                        </div>
                        {paginator}
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