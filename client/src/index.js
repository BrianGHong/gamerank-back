import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter, Route, Switch} from 'react-router-dom';
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


const LoadingIndicator = props => {
    const {promiseInProgress} = usePromiseTracker();
    return (
        promiseInProgress && (
            <h1>Loading...</h1>
        )
    );    
}

class App extends React.Component {

    render() {
        return (
            <div>
                <Navbar />
                <Switch>
                    <Route path="/game/:g" component={Game} />
                    <Route path="/search" component={Search} />
                    <Route path="/user" component={User} />
                    <Route path="/crawl" component={Crawler} />
                    <Route path="/" component={Home} />
                </Switch>
                <LoadingIndicator/>
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
