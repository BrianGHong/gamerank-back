import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

// Partials
import {Navbar} from './components/Partials/Navbar';
import {Footer} from './components/Partials/Footer';

// Pages
import {Home} from './components/Home';
import {Search} from './components/Search';
import {User} from './components/User';
import {Game} from './components/Game';
import { Crawler } from './components/Crawler';


class App extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <Switch>
                    <Route path="/game">
                        <Game />
                    </Route>
                    <Route path="/search">
                        <Search />
                    </Route>
                    <Route path="/user">
                        <User />
                    </Route>
                    <Route path="/crawl">
                        <Crawler />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
                <Footer />
            </div>
        );
    }
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>    
    , document.getElementById('root'));
