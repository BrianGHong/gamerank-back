import React from 'react';
import axios from 'axios';

import {withRouter, Route, Switch} from 'react-router-dom';
import ScrollToTop from 'react-router-scroll-top';

// Partials
import {Navbar} from './components/Partials/Navbar';
import {Footer} from './components/Partials/Footer';

// Pages
import {Home} from './components/Home';
import {Search} from './components/Search';
import {User} from './components/User';
import {Game} from './components/Game';
import { Crawler } from './components/Crawler';
import {Login, Register} from './components/Creds';



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchParam: 'qwerty',
            filterParam: 'title',
            pageParam: 1,
            maxPage: 1,
            searchResults: [],
            goToSearchPage: false
        }

        this.doSearch = this.doSearch.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    doSearch(s, f, p) {
        this.setState({
            searchParam: s ? s : 'qwerty',
            filterParam: f ? f : 'title',
            pageParam: p ? p : 1
        });

        axios.request({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URI}/search/conductSearch/${s ? s : 'qwerty'}/${f ? f : 'title'}/${p ? p : 1}`
        })
        .then(result => {
            // Update results
            this.setState({
                isLoading: false,
                searchResults: result.data.results,
                maxPage: result.data.lastPage
            });
            this.props.history.push('/search');
        })
        .catch(err => {
            this.setState({
                error: err,
                isLoading: false,
                searchResults: [],
                maxPage: 1
            });
            this.props.history.push('/search');
        });
    }

    handlePageChange = (e) => {
        let page = this.state.pageParam;

        if (e.target.name === "goPrev") {
            if (page > 1) {
                page = page - 1;
            }
        } else {
            if (page < this.state.maxPage) {
                page = page + 1;
            }
        }
        this.setState({
            pageParam: page
        });
        this.doSearch(this.state.searchParam, this.state.filterParam, page);
    }
    

    render() {
        return (
            <div>
                <Navbar doSearch={this.doSearch} />
                <ScrollToTop>
                    <Switch>
                        <Route path="/search">
                            <Search 
                                isLoading={this.state.isLoading} 
                                resultList={this.state.searchResults}
                                goPrev={this.doSearch}
                                goNext={this.doSearch}
                                currentPage={this.state.pageParam}
                                changePage={this.handlePageChange}
                                maxPage={this.state.maxPage}
                            />
                        </Route>
                        <Route path="/game/:g" component={Game} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/dashboard" component={User} />
                        <Route path="/crawl" component={Crawler} />
                        <Route path="/" component={Home} />
                    </Switch>
                </ScrollToTop>
                <Footer />
            </div>
        );
    }
}

export default withRouter(App);