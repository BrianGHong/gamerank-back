import React from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import {Alert} from '../Partials/Alert';


export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            alert: {}
        }
    }

    componentDidMount() {
        const previousProps = this.props.location.state;
        if (previousProps && previousProps.alert && previousProps.alert.type == 'success') {
            this.setState({
                alert: {
                    type: 'success',
                    message: this.props.location.state.alert.message
                }
            });
        }
    }

    loginUser = () => {
        const data = {
            email: this.state.email,
            password: this.state.password
        };

        axios.request({
            method: 'POST',
            url: 'http://localhost:8000/user/login',
            data: data
        })
        .then(res => {
            if (res.data.success) {
                this.setState({
                    alert: {
                        type: 'primary'
                    }
                });
            } else if (res.data.error) {
                this.setState({
                    alert: {
                        type: 'danger',
                        message: res.data.error
                    }
                });
            } else {
                this.setState({
                    alert: {
                        type: 'danger',
                        message: 'An unknown error has occurred. Please contact administrator.'
                    }
                });
            }
        }).catch(err => {
            this.setState({
                alert: {
                    type: 'danger',
                    message: JSON.stringify(err)
                }
            });
        });
    }

    handleChange = (e) => {
        const val = e.target.value;
        const name = e.target.name;
        if (name === 'email') {
            this.setState({
                email: val
            });
        } else {
            this.setState({
                password: val
            });
        }
    }

    render() {
        const formStyle = {
            width: "300px",
            textAlign: "center",
            margin: "0 auto",
            height: "60vh"
        }

        // On successful login, redirect to dashboard page
        if (this.state.alert.type == 'primary') {
            window.location.replace("/dashboard");
        }

        return (
            <div>
                <Alert type={this.state.alert.type} message={this.state.alert.message}/>
                <div className="container" style={formStyle}><br/>
                    <h1>🎮Login🎮</h1>
                    <input onChange={this.handleChange} value={this.state.email} className="form-control" type="text" name="email" placeholder="Email" style={{margin: "4px"}}/>
                    <input onChange={this.handleChange} value={this.state.password} className="form-control" type="password" name="password" placeholder="Password" style={{margin: "4px"}}/>
                    <input onClick={this.loginUser} className="btn btn-success" type="submit" value="Login" /><br/>
                    <p><Link to='/register'>Register here</Link></p>
                </div>
            </div>
        );
    }
}

export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            alert: {}
        }
    }

    registerUser = () => {
        const data = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };
        axios.request({
            method: 'POST',
            url: 'http://localhost:8000/user/register',
            data: data
        })
            .then(res => {
                console.log('RES', res);
                if (res.data.success) {
                    console.log('Success');
                    this.setState({
                        alert: {
                            type: 'success',
                            message: 'Account Created!'
                        }
                    });
                } else if (res.data.error) {
                    console.log(res.data.error)
                    this.setState({
                        alert: {
                            type:'danger',
                            message: res.data.error
                        },
                    });
                } else {
                    this.setState({
                        alert: {
                            type: 'danger',
                            message: 'Unkown error has occurred'
                        }
                    });
                }
            })
            .catch(err => {
                console.log('ERROR', err);
                this.setState({error: err});
            });
    }

    // Update form values upon input
    handleChange = (e) => {
        const val = e.target.value;
        const name = e.target.name;
        if (name === 'username') {
            this.setState({
                username: val
            });
        } else if (name === 'email') {
            this.setState({
                email: val
            });
        } else {
            this.setState({
                password: val
            });
        }
    }

    render() {
        const formStyle = {
            width: "300px",
            textAlign: "center",
            margin: "0 auto",
            height: "60vh"
        }

        // On successful account creation, redirect to login page
        if (this.state.alert.type == 'success') {
            return <Redirect to={{
                pathname: '/login',
                state: {alert: {type: 'success', message: 'Account Created!'}}
            }} />;
        }

        return (
            <div>
                <Alert type={this.state.alert.type} message={this.state.alert.message}/>
                <div className="container" style={formStyle}><br/>
                    <h1>✍🏻Register✍🏻</h1>
                    <input onChange={this.handleChange} value={this.state.username} className="form-control" type="text" name="username" placeholder="Username" style={{margin: "4px"}}/>
                    <input onChange={this.handleChange} value={this.state.email} className="form-control" type="text" name="email" placeholder="Email" style={{margin: "4px"}}/>
                    <input onChange={this.handleChange} value={this.state.password} className="form-control" type="password" name="password" placeholder="Password" style={{margin: "4px"}}/>
                    <button className="btn btn-success" onClick={this.registerUser}>Register</button>
                    <br/>
                    <p><Link to='/login'>Login here</Link></p>
                </div>
            </div>
        );
    }
}