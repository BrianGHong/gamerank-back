import React from 'react';
import {Link} from 'react-router-dom'; 

export class ErrorPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container" style={{textAlign: "center", "height": "100vh"}}><br/>
                <h1 style={{fontSize: "100px"}}>{this.props.status}</h1>
                <h4>{this.props.message}</h4>
                <Link to="/">Home</Link>
            </div>
        );
    }
}