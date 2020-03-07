import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {Route, Switch, Router} from 'react-router-dom';

// Partials
import {Navbar} from './components/Partials/Navbar';
import {Footer} from './components/Partials/Footer';

// Pages
import {Home} from './components/Home';
import {Search} from './components/Search';
import {User} from './components/User';
import {Game} from './components/Game';


class App extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                {/* <Home /> */}
                {/* <Search /> */}
                {/* <User/> */}
                <Game />
                <Footer />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
