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
            searchResults: [],
            goToSearchPage: false
        }

        this.doSearch = this.doSearch.bind(this);
    }

    doSearch(s, f) {
        this.setState({
            searchParam: s ? s : 'qwerty',
            filterParam: f ? f : 'title'
        });

        axios.request({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URI}/search/conductSearch/${s ? s : 'qwerty'}/${f ? f : 'title'}`
        })
        .then(result => {
            // Update results
            this.setState({
                isLoading: false,
                searchResults: result.data,
            });
            this.props.history.push('/search');
        })
        .catch(err => {
            this.setState({
                error: err,
                isLoading: false,
                searchResults: [],
            });
            this.props.history.push('/search');
        });
    }
    

    render() {
        return (
            <div>
                <Navbar doSearch={this.doSearch} />
                <ScrollToTop>
                    <Switch>
                        <Route path="/search">
                            <Search isLoading={this.state.isLoading} resultList={this.state.searchResults}/>
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