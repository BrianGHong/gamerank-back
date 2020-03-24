import React from 'react';
import queryString from 'query-string';
import {Alert} from '../Partials/Alert';


class Alerts extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const error = this.props.query["error"];
        const success = this.props.query["success"];
        
        if (success) {
            return <Alert type="success" message={success} />;
        } 
        if (error) {
            return <Alert type="danger" message={error}/>;
        }
        return <span></span>;
    }
}



export class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const formStyle = {
            width: "300px",
            textAlign: "center",
            margin: "0 auto",
            height: "60vh"
        }
        return (
            <div>
                <Alerts query={queryString.parse(this.props.location.search)}/>
                <div className="container" style={{textAlign:"center"}}><br/>
                    <h1>🎮Login🎮</h1>
                    <form action={`${process.env.REACT_APP_BASE_URL}/user/login`} method="post" style={formStyle}>
                        <input className="form-control" type="text" name="email" placeholder="Email" style={{margin: "4px"}}/>
                        <input className="form-control" type="password" name="password" placeholder="Password" style={{margin: "4px"}}/>
                        <input className="btn btn-success" type="submit" value="Login" /><br/>
                        <p><a href="/register">Register here</a></p>
                    </form>
                </div>
            </div>
        );
    }
}

export class Register extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const formStyle = {
            width: "300px",
            textAlign: "center",
            margin: "0 auto",
            height: "60vh"
        }
        return (
            <div>
                <Alerts query={queryString.parse(this.props.location.search)}/>
                <div className="container" style={{textAlign:"center"}}><br/>
                    <h1>✍🏻Register✍🏻</h1>
                    <form action={`${process.env.REACT_APP_BASE_URL}/user/register`} method="post" style={formStyle}>
                        <input className="form-control" type="text" name="username" placeholder="Username" style={{margin: "4px"}}/>
                        <input className="form-control" type="text" name="email" placeholder="Email" style={{margin: "4px"}}/>
                        <input className="form-control" type="password" name="password" placeholder="Password" style={{margin: "4px"}}/>
                        <input className="btn btn-success" type="submit" value="Register" />
                        <br/>
                        <p><a href="/login">Login here</a></p>
                    </form>
                </div>
            </div>
        );
    }
}