import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ScrollToTop from 'react-router-scroll-top';
import {usePromiseTracker} from 'react-promise-tracker';

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

    render() {
        return (
            <div>
                <Navbar/>
                <Switch>
                    <Route path="/game/:g" component={Game} />
                    <Route path="/search" component={Search} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/dashboard" component={User} />
                    <Route path="/crawl" component={Crawler} />
                    <Route path="/" component={Home} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

ReactDOM.render(
    <BrowserRouter>
        <ScrollToTop>
            <App />
        </ScrollToTop>
    </BrowserRouter>    
    , document.getElementById('root'));
